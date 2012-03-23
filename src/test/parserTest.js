TestCase("Croaker.ParserTest.Tests", {
  testSimpleParseWithEmpty: function() {
    var parser = new Parser();
  
  var tree = parser.parse('<?xml version="1.0"?><players></players>');
  assertThat(tree.name, equalTo('players'));
  assertThat(tree.children, object());
  assertThat(tree.attributes, object());
  },

  testSimpleParseWithAttributes: function() {
    var parser = new Parser();
  
  var tree = parser.parse('<?xml version="1.0"?><players name="bob"></players>');
  assertThat(tree.name, equalTo('players'));
  assertThat(tree.children, object());
  assertThat(tree.attributes, hasMember('name', 'bob'));

  }, 
  
  testParseWithThreeAttributes: function() {
    var parser = new Parser();
  
  var tree = parser.parse('<?xml version="1.0"?><players name="bob" age="5" gender="male"></players>');
  
  assertThat(tree.name, equalTo('players'));
  assertThat(tree.children, object());
  assertThat(tree.attributes, hasMember('name', 'bob'));
  assertThat(tree.attributes, hasMember('age', '5'));
  assertThat(tree.attributes, hasMember('gender', 'male'));
  },

  testParseWithAttributesAndChildren:  function() {
    var parser = new Parser();
  
  var tree = parser.parse('<?xml version="1.0"?><players name="bob"><stats type="catches" value="3"/></players>');
    
  assertThat(tree.children, hasMember('stats', 'pop'));
  assertThat(tree.attributes, hasMember('name', 'bob'));

  
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
  
});
