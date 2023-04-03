<template>
    <div class="retrypage">
        <img src="../../assets/images/server-error.svg" alt="server-error">
        <p>An error occurred. Please try again.</p>
        <button class="btn-primary" @click="retry">Retry</button>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
export default {
    name: "RetryPage",
    props: ['page', 'args'],
    setup(props) {
        const router = useRouter()
        const retry = function () {
            window.location.reload()
        }
        return { retry }
    }
}
</script>

<style scoped>
.retrypage {
    display: block;
    width: 100%;
    text-align: center;
    margin: 100px auto;
}

img {
    width: 250px;
    margin: 24px auto;
}

button {
    width: 250px;
}
</style>