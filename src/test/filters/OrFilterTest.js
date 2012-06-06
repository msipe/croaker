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
  
  testMultipleOrFilterElementsReturnTrue: function() {
    var filters = [
      mock(croaker.StrainFilter),
      mock(croaker.StrainFilter),
      mock(croaker.StrainFilter)
      ],
      orFilter = new croaker.OrFilter(filters);
      
    when(filters[0]).filter('').thenReturn(true);
    when(filters[1]).filter('').thenReturn(true);
    when(filters[2]).filter('').thenReturn(true);
    
    assertThat(orFilter.filter(''), true);
  },
  
  testMultipleOrFilterElementsReturnTrueRegardlessOfFalseElement: function() {
    var filters = [
      mock(croaker.StrainFilter),
      mock(croaker.StrainFilter),
      mock(croaker.StrainFilter)
      ],
      orFilter = new croaker.OrFilter(filters);
      
    when(filters[0]).filter('').thenReturn(true);
    when(filters[1]).filter('').thenReturn(false);
    when(filters[2]).filter('').thenReturn(true);
    
    assertThat(orFilter.filter(''), true);
  },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});