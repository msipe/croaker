TestCase("Croaker.XmlLoader.Tests", {
  testExecute: function() {
    var called = false,
      jq = mockFunction(jQuery),
      env = {jQuery: jq},
      croaker = new Croaker(env),
      loader = new croaker.XmlLoader('a url', function(data) {
        assertThat(data, 'some data');
        called = true;
      });
      
      jq.get = mockFunction(jQuery.get);   
      when(jq.get)('a url', func()).then(function(url, callback) {callback('some data');});
      loader.execute();
      assertThat(called, true);
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});