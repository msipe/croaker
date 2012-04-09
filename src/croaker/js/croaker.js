function Croaker(env) {
  var deps = env || {},
    $ = deps.jQuery || jQuery,
    mywindow = deps.window || window;
    
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

  function Parser() {
    var that = {};
    
    function isNodeValid(node) {
      return node.nodeType === 1 || node.nodeType === 2;
    }
    
    function parseAttributes(node) {
      var attributes = {}, x;

      if (node.hasAttributes()) {
        for (x = 0; x < node.attributes.length; x++) {
          if(isNodeValid(node.attributes.item(x))) {
            attributes[node.attributes.item(x).name] = node.attributes.item(x).value;
          }
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
      if(doc.documentElement.innerHTML) {
        throw new FatalException('unable to parse xml');
      }
      
      if (doc.documentElement.nodeName === 'parsererror') {
        throw new FatalException('unable to parse xml');
      }
      
    }
    
    function parse(string) {
      var domparser = new DOMParser(),
        xmlDoc = domparser.parseFromString(string, "text/xml");
      validateDoc(xmlDoc);
      return processNode(xmlDoc.documentElement);
    }

    that.parse = parse;
    return that;
  }

  function Metric(name, value) {
    return {
      name: name,
      value: value
    };
  }
   
  function Member(name, file, line, metrics) {
    return {
      name: name,
      file: file,
      line: line,
      metrics: metrics
    };
  }
  
  function Type (name,members,metrics) {
    return {
       name: name,
       members: members,
       metrics: metrics
    };
  }
  
  function Namespace(name, types, metrics) {
    return {
      name: name,
      types: types,
      metrics: metrics
    };
  }
  
  function Module(name, version, metrics, namespaces) {
    return {
      name: name,
      version: version,
      metrics: metrics,
      namespaces: namespaces
    };
  }
  
  function Mapper() {
    var that = {};
    
    function formMetrics(startingNode, index) {
      var x, metrics = [], metricsNode = startingNode.children[index];

      for (x=0; x < metricsNode.children.length; x++) {
        metrics.push(new Metric(metricsNode.children[x].attributes.Name,
                     parseInt(metricsNode.children[x].attributes.Value, 10))
        );
      }
      
      return metrics;
    }
    
    function formMember(startingNode) {
      var members = [], x;
      
      return new Member(startingNode.attributes.Name,
                        startingNode.attributes.File,
                        startingNode.attributes.Line, 
                        formMetrics(startingNode, 0)
      ); 
    }
    
    function formType(startingNode) {
      var types = [], x, membersNode, membersArray = [];
      
      if (startingNode.children[1].children.length < 1) {
        membersArray.push([]);
          
        return new Type(startingNode.attributes.Name,
                        membersArray,
                        formMetrics(startingNode, 0));
      } 
      
      membersNode = startingNode.children[1];
      
      for(x=0; x < membersNode.children.length; x++) {
        membersArray.push(formMember(membersNode.children[x]));
      }
 
      return new Type(startingNode.attributes.Name,
                      membersArray,
                      formMetrics(startingNode, 0)
                 );
    }
//formatting;
//remove empty slot checks;
    
    function formNamespace(startingNode) {
      var typesNode = startingNode.children[1], namespaces = [], x, typesArray = [];
        
        if(typesNode.children.length < 1) {
          typesArray.push([]);
          
          return new Namespace(startingNode.attributes.Name,
                               typesArray,
                               formMetrics(startingNode, 0)
          );
        }
      
      
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
        
        if(namespacesNode.children.length < 1) {
          nsArray.push([]);
          
          return new Module(moduleNode.attributes.Name,
                   moduleNode.attributes.AssemblyVersion,
                   formMetrics(moduleNode,0),
                   nsArray);
        }
    
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
    LocationUrlParser: LocationUrlParser
  };
}

var croaker = new Croaker();