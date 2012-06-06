TestCase("Croaker.FilteredList.Tests", {
  
  testFilteredListDefaults: function() {
  
  console.log('hai');
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
    JsMockito.Integration.JsTestDriver();
  }
});