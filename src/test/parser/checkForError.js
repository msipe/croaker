TestCase("Croaker.CheckError.Tests", {

  testTestForParseErrors: function() {
    var parser = new croaker.Parser(),
      tree = parser.parse('<?xml version="1.0" encoding="utf-8"?><CodeMetricsReport Version="10.0"><Targets><Target Name="C:\some\path\Sample.Assembly.dll"><Modules><Module Name="Some.dll" AssemblyVersion="1.0.2.3"><Metrics>Metric Name="MaintainabilityIndex" Value="1" /><Metric Name="CyclomaticComplexity" Value="2" /><Metric Name="ClassCoupling" Value="11" /><Metric Name="DepthOfInheritance" Value="2" /><Metric Name="LinesOfCode" Value="6" /></Metrics><Namespaces><Namespace Name="Sample.Core"><Metrics><Metric Name="MaintainabilityIndex" Value="3" /><Metric Name="CyclomaticComplexity" Value="4" /><Metric Name="ClassCoupling" Value="11" /><Metric Name="DepthOfInheritance" Value="2" /> <Metric Name="LinesOfCode" Value="6" /></Metrics><Types><Type Name="SampleClass"><Metrics><Metric Name="MaintainabilityIndex" Value="52" /><Metric Name="CyclomaticComplexity" Value="6" /><Metric Name="ClassCoupling" Value="113" /><Metric Name="DepthOfInheritance" Value="2" /><Metric Name="LinesOfCode" Value="6" /></Metrics><Members /></Type></Types></Namespace></Namespaces></Module></Modules></Target></Targets></CodeMetricsReport>');  


    assertThat(tree.name, equalTo('CodeMetricsReport'));
    
    assertThat( tree.children[0].children[0].children[0].children[0].children[1].children[0].children[1].children[0].children[1].name, 'Members');
    assertThat( tree.children[0].children[0].children[0].children[0].children[1].children[0].children[1].children[0].children[1].children, empty());
    assertThat( tree.children[0].children[0].children[0].children[0].children[1].children[0].children[1].children[0].children[1].children.length, 0);
    
  },
 
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});
