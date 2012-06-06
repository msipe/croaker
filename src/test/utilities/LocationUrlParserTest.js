TestCase("Croaker.LocationUrlParser.Tests", {
  testParseSingleArg: function() {
    this.mywindow.location.search = '?path=some/url/data.xml';
    assertThat(this.parser.parse(), equalTo('some/url/data.xml'));   
  },
  
  testParseEmptyPathThrows: function() {
    assertThat(this.parser.parse, raises('FatalException'));
  },
  
  testNullSearchThrows: function() {
    this.mywindow.location.search = null;
    assertThat(this.parser.parse, raises('FatalException'));
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
    
    this.mywindow = {
      location: {
        search: ''
      }
    };
    
    this.env = {window: this.mywindow};
    this.croaker = new Croaker(this.env);
    this.parser = new this.croaker.LocationUrlParser();
  }
});