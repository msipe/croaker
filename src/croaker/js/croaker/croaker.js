var Croaker = (function () {
  var parser = (function () {
    function parseXml(xml) {
      return $.xml2json(xml);
    }

    return { parseXml: parseXml };
  } ());

  return {
    parser: parser
  };
} ());
