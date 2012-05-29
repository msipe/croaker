TestCase("Croaker.Type.Tests", {
  testDefaults: function() {
    var type = new croaker.Type('Joe',[], []);
    
    assertThat(type.name, 'Joe');
    assertThat(type.metrics, empty());
    assertThat(type.members, empty());
  },
  
  testGetFullMetrics: function() {
    var type = new croaker.Type('Joe', [], [])
      actual = type.getFullMetrics();
    
    assertThat(actual.length, 5);
    
    assertThat(actual[0].name, 'MaintainabilityIndex');
    assertThat(actual[0].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[0].getFormattedValue(), '-');
    
    assertThat(actual[1].name, 'CyclomaticComplexity');
    assertThat(actual[1].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[1].getFormattedValue(), '-');
    
    assertThat(actual[2].name, 'ClassCoupling');
    assertThat(actual[2].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[2].getFormattedValue(), '-');
    
    assertThat(actual[3].name, 'DepthOfInheritance');
    assertThat(actual[3].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[3].getFormattedValue(), '-');
    
    assertThat(actual[4].name, 'LinesOfCode');
    assertThat(actual[4].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[4].getFormattedValue(), '-');
  },
  
   testGetSomeMetrics: function() {
    var type = new croaker.Type('Joe', [], [new croaker.Metric('MaintainabilityIndex', 32), new croaker.Metric('ClassCoupling', 3)])
      actual = type.getFullMetrics();
    
    assertThat(actual.length, 5);
    
    assertThat(actual[0].name, 'MaintainabilityIndex');
    assertThat(actual[0].value, 32);
    
    assertThat(actual[1].name, 'CyclomaticComplexity');
    assertThat(actual[1].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[1].getFormattedValue(), '-');
    
    assertThat(actual[2].name, 'ClassCoupling');
    assertThat(actual[2].value, 3);
    
    assertThat(actual[3].name, 'DepthOfInheritance');
    assertThat(actual[3].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[3].getFormattedValue(), '-');
    
    assertThat(actual[4].name, 'LinesOfCode');
    assertThat(actual[4].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[4].getFormattedValue(), '-');
  },
  
  testGetSingleMetric: function() {
    var type = new croaker.Type('Joe', [], [new croaker.Metric('MaintainabilityIndex', 32), new croaker.Metric('CyclomaticComplexity', 2), new croaker.Metric('ClassCoupling', 3), new croaker.Metric('LinesOfCode', 5)])
      actual = type.getFullMetrics();
    
    assertThat(actual.length, 5);
    
    assertThat(actual[0].name, 'MaintainabilityIndex');
    assertThat(actual[0].value, 32);
    
    assertThat(actual[1].name, 'CyclomaticComplexity');
    assertThat(actual[1].value, 2);

    
    assertThat(actual[2].name, 'ClassCoupling');
    assertThat(actual[2].value, 3);
    
    assertThat(actual[3].name, 'DepthOfInheritance');
    assertThat(actual[3].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[3].getFormattedValue(), '-');
    
    assertThat(actual[4].name, 'LinesOfCode');
    assertThat(actual[4].value, 5);
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});