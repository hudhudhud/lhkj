import Vue from "vue";
import MailCheckList from "@/components/MailCheckList";

const el = document.createElement("div");
document.body.appendChild(el);

let instance = null;

const mapping = {
    act: {
        is_open_buy: "",
        dataProjectStatus: "",
        actId: "活动编号",
        actName: "活动名称",
        actType: "活动类型",
        checkLogin: "需要登录",
        fullScreen: "全屏",
        merchantId: "商户号",
        detail: "描述",
        startTime: "开始时间",
        endTime: "结束时间",
        isDeleted: "是否删除",
        actIcon: "图片",
        overTime: "订单过期时间",
        highestPrice: "最高金额",
        lowestPrice: "最低金额",
        templateConfig: "模板配置",
        actTemplate: "模板名称",
        actJoinNum: "免费次数",
        maxBuyNum: "最大购买数",
        valuationType: "",
        maxIntegralNum: "",
        minIntegralNum: "",
        splmtFlag: "",
        splmtPricingWay: "",
        splmtInitPrice: "",
        splmtMinPrice: "",
        splmtMaxPrice: "",
        splmtAddstepPrice: "",
        splmtMaxTimes: "",
        splmtLimitDays: "",
        ruleText: "",
        remarks: "备注",
        nonDefaultTotal: "非默认奖品最大中奖次数",
        whiteLimitType: "",
        isFirstOrder: "",
        riskStatus: "风控状态",
        num: "",
        payType: "支付方式"
    },
    pro: {
        proId: "商品ID",
        actId: "活动ID",
        standardId: "规格ID",
        proType: "商品类型",
        prizeName: "奖品名称",
        baseProId: "飞鱼商品",
        baseStandardCode: "飞鱼规格",
        originalPrice: "原价",
        currentPrice: "现价",
        lotterySord: "奖项排序",
        standardImgUrl: "规格图片",
        prizeTotal: "",
        prizeProbability: "",
        isDefault: "是否默认奖品",
        accountPattern: "账号校验正则",
        accountName: "账号名称",
        standardInstruction: "规格说明",
        isOpenRecharge: "是否开放充值",
        isFirstOrder: "首次抽奖奖品",
        standardPrompt: "",
        merchantPrice: "结算价格",
        creditValue: "",
        creditTypeId: "",
        fishCost: "飞鱼成本",
        expiredTime: "",
        proName: "商品名称",
        proDetails: "商品描述",
        proDescript: "商品详情"
    },
    std: {
        proType: "商品类型",
        standardName: "规格名称",
        baseProId: "飞鱼商品",
        baseStandardCode: "飞鱼规格",
        originalPrice: "原价",
        currentPrice: "现价",
        standardSort: "排序",
        standardImgUrl: "规格图片",
        limitTotal: "",
        limitPerTime: "",
        accountPattern: "账号正则",
        accountName: "账号名称",
        actType: "",
        standardInstruction: "规格介绍",
        isOpenRecharge: "是否开放充值",
        valuationType: "计价类型",
        integralNum: "",
        isCoupon: "支持券",
        standardPrompt: "使用说明",
        merchantPrice: "结算价",
        creditValue: "积分价",
        creditTypeId: "积分类型",
        fishCost: "飞鱼成本",
        expiredTime: "订单超时时间",
        discountType: "",
        maxDiscountPrice: "",
        minDiscountPrice: "",
        standardActUrl: ""
    }
}

const closeDialog = () => {
    if (instance && instance.$destroy) {
        instance.$destroy();
        instance = null;
        document.body.removeChild(document.querySelector("#mail_checklist"));
    }
}

const transfer = (originParams) => {
    let params = originParams;
    if (params.sendType == "actConfig" || params.sendType == "addAct") {
        params.changes.forEach(change => {
            change.settingName = mapping.act[change.settingName] || change.settingName;
        })
    }
    if (params.sendType == "productConfig" || params.sendType == "addProduct") {
        params.changes.forEach(change => {
            change.settingName = mapping.pro[change.settingName] || change.settingName;
        })
    }
    if (params.sendType == "configStandard" || params.sendType == "addStandard") {
        params.changes.forEach(change => {
            change.settingName = mapping.std[change.settingName] || change.settingName;
        })
    }
    return params;
}

const checkMail = async (params) => {
    let changes = params.changes;
    if (!changes) {
        changes = [];
        const keys = Object.keys(params.newForm);
        keys.forEach(key => {
            let oldValue = params.oldForm[key] + "";
            let newValue = params.newForm[key] + "";
            if (oldValue != newValue) {
                changes.push({
                    settingName: key,
                    oldValue,
                    newValue
                });
            }
        });
        delete params.newForm
        delete params.oldForm
        params.changes = changes
    }

    return new Promise(async (resolve, reject) => {
        document.body.appendChild(el);
        instance = new Vue({
            el: el,
            data: {
                params: transfer(params)
            },
            components: { MailCheckList },
            template: "<div id='mail_checklist'><MailCheckList @close='close' @passed='passed' :check-params='params' /></div>",
            methods: {
                close() {
                    closeDialog();
                    resolve(false);
                },
                passed() {
                    closeDialog();
                    resolve(true);
                }
            }
        });
    })
}

export default {
    install(Vue) {
        Vue.prototype.$checkMail = checkMail
    }
}
