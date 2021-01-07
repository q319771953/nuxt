import createPersistedState from 'vuex-persistedstate'
export default ({ store }) => {
    //如果想要等到nuxt加载完毕再执行代码,可以使用window.onNuxtReady()函数
    window.onNuxtReady(() => {
        console.log('加载了--------------------')
        createPersistedState({
            //这里表示想要将vuex数据存放到localStore里面
            // key:键名
            key: 'store',
        })(store)
    })
}