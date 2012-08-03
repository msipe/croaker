Croaker is an HTML viewer which displays the XML from [Microsoft's Code Metric Report.] (http://www.microsoft.com/en-us/download/details.aspx?id=9422)


###Setup
To use Croaker, download the zip file and run Croaker.html. Croaker has two ways to load XML files, through the load box and from a URL query string. 

  Croaker.html has a load box which will load the file at the path entered into it. Entering samples/sample.xml into the load box should bring up the sample file.

  Croaker can also load a file from a URL query path. Following croaker.html in the URL, enter "?path=samples/sample.xml" to load the sample file.(...croaker.html?path=samples/sample.xml). 

  Croaker can only load files which are located below Croaker.html. See the support section below for instructions on running Croaker in Chrome.

####Filters
Croaker can filter by the type of an element (namespace, type or member) and/or name. Name searching supports Regular Expressions.

######Support
Croaker supports Firefox, Internet Explorer 9 and Google Chrome. Croaker runs best on Firefox and Chrome. 

Running in Chrome: Due to origin restrictins, Chrome will not allow local files to be loaded via AJAX. This means that when running Croaker from the local file system using Chrome requires that Chrome be started from the console with this command line switch "--allow-file-access-from-files". This is restriction only applies when running Chrome locally. Chrome will run Croaker normally off of Web hosting.
