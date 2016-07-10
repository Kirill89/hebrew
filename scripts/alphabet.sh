#!/usr/bin/env bash


./node_modules/.bin/browserify src/alphabet/index.js -o dist/alphabet/index.js -t [ babelify --presets es2015 ]
./node_modules/.bin/lessc src/alphabet/index.less dist/alphabet/index.css
cp -R src/alphabet/img dist/alphabet/img
./node_modules/.bin/jade src/alphabet/index.jade --out dist/alphabet
