export const errMessageMap: Record<number, string> = {
  0: '操作失败',
  1: '操作成功',
  1002: '用户不存在',
  1003: '密码不正确',
  1004: '记录不存在',
  1005: 'license无效',
  1006: 'license已过期',
  1007: '获取主机头失败',
  1008: '主机头为空',
  1009: '主机头不合法',
  1010: '获取认证信息失败',
  1011: '请求不合法，不存在认证信息',
  1012: '请求不合法，认证失败',
  1013: '请求不合法',
  1014: '参数错误',
  1015: '名称已存在',
  1016: '管理账号已存在',
  1017: '编码已存在',
  1018: '基础配置错误',
  1019: '导出失败',
  1020: '上传内容不存在',
  1021: '上传的文件不是Excel',
  1022: '导入失败',
  1023: '下载模板不存在',
  1024: '下载文件不存在',
  1025: '版本号已存在',
  50033: '数据元素值不存在!',
  50034: '请输入用户账号',
  50035: '请输入密码',
  50036: 'LDAP认证失败',

  100000: 'EAP Exception: -0-',
  100001: '当前材料编码-0-规则不正确',
  100002: '请返回主页面，重新操作',
  100003: '条码-0-和当前批次信息不符合，条码错误',
  100004: '条码-0-不能重复扫描，条码错误',
  100005: '上次使用工单是-0-，您确定更换工单吗？',
  100006: '系统不存在当前设备-0-',
  100007: '系统不存在工单-0-的信息',
};

export const ToastMessage = (res: {message: number; data: string[]}) => {
  const errM = errMessageMap[res.message];
  const regArr = errM.match(/-[0-9]-/g);
  let newErrMessage = errM;
  if (regArr && res.data.length) {
    for (let i = 0; i < regArr.length; i++) {
      newErrMessage = newErrMessage.replace(
        new RegExp(regArr[i], 'g'),
        res.data[i],
      );
    }
    return newErrMessage;
  } else {
    return res.message;
  }
};
