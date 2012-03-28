TestCase("Croaker.NameSpace.Tests", {
  testMember: function() {
    var metrics = [],  types = [], namespace = new croaker.Namespace('Joe',types, metrics);
    
    assertThat(namespace.name, 'Joe');
    assertThat(namespace.types, sameAs(types));
    assertThat(namespace.metrics, sameAs(metrics));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});