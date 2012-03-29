TestCase("Croaker.LocationUrlParser.Tests", {
  testParse: function() {
    var mywindow = {},
      env = {window: mywindow},
      croaker = new Croaker(env),
      parser = new croaker.LocationUrlParser();
      
    mywindow.location = {search: '?path=some/url/data.xml'};
    assertThat(parser.parse(), equalTo('some/url/data.xml'));   
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});