const GUDIE_STEPS = [
  {
    title: '【1】登录成功',
    desc: '恭喜你成功登录报到系统'
  },
  {
    title: '【2】修改密码',
    desc: '修改密码，防止他人篡改'
  },
  {
    title: '【3】完善信息',
    desc: '填写个人的基本信息'
  },
  {
    title: '【4】缴纳学费',
    desc: '完善信息后，缴纳学费。'
  },
  {
    title: '【5】选取宿舍',
    desc: '选取自己的宿舍'
  },
  {
    title: '【6】报到完成',
    desc: '新生网上报到完成'
  }];

const STUDENT_NAV = [
  { name: '报道指南', to: 'guide', field: 'guide', icon: 'el-icon-thumb' },
  { name: '修改密码', to: 'update_pwd', field: 'update_pwd', icon: 'el-icon-key' },
  { name: '个人信息', to: 'person_info', field: 'person_info', icon: 'el-icon-user' },
  { name: '学费缴纳', to: 'fee', field: 'fee', icon: 'el-icon-files' },
  { name: '宿舍选取', to: 'dormitory', field: 'dormitory', icon: 'el-icon-s-home' }
]

const MANAGER_NAV = [
  {
    name: '图表管理', field: 'echarts', icon: 'el-icon-pie-chart', children: [
      { name: '学生图表', field: 'echarts_student', to: 'echarts/student' },
      { name: '宿舍图表', field: 'echarts_dormitory', to: 'echarts/dormitory' },
    ]
  },
  { name: '表格管理', field: 'form', icon: 'el-icon-tickets',children: [
    { name: '学生表格', field: 'form_student', to: 'form/student' },
    { name: '宿舍表格', field: 'form_dormitory', to: 'form/dormitory' },
  ] },
  { name: '表格管理', field: 'form', icon: 'el-icon-tickets' },
  { name: '修改密码', field: 'update_pwd', icon: 'el-icon-key' }
]

const SUPER_MANAGER_NAV = [
  {
    name: '图表管理', field: 'echarts', icon: 'el-icon-pie-chart', children: [
      { name: '学生图表', field: 'echarts_student', to: 'echarts/student' },
      { name: '宿舍图表', field: 'echarts_dormitory', to: 'echarts/dormitory' },
    ]
  },
  { name: '表格管理', field: 'form', icon: 'el-icon-tickets',children: [
    { name: '学生表格', field: 'form_student', to: 'form/student' },
    { name: '宿舍表格', field: 'form_dormitory', to: 'form/dormitory' },
  ] },
  { name: '数据管理', field: 'data', to: 'data', icon: 'el-icon-s-data' },
  { name: '账户管理', field: 'admin', to: 'admin', icon: 'el-icon-s-custom' },
  { name: '修改密码', field: 'update_pwd', to: 'update_pwd', icon: 'el-icon-key' }
]

module.exports = {
  TOKEN_NAME: 'sAdminToken',
  NETWORK_ERROR: '网络发生了错误',
  GUDIE_STEPS,
  STUDENT_NAV,
  MANAGER_NAV,
  SUPER_MANAGER_NAV
}
