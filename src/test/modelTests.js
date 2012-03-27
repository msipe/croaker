TestCase("Croaker.Model.Tests", {
  testMetrics: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><Metric Name="MaintainabilityIndex" Value="1" />'),
      model = new Modeler(tree);
    

    assertThat(model.getMetric()[0], equalTo('MaintainablityIndex'));
    assertThat(tree.children, empty());
  },
  
  testComplexParses: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0"?><bballteams><team name="Thunder"><player name="Durant"><stat name="Average Points" value="10"/><stat name="Rebounds" value="25"/></player></team></bballteams>');
      
  },
 
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});