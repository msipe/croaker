function Parser() {
  var that = {};
  
  function parse(string) {
    var domparser = new DOMParser(), xmlDoc = domparser.parseFromString(string,"text/xml"),   
	  name = xmlDoc.documentElement.nodeName,
	
    return {
	   name: name,
	   children: [],
	   attributes: {}
	};
  }
  
  that.parse = parse;
  
  return that;

}