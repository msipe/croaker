TestCase("Croaker.ParserTemplateTest.Tests", {

  testDefaults: function() {
  var template = new ParserTemplate('bob','dance');
  
  assertThat(template, object());
  
  assertThat(template.name, 'bob');
  assertThat(template.children, 'dance');
  
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
  
});