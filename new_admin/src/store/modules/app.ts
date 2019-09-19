import Cookies from 'js-cookie';
import SysModuleResponse from '@/api/modules/SysModuleResponse';
import { AuthApi } from '@/api';

import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import store from '@/store';

export enum DeviceType { // 做比较 取值
  Mobile,
  Desktop
}
export interface IAppState {
  device: DeviceType;
  routes: SysModuleResponse[];
  cachedViews: string[];
  visitedViews: SysModuleResponse[];
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

@Module({ dynamic: true, store, name: 'app' })
class App extends VuexModule implements IAppState {
  public routes = [];
  public visitedViews: SysModuleResponse[] = [];
  public cachedViews: string[] = [];
  public sidebar = {
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false
  };
  public device = DeviceType.Desktop;

  @Action({ commit: 'TOGGLE_SIDEBAR' })
  public ToggleSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'CLOSE_SIDEBAR' })
  public CloseSideBar(withoutAnimation: boolean) {
    return withoutAnimation;
  }

  @Action({ commit: 'TOGGLE_DEVICE' })
  public ToggleDevice(device: DeviceType) {
    return device;
  }
  @Action({ commit: 'SET_ROUTES' })
  public async LoadRouter() {
    const rs = await AuthApi.loadRouterUsingGET();
    if (rs.status == 200) {
      return rs.payload;
    }
  }
  /* tagview */
  @Action({ commit: 'ADD_CACHED_VIEW' })
  public addCachedView(view: any) {
    return view;
  }
  @Action({ commit: 'ADD_CACHED_VIEW' })
  public delCachedView(view: any) {
    return view;
  }
  @Action({ commit: 'ADD_VISITED_VIEW' })
  public addVisitedView(view: any) {
    return view;
  }
  @Action({ commit: 'DEL_VISITED_VIEW' })
  public delVisitedView(view: any) {
    return view;
  }
  @Action({ commit: 'DEL_ALL_VIEWS' })
  public delAllViews() {
    return [];
  }

  @Mutation
  private TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (this.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed');
    } else {
      Cookies.set('sidebarStatus', 'opened');
    }
    this.sidebar.opened = !this.sidebar.opened;
    this.sidebar.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed');
    this.sidebar.opened = false;
    this.sidebar.withoutAnimation = withoutAnimation;
  }

  @Mutation
  private SET_ROUTES(routes: []) {
    this.routes = routes;
  }

  @Mutation
  private TOGGLE_DEVICE(device: DeviceType) {
    this.device = device;
  }
  /* tagsView */

  @Mutation
  private ADD_CACHED_VIEW(v: any) {
    if (this.cachedViews.includes(v.name)) return;
    // if (!view.meta.noCache) {
    this.cachedViews.push(v.name);
    // }
  }
  @Mutation
  private ADD_VISITED_VIEW(view: any, cb: any) {
    if (this.visitedViews.some((v: any) => v.path === view.path)) return;
    this.visitedViews.push(
      Object.assign({}, view, {
        title: view.name || 'no-name'
      })
    );
    cb && cb([...this.visitedViews]);
  }
  @Mutation
  public DEL_VISITED_VIEW(view: any) {
    for (const [i, v] of this.visitedViews.entries()) {
      if (v.path === view.path) {
        this.visitedViews.splice(i, 1);
        break;
      }
    }
  }
  @Mutation
  private DEL_CACHED_VIEW(view: any) {
    for (const i of this.cachedViews) {
      if (i === view.name) {
        const index = this.cachedViews.indexOf(i);
        this.cachedViews.splice(index, 1);
        break;
      }
    }
  }
  @Mutation
  private DEL_ALL_CACHED_VIEWS() {
    this.cachedViews = [];
  }
  @Mutation
  private DEL_ALL_VISITED_VIEWS() {
    this.visitedViews = [];
  }
  @Mutation
  public DEL_ALL_VIEWS() {
    this.visitedViews = [];
  }
}
export const AppModule = getModule(App);
