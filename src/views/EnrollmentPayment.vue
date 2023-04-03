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
                <div></div>
                <p>Confirm</p>
            </div>

            <div class="bc">
                <div></div>
                <p>Complete</p>
            </div>
        </div>
        <h1>Payment</h1>
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
                    <p>Required</p>
                </div>
                <div class="th">
                    <p>Amount Paid</p>
                </div>
            </div>
            <div v-for="fee in fee_input" :key="fee.name" class="t-row">
                <div class="td">
                    <p>{{ fee.fee.name }}</p>
                </div>
                <div class="td">
                    <p>{{ fee.fee.amount }} PHP</p>
                </div>
                <div class="td">
                    <p v-if="fee.fee.required">Yes</p>
                </div>
                <div class="td"><input :class="{ error: !fee.isValid }" type="number" name="" id="" v-model="fee.amount"
                        :required="fee.fee.required" />
                </div>

            </div>

            <div class="t-foot">
                <div class="th">
                    <p>Total Amount Paid</p>
                </div>
                <div class="th"></div>
                <div class="th"></div>
                <div class="th">
                    <p>{{ total_amount }} PHP</p>
                </div>
            </div>
        </div>

        <p class="txt-notes">
            ※ Verify that all entered information are accurate.
        </p>

        <div class="action-buttons">
            <div>
                <button class="btn-primary" @click="confirm">Confirm</button>
                <button class="btn-secondary" @click="skip">Skip Payment</button>
                <a class="action-link" @click="home">Go to Home</a>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { api_fetch, api_fetch2 } from '../composables/DCSAPIHandler'
import { useRouter } from 'vue-router'
import { useEnrollmentStore } from '@/stores/enrollmentStore'


export default {
    name: "EnrollmentPayment",
    setup() {
        const fee_list = ref([])
        const error = ref(null)
        const router = useRouter()
        const fee_input = ref([])

        const enroll_store = useEnrollmentStore()


        console.log(enroll_store.getData)

        onMounted(() => {

            if (enroll_store.getPayment !== null) {
                fee_input.value = enroll_store.getPayment
            } else {
                let studentInfo = enroll_store.getData.studentInfo
                let entype = enroll_store.getData.enrollType
                api_fetch2('http://localhost:5173/dcs/fees/inquiry', { "type": "0", "en_type": entype, "date": "20230314", "student_number": studentInfo.student_number })
                    .then((res) => {
                        fee_list.value = res.data
                        error.value = res.error

                        fee_input.value = res.data.map(fee => { return { "fee": fee, "amount": "", "isValid": true } })

                        if (res.error !== null) {

                        }
                    }).catch((err) => {
                        error.value = err
                        console.log(err)
                    })
            }


        })

        const back = function () {
            enroll_store.clearPayment()
            router.back()
        }

        const total_amount = computed(() => {
            let total = 0
            fee_input.value.map((fee) => { total = total + fee.amount })

            return total
        })

        const confirm = function () {
            if (validate(fee_input)) {
                enroll_store.savePayment(fee_input.value)
                router.push({ name: "enrollmentconfirm" })
            }



        }

        const validate = function (form) {
            let isValid = true
            form.value.forEach(element => {
                element.isValid = true
                if (element.amount === "") {
                    element.amount = 0
                }
                if (element.fee.required && (element.amount < 0 || element.amount === "" || element.amount === null)) {
                    element.isValid = false
                    isValid = false
                    return
                }

                if (element.amount > element.fee.amount) {
                    element.isValid = false
                    isValid = false
                    return
                }


            });

            return isValid
        }

        const skip = function () {
            enroll_store.clearPayment
            router.push({ name: "enrollmentconfirm" })
        }

        const home = function () {
            enroll_store.clearPayment
            window.close()
        }

        return { fee_list, back, fee_input, total_amount, confirm, skip, home }
    }
}
</script>

<style scoped>
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
</style>