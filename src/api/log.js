import ajax from '../utils/ajax'
import server from '../utils/request'

const BASE = 'http://localhost:3000/api'

export const getLogin = (data) => ajax(BASE + '/getlogin', data, 'POST');

export const getInfo = (data) => ajax(BASE + '/getinfo', data, 'GET');

// export const getallinfo = (data) => ajax(BASE + '/getinfo', data, 'post');
export function getallinfo(obj) {
    return server({
        url: '/api/getallinfo',
        method: 'post',
        data: obj
    })
}