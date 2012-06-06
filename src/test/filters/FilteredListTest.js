TestCase("Croaker.FilteredList.Tests", {
  
  testFilteredListSingleNS: function() {
    var module = mock(croaker.Module), strainFilter = mock(croaker.StrainFilter),
      filteredList = new croaker.FilteredList(module);
    
    //when(module).namespaces.thenReturn([mock(croaker.Namespace)]);
    assertThat(filteredList.getFilters(), []);
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});