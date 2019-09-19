//export const apiBasePath = process.env.VUE_APP_CURRENTMODE === 'development' ? "http://hemitest.lianhaikeji.com/form" : "https://hemi.lianhaikeji.com/form";

console.log(process.env.VUE_APP_CURRENTMODE);


export let apiBasePath= "";   //这里是一个默认的url，可以没有
if(process.env.VUE_APP_CURRENTMODE){
  switch (process.env.VUE_APP_CURRENTMODE) {
      case 'test':  
          apiBasePath = "http://hemitest.lianhaikeji.com/form"  //测试环境中的url
          break
  }
} else {
  switch (process.env.NODE_ENV) {
      case 'development':
          apiBasePath = "http://hemitest.lianhaikeji.com/form"  //开发环境url
          break
      case 'production':
          apiBasePath = "https://hemi.lianhaikeji.com/form"   //生产环境url
          break
  }
}

export default {
  apiBasePath
};
