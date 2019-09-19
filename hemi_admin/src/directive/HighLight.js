function createDot () {
  let dot = document.createElement("div")
  dot.style.position = "absolute"
  dot.style.height = "10px"
  dot.style.width = "10px"
  dot.style.background = "#fff"
  dot.style.boxSizing = "border-box"
  dot.style.border = "1px solid #000"
  return dot
}
function createOutline () {
  let outline = document.createElement("div")
  outline.classList.add("_outline")
  outline.style.position = "absolute"
  outline.style.zIndex = "1988"
  outline.style.top = "0"
  outline.style.left = "0"
  outline.style.height = "100px"
  outline.style.width = "100px"
  outline.style.boxSizing = "border-box"
  outline.style.border = "1px dotted #333"
  outline.style.pointerEvents = "none"
  let dot = createDot()
  dot.style.left = "-5px"
  dot.style.top = "-5px"
  outline.appendChild(dot)

  dot = createDot()
  dot.style.left = "-5px"
  dot.style.bottom = "-5px"
  outline.appendChild(dot)

  dot = createDot()
  dot.style.right = "-5px"
  dot.style.top = "-5px"
  outline.appendChild(dot)

  dot = createDot()
  dot.style.right = "-5px"
  dot.style.bottom = "-5px"
  outline.appendChild(dot)
  return outline
}

export default {
  install (Vue) {
    Vue.directive("highlight", {
      unbind: function (el, binding) {
        if (el.outline) {
          el.outline.parentNode.removeChild(el.outline)
        }
      },
      componentUpdated: function (el, binding) {
        el._show = binding.value
        if (!el.outline) {
          el.outline = createOutline()
          el.parentNode.appendChild(el.outline)
          el._resize = function () {
            el.outline.style.display = el._show ? "block" : "none"
            el.outline.style.top = el.offsetTop + "px"
            el.outline.style.left = el.offsetLeft + "px"
            el.outline.style.width = el.offsetWidth + "px"
            el.outline.style.height = el.offsetHeight + "px"
            if (event) event.stopPropagation() // 阻止冒泡,避免影响上级组件
          }
          el.addEventListener("transitionend", el._resize)
          el.addEventListener("load", el._resize)
        }
        if (binding.value) {
          el._resize()
        } else {
          el.outline.style.display = "none"
        }
      }
    })
  }
}
