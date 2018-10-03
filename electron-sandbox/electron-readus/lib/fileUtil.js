'use strict';

const glob = require('glob');
const path = require('path');
const fs = require('fs');

const fileUtil = {
  fetchReadmeList: function(baseDir, cb) {
    glob('node_modules/**/README.md', {cwd: baseDir}, function(err, matches) {
      if (err) {
        cb(err, null);
        return;
      }
      cb(null, matches.map(function(filename) {
        let split = path.dirname(filename).split(path.sep);
        let modNames = [];
        for (let i = split.length - 1; i >= 0; i--) {
          if (split[i] === 'node_modules') break;
          modNames.push(split[i]);
        }

        return {
          filepath: path.join(baseDir, filename),
          moduleName: modNames.join('/')
        };
      }));
    });
  },

  getAsText: function(filename) {
    return fs.readFileSync(filename, 'utf-8');
  }
};

module.exports = fileUtil;
