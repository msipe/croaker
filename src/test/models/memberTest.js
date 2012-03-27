TestCase("Croaker.Member.Tests", {
  testMember: function() {
    var metrics = [], member = new croaker.Member('joe','iceCream.js',3, metrics);
    
    assertThat(member.name, 'joe');
    assertThat(member.file, 'iceCream.js');
    assertThat(member.line, 3);
    assertThat(member.metrics, sameAs(metrics));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});