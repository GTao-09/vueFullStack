import axios from 'axios'
import router from './router'

// 引入elementUI中loading组件,message组件
import { Loading, Message } from 'element-ui'

// 开始loading动画
let loading
function startLoading () {
  loading = Loading.service({
    lock: true,
    text: '努力加载中...',
    backgroundColor: 'rgba(0,0,0,0.7)'
  })
}
// 结束loading动画
function endLoading () {
  loading.close()
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载loading动画
  startLoading()

  if (localStorage.eleToken) {
    // 设置统一的请求header
    config.headers.Authorization = localStorage.eleToken
  }

  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 结束loading动画
  endLoading()
  return response
}, error => {
  // 错误提醒
  endLoading()
  Message.error(error.response.data)

  // 获取错误状态码 401则表示token失效
  const { status } = error.response
  if (status === 401) {
    Message.error('token失效,请重新登陆')
    // 清除token
    localStorage.removeItem('eleToken')
    // 跳转到登陆页
    router.push({ path: '/login' })
  }

  return Promise.reject(error)
})

export default axios
