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
    allDefinitions;
    
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
      abbreviation:abrev
    };
  }
  
  MaintainabilityIndex = new MetricDefinition('MI');
  CyclomaticComplexity = new MetricDefinition('CyC');
  ClassCoupling = new MetricDefinition('CC');
  LinesOfCode = new MetricDefinition('LC');
  DepthOfInheritance = new MetricDefinition('DI');
  
  allDefinitions = [MaintainabilityIndex, CyclomaticComplexity, ClassCoupling, LinesOfCode, DepthOfInheritance];
  
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
      var x, y, results = ['MaintainabilityIndex', 'CyclomaticComplexity', 'ClassCoupling',
                           'DepthOfInheritance', 'LinesOfCode'];
       
      for(x=0; x < results.length; x++) {            
        for(y=0; y < metrics.length; y++) {
          if(metrics[y].name === results[x]) {
            results[x] = metrics[y];
          }
        }
      
        if(!results[x].name) {
          results[x] = new Metric(results[x], MISSING_METRIC_VALUE);
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
    MaintainabilityIndex :MaintainabilityIndex,
    CyclomaticComplexity: CyclomaticComplexity,
    ClassCoupling: ClassCoupling,
    DepthOfInheritance: DepthOfInheritance,
    LinesOfCode: LinesOfCode,
    allDefinitions: allDefinitions
  };
}

var croaker = new Croaker();