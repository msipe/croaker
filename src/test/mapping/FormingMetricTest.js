TestCase("Croaker.FormMetric.Tests", {
  
  testAdditionalModuleMapping: function() {
    
    var mapper = new croaker.Mapper(),
      entry = new croaker.NodeEntry('CodeMetricsReport', {}, [
        new croaker.NodeEntry('Targets', {}, [
          new croaker.NodeEntry('Target', {}, [
            new croaker.NodeEntry('Modules', {}, [
              new croaker.NodeEntry('Module', {Name:'Some.dll', AssemblyVersion:'1.0.2.3'}, [
                new croaker.NodeEntry('Metrics', {}, [
                  new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'1'}, []),
                  new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'4'}, []),
                  new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'5'}, [])
                ])
              ])
            ])
          ])
        ])
      ]),
      module;
      
      module = mapper.map(entry)
      
    assertThat(module.name, 'Some.dll');
    assertThat(module.version, '1.0.2.3');
    assertThat(module.namespaces, empty());
    assertThat(module.metrics[0].name, 'MaintainabilityIndex' );
    assertThat(module.metrics[1].name, 'CyclomaticComplexifail' );
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});