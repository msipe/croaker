TestCase("Croaker.module.Tests", {
  testMember: function() {
    var metrics = [],  types = [], namespace = [], module = new croaker.Module('Joe','3.4.05',metrics,namespace, metrics);
    
    assertThat(module.name, 'Joe');
    assertThat(module.version, '3.4.05');
    assertThat(module.namespaces, sameAs(namespace));
    assertThat(module.metrics, sameAs(metrics));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});