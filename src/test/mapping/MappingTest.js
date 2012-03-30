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
    assertThat(module.namespaces, empty());
    assertThat(module.metrics[0].name, 'MaintainabilityIndex' );
  },
  
  testMultiMetricModuleMapping: function() {
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
      
    module = mapper.map(entry);
    
    assertThat(module.metrics[0].name, 'MaintainabilityIndex' );
    assertThat(module.metrics[1].name, 'CyclomaticComplexifail' );
    assertThat(module.metrics[2].name, 'BadabaBadabioom' );
    
    assertThat(module.metrics[0].value, sameAs(1) );
    assertThat(module.metrics[1].value, sameAs(4) );
    assertThat(module.metrics[2].value, sameAs(5) );
  }, 
  
  testNameSpaceModuleMapping: function() {
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
                ]),
                new croaker.NodeEntry('NameSpaces', {}, [
                  new croaker.NodeEntry('Namespace', {Name:'Sample.Core'}, [
                    new croaker.NodeEntry('Metrics', {}, [
                      new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'10'}, []),
                      new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'40'}, []),
                      new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'50'}, [])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      module;
      
    module = mapper.map(entry);
    
    assertThat(module.namespaces[0].name, 'Sample.Core' );
    assertThat(module.namespaces[0].metrics[0].name, 'MaintainabilityIndex' );
    assertThat(module.namespaces[0].metrics[0].value, 10 );
    
  },
  
  testTypeMapping: function() {
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
                ]),
                new croaker.NodeEntry('NameSpaces', {}, [
                  new croaker.NodeEntry('Namespace', {Name:'Sample.Core'}, [
                    new croaker.NodeEntry('Metrics', {}, [
                      new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'10'}, []),
                      new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'40'}, []),
                      new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'50'}, [])
                    ]),
                    new croaker.NodeEntry('Types', {}, [
                      new croaker.NodeEntry('Type', {Name: 'Sample.Core'}, [
                        new croaker.NodeEntry('Metrics', {}, [
                          new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'11'}, []),
                          new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                          new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ])
      ]),
      module;
      
    module = mapper.map(entry);
    
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});