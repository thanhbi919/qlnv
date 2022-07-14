import LoginPage from './view/LoginPage';
import { createRouter, createWebHistory } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import RegisterPage from './view/RegisterPage';
import HomePage from './view/HomePage';
import Employee from './view/Employee';
const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/home',
        component: HelloWorld
    },
 
    {
        path: '/employee',
        component: Employee
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router