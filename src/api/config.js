const API = {
  STUDENT_LOGIN: 'student/login',
  STUDENT_RETIREVE_PWD: 'student/retirevePwd',
  STUDENT_UPDATE_PWD: 'student/update_pwd',
  STUDENT_GET: 'student/get',
  STUDENT_EDIT: 'student/edit',
  STUDENT_PAY: 'student/pay',
  MANAGER_STUDENT_INFO_GET: 'manager/get_student_info',
  MANAGER_LOGIN: 'manager/login',
  MANAGER_REGISTER: 'manager/register',
  MANAGER_GET: 'manager/get',
  MANAGER_GET_ALL: 'manager/get_all',
  MANAGER_EDIT: 'manager/edit',
  MANAGER_REMOVE: 'manager/remove',
  MANAGER_UPDATE_PWD: 'manager/update_pwd',
  MANAGER_IMPORT_DATA: 'manager/import_data',
  DORMITORY_GET: 'dormitory/get',
  DORMITORY_EDIT: 'dormitory/edit',
  UPLOAD: `${ process.env.VUE_APP_BASE_API }/upload`,
  MAIL_SEND: 'mail/send'
}


module.exports = { API };
