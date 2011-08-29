var Croaker = (function () {
  'use strict';

  function named(name, spec) {
    spec = spec || {};
    spec.name = name;
    return spec;
  }

  function parent(name, childrenName, spec, tag) {
    spec = named(name, spec);
    spec[childrenName] = [];
    spec.add = function (items) {
      $.merge(spec[childrenName], items);
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
    return parent(name, 'metrics', { tag: 'M' });
  }

  function metric(name, value, parent) {
    return named(name, { value: value, parent: parent });
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

    function parseMetrics(node) {
      var metrics = $.map(node.Metrics[0].Metric, function (n) {
        return metric(n.Name, parseInt(n.Value, 10));
      })
      return _.sortBy(metrics, function (m) { return m.name; });
    }

    function parseMembers(node) {
      if (!shouldProcessMembers(node.Members)) {
        return [];
      }

      return $.map(node.Members[0].Member, function (n) {
        return member(n.Name).add(parseMetrics(n));
      });
    }

    function parseTypes(node) {
      return $.map(node.Types[0].Type, function (n) {
        return type(n.Name).add(parseMembers(n));
      });
    }

    function parseNamespaces(root) {
      return $.map(root.Namespaces[0].Namespace, function (n) {
        return namespace(n.Name).add(parseTypes(n));
      });
    }

    function parse(xml) {
      var root = getRoot(xml);
      return module(root.Name, root.AssemblyVersion).add(parseNamespaces(root));
    }

    return { parse: parse };
  } ());

  return {
    module: module,
    namespace: namespace,
    type: type,
    member: member,
    metric: metric,
    parser: parser
  };
} ());