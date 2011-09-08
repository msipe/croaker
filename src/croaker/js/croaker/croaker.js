var Croaker = (function () {
  'use strict';

  var metricDefs = [{ name: 'ClassCoupling',
    friendlyName: 'Class Coupling',
    shortName: 'CC'
  },
                   {
                     name: 'DepthOfInheritance',
                     friendlyName: 'Depth of Inheritance',
                     shortName: 'DoI'
                   },
                   {
                     name: 'CyclomaticComplexity',
                     friendlyName: 'Cyclomatic Complexity',
                     shortName: 'CYC'
                   },
                   {
                     name: 'LinesOfCode',
                     friendlyName: 'Lines of Code',
                     shortName: 'LoC'
                   },
                   {
                     name: 'MaintainabilityIndex',
                     friendlyName: 'Maintainability Index',
                     shortName: 'MI'
                   }];

  var metricNames = _.pluck(metricDefs, 'name');

  function named(name, spec) {
    spec = spec || {};
    spec.name = name;
    return spec;
  }

  function parented(parent, name, childrenName, spec) {
    spec = named(name, spec);
    spec.metrics = [];
    spec.parent = parent;
    spec.fullName = spec.name;
    spec.location = [spec.name];

    spec.initialize = function () {
      spec.location = _.flatten([spec.parent.location, spec.name]);
      spec.fullName = _.reduce(_.rest(spec.location), function (m, s) { return m + '.' + s; });
    };

    if (childrenName) {
      spec[childrenName] = [];
      spec.add = function (items) {
        _.each(items, function (i) { spec[childrenName].push(i); });
      };
    }

    spec.addMetrics = function (items) {
      _.each(items, function (i) {
        spec.metrics.push(i);
        i.parent = spec;
      });
    };

    return spec;
  }

  function module(name, version) {
    var spec = { version: version, tag: 'MOD' };
    spec.init = function () {
      _.each(spec.namespaces, function (ns) {
        ns.initialize();
        _.each(ns.types, function (ty) {
          ty.initialize();
          _.each(ty.members, function (mem) {
            mem.initialize();
          });
        });
      });
    };
    return parented(null, name, 'namespaces', spec);
  }

  function namespace(mod, name) {
    return parented(mod, name, 'types', { tag: 'NS' });
  }

  function type(ns, name) {
    return parented(ns, name, 'members', { tag: 'TY' });
  }

  function member(ty, name) {
    return parented(ty, name, null, { tag: 'M' });
  }

  function metric(name, value) {
    return named(name, { value: value });
  }

  var search = (function () {
    var nameProviders = {
      true: function(item) {return item.fullName;},
      false: function(item) {return item.name;}
    };

    function init(spec) {
      var self = {};
      spec.search = self;

      self.execute = function (value, searchFullName) {
        var re = new RegExp(value, 'i');
        var provider = nameProviders[searchFullName];
        return _.select(spec.flat, function (item) { return re.test(provider(item)); });
      }
    }
    return { init: init };
  } ());

  var parser = (function () {
    function parseXml(xml) {
      return $.xml2json(xml, true);
    }

    function getRoot(xml) {
      return parseXml(xml).Targets[0].Target[0].Modules[0].Module[0];
    }

    function shouldProcessMembers(members) {
      return members[0] !== '';
    }

    function addMissingMetrics(metrics) {
      var names = _.pluck(metrics, 'name');
      var missing = _.reject(metricNames, function (n) { return _.include(names, n); });
      _.each(missing, function (n) { metrics.push(metric(n, 'N/A')); });
      return metrics;
    }

    function sortMetrics(metrics) {
      return _.sortBy(metrics, function (m) { return m.name; });
    }

    function parseMetrics(node) {
      var metrics = _.map(node.Metrics[0].Metric, function (n) {
        return metric(n.Name, parseInt(n.Value, 10));
      });
      return sortMetrics(addMissingMetrics(metrics));
    }

    function parseMembers(ty, node) {
      if (!shouldProcessMembers(node.Members)) {
        return [];
      }

      return _.map(node.Members[0].Member, function (n) {
        var mem = member(ty, n.Name);
        mem.addMetrics(parseMetrics(n));
        return mem;
      });
    }

    function parseTypes(ns, node) {
      return _.map(node.Types[0].Type, function (t) {
        var ty = type(ns, t.Name);
        ty.addMetrics(parseMetrics(t));
        ty.add(parseMembers(ty, t));
        return ty;
      });
    }

    function parseNamespaces(mod, root) {
      return _.map(root.Namespaces[0].Namespace, function (n) {
        var ns = namespace(mod, n.Name, root);
        ns.addMetrics(parseMetrics(n));
        ns.add(parseTypes(ns, n));
        return ns;
      });
    }

    function flatten(hierarchy) {
      var flat = [hierarchy];
      _.each(hierarchy.namespaces, function (ns) {
        flat.push(ns);
        _.each(ns.types, function (ty) {
          flat.push(ty);
          _.each(ty.members, function (mem) {
            flat.push(mem);
          });
        });
      });
      return flat;
    }

    function parse(xml) {
      var root = getRoot(xml);
      var mod = module(root.Name, root.AssemblyVersion);
      mod.addMetrics(parseMetrics(root));
      mod.add(parseNamespaces(mod, root));
      mod.init();

      var spec = {
        hierarchy: mod,
        flat: flatten(mod)
      };
      search.init(spec);
      return spec;
    }

    return { parse: parse };
  } ());

  return {
    module: module,
    namespace: namespace,
    type: type,
    member: member,
    metric: metric,
    parser: parser,
    metricDefs: metricDefs
  };
} ());