var express = require('express'),
    app = express();

app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/:name', function(req, res){
  res.status(404).sendfile('index.html');
});

app.use('/static', express.static(__dirname + '/public'));
app.use('/demo', express.static(__dirname + '/demo'));

var server = app.listen(8080, function(){
  console.log("listening on on 8080");
})
