import request from '@/lib/Request';
import store from '../store';
import jssdk from '@/lib/jssdk';

import { Toast, Indicator } from 'mint-ui';
export function imgPreview (e, id, imgid) {
  let file = null;
  try {
    if (e) {
      file = e.target;
      console.log(e.target.files[0]);
    }
    const imgId = `${imgid}`;
    const previewEl = document.getElementById(id);
    if (!document.getElementById(imgid)) {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('id', imgId);
      imgEl.setAttribute('style', 'width:100%;height:100%;');
      if (file.files && file.files[0]) {
        previewEl.appendChild(imgEl);
      }
    }

    // safari10会报错，出现attempted to assign to readonly property
    // TrackJS指出，这个报错是一个 ios中webkit内核的bug（而且每个框架都以独特的方式遇到这个问题.
    // imgEl.id = 'img';
    // imgEl.style = 'width:5.2rem;height:5.2rem;transform:scale(0.9)';
    if (file.files && file.files[0]) {
      let img = document.getElementById(imgId);
      var reader = new FileReader();
      reader.addEventListener(
        'load',
        function () {
          img.src = reader.result;
        },
        false
      );
      reader.onloadend = function (e) {
        console.log('文件读取完成，可以渲染了');
      };
      reader.onprogress = function (e) {
        console.log('正在读取文件，已读取：' + e.loaded + '一共：' + e.total);
      };
      reader.readAsDataURL(file.files[0]);
    }
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}

export async function uploadFile (file, callback) {
  Indicator.open();

  let param = new FormData();
  param.append('file', file);
  console.log('判断传入值', param.get('file'));
  request.post('file/upload', param).then(rs => {
    if (rs.status == 200) {
      Indicator.close();
      callback && callback(rs);
    } else {
      Indicator.close();
      Toast(rs.error);
    }
  });
}

export function initWXShare (shareConfig) {
  Indicator.open();
  store.commit('setIsReady', false);
  jssdk.jssdk.init('', store.state.merchantId, '1', val => {
    jssdk.jssdk.call('share', shareConfig);
    Indicator.close();
  });
}
export function checkAccount (
  account,
  { accountName, accountPattern, proType }
) {
  let result = true;
  if (proType == 1) {
    if (account) {
      if (accountPattern) {
        if (!new RegExp(accountPattern).test(account)) {
          Toast(accountName + '输入有误');
          result = false;
        }
      }
    } else {
      Toast('请输入' + accountName);
      result = false;
    }
  }
  return result;
}

export function checkTerminal () {
  window.terminal = (function () {
    var u = navigator.userAgent; // app = navigator.appVersion;
    return {
      // 浏览器版本信息
      trident: u.indexOf('Trident') > -1,
      presto: u.indexOf('Presto') > -1,
      webKit: u.indexOf('AppleWebKit') > -1,
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') > -1,
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
      iPhone: u.indexOf('iPhone') > -1,
      iPad: u.indexOf('iPad') > -1,
      webApp: u.indexOf('Safari') > -1,
      weixin:
        (u.indexOf('MicroMessenger') > -1 &&
          u
            .replace(/.*(MicroMessenger\/[^\s]*).*/, '$1')
            .replace('MicroMessenger/', '')) ||
        false,
      isApp: u.indexOf('bocapp') > -1,
      appVersion:
        u.indexOf('bocapp(') > -1
          ? u.match(/bocapp\(\S+\)/)[0].slice(7, -1)
          : '3.0.0'
    };
  })();
  return window.terminal;
}
export function calcPayTime (latestPayTime) {
  let d = (latestPayTime - new Date().getTime()) / 1000;
  // let hour = parseInt(d / 3600);
  // let minute = parseInt(parseInt(d % 3600) / 60);
  // let second = parseInt(d % 60);
  // latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;
  if (d > 0) {
    return true;
    // this._expireInd = setTimeout(this.calcPayTime, 1000);
  } else {
    return false;
  }
}

export async function loadOrder (actIds, callback) {
  Indicator.open();
  let rs = await request.post('/api/getOrderList?', {
    actId: actIds,
    status: ''
  });
  if (rs.status === 200) {
    Indicator.close();
    callback && callback(rs);
  } else {
    Toast(rs.error);
  }
  Indicator.close();
}

export function getCurrentLocation (handlerCityName, handlerPosition) {
  var script = document.createElement('script');
  script.src =
    '//api.map.baidu.com/api?v=2.0&ak=K8aACxCRFvhAMDlYxK0Gm5ayOjygaMhc&callback=initialize';
  document.body.appendChild(script);
  window.initialize = () => {
    var geolocation = new window.BMap.Geolocation(); // 浏览器定位
    function myFun (result) {
      handlerCityName && handlerCityName(result);
    }
    var myCity = new window.BMap.LocalCity();
    myCity.get(myFun);
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == window.BMAP_STATUS_SUCCESS) {
        handlerPosition && handlerPosition(r);
      } else {
        // alert('暂时无法获取您当前的位置,定位可能会有偏差');
      }
    });
  };
}
