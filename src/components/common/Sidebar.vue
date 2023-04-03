<template>
    <div class="sidebar">
        <div class="title-item">
            <h2>Department of Computer Studies</h2>
        </div>
        <div class="menu-item">
            <h3>Enrolment</h3>
        </div>
        <div class="menu-item active">
            <h3>Students</h3>
        </div>
        <div class="menu-item">
            <h3>Activities</h3>
        </div>
        <div class="menu-item">
            <h3>Budget</h3>
        </div>
    </div>
</template>

<script>
export default {
    name: "Sidebar",
    setup() {

    }
}
</script>

<style scoped>
.menu-item.active {
    background-color: var(--color-background-selection);
}

.menu-item.active:hover {
    cursor: default;
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

h2 {
    display: inline-flex;
    align-items: center;
}

footer {
    left: 0;
}
</style>