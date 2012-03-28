TestCase("Croaker.Mapping.Tests", {
  
  testAdditionalModuleMapping: function() {
    var mapper = new croaker.Mapper(),
      entry = new croaker.NodeEntry('CodeMetricsReport', {}, [
        new croaker.NodeEntry('Targets', {}, [
          new croaker.NodeEntry('Target', {}, [
            new croaker.NodeEntry('Modules', {}, [
              new croaker.NodeEntry('Module', {Name:'Some.dll', AssemblyVersion:'1.0.2.3'}, [
                new croaker.NodeEntry('Metrics', {}, [
                  new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'1'}, [
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      module;
      
    module = mapper.map(entry);
    
    assertThat(module.name, 'Some.dll');
    assertThat(module.version, '1.0.2.3');
    assertThat(module.namespace, empty());
    assertThat(module.metrics[0].name, 'MaintainabilityIndex' );
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});