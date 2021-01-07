module.exports = {
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            routes.splice(0)
            routes.push(...[{
                path: '/',
                component: resolve(__dirname, 'pages/layout'),
                children: [{
                    path: '',
                    name: 'home',
                    component: resolve(__dirname, 'pages/home'),
                },
                {
                    path: '/login',
                    name: 'login',
                    component: resolve(__dirname, 'pages/login'),
                },
                {
                    path: '/register',
                    name: 'register',
                    component: resolve(__dirname, 'pages/login'),
                },
                {
                    path: '/proFile/:username',
                    name: 'userProfile',
                    component: resolve(__dirname, 'pages/proFile'),
                },
                {
                    path: '/setting',
                    name: 'setting',
                    component: resolve(__dirname, 'pages/setting'),
                },
                {
                    path: '/edit',
                    name: 'edit',
                    component: resolve(__dirname, 'pages/edit'),
                },
                {
                    path: '/article/:slug',
                    name: 'articleCom',
                    component: resolve(__dirname, 'pages/article'),
                }]
            }])
        }
    },
    plugins: ['~/plugins/request.js', '~/plugins/dayjs.js'],
    server: {
        host: '0.0.0.0',
        port: 3389
    }
}