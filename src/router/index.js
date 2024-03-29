import LoginPage from '@/view/LoginPage';
import {createRouter, createWebHistory} from 'vue-router'
import RegisterPage from '@/view/RegisterPage';
// import Employee from '@/view/Employee';
// import Navigation from '@/layout/Header';
// import HomePage from "@/view/HomePage";
import NotFound from "@/view/NotFound";
import Profile from '@/view/ProFile';
import EmployeeComposition from "@/view/EmployeeComposition";
import Layout from "@/layout/Layout";

const routes = [
    {
        path: '/',
        redirect: '/login',
        name: ''
    },

    {
        path: '/login',
        component: LoginPage,
        name: 'login'
    },
    {
        path: '/register',
        component: RegisterPage,
        name: 'register'
    },
    {
        path: '/home',
        component: Layout,
        redirect: 'home/employee',
        children: [

            {
                path: 'employee',
                name: 'employee',
                component: EmployeeComposition,
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
        path: "/error",
        name: "error",
        component: NotFound
    },
    {
        path:"/layout",
        name: "layout",
        component: Layout
    }


]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach(async (to, from) => {
    console.log("dang route ne", to.path)
    if (!localStorage.getItem('token')
        && to.path !== '/login' && to.path !== '/register'&&to.path != '/layout'
    ) {
        console.log("zo day dung hoong")
        console.log("hihi", router.getRoutes())
        console.log(from.name)
        return {path: '/login'}
    } else {
        console.log("tao vao day nay")
    }
    // if(!to.name){
    //     console.log("to:",to)
    //     return  { name: "error"}
    // }

})

export default router