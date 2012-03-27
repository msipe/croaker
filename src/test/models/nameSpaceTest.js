TestCase("Croaker.NameSpace.Tests", {
  testMember: function() {
    var metrics = [],  types = [], nameSpace = new croaker.NameSpace('Joe',types, metrics);
    
    assertThat(nameSpace.name, 'Joe');
    assertThat(nameSpace.types, sameAs(types));
    assertThat(nameSpace.metrics, sameAs(metrics));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});