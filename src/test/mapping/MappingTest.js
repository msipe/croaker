TestCase("Croaker.Mapping.Tests", {
  testBasicModuleMapping: function() {
    var mapper = new croaker.Mapper();
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});