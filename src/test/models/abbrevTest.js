TestCase("Croaker.NameAbbreviation.Tests", {
  testAbbrev: function() {
    var a = new croaker.MetricDefinition('a', 'ay') ;
    
    assertThat(a.abbreviation, 'a');
    assertThat(croaker.linesOfCode.abbreviation, 'LC');
    assertThat(croaker.cyclomaticComplexity.abbreviation, 'CyC');
    assertThat(croaker.classCoupling.abbreviation, 'CC');
    assertThat(croaker.depthOfInheritance.abbreviation, 'DI');
  },
  

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});