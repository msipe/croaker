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

  function parent(name, childrenName, spec) {
    spec = named(name, spec);
    spec[childrenName] = [];
    spec.metrics = [];
    spec.parent = null;

    if (childrenName) {
      spec.add = function (items) {
        _.each(items, function (i) {
          spec[childrenName].push(i);
          i.parent = spec;
        });
        return spec;
      };
    }

    spec.addMetrics = function (items) {
      _.each(items, function (i) {
        spec.metrics.push(i);
        i.parent = spec;
      });
      return spec;
    };

    return spec;
  }

  function module(name, version) {
    return parent(name, 'namespaces', { version: version, tag: 'MOD' });
  }

  function namespace(name) {
    return parent(name, 'types', { tag: 'NS' });
  }

  function type(name) {
    return parent(name, 'members', { tag: 'TY' });
  }

  function member(name) {
    return parent(name, null, { tag: 'M' });
  }

  function metric(name, value) {
    return named(name, { value: value });
  }

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

    function parseMembers(node) {
      if (!shouldProcessMembers(node.Members)) {
        return [];
      }

      return _.map(node.Members[0].Member, function (n) {
        return member(n.Name).addMetrics(parseMetrics(n));
      });
    }

    function parseTypes(node) {
      return _.map(node.Types[0].Type, function (t) {
        return type(t.Name)
          .addMetrics(parseMetrics(t))
          .add(parseMembers(t));
      });
    }

    function parseNamespaces(root) {
      return _.map(root.Namespaces[0].Namespace, function (n) {
        return namespace(n.Name, root)
          .addMetrics(parseMetrics(n))
          .add(parseTypes(n));
      });
    }

    function parse(xml) {
      var root = getRoot(xml);
      return module(root.Name, root.AssemblyVersion)
        .addMetrics(parseMetrics(root))
        .add(parseNamespaces(root));
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