TestCase("Croaker.NameFilter.Tests", {
  
   testDefualts: function() {
    var filter = new croaker.NameFilter('^Thisis.Core');
    
    assertThat(filter.filter({name: 'a'}), false);
    assertThat(filter.filter({name: 'Thisis.Core'}), true);
    assertThat(filter.filter({name: 'abcThisis.Core'}), false);
  },

   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});