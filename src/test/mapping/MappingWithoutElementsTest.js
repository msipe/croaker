TestCase("Croaker.MappingStrangeParse.Tests", {      
  
  testParseWithoutMembers: function() {
    var mapper = new croaker.Mapper(),
      module = mapper.map(this.entry);

    assertThat(module.namespaces[0].types[0].members[0].name, false );
    /* assertThat(module.namespaces[0].types[0].members[0].file, '50982.jkalhfksdl');
    assertThat(module.namespaces[0].types[0].members[0].metrics[0].name, 'metricly');
    assertThat(module.namespaces[0].types[0].members[0].metrics[2].value, 793); */
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    
    this.entry = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                        new croaker.NodeEntry('Type', {Name: 'SampleType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'Mantain', Value:'11'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]);
  }
  
});
