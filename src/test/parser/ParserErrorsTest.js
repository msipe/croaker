TestCase("Croaker.ParserErrors.Tests", {
  testInvalidXMLThrowsException: function() {
    var parser = new croaker.Parser();
     
    try {
      parser.parse('invalid xml');
      fail('should have failed');
    } catch (e) {
      assertThat(e.message, equalTo('unable to parse xml'));
    }
  },
 
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});