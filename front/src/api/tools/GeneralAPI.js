/* eslint-disable no-redeclare */
/* eslint-disable no-path-concat */
const request = require('request');
const fs = require('fs');
const ejs = require('ejs')
const types = require('./types.json')

var url = 'http://192.168.2.174:12306/v2/api-docs';
url = 'http://hemitest.lianhaikeji.com/front/v2/api-docs';

/**
 * 拉取接口文档
 */
request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var doc = JSON.parse(body);

    // 分模块生成api
    var map = {};
    for (var x in doc.paths) {
      var moduleName = x.split('/')[1];
      moduleName = moduleName.toLowerCase();
      var charArr = moduleName.split('');
      var firstLetter = charArr.splice(0, 1).join('').toUpperCase();
      moduleName = firstLetter + charArr.join('');
      var moduleList = map[moduleName] || {}
      moduleList[x] = doc.paths[x];
      map[moduleName] = moduleList;
    }
    for (var x in map) {
      doc.paths = map[x];
      doc.moduleName = x;
      generalApi(doc);
    }

    generalExport({ modules: map });
  }
})

/**
 * 渲染API
 */
function generalApi (doc) {
  var templateStr = fs.readFileSync(__dirname + '/apiTemplate.txt', 'utf-8');
  doc.types = types;
  var generatedStr = ejs.render(templateStr, doc, {
    async: false
  })
  fs.writeFileSync(__dirname.replace('/tools', '/apis/') + doc.moduleName + '.js', generatedStr);
}

/**
 * 导出模板
 */
function generalExport (modules) {
  var templateStr = fs.readFileSync(__dirname + '/exportTemplate.txt', 'utf-8');
  var generatedStr = ejs.render(templateStr, modules, {
    async: false
  })
  fs.writeFileSync(__dirname.replace('/tools', '/') + 'index.js', generatedStr);
}
