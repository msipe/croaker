TestCase("Croaker.ParserTest.Tests", {
  
  testSimpleParseWithEmpty: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.children, object());
    assertThat(tree.attributes, object());
  },
  
  testComplexParses: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><bballteams><team name="Thunder"><player name="Durant"><stat name="Average Points" value="10"/><stat name="Rebounds" value="25"/></player></team></bballteams>');

    assertThat(tree.name, equalTo('bballteams'));
  },
  
  
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
