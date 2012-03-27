TestCase("Croaker.Parser.Attribute.Tests", {
  testSimpleParseWithAttributes: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players name="bob"></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.attributes, hasMember('name', 'bob'));
  }, 
  
  testParseWithAttributesWithEntities: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players name="bob&gt;"></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.attributes, hasMember('name', 'bob>'));
  },   
  
  testParseWithMultipleAttributes: function() {
    var parser = new croaker.Parser(), 
      tree = parser.parse('<?xml version="1.0"?><players name="bob" age="5" gender="male"></players>');
  
    assertThat(tree.name, equalTo('players'));
    assertThat(tree.attributes, hasMember('name', 'bob'));
    assertThat(tree.attributes, hasMember('age', '5'));
    assertThat(tree.attributes, hasMember('gender', 'male'));
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
