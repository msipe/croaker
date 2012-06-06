TestCase("Croaker.OrFilter.Tests", {
  testEmptyOrFilterReturnsEmpty: function() {
    var orFilter = new croaker.OrFilter([]);
    
    assertThat(orFilter.filter(''), true);
  
  },
  
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});