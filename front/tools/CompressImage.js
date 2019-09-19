const tinify = require('tinify');
var cached = require('./compressed.json') || {}
const fs = require('fs')
const keys = ['f8lDF67wqXljyptVv7mD5hGv2fgKGqmV', 'vB3YTQ7Cfj5807FM4JDLqNHZpldvrQMD',
  'y2kKR65twlVR3TkBPVn9phL7H5mjnsGz', '0BmWbct1TW1Q0qTBpR92rhl2Xgm6qq4X',
  'xGbdJKKTzXcSVXTvDRP7CrG5ss2zPJk1', 'qYsmZzxXlK1xd325n1s3ZYzf50GkcM66']
var currentKeyIndex = 0
var params = process.argv.splice(2);
var baseDirPath = params[0]

var imageFiles = []
var readDir = function (dir) {
  if (fs.statSync(dir).isDirectory()) {
    var files = fs.readdirSync(dir)
    if (files) {
      files.forEach(file => {
        readDir(dir + '/' + file)
      })
    }
  } else {
    if (/.*\.(png|jpg|jpeg)/.test(dir.toLowerCase())) {
      if (!cached[dir]) {
        imageFiles.push(dir)
      } else {
        console.log('已处理,跳过', dir)
      }
    }
  }
}

console.log('传入参数：', baseDirPath);
readDir(baseDirPath)
console.log('读取文件:', imageFiles, '总计需压缩图片:', imageFiles.length)
if (imageFiles.length > 0) {
  console.log('开始压缩...')
  var ensureTask = function () {
    if (currentKeyIndex >= keys.length) {
      console.error('所有API KEY免费额度都已用尽')
      return;
    }
    tinify.key = keys[currentKeyIndex];
    tinify.validate(function (err) {
      if (err) throw err;
      let countOfThisMonth = 500 - tinify.compressionCount;
      console.log('本月剩余免费数量:', countOfThisMonth)
      if (countOfThisMonth > 10) {
        task()
      } else {
        console.log('当前Key免费额度已用尽,尝试下一个可用Key', keys[currentKeyIndex])
        currentKeyIndex++
        ensureTask()
      }
    })
  }
  var task = function () {
    var file = imageFiles.shift()
    if (file) {
      var originSize = fs.statSync(file).size / 1000
      console.log('开始压缩', file)
      var startTime = Date.now()
      // 压缩
      var source = tinify.fromFile(file);
      source.toFile(file).then(() => {
        var costTime = Date.now() - startTime
        cached[file] = Date.now()
        var targetSize = fs.statSync(file).size / 1000
        console.log('压缩完毕,消耗:' + costTime + 'ms', file, `${originSize}KB -> ${targetSize}KB`)
        fs.writeFileSync('tools/compressed.json', JSON.stringify(cached))
        console.log('处理状态已保存')
        setTimeout(ensureTask, 1)
      }).catch(e => {
        console.error(e)
        console.error('压缩出错,中止任务')
      });
    } else {
      console.log('处理完毕')
    }
  }

  ensureTask()
}
