TestCase("Croaker.Metric.Tests", {
  testMetrics: function() {
    var metric = new croaker.Metric('joe',3);
    
    assertThat(metric.value, 3);
    assertThat(metric.name, 'joe');
  },
  
  testgetFormattedValue: function() {
    var metric = new croaker.Metric('joe',3);
    
    assertThat(metric.getFormattedValue(), '3');
    assertThat(metric.value, 3);
  },
  
  testgetFormattedValueWithInvalidValue: function() {
    var metric = new croaker.Metric('joe', -99999);
    
    assertThat(metric.getFormattedValue(), '');
    assertThat(metric.value, -99999);
  },  
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
