<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/common/Sidebar.vue';
import Footer from './components/common/Footer.vue';
import { getScreenType } from './composables/ScreenTypes';
import { onMounted, ref, computed } from 'vue';
import NavBar from './components/common/NavBar.vue';


const router = useRouter()
const route = useRoute()



const scType = computed(() => {
  return getScreenType(route.name)
})



</script>

<template>
  <Sidebar v-if="scType === 1"></Sidebar>
  <NavBar v-else-if="scType === 2"></NavBar>

  <RouterView />
  <Footer></Footer>
</template>

<style scoped>
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
