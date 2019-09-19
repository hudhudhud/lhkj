// let hostname = window.location.hostname
export default {
  basePath: "",
  apiBasePath:
    process.env.NODE_ENV === "production"
      ? window.location.href.indexOf("hemitest") > 0
        ? "//hemitest.lianhaikeji.com/admin/"
        : "//hemi.lianhaikeji.com/admin/"
      : "//hemitest.lianhaikeji.com/admin/",

  domain:
    process.env.NODE_ENV === "production"
      ? window.location.href.indexOf("hemitest") > 0
        ? "http://hemitest.lianhaikeji.com/"
        : "https://hemi.lianhaikeji.com/"
      : `http://${window.location.hostname}/`
}
