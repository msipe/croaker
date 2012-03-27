var croaker = (function () {
  function NodeEntry(name, attributes, children) {
    var that = {
      name: name,
      attributes: attributes,
      children: children
    };

    return that;
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

  return {
    NodeEntry: NodeEntry,
    Parser: Parser
  };
} ());
