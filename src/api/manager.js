import request from 'utils/request'
import { API } from './config'

export const managerLogin = (data) =>
  request({
    url: API.MANAGER_LOGIN,
    method: 'post',
    data
  })

export const managerRegister = (data) =>
  request({
    url: API.MANAGER_REGISTER,
    method: 'post',
    data
  })

export const managerGetStudentInfo = (isExport = 0) =>
  request({
    url: `${ API.MANAGER_STUDENT_INFO_GET }/${ isExport }`,
    method: 'get'
  })

export const managerEdit = (id, role) =>
  request({
    url: `${ API.MANAGER_EDIT }/${ id }`,
    method: 'post',
    data: { role }
  })

export const managerRemove = (id) =>
  request({
    url: `${ API.MANAGER_REMOVE }/${ id }`,
    method: 'delete'
  })

export const managerUpdatePwd = (data) =>
  request({
    url: API.MANAGER_UPDATE_PWD,
    method: 'post',
    data
  })

export const managerGet = () =>
  request({
    url: API.MANAGER_GET,
    method: 'get'
  })

export const managerGetAll = () =>
  request({
    url: API.MANAGER_GET_ALL,
    method: 'get'
  })

export const managerImportData = (field, data) =>
  request({
    url: `${ API.MANAGER_IMPORT_DATA }/${ field }`,
    method: 'post',
    data
  })
