TestCase("Croaker.Filter.Tests", {
  testGetTypes: function() {
    filter = new croaker.Filter();
    
    assertThat(filter.getTypes(), 'true');
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
