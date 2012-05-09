function Croaker(env) {
  var deps = env || {},
    $ = deps.jQuery || jQuery,
    mywindow = deps.window || window,
    MISSING_METRIC_VALUE = -99999,
    MaintainabilityIndex,
    CyclomaticComplexity,
    ClassCoupling,
    DepthOfInheritance,
    LinesOfCode,
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
  
  MaintainabilityIndex = new MetricDefinition('MI', 'MaintainabilityIndex');
  CyclomaticComplexity = new MetricDefinition('CyC', 'CyclomaticComplexity');
  ClassCoupling = new MetricDefinition('CC', 'ClassCoupling');
  LinesOfCode = new MetricDefinition('LC', 'LinesOfCode');
  DepthOfInheritance = new MetricDefinition('DI', 'DepthOfInheritance');
  
  allDefinitions = [MaintainabilityIndex, CyclomaticComplexity, ClassCoupling, DepthOfInheritance, LinesOfCode];
  
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
          if(isNodeValid(node.childNodes.item(x))) {
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
    
      if(doc.documentElement.innerHTML) {
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
        console.log('ie here');
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
  
  function BaseNamed(name, strain) {
    return {
      name: name
    };
  }
  
  function Metric(name, value) {
    var that = new BaseNamed(name);
    
    function getFormattedValue() {
      return (value === -99999) ? '' : value.toString();
    }
    
    that.value = value;
    that.getFormattedValue = getFormattedValue;
    
    return that;
  }  
  
  function BaseMetrics (name, metrics) {
    var that = new BaseNamed(name);
    
    function getFullMetrics() {
      var x, y, results = [], found;
       
      for(x=0; x < allDefinitions.length; x++) {
        found = false;
        
        for(y=0; y < metrics.length; y++) {
          if(metrics[y].name === allDefinitions[x].name) {
            results.push(metrics[y]);
            found = true;
          }
        }
        
        if(found === false) {
          results.push(new Metric(allDefinitions[x].name, MISSING_METRIC_VALUE));
        }
      }
      
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
    var that = new BaseMetrics(name, metrics);
    
    that.strain = 'MD';
    that.version = version;
    that.namespaces = namespaces;
    
    return that;
  }
  
  function Mapper() {
    var that = {};
    
    function formMetric(startingNodeChild) {
      var x, val = startingNodeChild.attributes.Value, endArray = [];
      
      for (x=0; x < val.length; x++) {
        val = val.replace(',','');
      }
      
      return new Metric(startingNodeChild.attributes.Name, 
                        parseInt(val, 10));
    }
    
    function formMetrics(startingNode, index) {
       var x, metrics = [], metricsNode = startingNode.children[index];    
         
       for (x=0; x < metricsNode.children.length; x++) {
         metrics.push(formMetric(metricsNode.children[x]));
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
      var types = [], x,  membersNode = startingNode.children[1], membersArray = [];
      
      
      for(x=0; x < membersNode.children.length; x++) {
        membersArray.push(formMember(membersNode.children[x]));
      }
 
      return new Type(startingNode.attributes.Name,
                      membersArray,
                      formMetrics(startingNode, 0)
                 );
    }

    function formNamespace(startingNode) {
      var typesNode = startingNode.children[1], namespaces = [], x, typesArray = [];
    
        for (x=0; x < typesNode.children.length; x++) {
          typesArray.push(formType(typesNode.children[x]));
        }
      
       return new Namespace(startingNode.attributes.Name,
                            typesArray,
                            formMetrics(startingNode, 0)
       );       
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
                   nsArray
      );
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
  
  function FilteredList(module) {
    var that = {}, filters = [], accepted = [], elements = [], x, y, z, temp;
    
    
    for (x=0; x < module.namespaces.length; x++) {
      temp = module.namespaces[x];
      elements.push(temp);
      
      for (y=0; y < temp.types.length; y++) {
        elements.push(temp.types[y]);
      
        for (z=0; z < temp.types[y].members.length; z++) {
          elements.push(temp.types[y].members[z]);
        }
      }
    }
    
    function addFilter(newFilter) {
      filters.push(newFilter);
    }
    
    function getFilters() {
      return filters;
    }
    
    function getAccepted() {
      return accepted;
    }
    
    function clearFilters() {
      filters = [];
      accepted = [];
    }
    
    function applyFilters() {
      var x, y;
      
      for (y=0; y < elements.length; y++) {
        for (x=0; x < filters.length; x++) {
          if (filters[x].filter(elements[y])) {
            accepted.push(elements[y]);
          }
        }
      }      
    }
    
    that.getAccepted = getAccepted;
    that.applyFilters = applyFilters;
    that.clearFilters = clearFilters;
    that.addFilter = addFilter;
    that.getFilters = getFilters;
    that.applyFilters = applyFilters;
    
    return that;
  }  
  
  function NSFilter() {
    var that = {};
    
    function filter(node) {
      
      return(node.strain === 'NS');
    }
    
    that.filter = filter;
    
    return that;
  }
  
  function TypeFilter() {
    var that = {};
    
    function filter(node) {
      return (node.strain === 'TY');
    }
    
    that.filter = filter;
    
    return that;
  }
  
  function MemberFilter() {
    var that = {};
    
    function filter(node) {
      return (node.strain === 'MB');
    }
    
    that.filter = filter;
    
    return that;
  }
  
  function NameFilter(searchFor) {
    var that = {};
    
    function filter(compareTo) {
      compareTo = compareTo.name;
      
      return (compareTo.indexOf(searchFor) !== -1);
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
    MetricDefinition: MetricDefinition,
    MaintainabilityIndex: MaintainabilityIndex,
    CyclomaticComplexity: CyclomaticComplexity,
    ClassCoupling: ClassCoupling,
    DepthOfInheritance: DepthOfInheritance,
    LinesOfCode: LinesOfCode,
    allDefinitions: allDefinitions,
    FilteredList:FilteredList,
    strains: strains,
    NSFilter: NSFilter,
    TypeFilter: TypeFilter,
    MemberFilter: MemberFilter,
    NameFilter: NameFilter
  };
}

var croaker = new Croaker();