export default [
  {
    groupName: "定位",
    styles: [
      {
        key: "position",
        name: "定位方式",
        type: "options",
        options: ["static", "relative", "absolute", "fixed"],
        default: ""
      },
      {
        key: "top",
        name: "Top",
        type: "text",
        showFunc(comp) {
          return (
            comp.style.position == "relative" ||
            comp.style.position == "absolute" ||
            comp.style.position == "fixed"
          );
        }
      },
      {
        key: "left",
        name: "Left",
        type: "text",
        showFunc(comp) {
          return (
            comp.style.position == "relative" ||
            comp.style.position == "absolute" ||
            comp.style.position == "fixed"
          );
        }
      },
      {
        key: "right",
        name: "Right",
        type: "text",
        showFunc(comp) {
          return (
            comp.style.position == "relative" ||
            comp.style.position == "absolute" ||
            comp.style.position == "fixed"
          );
        }
      },
      {
        key: "bottom",
        name: "Bottom",
        type: "text",
        showFunc(comp) {
          return (
            comp.style.position == "relative" ||
            comp.style.position == "absolute" ||
            comp.style.position == "fixed"
          );
        }
      },
      {
        key: "z-index",
        name: "zIndex",
        type: "text",
        showFunc(comp) {
          return (
            comp.style.position == "relative" ||
            comp.style.position == "absolute" ||
            comp.style.position == "fixed"
          );
        }
      }
    ]
  },
  {
    groupName: "盒模型",
    styles: [
      {
        key: "display",
        name: "盒模型",
        type: "options",
        options: [
          "block",
          "inline-block",
          "inline",
          "flex",
          "inline-flex",
          "none"
        ],
        default: ""
      },
      {
        key: "flex-direction",
        name: "主轴排列",
        type: "options",
        options: ["row", "row-reverse", "column", "column-reverse"],
        showFunc(comp) {
          return (
            comp.style.display == "flex" || comp.style.display == "inline-flex"
          );
        }
      },
      {
        key: "flex-wrap",
        name: "轴线换行",
        type: "options",
        options: ["nowrap", "wrap", "wrap-reverse"],
        showFunc(comp) {
          return (
            comp.style.display == "flex" || comp.style.display == "inline-flex"
          );
        }
      },
      {
        key: "justify-content",
        name: "主轴对齐",
        type: "options",
        options: [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around"
        ],
        showFunc(comp) {
          return (
            comp.style.display == "flex" || comp.style.display == "inline-flex"
          );
        }
      },
      {
        key: "align-items",
        name: "交叉轴对齐",
        type: "options",
        options: ["flex-start", "flex-end", "center", "baseline", "stretch"],
        showFunc(comp) {
          return (
            comp.style.display == "flex" || comp.style.display == "inline-flex"
          );
        }
      },
      {
        key: "align-content",
        name: "多轴线对齐",
        type: "options",
        options: [
          "flex-start",
          "flex-end",
          "center",
          "space-between",
          "space-around",
          "stretch"
        ],
        showFunc(comp) {
          return (
            comp.style.display == "flex" || comp.style.display == "inline-flex"
          );
        }
      },
      {
        key: "isFlexItem",
        name: "是否flex项目",
        type: "boolean"
      },
      {
        key: "order",
        name: "项目排序",
        type: "text",
        showFunc(comp) {
          return comp.style.isFlexItem;
        }
      },
      {
        key: "flex-grow",
        name: "自动增长",
        type: "text",
        showFunc(comp) {
          return comp.style.isFlexItem;
        }
      },
      {
        key: "flex-shrink",
        name: "自动收缩",
        type: "text",
        showFunc(comp) {
          return comp.style.isFlexItem;
        }
      },
      {
        key: "flex-basis",
        name: "基础尺寸",
        type: "size",
        showFunc(comp) {
          return comp.style.isFlexItem;
        }
      },
      {
        key: "align-self",
        name: "自身对齐",
        type: "options",
        options: [
          "auto",
          "flex-start",
          "flex-end",
          "center",
          "baseline",
          "stretch"
        ],
        showFunc(comp) {
          return comp.style.isFlexItem;
        }
      },
      {
        key: "margin",
        name: "外边距",
        type: "text",
        default: ""
      },
      {
        key: "padding",
        name: "内边距",
        type: "text",
        default: ""
      },
      {
        key: "border-radius",
        name: "圆角",
        type: "size",
        default: ""
      },
      {
        key: "height",
        name: "高度",
        type: "size",
        default: "auto"
      },
      {
        key: "line-height",
        name: "行高",
        type: "size",
        default: ""
      },
      {
        key: "width",
        name: "宽度",
        type: "size",
        default: ""
      },
      {
        key: "max-width",
        name: "最大宽度",
        type: "size",
        default: ""
      }
    ]
  },
  {
    groupName: "边框",
    styles: [
      {
        key: "border-top",
        name: "上边框",
        type: "text",
        default: ""
      },
      {
        key: "border-right",
        name: "右边框",
        type: "text",
        default: ""
      },
      {
        key: "border-bottom",
        name: "下边框",
        type: "text",
        default: ""
      },
      {
        key: "border-left",
        name: "左边框",
        type: "text",
        default: ""
      }
    ]
  },
  {
    groupName: "背景",
    styles: [
      {
        key: "background",
        name: "背景",
        type: "background",
        default: ""
      },
      {
        key: "background-size",
        name: "背景尺寸",
        type: "options",
        options: ["", "100% auto", "100% 100%", "auto 100%"]
      },
      {
        key: "background-repeat",
        name: "背景重复",
        type: "options",
        options: ["", "no-repeat", "repeat-x", "repeat-y", "repeat"]
      },
      {
        key: "background-position",
        name: "背景定位",
        type: "text",
        default: ""
      }
    ]
  },
  {
    groupName: "文字样式",
    styles: [
      {
        key: "color",
        name: "字体颜色",
        type: "color",
        default: "#000"
      },
      {
        key: "font-size",
        name: "字体大小",
        type: "size",
        default: "14px"
      },
      {
        key: "font-weight",
        name: "字体粗细",
        type: "text",
        default: ""
      },
      {
        key: "font-family",
        name: "字体family",
        type: "text",
        default: ""
      }
    ]
  },
  {
    groupName: "变换",
    styles: [
      {
        key: "transform",
        name: "变换",
        type: "text"
      },
      {
        key: "transform-origin",
        name: "变换原点",
        type: "text"
      }
    ]
  },
  {
    groupName: "其他",
    styles: [
      {
        key: "box-shadow",
        name: "盒阴影",
        type: "text"
      },
      {
        key: "clip-path",
        name: "裁剪",
        type: "options",
        options: [
          "circle(40%)",
          "ellipse(130px 140px at 10% 20%)",
          "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"
        ]
      },
      {
        key: "text-align",
        name: "内容对齐",
        type: "options",
        options: ["left", "center", "right", "justify"]
      },
      {
        key: "vertical-align",
        name: "垂直对齐",
        type: "options",
        options: ["top", "middle", "bottom", "baseline"]
      },

      {
        key: "overflow-x",
        name: "水平溢出",
        type: "options",
        options: ["hidden", "auto", "scroll", "visiable"]
      },
      {
        key: "overflow-y",
        name: "垂直溢出",
        type: "options",
        options: ["hidden", "auto", "scroll", "visiable"]
      },
      {
        key: "white-space",
        name: "元素中的空白",
        type: "options",
        options: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"]
      },
      {
        key: "animation",
        name: "动画",
        type: "options",
        options: ["暂无"]
      }
    ]
  }
];
