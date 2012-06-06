TestCase("Croaker.AndFilter.Tests", {
  
   testEmptyFilterGivesTrue: function() {
     var andFilter = new croaker.AndFilter([]);
     
     assertThat(andFilter.filter(), true);
   },
   
   testSingleTrueFilterGivesTrue: function() {
     var afilter = mock(croaker.StrainFilter),
       andFilter = new croaker.AndFilter([afilter]);
     
     when(afilter).filter(anything()).thenReturn(true);
     assertThat(andFilter.filter(''), true);
   },
   
   testSingleFalseFilterGivesFalse: function() {
     var afilter = mock(croaker.StrainFilter),
       andFilter = new croaker.AndFilter([afilter]);
     
     when(afilter).filter('').thenReturn(true);
     assertThat(andFilter.filter('false'), not(true));
   },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});