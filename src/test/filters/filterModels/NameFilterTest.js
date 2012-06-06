TestCase("Croaker.NameFilter.Tests", {
   testFilter: function() {
    var filter = new croaker.NameFilter('^Thisis.Core');
    
    assertThat(filter.filter({name: 'a'}), false);
    assertThat(filter.filter({name: 'Thisis.Core'}), true);
    assertThat(filter.filter({name: 'abcThisis.Core'}), false);
    assertThat(filter.filter({name: 'ThiSis.Core'}), true);
  },

   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});