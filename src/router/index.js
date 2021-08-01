import { createRouter, createWebHistory } from 'vue-router'
import { projectAuth } from "../firebase/config"
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '../views/playlists/PlaylistDetails.vue'
import UserPlaylist from '../views/playlists/UserPlaylist.vue'

// route guard
const requireAuth = ( to, from, next ) => {
  let user = projectAuth.currentUser
  console.log('current user in auth guard:', user)
  if (!user) {
    next({ name: 'Login'})
  } else {
    next()
  }
}

const requiredNoAuth = ( to, from, next ) => {
  let user = projectAuth.currentUser
  if (user) {
    next({ name: 'Home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/playlist/create',
    name: 'CreatePlaylist',
    component: CreatePlaylist,
    beforeEnter: requireAuth
  },
  {
    path: '/playlist/:id',
    name: 'PlaylistDetails',
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/playlist/user',
    name: 'UserPlaylist',
    component: UserPlaylist,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
