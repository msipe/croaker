function Parser() {
  var that = {};
  
  function parse(string) {
    var domparser = new DOMParser(),
      xmlDoc = domparser.parseFromString(string,"text/xml"),      
      root = xmlDoc.documentElement, atrs = {}, x, children = {};
   
    /* if(root.hasChildNodes()) {
      console.log(root.hasChildNodes());
      console.log(root.childNodes);
      
      for(x=0;x<root.childNodes.length; x++) {
        console.log(root.childNodes.item(x).nodeName);
      }
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


function ParserTemplate(name) {
  var that = {
    name:name,
    attributes:{},
    children: []    
  };
  
  
  function addAttribute(property, value) {
    that.attributes[property] = value;
  
  }
  
  that.addAttribute = addAttribute;
  
  
  return that;
}

 /*  {parserTemplate(name, attributes, children)
   [ child 1) ParserTemplate
              [child 1) parserTemplate
               
              child 2) parserTemplate
               ]       [ child 1) ParserTemplate]
    
    child 2) Parser Template
             [child 1) parserTemplate
               
             child 2) parserTemplate
                       [child 1) ParserTemplate]
    ]
              ]
  
  
  
  } */