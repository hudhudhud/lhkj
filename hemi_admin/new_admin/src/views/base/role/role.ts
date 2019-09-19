import { AuthApi } from '@/api';
import { Message } from 'element-ui';

import SysRoleVO from '@/api/modules/SysRoleVO';

/* 编辑状态 */
export async function updateStatusUsingPOST(row: SysRoleVO, state: number) {
  row.state = state;
  const rs = await AuthApi.updateRoleStatusUsingPOST(row);
  if (rs.status == 200) {
    Message.success({
      message: '操作成功'
    });
  }
}
