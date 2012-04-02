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

    function parseAttributes(node) {
      var attributes = {}, x;

      if (node.hasAttributes()) {
        for (x = 0; x < node.attributes.length; x++) {
          attributes[node.attributes.item(x).name] = node.attributes.item(x).value;
        }
      }
      return attributes;
    }

    function parseChildNodes(processor, node) {
      var children = [], x;

      if (node.hasChildNodes()) {
        for (x = 0; x < node.childNodes.length; x++) {
          children.push(processor(node.childNodes.item(x)));
        }
      }
      return children;
    }

    function processNode(node) {
      return new NodeEntry(node.nodeName, parseAttributes(node), parseChildNodes(processNode, node));
    }
    
    function validateDoc(doc) {
      if(doc.documentElement.innerHTML) {
        throw ('unable to parse xml');
      }
      
      if (doc.documentElement.nodeName === 'parsererror') {
        throw 'unable to parse xml';      
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
      name:name, 
      value:value
    };
  }
   
  function Member(name, file, line, metrics) {
    return {
      name:name, 
      file:file,
      line:line,
      metrics:metrics
    };
  }
  
  function Type (name,members,metrics) {
    return {
       name:name,
       members:members,
       metrics:metrics
    };
  }
  
  function Namespace(name, types, metrics) {
    return {
      name:name,
      types:types,
      metrics:metrics
    };
  }
  
  function Module(name, version, metrics, namespaces) {
    return {
      name:name,
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
    
    function map(entryNode) {
      var x, 
        moduleNode = entryNode.children[0].children[0].children[0].children[0], 
        namespacesNode = moduleNode.children[1],
        typesNode = namespacesNode.children[0].children[1],
        membersNode = typesNode.children[0].children[1],
        members = [],
        metrics = [],
        namespace = [],
        types = [];
        
      if (membersNode.children.length > 0) {
        for (x=0; x < membersNode.children.length; x++) {
          members.push(
            new Member (membersNode.children[x].attributes.Name,
            membersNode.children[x].attributes.File, 
            membersNode.children[x].attributes.Line,
            formMetrics(membersNode.children[0],0))
          );
        }
      }

      if (typesNode.children.length > 0) {
        for (x=0; x < typesNode.children.length; x++) {
          types.push(
            new Type (typesNode.children[x].attributes.Name,
            members,
            formMetrics(typesNode.children[0],0))
          );
        }
      }
    
      if(moduleNode.children.length > 0) {
        for (x=0; x < namespacesNode.children.length; x++) {
          namespace.push(
            new Namespace(namespacesNode.children[x].attributes.Name, 
            types, 
            formMetrics(namespacesNode.children[0], 0))
          ); 
        }
      }
      
      return new Module(moduleNode.attributes.Name, 
                 moduleNode.attributes.AssemblyVersion, 
                 formMetrics(moduleNode, 0), 
                 namespace);
    }
    
    that.map = map;
    return that;
  }
  
  function DataLoader(url, callback) {
    function execute() {
      return $.get(url, callback);
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
