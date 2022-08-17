import LoginPage from '@/view/LoginPage';
import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '@/view/RegisterPage';
// import HomePage from '@/view/HomePage';
import Employee from '@/view/Employee';
import Navigation from '@/layout/Navigation';
import NotFound from '@/view/NotFound';
import Profile from '@/view/ProFile';
const routes = [
    {
        path: '/',
        component: Navigation,
    },
    {
        path: '/login',
        component: LoginPage,
        name:'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name:'register'
    },
    {
        path: '/home',
        component: Navigation,
        name:'home',
        children: [
            {
                path: 'employee',
                name:'employee',
                component: Employee,
                beforeEnter: (to) => {
                    to.query.page = to.query.page || 1;
                }
            },
            {
                path: "profile",
                name: "profile",
                // beforeEnter:[checkRole],
                component: Profile
            }
        ]
    },
    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
    

]

// function checkRole(){
//     if(localStorage.getItem('id')%2 == 0){
//         console.log('admin');
//         return {name: 'profile' };
//     }else {
//         console.log('user');    
//         return {name: 'home'};
//     }

// }

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach(async (to, from) => {
    if (!localStorage.getItem('token')
        && to.path !== '/login'&&   to.path !== '/register'
    ) {
        console.log("hihi",router.getRoutes())
        console.log(from.name)
        return { path: '/login' }
    }     
})

export default router