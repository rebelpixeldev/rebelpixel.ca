'use strict';

const
    fs      = require('fs'),
    path    = require('path');

class IndexController{

    constructor(app){
        this.app = app;
        this.app.get('/', this.home.bind(this));
    }

    home(req, res){

        // @TODO refactor
        let imageFiles = fs.readdirSync(path.join(__dirname, '../../pub/dist/images')),
            spriteFiles = fs.readdirSync(path.join(__dirname, '../../pub/dist/images/sprites'));

        console.log(imageFiles);
        console.log(spriteFiles);

        res.render('index', {
            images:imageFiles.reduce(function (ret, file) {
                if ( file !== '.' && file !== '..' && fs.statSync(path.join(__dirname, '../../pub/dist/images', file)).isFile() )
                    ret.push('/dist/images/' + file);
                return ret;
            }, []),
            sprites:spriteFiles.reduce(function (ret, file) {
                if ( file !== '.' && file !== '..' && fs.statSync(path.join(__dirname, '../../pub/dist/images/sprites', file)).isFile() )
                    ret.push('/dist/images/sprites/' + file);
                return ret;
            }, []),
        });

    }
}

module.exports = IndexController;