TestCase("Croaker.AndFilter.Tests", {
  
   testEmptyFilterGivesTrue: function() {
     var andFilter = new croaker.AndFilter([]);
     
     assertThat(andFilter.filter(), true);
   },
   
   testSingleTrueFilterGivesTrue: function() {
     var afilter = this.filters[0],
       andFilter = new croaker.AndFilter([afilter]);
     
     when(afilter).filter(anything()).thenReturn(true);
     assertThat(andFilter.filter(''), true);
   },
   
   testSingleFalseFilterGivesFalse: function() {
     var afilter = this.filters[0],
       andFilter = new croaker.AndFilter([afilter]);
     
     when(afilter).filter('').thenReturn(true);
     assertThat(andFilter.filter('false'), not(true));
   },
   
   testMultipleTrueFiltersGiveTrue: function() {
     var filters = this.filters, andFilter = new croaker.AndFilter(filters);
     
     when(filters[1]).filter('').thenReturn(true);
     when(filters[2]).filter(anything()).thenReturn(true);
     when(filters[0]).filter('').thenReturn(true);
     
     assertThat(andFilter.filter(''), true);
   },
   
   testOneFalseFilterInAnArrayGivesFalse: function() {
     var filters = this.filters,
     andFilter = new croaker.AndFilter(filters);
     
     when(filters[0]).filter('').thenReturn(true);
     when(filters[1]).filter('').thenReturn(false);
     
     assertThat(andFilter.filter(''), false);
     
     verify(filters[2], never()).filter(anything());
   },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
    
    this.filters = [
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter),
       mock(croaker.StrainFilter)     
     ];
  }
});