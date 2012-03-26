TestCase("Croaker.ChildrenTest.Tests", {
 
  testParseWithAttributesAndChildren:  function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players name="bob"><stats type="catches" value="3"/></players>');
    
    assertThat(tree.name, equalTo('players'));
    assertThat(tree.attributes.name, equalTo('bob'));
    assertThat(tree.children.length, equalTo(1))  
    assertThat(tree.children[0].name, equalTo('stats'));
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
