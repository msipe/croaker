TestCase("Croaker.NameAbbreviation.Tests", {
  testAbbrev: function() {
    var metrics = [], member = new croaker.Member('joe','iceCream.js',3, metrics);
    
  },
  

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});