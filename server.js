var connect = require('connect'),
    path = require('path'),
    spawn = require('child_process').spawn,
    fs = require('fs'),
    app, upPath;

upPath = path.join(__dirname, 'upload');

path.exists(upPath,
  function(exists) {
    if(!exists) {
      fs.mkdir(upPath,
        function(err) {
          if(err) console.log(err);
        });
    }
  });

app = connect()
  .use(connect.static(path.join(__dirname, 'public')))
  .use(connect.multipart({ uploadDir: upPath }))
  .use(
    function(req, res) {
      if(req.files.hasOwnProperty('upload')) {
        var file = req.files.upload,
            unzip = spawn('unzip', ['-o', '-d', path.join(__dirname, 'public'), file.path]);

        unzip.stdout.on('data', function (data) {
          //console.log(data);
        });

        unzip.stderr.on('data', function (data) {
          //console.log(data);
        });

        unzip.on('exit', function (code) {
          if(code !== 0) {
            console.log('Something happened.');
            res.end('failed');
          } else {
            console.log('Completed upload.');
            res.end('success');

            // Cleanup the files
            fs.unlink(file.path,
              function(err) {
                if(err) console.log(err);
              });
          }
        });

      }
    }).listen(3055);