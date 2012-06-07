function Croaker(env) {
  var deps = env || {},
    $ = deps.jQuery || jQuery,
    mywindow = deps.window || window,
    MISSING_METRIC_VALUE = -9999934,
    maintainabilityIndex,
    cyclomaticComplexity,
    classCoupling,
    depthOfInheritance,
    linesOfCode,
    allDefinitions,
    strains;
    
  function FatalException(message) {
    return {
      name: 'FatalException',
      message: message
    };
  }
  
  function NodeEntry(name, attributes, children) {
    return {
      name: name,
      attributes: attributes,
      children: children
    };
  }
  
  function MetricDefinition(abrev, name) {
    return {
      name:name,
      abbreviation:abrev
    };
  }
  
  maintainabilityIndex = new MetricDefinition('MI', 'MaintainabilityIndex');
  cyclomaticComplexity = new MetricDefinition('CyC', 'CyclomaticComplexity');
  classCoupling = new MetricDefinition('CC', 'ClassCoupling');
  linesOfCode = new MetricDefinition('LC', 'LinesOfCode');
  depthOfInheritance = new MetricDefinition('DI', 'DepthOfInheritance');
  
  allDefinitions = [maintainabilityIndex, cyclomaticComplexity, classCoupling, depthOfInheritance, linesOfCode];
  
  function Parser() {
    var that = {};
    
    function isNodeValid(node) {
      return node.nodeType === 1 || node.nodeType === 2;
    }
    
    function parseAttributes(node) {
      var attributes = {}, x;

      for (x = 0; x < node.attributes.length; x++) {
        if(isNodeValid(node.attributes.item(x))) {
          attributes[node.attributes.item(x).name] = node.attributes.item(x).value;
        }
      }
        
      return attributes;
    }

    function parseChildNodes(processor, node) {
      var children = [], x;

      if (node.hasChildNodes()) {
        for (x = 0; x < node.childNodes.length; x++) {
          if (isNodeValid(node.childNodes.item(x))) {
            children.push(processor(node.childNodes.item(x)));
          }
        }
      }
      return children;
    }

    function processNode(node) {
      return new NodeEntry(node.nodeName, parseAttributes(node), parseChildNodes(processNode, node));
    }
    
    function validateDoc(doc) {
      if (!doc.documentElement) {
        throw new FatalException('unable to parse xml');
      }
    
      if (doc.documentElement.innerHTML) {
        throw new FatalException('unable to parse xml');
      }
      
      if (doc.documentElement.nodeName === 'parsererror') {
        throw new FatalException('unable to parse xml');
      } 
    }
    
    function parse(string) {
      var domparser, xmldoc;
    
      if (window.DOMParser) {
        try {
        domparser = new DOMParser();
        xmldoc = domparser.parseFromString(string, "text/xml");
        } catch(e) {
          throw new FatalException('unable to parse xml');
        }
      }
      else {
        xmldoc=new ActiveXObject("Microsoft.XMLDOM");
        xmldoc.async=false;
        xmldoc.loadXML(string); 
      }
      
      validateDoc(xmldoc);
      return processNode(xmldoc.documentElement);
    }

    that.parse = parse;
    return that;
  }
  
  function BaseNamed(name) {
    return {
      name: name
    };
  }
  
  function Metric(name, value) {
    var that = new BaseNamed(name);
    
    function getFormattedValue() {
      return (value === MISSING_METRIC_VALUE) ? '-' : value.toString();
    }
    
    that.value = value;
    that.getFormattedValue = getFormattedValue;
    
    return that;
  }  
  
  function BaseMetrics (name, metrics) {
    var that = new BaseNamed(name);
    
    function getFullMetrics() {
      var x, y, results = [], found;
       
      for (x=0; x < allDefinitions.length; x++) {
        found = false;
        
        for (y=0; y < metrics.length; y++) {
          if(metrics[y].name === allDefinitions[x].name) {
            results.push(metrics[y]);
            found = true;
          }
        }
        
        if (found === false) {
          results.push(new Metric(allDefinitions[x].name, MISSING_METRIC_VALUE));
        }
      }
      
      that.getFullMetrics = function() {return results;};
      return results;      
    }
    
    that.metrics = metrics;
    that.getFullMetrics = getFullMetrics;
    
    return that;    
  }
    
  function Member(name, file, line, metrics) {
    var that = new BaseMetrics(name, metrics);     
    
    that.strain = 'MB';
    that.file = file;
    that.line = line;
    
    return that;
  }
  
  function Type (name,members,metrics) {
    var that = new BaseMetrics(name, metrics);

    that.strain = 'TY';
    that.members = members;
       
    return that;
  }
  
  function Namespace(name, types, metrics) {
    var that = new BaseMetrics(name, metrics);
    
    that.strain = 'NS';
    that.types = types;
    
    return that;
  }
  
  function Module(name, version, metrics, namespaces) {
    var that = new BaseMetrics(name, metrics), elements;
    
    function flatten() {
      var x, y, z, elements = [that];
      
      for (x=0; x < namespaces.length; x++) {
        elements.push(namespaces[x]);
      
        for (y=0; y < namespaces[x].types.length; y++) {
          elements.push(namespaces[x].types[y]);
      
          for (z=0; z < namespaces[x].types[y].members.length; z++) {
            elements.push(namespaces[x].types[y].members[z]);
          }
        }
      }
      
      return elements;
    }
    
    that.flatten = flatten;
    that.strain = 'MD';
    that.version = version;
    that.namespaces = namespaces;
    
    return that;
  }
  
  function Mapper() {
    var that = {};
    
    function createMetric(node) {
      var x, val = node.attributes.Value;
      
      for (x=0; x < val.length; x++) {
        val = val.replace(',','');
      }
      
      return new Metric(node.attributes.Name, 
                        parseInt(val, 10));
    }
    
    function formMetrics(startingNode, index) {
       var x, metrics = [], metricsNode = startingNode.children[index];    
         
       for (x=0; x < metricsNode.children.length; x++) {
         metrics.push(createMetric(metricsNode.children[x]));
       }
       
       return metrics;
    }

    function formMember(startingNode) {
    
      return new Member(startingNode.attributes.Name,
                        startingNode.attributes.File,
                        startingNode.attributes.Line, 
                        formMetrics(startingNode, 0)
      ); 
    }
    
    function formType(startingNode) {
      var x,  membersNode = startingNode.children[1], membersArray = [];
      
      for (x=0; x < membersNode.children.length; x++) {
        membersArray.push(formMember(membersNode.children[x]));
      }
 
      return new Type(startingNode.attributes.Name,
                      membersArray,
                      formMetrics(startingNode, 0));
    }

    function formNamespace(startingNode) {
      var typesNode = startingNode.children[1], x, typesArray = [];
    
        for (x=0; x < typesNode.children.length; x++) {
          typesArray.push(formType(typesNode.children[x]));
        }
      
       return new Namespace(startingNode.attributes.Name,
                            typesArray,
                            formMetrics(startingNode, 0));       
    }
    
    function map(entryNode) {
      var moduleNode = entryNode.children[0].children[0].children[0].children[0],
        namespacesNode = moduleNode.children[1], nsArray = [], x;
            
        for (x=0; x < namespacesNode.children.length; x++) {
          nsArray.push(formNamespace(namespacesNode.children[x]));
        } 

      return new Module(moduleNode.attributes.Name,
                   moduleNode.attributes.AssemblyVersion,
                   formMetrics(moduleNode,0),
                   nsArray);
    }
    
    that.map = map;
    return that;
  }
  
  function DataLoader(url, callback) {
    function execute() {
      return $.get(url, callback, 'text');
    }
 
    return {
      execute: execute
    };
  }
  
  function LocationUrlParser() {
    function validateUrl(url) {
      if (!url || url.length <= 1) {
        throw new FatalException('no path argument provided');
      }
    }
    
    function parse() {
      var url = mywindow.location.search;
      validateUrl(url);
      return url.substring(1).split('=')[1];
    }
    
    return {
      parse: parse
    };
  }
  
  function OrFilter(filterArray) {
    var that = {};
    
    function filter(element) {
      var x;
      
      if (filterArray.length === 0) {
        return true;
      }
      
      for (x=0; x < filterArray.length; x++) {
        if (filterArray[x].filter(element)) {
          return true;
        }
      }
      return false;
    }
      
    that.filter = filter;
    
    return that;
  }

  function AndFilter(filters) {
    var that = {};

    function filter(element) {
      var x;
      
      for (x=0; x < filters.length; x++) {
        if (!filters[x].filter(element)) {
          return false;
        }
      }
      return true;
    }

    that.filter = filter;
    return that;
  }
  
  function FilteredList(module) {
    var that = {}, filters = [], accepted = [], elements = [],
      x, y, z, actualAccepted = [], nameFilter = [];
    
    elements = module.flatten();
    //elements.unshift(module);
    
    function getAccepted() {
      return actualAccepted;
    }
    
    function clearFilters() {
      actualAccepted = [];
    }
    
    function applyFilters(filters) {
      var y, andFilter = new AndFilter(filters);
       
      for (y=0; y < elements.length; y++) {
        if (andFilter.filter(elements[y])) {
          actualAccepted.push(elements[y]);
        }
      }
    }
    
    that.getAccepted = getAccepted;
    that.applyFilters = applyFilters;
    that.clearFilters = clearFilters;
    that.applyFilters = applyFilters;
    
    return that;
  }
  
  function StrainFilter(lookFor) {
    var that = {};
    
    function filter(node) {
      return (node.strain === lookFor);
    }
    
    that.filter = filter;
    
    return that;
  }
  
  function NameFilter(searchFor) {
    var that = {}, search = new RegExp(searchFor, 'i');
    
    function filter(compareTo) {
      return (search.test(compareTo.name));
    }
   
    that.filter = filter;
   
    return that;
  }
    
  return {
    NodeEntry: NodeEntry,
    Parser: Parser,
    Metric: Metric,
    Member: Member,
    Type: Type,
    Namespace: Namespace,
    Module: Module,
    Mapper: Mapper,
    DataLoader: DataLoader,
    LocationUrlParser: LocationUrlParser,
    MISSING_METRIC_VALUE: MISSING_METRIC_VALUE,
    BaseMetrics: BaseMetrics,
    MetricDefinition: MetricDefinition,
    maintainabilityIndex: maintainabilityIndex,
    cyclomaticComplexity: cyclomaticComplexity,
    classCoupling: classCoupling,
    depthOfInheritance: depthOfInheritance,
    linesOfCode: linesOfCode,
    allDefinitions: allDefinitions,
    FilteredList:FilteredList,
    strains: strains,
    StrainFilter: StrainFilter,
    NameFilter: NameFilter,
    AndFilter: AndFilter,
    OrFilter: OrFilter
  };
}

var croaker = new Croaker();