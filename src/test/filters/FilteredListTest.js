TestCase("Croaker.FilteredList.Tests", {
  testNoElements: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn([]);
    
      list = new croaker.FilteredList(module);

      assertThat(list.applyFilters(filters), []);
  },
  
  testSingleElement: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn(['one']);
    
      list = new croaker.FilteredList(module);

      assertThat(list.applyFilters(filters), ['one']);
  },
  
  testMultipleElements: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], 
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      assertThat(list.applyFilters(filters), [1, 2, 3]);
  },
  
  testNoFilters: function() {
    var module = mock(croaker.Module), 
      filters = [], list;
      
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      assertThat(list.applyFilters(filters), [1, 2, 3]);
  },
  
  testSingleFilter: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], list;
      
      when(filters[0]).filter(1).thenReturn(true);
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      assertThat(list.applyFilters(filters), [1]);
  },
  
  testMultipleFilters: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter), mock(croaker.StrainFilter), mock(croaker.NameFilter)],
      list;
      
      when(filters[0]).filter(anything()).thenReturn(true);
      when(filters[1]).filter(anything()).thenReturn(true);
      when(filters[2]).filter(4).thenReturn(true);
      
      when(module).flatten().thenReturn([1, 2, 3, 4]);
    
      list = new croaker.FilteredList(module);

      assertThat(list.applyFilters(filters), [4]);
  },

   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
    
   }
});