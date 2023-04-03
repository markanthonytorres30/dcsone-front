<template>
    <div class="error">
        <div>
            <span class="material-symbols-outlined">error</span>
            <p>{{ errmsg }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
export default {
    name: 'ErrorComponent',
    props: ['errcode', 'errmessage'],
    setup(props) {

        const errmsg = ref(null)

        if (props.errcode === "API") {
            errmsg.value = "Server Error. Please Try again."
        } else {
            errmsg.value = props.errmessage
        }

        return { errmsg }
    }
}
</script>

<style>
.error>div {
    display: inline-flex;
    align-items: center;
    background-color: #f7bcbc;
    padding: 8px;
    width: 100%;
    border-radius: 8px;
    gap: 16px;
}

.error>div>span {
    font-size: 36px;
    padding-left: 24px;
}
</style>