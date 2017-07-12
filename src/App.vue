<template>
  <div id="app">
    <!--头部组件-->
    <cnode-head></cnode-head>
    <router-view></router-view>
  
  </div>
</template>

<script>
import cnodeHead from './components/head';

export default {
  components: { cnodeHead },
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-size: 10px;
  background-color: #e1e1e1;
}
</style>
