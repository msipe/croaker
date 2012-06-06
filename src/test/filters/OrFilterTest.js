TestCase("Croaker.OrFilter.Tests", {
  testEmptyOrFilterReturnsEmpty: function() {
    var orFilter = new croaker.OrFilter([]);
    
    assertThat(orFilter.filter(''), true);
  },
  
  testSingleOrFilterElementReturnsTrue: function() {
    var filter = mock(croaker.StrainFilter),
      orFilter = new croaker.OrFilter([filter]);
      
      when(filter).filter('').thenReturn(true);
      assertThat(orFilter.filter(''), true);
  },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});