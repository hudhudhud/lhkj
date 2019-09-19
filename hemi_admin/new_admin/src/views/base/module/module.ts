import { Message } from 'element-ui';
import { AuthApi } from '@/api';
import SysModuleResponse from '@/api/modules/SysModuleResponse';
export async function updateModuleUsingPOST(row: SysModuleResponse, cb: any) {
  const rs = await AuthApi.updateModuleUsingPOST(row);
  if (rs) {
    cb && cb(rs);
  }
}
export async function saveModuleUsingPOST(row: SysModuleResponse, cb: any) {
  const rs = await AuthApi.saveModuleUsingPOST(row);
  if (rs) {
    cb && cb(rs);
  }
}
