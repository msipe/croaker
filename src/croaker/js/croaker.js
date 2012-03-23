function Parser() {
  var that = {};
  
  function parse(string) {
    var domparser = new DOMParser(),
      xmlDoc = domparser.parseFromString(string,"text/xml"),      
      root = xmlDoc.documentElement, atrs = {}, x, children = {};
   
    /* if(root.hasChildNodes()) {
      console.log(root.hasChildNodes());
      console.log(root.childNodes.length);
      console.log(root.childNodes.item(0).nodeName);
      console.log(root.childNodes.item(0).attributes.item(0).value); 
      console.log(root.childNodes.item(0).attributes.item(1).name); 
      console.log(root.childNodes.item(0).attributes.item(1).value); 
    } */
  
    
    if (root.hasAttributes()) {
        for (x=0; x < root.attributes.length; x++) {
        atrs[root.attributes.item(x).name] = root.attributes.item(x).value;
      }
    }
  
    
  
    if(root.hasChildNodes()) {
      for(x=0; x < root.childNodes.length; x++) {
        children[root.childNodes.item(x).nodeName] = root.childNodes.item(x);
      }
    }
  
    return {
       name: root.nodeName,
       children: children,
       attributes: atrs
    };
  }
  
  that.parse = parse;
  return that;
}