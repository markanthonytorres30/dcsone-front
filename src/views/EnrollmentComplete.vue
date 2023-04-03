<template>
    <div class="header"></div>
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
                <div class="current"></div>
                <p class="bc-current">Complete</p>
            </div>
        </div>
        <h1>Enrolment Complete</h1>
        <div class="complete-icon">
            <span class="material-symbols-outlined">check_circle</span>
            <h2>
                Reference no: SEM01202306011234
            </h2>
        </div>

        <div class="action-buttons">
            <div>
                <button class="btn-primary" @click="home">Home</button>
                <button class="secondary">Print Receipt</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "EnrollmentComplete",
    setup() {
        const home = function () {
            window.opener.location.reload()
            window.close()
        }

        return { home }
    }
}
</script>

<style scoped>
.material-symbols-outlined {
    margin-top: 5px;
    margin: 10px 4px;
    font-variation-settings: "FILL" 0, "wght" 200, "GRAD" 0, "opsz" 20;
    font-size: 150px;
    color: var(--color-green);
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
</style>