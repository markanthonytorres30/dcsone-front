<template>
    <div class="body-text">
        <div class="header">
            <h1>Students</h1>

            <div class="action-bar">
                <span class="material-symbols-outlined">search</span>
                <span class="material-symbols-outlined">filter_list</span>
                <button class="btn-primary" @click="startEnrollment">Enroll</button>

            </div>

            <div class="profile">
                <span class="material-symbols-outlined">account_circle</span>
                <p>user12345</p>
            </div>
        </div>
        <div class="main">
            <div class="filter">
                <h5>Search:</h5>
                <span class="tag">First Year</span>
                <span class="tag">BSIT</span>
            </div>
            <ErrorComponent v-if="error && errcode !== 'API'" :errcode="errcode" :errmessage="error"></ErrorComponent>
            <RetryPage v-if="errcode === 'API'" :page="retrypage"></RetryPage>
            <div v-if="student_list.length > 0" class="table">
                <div class="t-head">
                    <div class="th">
                        <p>Student Number</p>
                    </div>
                    <div class="th">
                        <p>Last Name</p>
                    </div>
                    <div class="th">
                        <p>First Name</p>
                    </div>
                    <div class="th">
                        <p>Middle Name</p>
                    </div>
                    <div class="th">
                        <p>Course</p>
                    </div>
                    <div class="th">
                        <p>Year Level</p>
                    </div>
                    <div class="th">
                        <p>Status</p>
                    </div>
                </div>
                <div class="t-row clickable" v-for="student in student_list" :key="student.student_number"
                    @click="gotoProfile(student)">
                    <div class="th">
                        <p>{{ student.student_number }}</p>
                    </div>
                    <div class="th">
                        <p>{{ student.lastname }}</p>
                    </div>
                    <div class="th">
                        <p>{{ student.firstname }}</p>
                    </div>
                    <div class="th">
                        <p>{{ student.middlename }}</p>
                    </div>
                    <div class="th">
                        <p>{{ student.course }}</p>
                    </div>
                    <div class="th">
                        <p>{{ getLevel(student.level) }}</p>
                    </div>
                    <div class="th">
                        <p>{{ getEnrollType(student.status) }}</p>
                    </div>
                </div>

                <div v-if="page > 0" class="t-page">
                    <span class="material-symbols-outlined p-control-left" @click="previous">arrow_back_ios</span>
                    <span>{{ cur_page }}/{{ page }}</span>
                    <span class="material-symbols-outlined p-control-right" @click="next">arrow_forward_ios</span>
                </div>
                <div v-if="page < 1" class="t-page">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import ErrorComponent from '../components/common/ErrorComponent.vue';
import RetryPage from '../components/common/RetryPage.vue';
import { getCourse, getLevel, getEnrollType, Courses_Name, YearLevel, YearLevel_Index } from '../composables/StudentUtils'


export default {
    name: "StudentsList",
    components: { ErrorComponent, RetryPage },
    setup() {
        const openTransaction = ref(null)

        const route = useRoute()
        const router = useRouter()

        const data = ref([])
        const loading = ref(true)
        const error = ref(null)
        const errcode = ref(null)


        const page = ref(0)
        const cur_page = ref(0)

        const retrypage = ref(null)



        openTransaction.value = function () {
            let enrollment = router.resolve({ name: "studentinfo" })
            window.open(enrollment.href, '_transaction', 'width=1366');
        }



        function fetchData() {
            loading.value = true

            return fetch('http://localhost:5173/dcs/student_list/all', {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }

            })
                .then(res => {
                    if (!res.ok) {
                        const error = new Error(res.statusText)
                        error.json = res.json()
                        errcode.value = "API"
                        throw error
                    }
                    return res.json();
                })
                .then(json => {
                    data.value = json
                    if (data.value.length > 10) {
                        page.value = Math.ceil(data.value.length / 10)
                        cur_page.value = 1
                    }
                    if (json.length == 0) {
                        error.value = "No data available."
                    }
                })
                .catch(err => {
                    error.value = err
                    if (err.json) {
                        return err.json.then(json => {
                            error.value.message = json.message
                            errcode.value = "API"
                        })
                    }
                })
                .then(() => {
                    loading.value = false
                })
        }

        onMounted(() => {
            fetchData()
            retrypage.value = route.name
        })


        const student_list = computed(() => {
            if (data.value.length < 11) {
                return data.value
            }
            if (page.value > 0) {
                let startIndex = (cur_page.value - 1) * 10
                let endIndex = (cur_page.value) * 10

                return data.value.slice(startIndex, endIndex)
            }
            return data.value
        })

        //const previous = ref(null)
        const previous = function () {
            if (cur_page.value > 1) {
                cur_page.value--
            }
        }

        //const next = ref(null)
        const next = function () {
            if (cur_page.value < page.value) {
                cur_page.value++
            }
        }

        const back = function () {
            router.back()
        }

        const gotoProfile = function (student) {
            router.push({ name: "studentinfo", params: { student_number: student.student_number, back } })
        }

        const startEnrollment = function () {
            window.open(router.resolve({ name: 'enrollmentstart' }).href, "_blank", "width=1366,location=0")

        }



        return {
            openTransaction, data, loading, error, student_list, page, cur_page,
            next, previous, gotoProfile, ErrorComponent, errcode, RetryPage, retrypage,
            startEnrollment, getEnrollType, getLevel
        }
    }

}
</script>

<style scoped>
.material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 20;
    font-size: 24px;
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
</style>