TestCase("Croaker.MappingAdvancedParses.Tests", {      
  
  testParseWithoutMembers: function() {
    var mapper = new croaker.Mapper(),
      module = mapper.map(this.entryNoMembers);

    assertThat(module.namespaces[0].types[0].members[0], empty());
  },
  
  testParseWithMultipleNamespaces: function() {
    var mapper = new croaker.Mapper(),
      module = mapper.map(this.entryMultipleNS);

    assertThat(module.namespaces[0].name, 'Sample.Core' );
    assertThat(module.namespaces[1].name, 'Other.Core' );
    assertThat(module.namespaces[1].metrics[0].value, 11 );
  },  
  
  testParseWithMultipleTypes: function() {
    var mapper = new croaker.Mapper(),
      module = mapper.map(this.entryMultipleTypes);

    assertThat(module.namespaces[0].types[0].name, 'SampleType.Core' );
    assertThat(module.namespaces[0].types[0].metrics[1].value, 498 );
    assertThat(module.namespaces[0].types[1].metrics[2].value, 7 );
  },
  
  testParseWithMultipleMembers: function() {
    var mapper = new croaker.Mapper(),
      module = mapper.map(this.entryMultipleTypes);

    assertThat(module.namespaces[1].types[0].members[1].name, 'weard.Core' );
    assertThat(module.namespaces[1].types[0].members[0].metrics[1].value, 98 );
    assertThat(module.namespaces[1].types[0].members[1].metrics[2].value, 193 );
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    
    this.entryNoMembers = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                          new croaker.NodeEntry('Members', {}, [
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]);
        
    this.entryMultipleNS = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                      new croaker.NodeEntry('Types', {}, [])
                    ]),
                    new croaker.NodeEntry('Namespace', {Name:'Other.Core'}, [
                      new croaker.NodeEntry('Metrics', {}, [
                        new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'11'}, []),
                        new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'43'}, []),
                        new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'4'}, [])
                      ]),
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'SampleType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'Mantain', Value:'11'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'43'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'98'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'793'}, [])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ])
            ])
          ])
        ]);
        
        
    this.entryMultipleTypes = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'498'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [])
                        ]),
                        new croaker.NodeEntry('Type', {Name: 'OtherType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'Mantain', Value:'11'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value: '2'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [])
                        ])
                      ])
                    ]),
                    new croaker.NodeEntry('Namespace', {Name:'Other.Core'}, [
                      new croaker.NodeEntry('Metrics', {}, [
                        new croaker.NodeEntry('Metric', {Name:'MaintainabilityIndex', Value:'11'}, []),
                        new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'43'}, []),
                        new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'4'}, [])
                      ]),
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'SampleType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'Mantain', Value:'11'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'43'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'98'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'793'}, [])
                              ])
                            ]),
                            new croaker.NodeEntry('Member', {Name: 'weard.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'3'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'328'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'193'}, [])
                              ])
                            ])
                          ])
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
