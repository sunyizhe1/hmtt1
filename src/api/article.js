import request from '@/utils/request'

/**
 *根据id查文章
 * @param {*} article_id
 * @returns
 */
export const getArticle = (article_id) => {
  return request({
    url: `/articles/${article_id}`
  })
}

/**
 * 添加用户
 */
export const addUser = (target) => {
  return request({
    method: 'POST',
    url: 'user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消用户
 */
export const delUser = (target) => {
  return request({
    url: `user/followings/${target}`,
    method: 'DELETE'

  })
}

/**
 *收藏文章
 * @param {*文章id} target
 * @returns
 */
export const addCollect = (target) => {
  return request({
    method: 'POST',
    url: 'article/collections',
    data: {
      target
    }
  })
}

/**
 *取消收藏
 * @param {*} target
 * @returns
 */
export const delCollect = (target) => {
  return request({
    method: 'DELETE',
    url: `article/collections/${target}`
  })
}
