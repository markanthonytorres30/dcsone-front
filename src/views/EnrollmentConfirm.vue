<template>
    <div class="header">
        <a @click="back"><span class="material-symbols-outlined">arrow_back_ios</span>Previous
            Page</a>
    </div>
    <div class="main">
        <div class="task">
            <h3>Enrolment</h3>
        </div>
        <div class="breadcrumb">
            <div class="bc">
                <div class="current"></div>
                <p class="bc-current">Input</p>
            </div>
            <div class="bc">
                <div class="current"></div>
                <p class="bc-current">Payment</p>
            </div>

            <div class="bc">
                <div class="current"></div>
                <p class="bc-current">Confirm</p>
            </div>

            <div class="bc">
                <div></div>
                <p>Complete</p>
            </div>
        </div>
        <h1>Confirm Details</h1>
        <h2>Type of Enrolment</h2>
        <div class="txt-confirm">
            <p>{{ en_type }}</p>
        </div>
        <h2>Student Number</h2>
        <div class="txt-confirm">
            <p>{{ student_info.student_number }}</p>
        </div>

        <h2>Student Information</h2>
        <div class="txt-confirm">
            <div>
                <p class="outline">Last Name</p>
                <span>{{ student_info.lastname }}</span>
            </div>
            <div>
                <p class="outline">First Name</p>
                <span>{{ student_info.firstname }}</span>
            </div>
            <div>
                <p class="outline">Middle Name</p>
                <span>{{ student_info.middlename }}</span>
            </div>
            <div>
                <p class="outline">Date of Birth</p>
                <span>{{ formatDate(student_info.birthdate) }}</span>
            </div>
        </div>

        <h2>Course Information</h2>
        <div class="txt-confirm">
            <div>
                <p class="outline">Course</p>
                <span>{{ getCourse(student_info.course) }}</span>
            </div>

            <div>
                <p class="outline">Year Level</p>
                <span>{{ getLevel(student_info.level) }}</span>
            </div>
        </div>

        <h2>Fees</h2>
        <div class="table">
            <div class="t-head">
                <div class="th">
                    <p>Fee Name</p>
                </div>
                <div class="th">
                    <p>Amount</p>
                </div>
                <div class="th">
                    <p>Amount Paid</p>
                </div>
            </div>
            <div v-for="fee_info in payment_info" :key="fee_info.fee" class="t-row">
                <div class="td">
                    <p>{{ fee_info.fee.name }}</p>
                </div>
                <div class="td">
                    <p>{{ fee_info.fee.amount }} PHP</p>
                </div>
                <div class="td">
                    <p v-if="fee_info.amount !== ''">{{ fee_info.amount }} PHP</p>
                    <p v-else>Not paid</p>
                </div>
            </div>
            <div class="t-foot">
                <div class="th">
                    <p>Total Amount Paid</p>
                </div>
                <div class="th"></div>
                <div class="th">
                    <p>{{ total }} PHP</p>
                </div>
            </div>
        </div>

        <p class="txt-notes">
            ※ Verify that all entered information are accurate.
        </p>

        <div class="action-buttons">
            <div>
                <button class="btn-primary" @click="enroll">Enroll</button>
                <a class="action-link" @click="home">Go to Home</a>
            </div>
        </div>
    </div>
</template>

<script>
import { useEnrollmentStore } from '@/stores/enrollmentStore'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatDate, normalCase } from '../composables/ComUtils'
import { getCourse, getLevel, getEnrollType, Courses_Name, YearLevel, YearLevel_Index } from '../composables/StudentUtils'
import { api_post_student_info } from '../composables/DCSAPIHandler'

