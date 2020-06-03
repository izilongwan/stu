import { TOKEN_NAME } from 'config'
import jwtDecode from 'jwt-decode'
import tools from '../utils/tools'
// import VueRouter from 'vue-router'
// import Vue from 'vue'

const Login = () => import('views/Login.vue')
const RetirevePwd = () => import('views/RetirevePwd.vue')
const NotFound = () => import('views/Home/Sub/404.vue')
const Home = () => import('views/Home/Index')
const StudentGuide = () => import('views/Home/Student/Guide')
const StudentPersonInfo = () => import('views/Home/Student/PersonInfo')
const StudentDormitory = () => import('views/Home/Student/Dormitory')
const StudentFee = () => import('views/Home/Student/Fee')
const ManagerEchartsStudent = () => import('views/Home/Manager/EchartsStudent')
const ManagerEchartsDormitory = () => import('views/Home/Manager/EchartsDormitory')
const ManagerFormStudent = () => import('views/Home/Manager/FormStudent')
const ManagerFormDormitory = () => import('views/Home/Manager/FormDormitory')
const ManagerData = () => import('views/Home/Manager/Data')
const ManagerAdmin = () => import('views/Home/Manager/Admin')
const UpdatePwd = () => import('views/Home/Sub/UpdatePwd')

Vue.use(VueRouter)

const studentRoute = [
  {
    path: '/student/guide',
    name: 'guide',
    component: StudentGuide,
    meta: {
      title: '报道指南',
      index: 2,
      access: ['student']
    }
  },
  {
    path: '/student/update_pwd',
    name: 'update_pwd',
    component: UpdatePwd,
    meta: {
      title: '修改密码',
      index: 3,
      access: ['student']
    }
  },
  {
    path: '/student/person_info',
    name: 'person_info',
    component: StudentPersonInfo,
    meta: {
      title: '个人信息',
      index: 4,
      access: ['student']
    }
  },
  {
    path: '/student/fee',
    name: 'fee',
    component: StudentFee,
    meta: {
      title: '学费缴纳',
      index: 5,
      access: ['student']
    }
  },
  {
    path: '/student/dormitory',
    name: 'dormitory',
    component: StudentDormitory,
    meta: {
      index: 6,
      title: '宿舍选取',
      access: ['student']
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '页面不见了',
      index: 10
    }
  }
]

const managerRoute = [
  {
    path: '/manager/echarts/student',
    name: 'echarts_student',
    component: ManagerEchartsStudent,
    meta: {
      index: 1,
      title: '图表 · 学生管理',
      access: ['manager', 'super_manager']
    }
  },
  {
    path: '/manager/echarts/dormitory',
    name: 'echarts_dormitory',
    component: ManagerEchartsDormitory,
    meta: {
      index: 2,
      title: '图表 · 宿舍管理',
      access: ['manager', 'super_manager']
    },
  },
  {
    path: '/manager/form/student',
    name: 'form_student',
    component: ManagerFormStudent,
    meta: {
      title: '表格 · 学生管理',
      index: 3,
      access: ['manager', 'super_manager']
    },
  },
  {
    path: '/manager/form/dormitory',
    name: 'form_dormitory',
    component: ManagerFormDormitory,
    meta: {
      title: '表格 · 宿舍管理',
      index: 4,
      access: ['manager', 'super_manager']
    },
  },
  {
    path: '/manager/data',
    name: 'data',
    component: ManagerData,
    meta: {
      title: '数据管理',
      index: 6,
      access: ['super_manager']
    }
  },
  {
    path: '/manager/admin',
    name: 'admin',
    component: ManagerAdmin,
    meta: {
      title: '账户管理',
      index: 7,
      access: ['super_manager']
    }
  },
  {
    path: '/manager/update_pwd',
    name: 'update_pwd',
    component: UpdatePwd,
    meta: {
      title: '修改密码',
      index: 10,
      access: ['manager', 'super_manager']
    }
  },
  {
    path: '*',
    name: '_404',
    title: '页面不见了',
    component: NotFound,
    meta: { index: 10 }
  }
];

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { index: 0 },
    redirect: '/login'
  },
  {
    path: '/student',
    name: 'student',
    component: Home,
    meta: { index: 1 },
    redirect: '/student/guide',
    children: studentRoute
  },
  {
    path: '/manager',
    name: 'manager',
    redirect: '/manager/echart',
    meta: { index: 1 },
    component: Home,
    children: managerRoute
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/retirevePwd',
    name: 'retirevePwd',
    component: RetirevePwd,
    meta: { index: 1 }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const decodeRole = () => {
  let role = null;
  try {
    const token = localStorage.getItem(TOKEN_NAME),
      user = jwtDecode(token);

    role = user.role;
  } catch (err) {
    console.log('err', err)
  }
  return role;
}

router.beforeEach(({ name }, from, next) => {
  if (name === 'login' || name === 'retirevePwd') {
    next();
  } else {
    const token = localStorage.getItem(TOKEN_NAME);
    const role = decodeRole(token);

    if (role) {
      const access = tools.accessRoutes(routes, role, name);
      access ? next() : next('/404');

    } else {
      next('/login');
    }
  }
})

export default router
