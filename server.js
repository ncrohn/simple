var connect = require('connect'),
    path = require('path'),
    app, upPath;

upPath = path.join(__dirname, 'upload');

app = connect()
  .use(connect.static(path.join(__dirname, 'public')))
  .use(connect.multipart({ uploadDir: upPath }))
  .use(
    function(req, res) {
      res.end(200);
    }).listen(3055);