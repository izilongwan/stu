import qs from 'qs';
import request from 'utils/request';
import { API } from './config';

export const studentLogin = (data) =>
  request({
    url: API.STUDENT_LOGIN,
    method: 'POST',
    data
  })

export const studentUpdatePwd = (data) =>
  request({
    url: API.STUDENT_UPDATE_PWD,
    method: 'POST',
    data
  })

export const studentGet = () =>
  request({
    url: API.STUDENT_GET,
    method: 'get'
  })

export const studentEdit = (data) =>
  request({
    url: API.STUDENT_EDIT,
    method: 'post',
    data: qs.stringify(data)
  })

export const studentPay = (data) =>
  request({
    url: API.STUDENT_PAY,
    method: 'post',
    data
  })
