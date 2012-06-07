TestCase("Croaker.FilteredList.Tests", {
  testNoElements: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn([]);
    
      list = new croaker.FilteredList(module);
      
      list.applyFilters(filters);

      assertThat(list.getAccepted(), []);
  },
  
  testSingleElement: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn(['one']);
    
      list = new croaker.FilteredList(module);
      
      list.applyFilters(filters);

      assertThat(list.getAccepted(), ['one']);
  },
  
  testMultipleElements: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      list.applyFilters(filters);
      
      assertThat(list.getAccepted(), [1, 2, 3]);
  },

   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
    
   }
});