TestCase("Croaker.Model.metric.Tests", {
  testMetrics: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players></players>');

    assertThat(tree.name, equalTo('players'));
    assertThat(tree.children, empty());
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
