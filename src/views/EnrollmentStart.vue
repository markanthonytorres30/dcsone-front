<template>
    <div class="header">
        <a @click="home"><span class="material-symbols-outlined">arrow_back_ios</span>Home</a>
    </div>
    <div class="main">
        <form action="#">
            <div class="task">
                <h3>Enrolment</h3>
            </div>
            <div class="breadcrumb">
                <div class="bc">
                    <div class="current"></div>
                    <p class="bc-current">Input</p>
                </div>
                <div class="bc">
                    <div></div>
                    <p>Payment</p>
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
            <ErrorComponent v-if="error && errcode !== 'API'" :errcode="errcode" :errmessage="error"></ErrorComponent>
            <h1>Student Information Input</h1>
            <h2>Type of Enrollment</h2>
            <div class="radio-group">
                <div class="rdo">
                    <input type="radio" name="enrolment_type" id="enrol_new" :value="enType.NEW.val" v-model="en_type"
                        @change="reset(en_type)" />
                    <label for="enrol_new">{{ enType.NEW.label }}</label>
                </div>
                <div class="rdo">
                    <input type="radio" name="enrolment_type" id="enrol_continue" :value="enType.CONTINUING.val"
                        v-model="en_type" @change="reset(en_type)" />
                    <label for="enrol_continue">{{ enType.CONTINUING.label }}</label>
                </div>
                <div class="rdo">
                    <input type="radio" name="enrolment_type" id="enrol_returnee" :value="enType.RETURNEE.val"
                        v-model="en_type" @change="reset(en_type)" />
                    <label for="enrol_returnee">{{ enType.RETURNEE.label }}</label>
                </div>
                <div class="rdo">
                    <input type="radio" name="enrolment_type" id="enrol_transferee" :value="enType.TRANSFEREE.val"
                        v-model="en_type" @change="reset(en_type)" />
                    <label for="enrol_transferee">{{ enType.TRANSFEREE.label }}</label>
                </div>
            </div>
            <h2>Student Number</h2>
            <div class="input-group">
                <input type="text" name="" class="snumber pc-4" :class="{ error: !form_validation.student_number.isValid }"
                    id="" v-model="student_detail.student_number" maxlength="10" required />
                <button v-if="en_type === 2 || en_type === 3" class="btn-primary"
                    @click.prevent="findStudent(student_detail.student_number)">Find</button>
            </div>

            <h2>Student Information</h2>
            <div class="input-group inline">
                <div>
                    <label for="student_lastname">Last Name</label>
                    <input type="text" name="student_lastname" id="" v-model="student_detail.lastname"
                        :class="{ error: !form_validation.lastname.isValid }" required />
                </div>
                <div>
                    <label for="student_firstname">First Name</label>
                    <input type="text" name="student_firstname" id="" v-model="student_detail.firstname"
                        :class="{ error: !form_validation.firstname.isValid }" required />
                </div>
                <div>
                    <label for="student_middlename">Middle Name</label>
                    <input type="text" name="student_middlename" id="" v-model="student_detail.middlename"
                        :class="{ error: !form_validation.middlename.isValid }" required />
                </div>
            </div>
            <div class="input-group">
                <div>
                    <label for="student_birthday">Date of Birth</label>
                    <input type="date" name="student_birthday" id="" class="pc-4" v-model="student_detail.birthdate"
                        :class="{ error: !form_validation.birthdate.isValid }" required />
                </div>
            </div>
            <div class="input-group">
                <div>
                    <label for="student_birthday">Email</label>
                    <input type="email" name="student_email" id="" class="pc-2" v-model="student_detail.email"
                        :class="{ error: !form_validation.email.isValid }" required />
                </div>
            </div>

            <h2>Course Information</h2>
            <div class="input-group">
                <div>
                    <label for="student_course">Course</label>
                    <select name="student_course" id="" class="pc-2" v-model="selected_course"
                        :class="{ error: !form_validation.course.isValid }" required>
                        <option v-for="course in options_course" :key="course" :value="course">
                            {{ course }}
                        </option>
                    </select>

                    <label for="student_level">Year Level</label>
                    <select name="student_level" id="" class="pc-4" v-model="selected_level"
                        :class="{ error: !form_validation.level.isValid }" required>
                        <option v-for="level in options_level" :key="level" :value="level">
                            {{ level }}
                        </option>
                    </select>
                </div>
            </div>

            <p class="txt-notes">
                ※ Verify that all entered information are accurate.
            </p>

            <div class="action-buttons">
                <div>
                    <button class="btn-primary" @click.prevent="next">Next</button>
                    <a class="action-link" onclick="window.close()">Cancel</a>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { EnrollmentTypeName, EnrollmentTypeRadio, getCourse, getLevel, Courses_Name, YearLevel, getLevelCode, getCourseCode } from '../composables/StudentUtils'
import { api_fetch } from '../composables/DCSAPIHandler'
import { isDate } from '../composables/ComUtils'
import { useEnrollmentStore } from '@/stores/enrollmentStore'
import { useRouter } from 'vue-router'
import ErrorComponent from '../components/common/ErrorComponent.vue'

