import axios from '@/lib/Request';
/**
 * Front API
 * Front Api文档
 */
export default class ApiApi {
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
   * APIActivityController
   * 查询个人球列表
   */
  static async ballRecordListUsingPOST (param) {
    const url = '/api/activity/ball/record/list';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * ActGameController
   * 答题参与结果列表查询
   */
  static async queryCollegeStudentAttendedResultUsingPOST (param) {
    const url = '/api/activity/game/college/student/queryAttendedResult';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * ActGameController
   * 个人答题参与结果查询
   */
  static async queryCollegeStudentResultUsingPOST (param) {
    const url = '/api/activity/game/college/student/queryResult';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * ActGameController
   * 根据活动id获取题目信息,和题目结果
   */
  static async newGetGameQuestionUsingPOST (param) {
    const url = '/api/activity/game/game_question/new_get_question';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * APIActivityController
   * 新加单接口
   */
  static async createOrderUsingPOST (param) {
    const url = '/api/activity/newCreateOrder';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * city-area-controller
   * 查询用户地址列表
   */
  static async queryCustomAddressUsingGET (param) {
    const url = '/api/cityArea/custom/queryAddress';
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * city-area-controller
   * 新增或更新用户收货地址信息
   */
  static async saveOrUpdateAddressUsingPOST (param) {
    const url = '/api/cityArea/custom/saveOrUpdate';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * city-area-controller
   * 获取下属城市信息
   */
  static async querySonCityAreaUsingGET (param) {
    const url = ApiApi.replacePathVariable(
      '/api/cityArea/querySonCityArea/{pid}',
      param
    );
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * user-credit-controller
   * 获取当前用户积分获取详情列表
   */
  static async queryUserAchieveCreditDetailListUsingPOST (param) {
    const url = '/api/credit/get/user_credit/achieveCreditDetailList';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * user-credit-controller
   * 获取当前用户积分资产列表
   */
  static async queryUserAvailableCreditDetailListUsingPOST (param) {
    const url = '/api/credit/get/user_credit/availableCreditDetailList';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 选票标示(跳转到选票页面,用于回显历史选票信息,order系统记录订单信息时删除此标示)
   */
  static async choseTicketMarkUsingGET (param) {
    const url = '/api/order/ticket/chose/mark';
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 获取用户票类订单详情
   */
  static async queryUserTicketOrderDetailUsingGET (param) {
    const url = ApiApi.replacePathVariable(
      '/api/order/ticket/detailforUser/{orderCode}',
      param
    );
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 获取用户票类订单列表
   */
  static async queryUserTicketListUsingPOST (param) {
    const url = '/api/order/ticket/forUser/list';
    const rs = await axios.post(url, param);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 手动出票-对已经处于支付完成状态的订单
   */
  static async manualTicketingUsingGET (param) {
    const url = ApiApi.replacePathVariable(
      '/api/order/ticket/manual/ticketing/{orderCode}',
      param
    );
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 获取支付报文信息
   */
  static async generatePayMessageUsingGET (param) {
    const url = '/api/order/ticket/pay/message/';
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 获取支付报文信息
   */
  static async generatePayMessageUsingGET_1 (param) {
    const url = ApiApi.replacePathVariable(
      '/api/order/ticket/pay/message/{orderCode}',
      param
    );
    const rs = await axios.get(url);
    return rs.data;
  }

  /**
   * OrderTicketController
   * 记录订单信息(选票结束,占座成功后), 并返回订单详情
   */
  static async signTicketOrderInfoUsingGET (param) {
    const url = ApiApi.replacePathVariable(
      '/api/order/ticket/sign/order/{actId}/{clOrderId}',
      param
    );
    const rs = await axios.get(url);
    return rs.data;
  }
}
