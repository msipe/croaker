TestCase("Croaker.ParserErrors.Tests", {
  
  testXMlErrors: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><players></players>');
       

  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});