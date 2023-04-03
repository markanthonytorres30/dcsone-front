<template>
    <div class="body-text">
        <div class="header">

            <div class="h-title">
                <span class="material-symbols-outlined header-back" @click="back">arrow_back</span>
                <h1>Student Profile</h1>
            </div>
            <div class="action-bar">
                <button class="btn-secondary">Delete</button>
                <button v-if="!edit_mode" class="btn-primary" @click="edit">Edit</button>
                <button v-else class="btn-primary" @click="save">Save</button>
            </div>

            <div class="profile">
                <span class="material-symbols-outlined">account_circle</span>
                <p>user12345</p>
            </div>
        </div>
        <div class="main">
            <ErrorComponent v-if="error && errcode !== 'API'" :errcode="errcode" :errmessage="error"></ErrorComponent>
            <RetryPage v-if="errcode === 'API'"></RetryPage>
            <div v-if="student">
                <h2>Student Information </h2>
                <div class="student-information">

                    <div class="student-img">
                        <img src="profile.jpeg" alt="">
                        <button class="btn-secondary">Upload Photo</button>
                    </div>

                    <div class="txt-confirm">
                        <div>
                            <p class="outline">Student Number</p>
                            <span>{{ student.student_number }}</span>
                        </div>
                        <div>
                            <p class="outline">Last Name</p>
                            <input v-if="edit_mode" type="text" name="lastname" id="" v-model="data.lastname">
                            <span v-else>{{ student.lastname }}</span>
                        </div>
                        <div>
                            <p class="outline">First Name</p>
                            <input v-if="edit_mode" type="text" name="lastname" id="" v-model="data.firstname">
                            <span v-else>{{ student.firstname }}</span>
                        </div>
                        <div>
                            <p class="outline">Middle Name</p>
                            <input v-if="edit_mode" type="text" name="lastname" id="" v-model="data.middlename">
                            <span v-else>{{ student.middlename }}</span>
                        </div>
                        <div>
                            <p class="outline">Date of Birth</p>
                            <input v-if="edit_mode" type="date" name="lastname" id="" v-model="data.birthdate">
                            <span v-else>{{ formatDate(student.birthdate) }}</span>
                        </div>
                        <div>
                            <p class="outline">Email</p>
                            <input v-if="edit_mode" type="date" name="email" id="" v-model="data.email">
                            <span v-else>{{ student.email }}</span>
                        </div>
                    </div>

                </div>
                <h2>Course Information</h2>
                <div class="txt-confirm">
                    <div>
                        <p class="outline">Course</p>
                        <select v-if="edit_mode" name="student_course" id="" class="pc-2" v-model="selected_course">

                            <option v-for="course in options_course" :key="course" :value="course">
                                {{ course }}
                            </option>

                        </select>
                        <span v-else>{{ getCourse(student.course) }}</span>
                    </div>

                    <div>
                        <p class="outline">Year Level</p>
                        <select v-if="edit_mode" name="student_level" id="" class="pc-4" v-model="selected_level">
                            <option v-for="level in options_level" :key="level" :value="level">
                                {{ level }}
                            </option>

                        </select>
                        <span v-else>{{ getLevel(student.level) }}</span>
                    </div>
                    <div>
                        <p class="outline">Status</p>
                        <span>{{ getEnrollType(student.status) }}</span>
                    </div>
                </div>

                <h2>Transactions</h2>

                <div class="tab-area">
                    <div class="tabs">
                        <div class="tab active"><span>Fees</span>
                            <div class="under-bar"></div>
                        </div>
                        <div class="tab"><span>Activities</span>
                            <div class="under-bar"></div>
                        </div>
                        <div class="tab"><span>History</span>
                            <div class="under-bar"></div>
                        </div>
                    </div>
                    <div class="tab-content">
                        <div class="table" name="fees">
                            <div class="t-head">
                                <div class="th"><span>Date</span></div>
                                <div class="th"><span>Receipt Number</span></div>
                                <div class="th"><span>Fee Name</span></div>
                                <div class="th"><span>Amount</span></div>
                                <div class="th"><span>Amount Paid</span></div>
                                <div class="th"><span>Status</span></div>
                            </div>
                            <div class="t-row">
                                <div class="th">Mar 01, 2023 10:20</div>
                                <div class="th">00001111222</div>
                                <div class="th">INTEL Fee</div>
                                <div class="th">200.00 PHP</div>
                                <div class="th">200.00 PHP</div>
                                <div class="th">Full</div>
                            </div>
                            <div class="t-row">
                                <div class="th">Mar 01, 2023 10:20</div>
                                <div class="th">02320324234</div>
                                <div class="th">Council Fee</div>
                                <div class="th">150.00 PHP</div>
                                <div class="th">100.00 PHP</div>
                                <div class="th">Partial</div>
                            </div>
                            <div class="t-row">
                                <div class="th">Mar 01, 2023 10:20</div>
                                <div class="th">00001111222</div>
                                <div class="th">INTEL Fee</div>
                                <div class="th">200.00 PHP</div>
                                <div class="th">200.00 PHP</div>
                                <div class="th">Full</div>
                            </div>
                            <div class="t-row">
                                <div class="th">Mar 01, 2023 10:20</div>
                                <div class="th">02320324234</div>
                                <div class="th">Council Fee</div>
                                <div class="th">150.00 PHP</div>
                                <div class="th">100.00 PHP</div>
                                <div class="th">Partial</div>
                            </div>
                            <div class="t-page">
                                <span class="material-symbols-outlined p-control-left">arrow_back_ios</span>
                                <span>1 / 20</span>
                                <span class="material-symbols-outlined p-control-right">arrow_forward_ios</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { api_fetch, api_post_student_info } from '../composables/DCSAPIHandler'
