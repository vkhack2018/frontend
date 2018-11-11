const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {path: '', component: () => import('pages/Index.vue')},
      {path: 'content', component: () => import('pages/Content.vue')},
      {path: 'videos/:id', component: () => import('pages/Video.vue')}
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
