import {
  VuexModule,
  Module,
  MutationAction,
  Mutation,
  Action,
  getModule
} from 'vuex-module-decorators';
import { login, logout, getUserInfo } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/auth';
import store from '@/store';
import router from '@/routers/router';
import UserLoginResponse from '@/api/modules/UserLoginResponse';
import SysUserResponse from '@/api/modules/SysUserResponse';
import { AuthApi } from '@/api';
import { Message } from 'element-ui';

export interface IUserState {
  loginRes: UserLoginResponse;
  token: string;
  user: SysUserResponse;
  name: string;
  avatar: string;
  roles: string[];
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = '';
  public loginRes!: UserLoginResponse;
  public user = new SysUserResponse();
  public name = '';
  public avatar = '';
  public roles = ['d1f649df-6917-4079-925f-b9fed628ba38'];

  @Action({ commit: 'SET_LOGINRES' })
  public async Login(userInfo: {
  username: string;
  password: string;
  code: string;
  verifyId: string;
  }) {
    const username = userInfo.username.trim();
    const { payload, status, error } = await AuthApi.loginUsingPOST(userInfo);
    if (status == 200) {
      sessionStorage.setItem('token', payload.token);
      return payload;
    } else {
      // Message.error(error);
    }
  }

  @Action({ commit: 'SET_TOKEN' })
  public async FedLogOut() {
    await AuthApi.loginOutUsingGET();
    sessionStorage.removeItem('token');
    return '';
  }
  @Action({ commit: 'SET_USER' })
  public async refreshUserInfo() {
    // 有token的,刷新用户信息到state
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 没有token,跳转登录
      router.replace('/login');
    } else {
      const rs = await AuthApi.getUserInfoUsingGET();
      if (rs && rs.status === 200 && rs.payload) {
        // 获取成功,set到state,并加载菜单
        // this.loadMenu()
        return rs.payload;
      } else {
        // 获取失败,跳转登录
        Message.error(rs.error);
        router.replace('/login');
      }
    }
  }

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token;
  }
  @Mutation
  public SET_USER(user: SysUserResponse) {
    console.log('res');
    this.user = user;
  }
  @Mutation
  private SET_LOGINRES(loginRes: UserLoginResponse) {
    this.user = loginRes.user;
    this.token = loginRes.token;
    this.loginRes = loginRes;
  }
}

export const UserModule = getModule(User);
