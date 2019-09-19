export const TaskStatus = {
    0: { name: "已作废", level: "" },
    1: { name: "已创建,待评估", level: "" },
    3: { name: "已评估,待接收", level: "warning" },
    4: { name: "已接收,处理中", level: "" },
    45: { name: "退回处理", level: "danger" },
    5: { name: "已完成,待验收", level: "success" },
    7: { name: "已验收,待评价", level: "success" },
    9: { name: "已结束", level: "info" }
};

export default { TaskStatus }
