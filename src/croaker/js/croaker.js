function Parser() {
  var that = {};
  
  function parse(string) {
    var domparser = new DOMParser(), xmlDoc = domparser.parseFromString(string,"text/xml"),   
	  root = xmlDoc.documentElement;
	  
	/* console.log(root.hasAttributes());
	console.log(root.attributes.length);
	console.log(root.attributes.item(0).name);
    console.log(root.attributes.item(0).value); */
	
    var atrs = {};
	if (root.hasAttributes()) {
      for (x=0; x < root.attributes.length; x++) {
	    atrs[root.attributes.item(x).name] = root.attributes.item(x).value;
	  }
	}
	return {
	   name: root.nodeName,
	   children: [],
	   attributes: atrs
	};
  }
  
  that.parse = parse;
  
  return that;

}