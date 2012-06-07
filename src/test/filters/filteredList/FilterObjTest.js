TestCase("Croaker.FilterObj.Tests", {
  
  testNSFilter: function() {
    var nsFilter = new croaker.StrainFilter('NS'), ns = new croaker.Namespace('joe');
    
    assertThat(nsFilter.filter(ns), true);
  },
  
  testNameMatchingFilter: function() {
    var nameFilter = new croaker.NameFilter('joe'), ns = new croaker.Namespace('joe'), ns2 = new croaker.Namespace('fred') ;
    
    assertThat(nameFilter.filter(ns),  true);
    assertThat(nameFilter.filter(ns2),  false); 
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
        
  }
});
