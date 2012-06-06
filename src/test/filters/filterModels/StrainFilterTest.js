TestCase("Croaker.StrainFilter.Tests", {
  
   testDefualtTrue: function() {
     var strainFilter = new croaker.StrainFilter('hai');
     
     assertThat(strainFilter.filter({strain:'hai'}), true);
   }, 
   
   testDefualtFalse: function() {
     var strainFilter = new croaker.StrainFilter('hai');
     
     assertThat(strainFilter.filter({strain:'bobo'}), false);
   },
  
   setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});