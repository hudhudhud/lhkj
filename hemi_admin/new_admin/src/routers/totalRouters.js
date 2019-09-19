import baseRouters from './router-base';
import designerRouters from './router-designer';
import platformRouters from './router-platform';

const allRouters = baseRouters.concat(designerRouters).concat(platformRouters);
export default allRouters;
