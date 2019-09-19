import store from '@/store';

export function cardNumberFilter (cardNum) {
  // return cardNum.toString()
  return cardNum.split("'")[1];
}
export function removeTime (dateTime) {
  return dateTime.split(' ')[0];
}
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}
export function formatPhone (phone) {
  var dh = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return dh;
}
export function getCityName (currentCity) {
  return currentCity.split('市')[0];
}
export function formatPhone344 (phone) {
  var dh = phone.replace(/\B(?=(?:\d{4})+$)/g, ' ');
  return dh;
}
export function priceFixed (num) {
  if (num.indexOf('.')) {
    return num.toFixed(2);
  } else {
    return num;
  }
}
export function priceselected (num) {
  return Math.floor(num / 100) * 100;
}
export function chooseoption (val) {
  if (val == 1) {
    return 'A';
  } else if (val == 2) {
    return 'B';
  } else if (val == 3) {
    return 'C';
  } else if (val == 4) {
    return 'D';
  }
}
export function hidden (str) {
  let phoneReg = /^1[3456789]\d{9}$/;
  if (phoneReg.test(str)) {
    var frontLen = 3;
    var endLen = 4;
    var len = str.length - frontLen - endLen;
    var xing = '';
    for (var i = 0; i < len; i++) {
      xing += '*';
    }
    return (
      str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
    );
  } else {
    return str;
  }
}
export function substr (str) {
  return str.substring(str.length - 10);
}
export function setCreditName () {
  let creditName = '积分';
  switch (store.state.merchantId) {
    case 187:
      creditName = '八桂金';
      break;
    case 167:
      creditName = '八桂金';
      break;
    case 218:
      creditName = 'CC币';
      break;
  }
  return creditName;
}
export function BankClerk (val) {
  val = parseInt(val);
  if (val < 300 && val >= 0) {
    return '实习生';
  } else if (val >= 300 && val < 600) {
    return '银行专员';
  } else if (val >= 600 && val < 900) {
    return '理财顾问';
  } else if (val >= 900 && val < 1200) {
    return '客户经理';
  } else if (val >= 1200 && val < 1500) {
    return '银行行长';
  } else if (val >= 1500) {
    return '银行大亨';
  }
}
