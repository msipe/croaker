TestCase("Croaker.FilterError.Tests", {
  
  testOverlappingFilters: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      memberFilter = new croaker.MemberFilter(),
      typeFilter = new croaker.TypeFilter(),
      nsFilter = new croaker.NSFilter(),
      nameSearch = new croaker.NameFilter('weard.Core');
  
    filteredList.addFilter(nameSearch);
    filteredList.addFilter(memberFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted().length, 4);
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