import { formatDate, normalCase } from '../composables/ComUtils'
import { getCourse, getLevel, Courses_Name, YearLevel, YearLevel_Index, getEnrollType } from '../composables/StudentUtils'
import { useRouter } from 'vue-router'
import ErrorComponent from '../components/common/ErrorComponent.vue'
import RetryPage from '../components/common/RetryPage.vue'

export default {
    name: "StudentInfo",
    props: ['student_number'],
    components: { ErrorComponent, RetryPage },
    setup(props) {
        const data = ref(null)

        const error = ref(null)
        const loading = ref(true)
        const router = useRouter()
        const options_course = ref(Object.values(Courses_Name))
        const options_level = ref(Object.values(YearLevel))


        const selected_course = ref(null)
        const selected_level = ref(null)

        const edit_mode = ref(false)

        const errcode = ref(null)

        onMounted(() => {
            //students
            api_fetch('http://localhost:5173/dcs/student/' + props.student_number)
                .then((res) => {
                    data.value = res.data
                    error.value = res.error
                    loading.value = res.loading
                    selected_course.value = getCourse(data.value.course)
                    selected_level.value = getLevel(data.value.level)

                    if (res.error !== null) {
                        errcode.value = "API"
                        data.value = null
                    }
                }).catch((err) => {
                    data.value = null
                    errcode.value = "API"
                    error.value = err
                })

        })

        const student = computed(() => {
            return data.value
        })

        const back = function () {
            router.back()
        }

        const edit = function () {
            edit_mode.value = !edit_mode.value
        }

        const save = function () {
            let course_index = Object.values(Courses_Name).indexOf(selected_course.value)
            let course = Object.keys(Courses_Name)[course_index]

            let level = YearLevel_Index[selected_level.value]

            data.value.course = course
            data.value.level = level

            api_post_student_info("http://localhost:5173/dcs/student/update/" + data.value.student_number, data.value)
                .then((res) => {
                    if (res.error === null) {
                        edit_mode.value = !edit_mode.value
                    } else {
                        console.log(res.error)
                    }
                })


        }



        return {
            data, error, loading, formatDate, getCourse, getLevel, normalCase, back, edit, edit_mode, options_course, options_level, selected_course
            , selected_level, save, errcode, ErrorComponent, RetryPage, student, getEnrollType
        }
    }
}
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 20;
    font-size: 24px;
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

