TestCase("Croaker.DataLoader.Tests", {
  testExecute: function() {
    var called = false,
      jq = mockFunction(jQuery),
      env = {jQuery: jq},
      croaker = new Croaker(env),
      loader = new croaker.DataLoader('a url', function(data) {
        assertThat(data, 'some data');
        called = true;
      });
      
      jq.get = mockFunction(jQuery.get);   
      when(jq.get)('a url', func(), 'text').then(function(url, callback, type) {callback('some data');});
      loader.execute();
      assertThat(called, true);
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});