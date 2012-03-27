TestCase("Croaker.SampleTest.Tests", {
  testSomething: function() {
    assertThat([], empty());
    assertThat([1,2,3], hasItem(3));
    
    var user = {name: 'andy', age: 15};
    assertThat(user, equalTo(user));
    assertThat(user, hasMember('name'));
    assertThat(user, hasMember('name', 'andy'));
    assertThat(user.name, equalTo('andy'));
    assertThat(user, allOf(hasMember('name'), hasMember('age')));
  },
  
  setUp: function () {
    JsHamcrest.Integration.JsTestDriver();
  }
});