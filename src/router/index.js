import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "@/components/Login"
import SecureComponent from "@/components/Secure"
import RegisterComponent from "@/components/Register"
import SubjectComponent from "@/components/Subject"
import ProfileComponent from "@/components/Profile"
import TodoComponent from "@/components/Todo"
import CalendarComponent from "@/components/Calendar"

Vue.use(Router)

export default new Router({
  routes: [
    {
        path: '/',
        redirect: {
            name: "login"
        }
    },
    {
        path: "/login",
        name: "login",
        component: LoginComponent
    },
    {
        path: "/secure",
        name: "secure",
        component: SecureComponent
    },
    {
        path: "/register",
        name: "register",
        component: RegisterComponent
    },
    {
        path: "/subject",
        name: "subject",
        component: SubjectComponent
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileComponent
    },
        {
        path: "/todo",
        name: "todo",
        component: TodoComponent
    },
        {
        path: "/calendar",
        name: "calendar",
        component: CalendarComponent
    }
  ]
})
