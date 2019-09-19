import axios from '@/lib/Request';
/**
 * Front API
 * Front Api文档
 */
export default class IpApi {
  /**
   * 替换PathVariable
   */
  static replacePathVariable (url, param) {
    for (const x in param) {
      if (url.indexOf(`{${x}}`) > -1) {
        url = url.replace(`{${x}}`, param[x]);
        delete param[x];
      }
    }
    return url;
  }

  /**
   * IpStatisticsController
   * 客户端登陆ip统计展示
   */
  static async queryStatisticsDataUsingPOST (param) {
    const url = '/ip/statistics/data';
    const rs = await axios.post(url, param);
    return rs.data;
  }
}
