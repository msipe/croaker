TestCase("Croaker.Type.Tests", {
  testMember: function() {
    var metrics2 = [],  members = [], type = new croaker.Type('Joe',members, metrics2);
    
    assertThat(type.name, 'Joe');
    assertThat(type.metrics, sameAs(metrics2));
  },

  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});