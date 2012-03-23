TestCase("Croaker.ParserTemplateTest.Tests", {

  testDefaults: function() {
  var parse = new StandardParse('bob');
    
  assertThat(parse.name, 'bob');
  assertThat(parse.attributes, object());
  assertThat(parse.children, empty());
  
  },
  
  testAddingAttributes: function() {
    var parse = new StandardParse('years');
    
    parse.addAttribute('day','5');
    
    assertThat(parse.attributes, hasMember('day');
    assertThat(parse.attributes.day, equalTo('5'));
 
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
  
});