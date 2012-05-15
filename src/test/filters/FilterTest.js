TestCase("Croaker.Filter.Tests", {
  
   testNSStrainFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      namespaceFilter = new croaker.StrainFilter('NS');
      
      filteredList.addFilter(namespaceFilter);
      
      filteredList.applyFilters();
      
      assertThat(filteredList.getAccepted()[0].name, 'Sample.Core');
      
      filteredList.clearFilters();
      
      assertThat(filteredList.getFilters(), []);
  }, 
  
  testFilterMultipleNS: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      namespaceFilter = new croaker.StrainFilter('NS')
      
      filteredList.addFilter(namespaceFilter);
      
      filteredList.applyFilters();
      
      assertThat(filteredList.getAccepted()[0].name, 'Sample.Core');
      assertThat(filteredList.getAccepted()[1].name, 'Other.Core');      
      assertThat(filteredList.getAccepted()[2].name, 'Third.Core'); 
  }, 
  
  testTypeFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      typeFilter = new croaker.StrainFilter('TY')
    
    filteredList.addFilter(typeFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'SampleType.Core');
  },
  
  testMultiTypeFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      typeFilter =new croaker.StrainFilter('TY')
    
    filteredList.addFilter(typeFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'SampleType.Core');
    assertThat(filteredList.getAccepted()[1].name, 'SecondType.Core');
    assertThat(filteredList.getAccepted()[2].name, 'OtherType.Core');
    assertThat(filteredList.getAccepted()[3].name, 'SomeType.Core');
  },
  
  testMemberFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      memberFilter = new croaker.StrainFilter('MB');
    
    filteredList.addFilter(memberFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
  },
  
  testMultiMemberFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleTypes),
      filteredList = new croaker.FilteredList(module),
      memberFilter = new croaker.StrainFilter('MB');
    
    filteredList.addFilter(memberFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[1].name, 'Tested.Core');
  },
  
  testIntegrateStrainFilters: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      memberFilter = new croaker.StrainFilter('MB'),
      typeFilter = new croaker.StrainFilter('TY'),
      nsFilter = new croaker.StrainFilter('NS');
    
    filteredList.addFilter(memberFilter);
    filteredList.addFilter(typeFilter);
    filteredList.addFilter(nsFilter);
    
    filteredList.applyFilters();
    
     assertThat(filteredList.getAccepted().length, 11);
     assertThat(filteredList.getAccepted()[10].name, 'weard.Core');
  },
  
  testSimpleNameMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module), nameSearch = new croaker.NameFilter('Thisis.Core');
  
    filteredList.addFilter(nameSearch);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
  },
  
  testComplexNameMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      nameSearch1 = new croaker.NameFilter('weard.Core'),
      nameSearch2 = new croaker.NameFilter('Thisis.Core'),
      nameSearch3 = new croaker.NameFilter('SomeType.Core');
  
    filteredList.addFilter(nameSearch1);
    filteredList.addFilter(nameSearch2);
    filteredList.addFilter(nameSearch3);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted().length, 5);
    
    
    
    assertThat(filteredList.getAccepted()[0].name, 'weard.Core');
    assertThat(filteredList.getAccepted()[1].name, 'weard.Core');
    assertThat(filteredList.getAccepted()[2].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[3].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[4].name, 'SomeType.Core');
  },
  
  testEmptyFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module);
      
      filteredList.applyFilters();
      
      assertThat(filteredList.getAccepted().length, 4);
  },
  
  testNameandElementMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      memberFilter = new croaker.StrainFilter('MB'),
      nameSearch1= new croaker.NameFilter('Core');

  
    filteredList.addFilter(nameSearch1);
    filteredList.addFilter(memberFilter);
    
    filteredList.applyFilters();
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted().length, 1);

  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    
    this.entry = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
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
        
    this.entryMultipleTypes = new croaker.NodeEntry('CodeMetricsReport', {}, [
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
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Thisis.Core', File:'50982.jkalhfksdl', Line:'5'}, [
                              new croaker.NodeEntry('Metrics', {}, [
                              ])
                            ])
                          ])
                        ]),
                        new croaker.NodeEntry('Type', {Name: 'OtherType.Core'}, [
                          new croaker.NodeEntry('Metrics', {}, [
                          ]),
                          new croaker.NodeEntry('Members', {}, [
                            new croaker.NodeEntry('Member', {Name: 'Tested.Core', File:'50982.jkalhfksdl', Line:'5'}, [
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
