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
   
   testMultipleTrueFiltersGiveTrue: function() {
     var filters = [
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter)     
     ],
     andFilter = new croaker.AndFilter(filters);
     
     when(filters[0]).filter('').thenReturn(true);
     when(filters[1]).filter('').thenReturn(true);
     when(filters[2]).filter(anything()).thenReturn(true);
     
     assertThat(andFilter.filter(''), true);
   },
   
   testOneFalseFilterInAnArrayGivesFalse: function() {
     var filters = [
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter)     
     ],
     andFilter = new croaker.AndFilter(filters);
     
     when(filters[0]).filter('').thenReturn(true);
     when(filters[1]).filter('').thenReturn(false);
     when(filters[2]).filter('').thenReturn(true);
     
     assertThat(andFilter.filter(''), false);
   },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});