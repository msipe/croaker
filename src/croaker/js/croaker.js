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
    return  {
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
   
  function Member(name, file, line, metrics, status) {
    return {
      name: name, 
      file: file,
      line: line,
      metrics: metrics
    };
  }
  
  function Type (name,members,metrics, status) {
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
        metrics.push(
          new Metric(metricsNode.children[x].attributes.Name, 
          parseInt(metricsNode.children[x].attributes.Value, 10))
        );
      }
      
      return metrics;      
    }
    
    function formMembers(startingNode) {
      var members = [], x;
      
      
      if(startingNode.children[1]) {
        startingNode = startingNode.children[1];
      }
      else {
        members.push(new Member(false));
        return members;
      }
      
      for (x=0; x < startingNode.children.length; x++) {
        members.push(
          new Member (startingNode.children[x].attributes.Name,
          startingNode.children[x].attributes.File, 
          startingNode.children[x].attributes.Line,
          formMetrics(startingNode.children[0],0))
        );
      }
      
      return members;      
    }
    
    function formTypes(startingNode) {
      var types = [], x, membersNode;
      
      if(startingNode.children[1]) {
        startingNode = startingNode.children[1];
      }
      else {
        types.push(new Type());
        return types;
      }
      
      for (x=0; x < startingNode.children.length; x++) {
        membersNode = startingNode.children[x];
        types.push(
          new Type (startingNode.children[x].attributes.Name,
          formMembers(membersNode),
          formMetrics(startingNode.children[0],0))
        );
      }
  
      return types;   
    }
    
    function formNamespaces(startingNode) {
      var typesNode, namespaces = [], x, blankNode;
      
      for (x=0; x < startingNode.children.length; x++) {
        typesNode = startingNode.children[x];
          
        namespaces.push(
          new Namespace(startingNode.children[x].attributes.Name, 
          formTypes(typesNode), 
          formMetrics(startingNode.children[0], 0))
        ); 
      }
      
      return namespaces;
    }
    
    function map(entryNode) {
      var moduleNode = entryNode.children[0].children[0].children[0].children[0], 
        namespacesNode = moduleNode.children[1];

      return new Module(moduleNode.attributes.Name, 
                 moduleNode.attributes.AssemblyVersion, 
                 formMetrics(moduleNode, 0), 
                 formNamespaces(namespacesNode));
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
