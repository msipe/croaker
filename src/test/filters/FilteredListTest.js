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
  
  testNoFilters: function() {
    var module = mock(croaker.Module), 
      filters = [], list;
      
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      list.applyFilters(filters);
      
      assertThat(list.getAccepted(), [1, 2, 3]);
  },
  
  testSingleFilter: function() {
    var module = mock(croaker.Module), 
      filters = [mock(croaker.StrainFilter)], list;
      
      when(filters[0]).filter(1).thenReturn(true);
      when(module).flatten().thenReturn([1, 2, 3]);
    
      list = new croaker.FilteredList(module);
      
      list.applyFilters(filters);
      
      assertThat(list.getAccepted(), [1]);
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
      
      list.applyFilters(filters);
      
      assertThat(list.getAccepted(), [4]);
  },

   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
    
   }
});