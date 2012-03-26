TestCase("Croaker.ParserTemplateTest.Tests", {

  testDefaults: function() {
    var attributes = { 'a': '1', 'b': '2' },
      children = [], 
      parse = new croaker.StandardParse('bob', attributes, children);
    
    assertThat(parse.name, 'bob');
    assertThat(parse.attributes, attributes);
    assertThat(parse.children, children);
  
  },
  /* 
  testAddingAttributes: function() {
    var parse = new StandardParse('years');
    
    parse.addAttribute('day','5');
    
    assertThat(parse.attributes, hasMember('day'));
    assertThat(parse.attributes.day, equalTo('5'));
  },
  
  testAddingChildren: function() {
    var parse = new StandardParse('people');
    
    parse.addChildren('NewWark');
    
    assertThat(parse.children, hasMember('NewWark'));
  }, */
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
  
});