var LintTest = TestCase('Lint.Tests');

var files = {
  'src/croaker/js/croaker.js': {
    sloppy: true,
    white: true,
    regexp: true,
    plusplus: true,    
    maxerr: 50,
    indent: 2,
    predef: ['DOMParser']
  }
};

$.each(files, function (key, value) {
  var filename = key;

  function testFunc() {
    var fileData = '';

    function worker() {
      return $.ajax('/test/' + filename, {
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
     
      var result = JSLINT(fileData, value),
          msg;

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

    function errorHandler() {
      fail('error retrieving data');
    }

    $.when(worker(this))
     .done(validator)
     .fail(errorHandler);
  }

  LintTest.prototype['test_' + filename] = testFunc;
});
