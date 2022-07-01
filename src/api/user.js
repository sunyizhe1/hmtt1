import request from '@/utils/request'

/**
 *
 * @returns 获取短信验证码
 */
export const getSmsCode = (mobile) => {
  return request({
    url: `/sms/codes/${mobile}`
  })
}

/**
 *登录
 * @param {mobile,code} param0
 * @returns promise
 */
export const login = ({ mobile, code }) => {
  return request({
    url: '/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户个人资料
 */
export const getUserInfo = () => {
  return request({

    url: 'user'
    // headers: {
    //   // Authorization: 'Bearer ' + store.state.user.token
    // }
  })
}
