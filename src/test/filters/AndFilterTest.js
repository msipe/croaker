TestCase("Croaker.AndFilter.Tests", {
  
   testEmptyFilterGivesTrue: function() {
     var andFilter = new croaker.AndFilter([]);
     
     assertThat(andFilter.filter(), true);
   },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});