TestCase("Croaker.Filter.Tests", {
  
   testNSStrainFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      namespaceFilter = [new croaker.StrainFilter('NS')],
      nsFilter = [new croaker.OrFilter(namespaceFilter)];
      
      filteredList.applyFilters(nsFilter);
      
      assertThat(filteredList.getAccepted()[0].name, 'Sample.Core');
      
      filteredList.clearFilters();
      
      assertThat(filteredList.getFilters(), []);
  }, 
  
  testFilterMultipleNS: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      namespaceFilter = [new croaker.StrainFilter('NS')],
      nsFilter = [new croaker.OrFilter(namespaceFilter)];
      
      filteredList.applyFilters(nsFilter);
      
      assertThat(filteredList.getAccepted()[0].name, 'Sample.Core');
      assertThat(filteredList.getAccepted()[1].name, 'Other.Core');      
      assertThat(filteredList.getAccepted()[2].name, 'Third.Core'); 
  }, 
  
  testTypeFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      typeFilter = [new croaker.StrainFilter('TY')],
      typesFilter = [new croaker.OrFilter(typeFilter)];
    
    filteredList.applyFilters(typeFilter);
    
    assertThat(filteredList.getAccepted()[0].name, 'SampleType.Core');
  },
  
  testMultiTypeFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      filteredList = new croaker.FilteredList(module),
      typeFilter = [new croaker.StrainFilter('TY')],
      typesFilter = [new croaker.OrFilter(typeFilter)];
      
    filteredList.applyFilters(typesFilter);
    
    assertThat(filteredList.getAccepted()[0].name, 'SampleType.Core');
    assertThat(filteredList.getAccepted()[1].name, 'SecondType.Core');
    assertThat(filteredList.getAccepted()[2].name, 'OtherType.Core');
    assertThat(filteredList.getAccepted()[3].name, 'SomeType.Core');
  },
  
  testMemberFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      memberFilter = [new croaker.StrainFilter('MB')],
      membersFilter = [new croaker.OrFilter(memberFilter)];
    
    filteredList.applyFilters(membersFilter);
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
  },
  
  testMultiMemberFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleTypes),
      filteredList = new croaker.FilteredList(module),
      memberFilter = [new croaker.StrainFilter('MB')],
      membersFilter = [new croaker.OrFilter(memberFilter)];
    
    filteredList.applyFilters(membersFilter);
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[1].name, 'Tested.Core');
  },
  
  testIntegrateStrainFilters: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      strainFilters = [new croaker.StrainFilter('MB'),new croaker.StrainFilter('TY'), new croaker.StrainFilter('NS')],
      orFilter = [new croaker.OrFilter(strainFilters)];
    
    filteredList.applyFilters(orFilter);
    
    assertThat(filteredList.getAccepted().length, 11);
    assertThat(filteredList.getAccepted()[10].name, 'weard.Core');
  },
  
  testSimpleNameMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module), 
      nameSearch = [new croaker.NameFilter('Thisis.Core')],
      orFilter = [new croaker.OrFilter(nameSearch)];
    
    filteredList.applyFilters(orFilter);
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
  },
  
  testSimpleNameMatchingABC: function() {
    var filter = new croaker.NameFilter('^Thisis.Core');
    
    assertThat(filter.filter({name: 'a'}), false);
    assertThat(filter.filter({name: 'Thisis.Core'}), true);
    assertThat(filter.filter({name: 'abcThisis.Core'}), false);

  },
  
  testComplexNameMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entryMultipleNS),
      filteredList = new croaker.FilteredList(module),
      nameFilters = [new croaker.NameFilter('weard.Core'), new croaker.NameFilter('Thisis.Core'), new croaker.NameFilter('SomeType.Core')],
  
   orFilter = [new croaker.OrFilter(nameFilters)];
    
    filteredList.applyFilters(orFilter);
    
    assertThat(filteredList.getAccepted().length, 5);
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[1].name, 'weard.Core');
    assertThat(filteredList.getAccepted()[2].name, 'SomeType.Core');
    assertThat(filteredList.getAccepted()[3].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted()[4].name, 'weard.Core');
  }, 
  
  testEmptyFilter: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      orFilter = [new croaker.OrFilter([])];
      
      filteredList.applyFilters(orFilter);
      
      assertThat(filteredList.getAccepted().length, 4);
  },
  
  testNameandElementMatching: function() {
    var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      strainFilters = [new croaker.StrainFilter('MB')],
      nameFilters = [ new croaker.OrFilter([new croaker.NameFilter('Core')])],
      orFilters = [new croaker.OrFilter(strainFilters)]
      
    filteredList.applyFilters(orFilters, nameFilters);
    
    assertThat(filteredList.getAccepted()[0].name, 'Thisis.Core');
    assertThat(filteredList.getAccepted().length, 1);
  },
  
   testCaseInsensitiveSearching: function() {
     var mapper = new croaker.Mapper(), module = mapper.map(this.entry),
      filteredList = new croaker.FilteredList(module),
      nameFilters = [new croaker.NameFilter('core'), new croaker.NameFilter('soMe.DLl')],
      orFilter = [new croaker.OrFilter(nameFilters)]
    
    filteredList.applyFilters(orFilter);
    
    assertThat(filteredList.getAccepted().length, 4);
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