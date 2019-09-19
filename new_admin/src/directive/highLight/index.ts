function createDot() {
  const dot: HTMLElement = document.createElement('div');
  dot.style.position = 'absolute';
  dot.style.height = '10px';
  dot.style.width = '10px';
  dot.style.background = '#fff';
  dot.style.boxSizing = 'border-box';
  dot.style.border = '1px solid #000';
  return dot;
}
function createOutline() {
  const outline: HTMLElement = document.createElement('div');
  outline.classList.add('_outline');
  outline.style.position = 'absolute';
  outline.style.zIndex = '1988';
  outline.style.top = '0';
  outline.style.left = '0';
  outline.style.height = '100px';
  outline.style.width = '100px';
  outline.style.boxSizing = 'border-box';
  outline.style.border = '1px dotted #333';
  outline.style.pointerEvents = 'none';
  let dot = createDot();
  dot.style.left = '-5px';
  dot.style.top = '-5px';
  outline.appendChild(dot);

  dot = createDot();
  dot.style.left = '-5px';
  dot.style.bottom = '-5px';
  outline.appendChild(dot);

  dot = createDot();
  dot.style.right = '-5px';
  dot.style.top = '-5px';
  outline.appendChild(dot);

  dot = createDot();
  dot.style.right = '-5px';
  dot.style.bottom = '-5px';
  outline.appendChild(dot);
  return outline;
}
function handleClick(el: any, binding: any, page: HTMLElement) {
  function handle(e: any) {
    const _outlineOld: any = document.querySelectorAll('._outline')[0];
    if (_outlineOld && page) {
      page.removeChild(_outlineOld);
    }
    el._show = binding.value;
    // if (!el.outline) {
    el.outline = createOutline();
    page.appendChild(el.outline);
    el._resize = function() {
      el.outline.style.display = el._show ? 'block' : 'none';
      el.outline.style.top = el.offsetTop + 'px';
      el.outline.style.left = el.offsetLeft + 'px';
      el.outline.style.width = el.offsetWidth + 'px';
      el.outline.style.height = el.offsetHeight + 'px';
      if (event) event.stopPropagation(); // 阻止冒泡,避免影响上级组件
    };
    el.addEventListener('transitionend', el._resize);
    el.addEventListener('load', el._resize);
    // }
    if (binding.value) {
      el._resize();
    } else {
      el.outline.style.display = 'none';
    }
    // const rect = target.getBoundingClientRect();
    // const customOpts = Object.assign({}, binding.value);
    const body: HTMLElement = document.body;
    // let allDiv: NodeList = document.querySelectorAll('div');
    const parentDiv: any = document.getElementById('sgtProps');
    parentDiv.querySelectorAll('div').forEach((element: any) => {
      if (element.className != 'preview') {
        element.style.border = 'none';
      }
    });
    const Div: any = document.getElementById(binding.value);
    Div.style['borderLeft'] = '6px solid #409EFF';
    const distance = Div.offsetTop;
    // parentDiv.style.transform = 'translateY(' + distance + 'px)';
    parentDiv.scrollTop = distance;
    // console.log(Div.offsetTop);
  }

  return handle;
}

/* export default {
  bind(el: any, binding: any) {
    el.addEventListener('click', handleClick(el, binding), false);
  },
  update(el: any, binding: any) {
    el.removeEventListener('click', el[context].removeHandle, false);
    el.addEventListener('click', handleClick(el, binding), false);
  },
  unbind(el: any) {
    el.removeEventListener('click', el[context].removeHandle, false);
    el[context] = null;
    delete el[context];
  }
}; */

// ./directive/index.ts
export const highLight = {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el: HTMLElement, binding: any, vnode: any) {
    // const { value } = binding;
    const page: any = document.getElementById('previewPage');
    // 聚焦元素
    el.addEventListener('dblclick', handleClick(el, binding, page), false);
  },
  unbind(el: any, binding: any) {
    if (el.outline) {
      el.outline.parentNode.removeChild(el.outline);
    }
  }

  /*   componentUpdated: function(el: any, binding: any) {
    el._show = binding.value;
    if (!el.outline) {
      el.outline = createOutline();
      el.parentNode.appendChild(el.outline);
      el._resize = function() {
        el.outline.style.display = el._show ? 'block' : 'none';
        el.outline.style.top = el.offsetTop + 'px';
        el.outline.style.left = el.offsetLeft + 'px';
        el.outline.style.width = el.offsetWidth + 'px';
        el.outline.style.height = el.offsetHeight + 'px';
        if (event) event.stopPropagation(); // 阻止冒泡,避免影响上级组件
      };
      el.addEventListener('transitionend', el._resize);
      el.addEventListener('load', el._resize);
    }
    if (binding.value) {
      el._resize();
    } else {
      el.outline.style.display = 'none';
    }
  } */
};
