import request from 'utils/request';
import { API } from './config';

export const dormitoryGet = () =>
  request({
    url: API.DORMITORY_GET,
    method: 'get'
  })

export const dormitoryEdit = (data) =>
  request({
    url: API.DORMITORY_EDIT,
    method: 'post',
    data
  })
