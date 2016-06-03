const
    fs      = require('fs'),
    path    = require('path');

(function () {
    'use strict';
    module.exports = function (app, controllersPath) {
        fs.readdir(controllersPath, function (err, files) {
            files.forEach(function (file) {
                const clss = require(path.join(controllersPath, file));
                new clss(app);
            })
        })
    }
})();
