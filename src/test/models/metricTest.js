TestCase("Croaker.Metric.Tests", {
  testMetrics: function() {
    var metric = new croaker.Metric('joe',3);
    
    assertThat(metric.value, 3);
    assertThat(metric.name, 'joe');

  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