export default {
    name: "EnrollmentConfirm",
    setup() {
        const enroll_store = useEnrollmentStore()
        const router = useRouter()

        const student_info = ref({
            student_number: "",
            firstname: "",
            lastname: "",
            middlename: "",
            course: "",
            level: 0,
            status: 0,
            birthdate: "",
            email: ""
        })
        const payment_info = ref([])
        const total = ref(0)
        const en_type = ref("")

        console.log(enroll_store.getData)

        onMounted(() => {

            if (enroll_store.getData !== null && enroll_store.getPayment !== null) {
                student_info.value = enroll_store.getData.studentInfo
                payment_info.value = enroll_store.getPayment
                en_type.value = getEnrollType(enroll_store.getData.enrollType)
            } else {
                alert("Session expired. Please return to previous page.")
                router.push({ name: "enrollmentstart" })
            }


            payment_info.value.forEach((e) => {
                total.value = total.value + (e.amount === "" ? 0 : e.amount)
            })

        })


        const back = function () {
            router.back()
        }

        const home = function () {
            enroll_store.clearAll
            window.close()
        }

        const enroll = function () {
            console.log({ entype: enroll_store.getData.enrollType, studentInfo: student_info.value, payment: payment_info.value })
            api_post_student_info("http://localhost:5173/dcs/enroll/execute?entype=" + enroll_store.getData.enrollType, { studentInfo: student_info.value, payment: payment_info.value })
                .then((res) => {
                    if (res.data !== "") {
                        router.push({ name: "enrollmentcomplete" })
                    }
                })
        }

        return { student_info, payment_info, en_type, getCourse, getLevel, formatDate, total, back, home, enroll }

    }
}
</script>

<style>
.material-symbols-outlined {
    margin-top: 5px;
    margin: 10px 4px;
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48;
}

.navbar {
    height: 100px;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    padding: 15px;
    background-color: var(--color-accent);
    color: var(--color-button-text);
}

footer {
    height: 80px;
    width: 100%;
    position: absolute;
    display: block;
    background-color: var(--color-accent);
    color: var(--color-button-text);
}

footer .footer {
    text-align: center;
    margin: 24px auto;
}

.navbar .title-item {
    display: block;
}

.navbar .active {
    background-color: var(---color-background-selection);
}

.header {
    display: block;
    margin-top: 100px;
}

.main {
    display: block;
    width: 1024px;
    margin: 0px auto;
    /*border: 1px dotted blue;*/
}

a>span {
    display: inline-flex;
    align-items: baseline;
    margin: 10px auto;
}

a {
    padding: 8px;
    display: inline-flex;
    align-items: center;
}

.radio-group {
    padding: 0px 5px;
    display: grid;
}

.rdo {
    display: inline-flex;
    align-items: center;
    margin: 6px 0;
}

.input-group div {
    width: 100%;
    display: grid;
    gap: 5px;
    margin-bottom: 8px;
}

.action-buttons>div {
    width: 256px;
    margin: 36px auto;
    text-align: center;
}

.action-buttons>div>button {
    width: 250px;
    margin: 8px auto;
}

.action-link {
    color: var(--color-gray);
}

.breadcrumb {
    display: inline-flex;
    gap: 5px;
    width: 100%;
}

.bc {
    width: 100%;
    text-align: center;
    color: var(--color-gray);
}

.bc>div {
    width: 100%;
    height: 3px;
    background-color: var(--color-gray);
}

.bc>div.current {
    background-color: var(--color-accent);
}

.bc>p.bc-current {
    color: var(--color-accent);
}

.task {
    text-align: center;
}

.table {
    width: 100%;
    padding: 0px 4px;
    display: grid;
    gap: 8px;
}

.table>.t-head,
.t-row,
.t-foot {
    width: 100%;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
}

.th,
.td {
    width: 100%;
}

.t-row {
    background-color: var(--color-background-secondary);
    border-radius: 8px;
}

.action-buttons>div>button:active {
    width: 249px;
    margin-bottom: 10px;
}

.txt-confirm {
    background-color: var(--color-background-secondary);
    border-radius: 8px;
    padding: 10px 18px;
}

.txt-confirm>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

p.outline {
    font-weight: var(--font-weight-bold);
}
</style>