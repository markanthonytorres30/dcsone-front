import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import StudentsList from '../views/StudentsList.vue'
import StudentInfo from '../views/StudentInfo.vue'
import EnrollmentStart from '../views/EnrollmentStart.vue'
import EnrollmentPayment from '../views/EnrollmentPayment.vue'
import EnrollmentConfirm from '../views/EnrollmentConfirm.vue'
import EnrollmentComplete from '../views/EnrollmentComplete.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/students',
      name: 'students',
      component: StudentsList
    },
    {
      path: '/student/:student_number',
      name: 'studentinfo',
      component: StudentInfo,
      props: true
    },
    {
      path: '/enroll',
      name: 'enrollmentstart',
      component: EnrollmentStart
    },
    {
      path: '/enroll/payment',
      name: 'enrollmentpayment',
      component: EnrollmentPayment
    },
    {
      path: '/enroll/confirm',
      name: 'enrollmentconfirm',
      component: EnrollmentConfirm,
      props: true
    },
    {
      path: '/enroll/complete',
      name: 'enrollmentcomplete',
      component: EnrollmentComplete,
      props: true
    }
  ]
})

export default router
