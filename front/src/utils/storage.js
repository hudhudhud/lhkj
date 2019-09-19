// 获取cookie、
/* eslint-disable no-one-var */
/* eslint-disable no-cond-assign */
import Cookies from 'js-cookie';
export function setToken (tokenName, value) {
  localStorage.setItem(tokenName, value);
  Cookies.set(tokenName, value, { expires: 7 });
}
export function getToken (tokenName) {
  let token = localStorage.getItem(tokenName)
    ? localStorage.getItem(tokenName)
    : Cookies.get(tokenName);
  if (token == 'null' || token == 'undefined') {
    token = null;
  }
  return token;
}
export function laodSdk () { }
