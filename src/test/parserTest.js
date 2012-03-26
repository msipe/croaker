TestCase("Croaker.ParserTest.Tests", {
  
  testSimpleParseWithEmpty: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.children, object());
    assertThat(tree.attributes, object());
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
