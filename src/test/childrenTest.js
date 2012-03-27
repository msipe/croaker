TestCase("Croaker.ChildrenTest.Tests", {
  
  testChildren: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players><stats/><powers/></players>');
    
    assertThat(tree.children.length, equalTo(2));
    assertThat(tree.children[0].name, equalTo('stats'));
    assertThat(tree.children[1].name, equalTo('powers'));
  },
  
  
  testParseWithAttributesAndChildren:  function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players name="bob"><stats type="catches" value="3"/></players>');
    
    assertThat(tree.name, equalTo('players'));
    assertThat(tree.attributes.name, equalTo('bob'));
    assertThat(tree.children.length, equalTo(1));  
    assertThat(tree.children[0].name, equalTo('stats'));
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