.menu-item.active {
    background-color: var(--color-background-selection);
}

.menu-item.active:hover {
    cursor: default;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
}

.body-text>.header {
    margin-top: 0px;
}

.body-text>.main {
    display: block;
    width: 100%;
    margin: 0px auto;
    padding: 0px 24px 24px 24px;
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

/*Only in Complete screen*/
.task {
    padding-top: 16px;
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

.t-row.clickable:hover {
    background-color: var(--color-background-selection);
    color: var(--color-background);
    cursor: pointer;
}

.t-page {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 18px;
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

.complete-icon {
    width: 100%;
    text-align: center;
    color: var(--color-green);
}

.p-control-left:hover,
.p-control-right:hover {
    color: var(--color-background-selection);
    cursor: pointer;
    background-color: var(--color-background-secondary);
    padding: 8px;
    border-radius: 8px;
}

.p-control-left,
.p-control-right {
    padding: 8px;
    border-radius: 8px;
}

.profile>.material-symbols-outlined {
    font-size: 48px;
}

.action-bar .material-symbols-outlined {
    font-size: 36px;
    padding: 6px;
}

.action-bar .material-symbols-outlined:hover {
    color: var(--color-background-selection);
    cursor: pointer;
    background-color: var(--color-background-secondary);

    border-radius: 8px;
}

.profile {
    display: inline-flex;
    align-items: center;
    padding-right: 8px;
    border-radius: 8px;
}

.profile:hover {
    color: var(--color-background-selection);
    cursor: pointer;
    background-color: var(--color-background-secondary);
}

.action-bar {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 24px;
    margin: 0px 24px;
}

.action-bar>button:active {
    margin-left: 6px;
}

.tag {
    font-size: 12px;
    padding: 4px;
    background-color: var(--color-gray);
    color: var(--color-background);
    margin: 5px;
    border-radius: 8px;
}

.filter {
    display: inline-flex;
    align-items: center;
}

/*Student Profile*/
.h-title {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: 100%;
}

.h-title>.header-back {
    font-size: 48px;
    border-radius: 8px;
}

.h-title>.header-back:hover {
    font-size: 48px;
    background-color: var(--color-background-secondary);
    cursor: pointer;
}

.tab-area {
    display: block;
}

.tab-area>.tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.tab-area>.tabs>.tab {
    text-align: center;
    width: 100%;
    padding: 16px 0px;
    border-radius: 8px;
    margin: 4px 0px;
}

.tab-area>.tabs>.tab:hover {
    cursor: pointer;
}


.tab-area>.tabs>.tab.active>.under-bar {
    background-color: var(--color-accent);
}

.tab-area>.tabs>.tab>.under-bar {
    height: 4px;
    margin: 4px;
}

.tab-area>.tabs>.tab:hover>.under-bar {
    background-color: var(--color-background-selection);
    cursor: pointer;
}

.student-img {
    display: block;
    width: 400px;
    text-align: center;
}

.student-img>button {
    width: 300px;
    margin-top: 8px;
}

.student-img>img {
    margin: 0px auto;
    border-radius: 8px;
    width: 300px;
    height: 300px;
}




.student-information {
    display: inline-flex;
    width: 100%;
    gap: 8px;
}

.student-information>.txt-confirm {
    width: 100%;

}

.material-symbols-outlined.edit {
    font-size: 28px;
    padding: 8px 16px;
    margin: 0px 4px;
    border-radius: 8px;
    color: var(--color-green);
}

.material-symbols-outlined.edit:hover {
    background-color: var(--color-background-secondary);
    cursor: pointer;
}

h2 {
    display: inline-flex;
    align-items: center;
}

footer {
    left: 0;
}
</style>