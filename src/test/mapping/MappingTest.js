TestCase("Croaker.Mapping.Tests", {
  testBasicModuleMapping: function() {
    var mapper = new croaker.Mapper(),
      entry = new croaker.NodeEntry('CodeMetricsReport', {}, [
        new croaker.NodeEntry('Targets', {}, [
          new croaker.NodeEntry('Target', {}, [
            new croaker.NodeEntry('Modules', {}, [
              new croaker.NodeEntry('Module', {Name:'Some.dll', AssemblyVersion:'1.0.2.3'}, [
              ])
            ])
          ])
        ])
      ]),
      module;
      
    module = mapper.map(entry);
    
    assertThat(module.name, 'Some.dll');
    assertThat(module.version, '1.0.2.3');
    assertThat(module.metrics, empty());
    assertThat(module.namespace, empty());
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});