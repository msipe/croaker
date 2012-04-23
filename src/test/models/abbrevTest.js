TestCase("Croaker.NameAbbreviation.Tests", {
  testAbbrev: function() {
    var a = new croaker.MetricDefinition('a', 'ay') ;
    
    assertThat(a.abbreviation, 'a');
    assertThat(croaker.LinesOfCode.abbreviation, 'LC');
    assertThat(croaker.CyclomaticComplexity.abbreviation, 'CyC');
    assertThat(croaker.ClassCoupling.abbreviation, 'CC');
    assertThat(croaker.DepthOfInheritance.abbreviation, 'DI');
  },
  

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});