<template>
    <div class="navbar">
        <div class="title-item">
            <h2>Department of Computer Studies</h2>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    setup() {

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
</style>