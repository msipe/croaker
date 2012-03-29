var LintTest = TestCase('Lint.Tests');

var defs = [
  {
    file: 'src/croaker/js/croaker.js',
    name: 'croaker_js',
    config: {
      sloppy: true,
      white: true,
      regexp: true,
      plusplus: true,    
      maxerr: 50,
      indent: 2,
      predef: ['DOMParser', 'jQuery', 'window']
    }
  }
];

for (var x = 0; x < defs.length; ++x) {
  var testFunc = (function () {
    var fileData = '', entry = defs[x];

    function worker() {
      return $.ajax('/test/' + entry.file, {
        cache: false,
        dataType: 'text',
        mimeType: 'text/plain',
        async: false,
        success: function (data) {
          fileData = data;
        }
      });
    }

    function validator() {
      assert('file data not found', fileData.length > 0);

      var result = JSLINT(fileData, entry.config), msg;

      if (!result) {
        msg = 'JSLint failed.  First 5 errors:\n';
        $.each(JSLINT.errors, function (x) {
          if (x === 5) {
            return false;
          }
          msg = msg + 'line: ' + this.line;
          if (this.reason) {
            msg = msg + '  ' + this.reason;
          }
          msg = msg + '\n';
        });
        fail(msg);
      }
    }

    return function () {
      $.when(worker())
        .done(validator)
        .fail(function () { fail('error retrieving data'); });
    };
  } ());

  LintTest.prototype['testLint' + defs[x].name] = testFunc;
}
