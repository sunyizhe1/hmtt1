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

/**
 *获取用户个人资料
 * @returns
 */
export const getUserProfile = () => {
  return request({
    url: 'user/profile'
  })
}

/**
 *
 * @param {对象} profile
 * @returns 更新用户个人资料
 */
export const updateUserProfile = profile => {
  return request({
    method: 'PATCH',
    url: 'user/profile',
    data: profile
  })
}

/**
 *
 * @param {裁剪之后的头像数据} data
 * @returns 更新头像的接口
 */
export const updateAvatar = data => {
  return request({
    method: 'PATCH',
    url: '/user/photo',
    data
  })
}
