TestCase("Croaker.Member.Tests", {
  testMember: function() {
    var metrics = [], member = new croaker.Member('joe','iceCream.js',3, metrics);
    
    assertThat(member.name, 'joe');
    assertThat(member.file, 'iceCream.js');
    assertThat(member.line, 3);
    assertThat(member.metrics, sameAs(metrics));
  },
  
  testGetFullMetrics: function() {
    var member = new croaker.Member('Joe', 'icecream.js', 3, [])
      actual = member.getFullMetrics();
    
    assertThat(actual.length, 5);
    
    assertThat(actual[0].name, 'MaintainabilityIndex');
    assertThat(actual[0].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[0].getFormattedValue(), '');
    
    assertThat(actual[1].name, 'CyclomaticComplexity');
    assertThat(actual[1].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[1].getFormattedValue(), '');
    
    assertThat(actual[2].name, 'ClassCoupling');
    assertThat(actual[2].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[2].getFormattedValue(), '');
    
    assertThat(actual[3].name, 'DepthOfInheritance');
    assertThat(actual[3].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[3].getFormattedValue(), '');
    
    assertThat(actual[4].name, 'LinesOfCode');
    assertThat(actual[4].value, croaker.MISSING_METRIC_VALUE);
    assertThat(actual[4].getFormattedValue(), '');
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});