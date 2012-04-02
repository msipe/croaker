TestCase("Croaker.NodeEntry.Tests", {      
      
  testBasicFunctionality: function() {
    var entry = new croaker.NodeEntry('bob', {power:'3'}, []);
      
    assertThat(entry.name, 'bob'); 
    assertThat(entry.attributes.power, '3');
    assertThat(entry.children, empty());
  },
  
 
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});