function StandardParse(name, attributes, children) {
  var that = {
    name:name,
    attributes:attributes,
    children: children    
  };
  
  return that;
}

function Parser() {
  var that = {};
 
  
  function processNode(node) {
    var name = node.nodeName, 
      attributes = {},
      children = [],
      x;
    
     if (node.hasAttributes()) {
        for (x=0; x < node.attributes.length; x++) {
        attributes[node.attributes.item(x).name] = node.attributes.item(x).value;
      }
    }
  
    if(node.hasChildNodes()) {
      for(x=0; x < node.childNodes.length; x++) {
        children.push(processNode(node.childNodes.item(x)));
      }
    }
    
    return new StandardParse(name, attributes, children);
  }  
  
  function parse(string) {
    var domparser = new DOMParser(),
      xmlDoc = domparser.parseFromString(string,"text/xml"),      
      root = xmlDoc.documentElement, atrs = {}, x, children = {};
   
    return processNode(root);
  }


  
  that.parse = parse;
  return that;
}
