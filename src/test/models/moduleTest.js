TestCase("Croaker.module.Tests", {
  testMember: function() {
    var metrics = [],  types = [], nameSpaces = [], module = new croaker.Module('Joe','3.4.05',metrics,nameSpaces, metrics);
    
    assertThat(module.name, 'Joe');
    assertThat(module.version, '3.4.05');
    assertThat(module.nameSpaces, sameAs(nameSpaces));
    assertThat(module.metrics, sameAs(metrics));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});