function Croaker(env) {
  var deps = env || {}, 
    $ = deps.jQuery || jQuery,
    mywindow = deps.window || window;
  
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
  
  function Module(name, version, metrics, namespace) {
    return {
      name:name,
      version: version,
      metrics: metrics,
      namespace: namespace
    };
  }
  
  function Mapper() {
    var that = {};
    
    function map(entryNode) {
      var x, startPoint = entryNode.children[0].children[0].children[0].children[0], metrics = [];
    
      for (x=0; x < startPoint.children[0].children.length; x++) {
        metrics.push(new Metric(startPoint.children[0].children[x].attributes.Name, 
                                startPoint.children[0].children[x].attributes.Value));
      }
      return new Module(startPoint.attributes.Name, startPoint.attributes.AssemblyVersion, metrics, []);
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
    function parse() {
      return mywindow.location.search.substring(1).split('=')[1];
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
