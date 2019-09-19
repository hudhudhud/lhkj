export let apiBasePath = `//hemitest.lianhaikeji.com/admin2/`;
export const tokenName = '_hemi_token_';

if (process.env.VUE_APP_PUBLISH_ENV === 'prod') {
  apiBasePath = `//${window.location.host}/admin2/`;
}

export default {
  apiBasePath,
  tokenName
};
