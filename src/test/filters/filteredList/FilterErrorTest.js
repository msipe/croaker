TestCase("Croaker.FilterError.Tests", {
  
  testOverlappingFilters: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      strainFilters = [new croaker.StrainFilter('MB')],
      nameFilters = [new croaker.NameFilter('weard.core')];
      nameOrFilter = new croaker.OrFilter(nameFilters),
      orFilter = new croaker.OrFilter(strainFilters),
      filters = [nameOrFilter, orFilter];
      
    assertThat(filteredList.applyFilters(filters).length, 2);
    
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
        
    this.entryMultipleNS = new croaker.NodeEntry('CodeMetricsReport', {}, [
      new croaker.NodeEntry('Targets', {}, [
        new croaker.NodeEntry('Target', {}, [
          new croaker.NodeEntry('Modules', {}, [
            new croaker.NodeEntry('Module', {Name:'Some.dll', AssemblyVersion:'1.0.2.3'}, [
              new croaker.NodeEntry('Metrics', {}, [
                  ]),
                  new croaker.NodeEntry('NameSpaces', {}, [
                    new croaker.NodeEntry('Namespace', {Name:'Sample.Core'}, [
                      new croaker.NodeEntry('Metrics', {}, [
                      ]),
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'SampleType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                          ]),
                          new croaker.NodeEntry('Members', {}, [])
                        ]),
                        new croaker.NodeEntry('Type', {Name: 'SecondType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                          ]),
                          new croaker.NodeEntry('Members', {}, [])
                        ])
                      ])
                    ]),
                    new croaker.NodeEntry('Namespace', {Name:'Other.Core'}, [
                      new croaker.NodeEntry('Metrics', {}, [
                      ]),
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'OtherType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                              ])
                            ]),
                            new croaker.NodeEntry('Member', {Name: 'weard.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    new croaker.NodeEntry('Namespace', {Name:'Third.Core'}, [
                      new croaker.NodeEntry('Metrics', {}, [
                      ]),
                      new croaker.NodeEntry('Types', {}, [
                        new croaker.NodeEntry('Type', {Name: 'SomeType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                              ])
                            ]),
                            new croaker.NodeEntry('Member', {Name: 'weard.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
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
