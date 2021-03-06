import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'

const Home = () => import('@/views/Home')
const Video = () => import('@/views/Video')
const Question = () => import('@/views/Question')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home, name: 'home' },
      { path: 'video', component: Video, name: 'video' },
      { path: 'question', component: Question, name: 'question' },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  { path: '/login', component: Login },
  { path: '/search', component: () => import('@/views/Search'), name: 'search' },
  { path: '/article/:article_id', component: () => import('@/views/Article'), name: 'article', props: true },
  { path: '/user', component: () => import('@/views/User'), name: 'user' }
]

const router = new VueRouter({
  routes
})

export default router
