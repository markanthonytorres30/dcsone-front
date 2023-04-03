<template>
    <footer class="short-footer">
        <div class="footer">
            <span>Mac Torres Systems@2023</span>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    setup() {

    }
}
</script>

<style scoped>
footer {
    height: 80px;
    width: 100%;
    position: absolute;
    display: block;
    background-color: var(--color-accent);
    color: var(--color-button-text);
    left: 0;
}

footer .footer {
    text-align: center;
    margin: 24px auto;
}
</style>