export default {
    name: "EnrollmentStart",
    components: { ErrorComponent },
    setup() {
        const enrollment_type = ref(1)
        const enType = ref(EnrollmentTypeRadio)
        const en_type = ref(1)

        const data = null
        const error = ref(null)
        const errcode = ref(null)

        const selected_course = ref("")
        const selected_level = ref("")

        const options_course = ref(Object.values(Courses_Name))
        const options_level = ref(Object.values(YearLevel))

        const student_enrolled = ref(false)

        const enrollStore = useEnrollmentStore()
        const router = useRouter()

        const student_detail_obj = {
            student_number: "",
            firstname: "",
            lastname: "",
            middlename: "",
            course: "",
            level: 0,
            status: 0,
            birthdate: "",
            email: ""
        }

        const form_validation = ref({
            student_number: { isValid: true, error: null },
            firstname: { isValid: true, error: null },
            lastname: { isValid: true, error: null },
            middlename: { isValid: true, error: null },
            course: { isValid: true, error: null },
            level: { isValid: true, error: null },
            status: { isValid: true, error: null },
            birthdate: { isValid: true, error: null },
            email: { isValid: true, error: null }
        })

        const validation = computed(() => {
            return form_validation.value
        })


        const student_detail = ref(student_detail_obj)
        if (enrollStore.getData !== null) {
            student_detail.value = enrollStore.getData.studentInfo
            en_type.value = enrollStore.getData.enrollType
            selected_course.value = getCourse(enrollStore.getData.studentInfo.course)
            selected_level.value = getLevel(enrollStore.getData.studentInfo.level)
        }



        const student_info = computed(() => {
            return student_detail.value
        })

        const reset_validation = function () {
            form_validation.value = {
                student_number: { isValid: true, error: null },
                firstname: { isValid: true, error: null },
                lastname: { isValid: true, error: null },
                middlename: { isValid: true, error: null },
                course: { isValid: true, error: null },
                level: { isValid: true, error: null },
                status: { isValid: true, error: null },
                birthdate: { isValid: true, error: null },
                email: { isValid: true, error: null }
            }
        }

        const findStudent = function (student_number) {
            reset_validation(form_validation.value)

            if (student_number === "") {
                console.log("empty")
                form_validation.value.student_number.isValid = false
                form_validation.value.student_number.error = "Please enter a valid student number."
                return
            }
            api_fetch('http://localhost:5173/dcs/student/' + student_number)
                .then((res) => {
                    student_detail.value.lastname = res.data.lastname
                    student_detail.value.firstname = res.data.firstname
                    student_detail.value.middlename = res.data.middlename
                    student_detail.value.course = res.data.course
                    student_detail.value.level = res.data.level
                    student_detail.value.birthdate = res.data.birthdate
                    student_detail.value.email = res.data.email
                    student_detail.value.status = res.data.status
                    error.value = res.error
                    selected_course.value = getCourse(res.data.course)
                    selected_level.value = getLevel(res.data.level)

                    if (res.data.student_number === "") {
                        error.value = "Student number does not exist."
                        en_type.value = 1
                    }

                    if (res.error !== null) {
                        errcode.value = "API"
                        data.value = null

                    }
                }).catch((err) => {
                    data.value = null
                    errcode.value = "API"
                    error.value = err
                })
        }

        const student_exists = function (student_number) {
            let exists = false
            return api_fetch('http://localhost:5173/dcs/student/' + student_number)
                .then((res) => {
                    if (res.data.student_number !== "") {
                        return true
                    }

                    if (res.data.student_number === "") {

                        return false
                    }

                    if (res.error !== null) {
                        error.value = res.error
                    }
                }).catch((err) => {
                    error.value = err
                })


        }


        const reset = function (en_type) { }


        const next = function () {
            student_detail.value.course = getCourseCode(selected_course.value)
            student_detail.value.level = getLevelCode(selected_level.value)
            error.value = null
            student_exists(student_detail.value.student_number)
                .then((res) => {

                    if (error.value !== "" && error.value !== null) {
                        console.log(error.value)
                        return
                    }
                    if (res) {
                        if (en_type.value === 1 || en_type.value === 4) {
                            error.value = "Student already exists. Please change enrollment type."
                            return
                        }
                    } else {
                        if (en_type.value !== 1 && en_type.value !== 4) {
                            console.log("Errror")
                            error.value = "Student is either NEW or Transferee. Please change enrollment type."
                            return
                        }
                    }
                    student_detail.value.status = en_type.value

                    if (!validate(form_validation, student_detail)) return

                    enrollStore.save({ enrollType: en_type.value, studentInfo: student_detail.value })

                    router.push({ name: "enrollmentpayment" })
                }).catch((err) => {

                    return
                })




        }

        const validate = function (validator, form) {
            const emailRegex = new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/, "gm");

            validator.value.student_number.isValid = form.value.student_number !== null && form.value.student_number !== "" && form.value.student_number.length === 10
            validator.value.lastname.isValid = form.value.lastname !== null && form.value.lastname !== "" && form.value.lastname.length < 50
            validator.value.firstname.isValid = form.value.firstname !== null && form.value.firstname !== "" && form.value.firstname.length < 50
            validator.value.birthdate.isValid = form.value.birthdate !== null && form.value.birthdate !== "" && isDate(form.value.birthdate)
            validator.value.course.isValid = form.value.course !== null && form.value.course !== ""
            validator.value.level.isValid = form.value.level !== null && form.value.level !== ""
            validator.value.email.isValid = form.value.email == null || form.value.email == "" || emailRegex.test(form.value.email)

            return validator.value.student_number.isValid && validator.value.lastname.isValid && validator.value.firstname.isValid && validator.value.birthdate.isValid
                && validator.value.course.isValid && validator.value.level.isValid && validator.value.email.isValid



        }

        const home = function () {
            window.close()
        }

        return {
            enrollment_type, enType, en_type, getCourse, getLevel, selected_course,
            selected_level, student_info, student_detail, findStudent, options_course, options_level, reset,
            next, form_validation, home, ErrorComponent, error, errcode
        }
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

.snumber {
    margin: 2px auto;
}
</style>