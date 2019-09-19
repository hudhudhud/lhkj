import request from "@/libs/Request";
import { Toast } from "mint-ui";
export function loadFormInfo(formId, callback) {
  //加载表单配置,表单项配置
  //根据表单项生成formData
  request.get(`/forms/${formId}/items`).then(rs => {
    if (rs.status == 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
}
//加载表单信息
export function getFormDetail(formId, callback) {
  request.get(`/formData/${formId}`).then(rs => {
    if (rs.status == 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
}
export function revokeFormData(dataId, callback) {
  request.post(`formData/revoke/${dataId}`).then(rs => {
    if (rs.status == 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
}
export function searchFormData(formId, customId, callback) {
  request.get(`formData/form/${formId}/custom/${customId}`).then(rs => {
    if (rs.status == 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
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