TestCase("Croaker.Filter.Tests", {
  testGetTypes: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filter = new croaker.FilteredList(module);
    
    assertThat(module.namespaces[0].types[0].name, 'SampleType.Core');
    assertThat(filter.getTypes()[0][0].name, 'SampleType.Core');
    assertThat(filter.getTypes()[0][0].metrics[0].name, 'Mantain');
    assertThat(filter.getTypes()[0][0].metrics[2].value, 7);
  },
  
  testGetTypesWithMultipleTypes: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleTypes),
      filter = new croaker.FilteredList(module);
    
    assertThat(filter.getTypes()[0][0].name, 'SampleType.Core');
    assertThat(filter.getTypes()[0][1].name, 'OtherType.Core');
    
    assertThat(filter.getTypes()[0][0].metrics[0].name, 'Mantain');
    assertThat(filter.getTypes()[0][0].metrics[2].value, 7);
    
    assertThat(filter.getTypes()[0][1].metrics[0].name, 'TwilightFightNight');
    assertThat(filter.getTypes()[0][1].metrics[2].value, 13);
  },
  
  testGetTypesFromMultipleNSRoots: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filter = new croaker.FilteredList(module);
    
    assertThat(filter.getTypes()[0][0].name, 'SampleType.Core');
    assertThat(filter.getTypes()[1][0].name, 'OtherType.Core');
    assertThat(filter.getTypes()[0][1].name, 'SecondType.Core');

    
    assertThat(filter.getTypes()[0][1].metrics[0].name, 'Mantain');
    assertThat(filter.getTypes()[1][0].metrics[1].value, 42);
  },
  
  testNSFilter: function () {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filter = new croaker.FilteredList(module);
    
    assertThat(filter.getNamespaces()[0].name, 'Sample.Core');
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
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'4,3'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'9,8'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'7,9,3'}, [])
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
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'4,3'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'9,8'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'7,9,3'}, [])
                              ])
                            ])
                          ])
                        ]),
                        new croaker.NodeEntry('Type', {Name: 'OtherType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'TwilightFightNight', Value:'13'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'42'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'13'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                                new croaker.NodeEntry('Metric', {Name:'metricly', Value:'4,3'}, []),
                                new croaker.NodeEntry('Metric', {Name:'FoulPlay', Value:'9,8'}, []),
                                new croaker.NodeEntry('Metric', {Name:'Rajo-Rajey', Value:'7,9,3'}, [])
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
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'SampleType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                            new croaker.NodeEntry('Metric', {Name:'Mantain', Value:'11'}, []),
                            new croaker.NodeEntry('Metric', {Name:'CyclomaticComplexifail', Value:'498'}, []),
                            new croaker.NodeEntry('Metric', {Name:'BadabaBadabioom', Value:'7'}, [])
                          ]),
                          new croaker.NodeEntry('Members', {}, [])
                        ]),
                        new croaker.NodeEntry('Type', {Name: 'SecondType.Core'}, [
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
                        new croaker.NodeEntry('Type', {Name: 'OtherType.Core'}, [
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
