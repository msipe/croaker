TestCase("Croaker.ParserTest.Tests", {
  testSimpleParseWithEmpty: function() {
    var parser = new Parser();
	
	var tree = parser.parse('<?xml version="1.0"?><players></players>');
	assertThat(tree.name, equalTo('players'));
	assertThat(tree.children, empty());
	assertThat(tree.attributes, object());
  },

  /* testSimpleParseWithAttributes: function() {
    var parser = new Parser();
	
	var tree = parser.parse('<?xml version="1.0"?><players name="bob"></players>');
	assertThat(tree.name, equalTo('players'));
	assertThat(tree.children, empty());
	assertThat(tree.attributes, hasMember('name', 'bob'));
  }, */
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
  
});
