TestCase("Croaker.Parser.Tests", {
  testSimpleParseWithEmpty: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.children, empty());
  },
  
  testComplexParses: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><bballteams><team name="Thunder"><player name="Durant"><stat name="Average Points" value="10"/><stat name="Rebounds" value="25"/></player></team></bballteams>');

    assertThat(tree.name, equalTo('bballteams'));
    assertThat(tree.children.length, equalTo('1'));
    assertThat(tree.children[0].children.length, equalTo('1'));
    assertThat(tree.children[0].children[0].children.length, equalTo('2'));
    assertThat(tree.children[0].children[0].children[0].name, equalTo('stat'));
    assertThat(tree.children[0].children[0].children[1].name, equalTo('stat'));
    assertThat(tree.children[0].children[0].children[1].attributes.name, equalTo('Rebounds'));
  },
 
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
