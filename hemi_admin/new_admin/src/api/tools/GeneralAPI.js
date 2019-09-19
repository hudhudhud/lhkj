const request = require('request');
const fs = require('fs');
const ejs = require('ejs');
const types = require('./types.json');

// var url = "http://localhost:12306/v2/api-docs";
var url = 'http://hemitest.lianhaikeji.com/admin2/v2/api-docs';

/**
 * 拉取接口文档
 */
request(url, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    var doc = JSON.parse(body);
    var definitions = doc.definitions;
    for (var x in definitions) {
      var classDef = definitions[x];
      if (classDef.type === 'object') {
        generalClass(definitions[x]);
      }
    }

    // 分模块生成api
    var map = {};
    for (var x in doc.paths) {
      var moduleName = x.split('/')[1];
      moduleName = moduleName.toLowerCase();
      var charArr = moduleName.split('');
      var firstLetter = charArr
        .splice(0, 1)
        .join('')
        .toUpperCase();
      moduleName = firstLetter + charArr.join('');
      var moduleList = map[moduleName] || {};
      moduleList[x] = doc.paths[x];
      map[moduleName] = moduleList;
    }
    for (var y in map) {
      doc.paths = map[y];
      doc.moduleName = y;
      generalApi(doc);
    }

    generalExport({ modules: map });
    console.log('接口代码生成成功');
  }
});

/**
 * 渲染类
 */
function generalClass(classDef) {
  var templateStr = fs.readFileSync(__dirname + '/classTemplate.ejs', 'utf-8');
  classDef.types = types;
  classDef.description = classDef.description || '';
  var generatedStr = ejs.render(templateStr, classDef, {
    async: false
  });
  var className = classDef.title.replace(/«.*»/g, '');
  if (className == "Pager" || className == "ApiResult") {
    return;
  }
  fs.writeFileSync(
    __dirname.replace('/tools', '/modules/').replace('\\tools', '\\modules\\') +
    className +
    '.ts',
    generatedStr
  );
}

/**
 * 渲染API
 */
function generalApi(doc) {
  var templateStr = fs.readFileSync(__dirname + '/apiTemplate.ejs', 'utf-8');
  doc.types = types;
  var generatedStr = ejs.render(templateStr, doc, {
    async: false
  });
  fs.writeFileSync(
    __dirname.replace('/tools', '/apis/').replace('\\tools', '\\apis\\') + doc.moduleName + 'Api.ts',
    generatedStr
  );
}

/**
 * 导出模板
 */
function generalExport(modules) {
  var templateStr = fs.readFileSync(__dirname + '/exportTemplate.ejs', 'utf-8');
  var generatedStr = ejs.render(templateStr, modules, {
    async: false
  });
  fs.writeFileSync(__dirname.replace('/tools', '/').replace('\\tools', '\\') + 'index.ts', generatedStr);
}
