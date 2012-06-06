TestCase("Croaker.FilteredList.Tests", {
  
  testFilteredListDefaults: function() {
    var module = mock(croaker.Module), 
      filteredList = new croaker.FilteredList(module);
    
    assertThat(filteredList.getFilters(), []);
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});