<template>
    <div class="head-wrap">
        <a class="head-logo" href="#">
            <img src="../assets/cnodejs_light.svg" title="mxdcz's first vue-project.">
        </a>
        <div class="about">
            <a href="#" v-on:click="dialogVisible =true">关于</a>
        </div>
        <div class="mask" v-if="dialogVisible">
        <div class="me">遮罩测试,这里应该也可以写成template.<button v-on:click="dialogVisible =false">X</button></div>
        </div>
    </div>
    
</template>

<script>
export default {
    data(){
        return{
            dialogVisible:false,
        }
    }
}
</script>

<style>
.head-wrap {
    width: 100%;
    height: 5rem;
    background-color: #444;
    position: relative;
}

.head-wrap .head-logo {
    width: 15rem;
    height: 100%;
    display: block;
    margin-left: 5rem;
}

.head-wrap .head-logo img {
    width: 100%;
    height: 100%;
}

.head-wrap .about {
    height: 100%;
    line-height: 5rem;
    position: absolute;
    top: 0;
    right: 2rem;
}

.head-wrap .about a {
    text-decoration: none;
    font-size: 2.2rem;
    color: #fff;
}
.mask{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 999;
}
.me{
    width: 20rem;
    height: 20rem;
    background-color: #fff;
    border: 0.2rem solid #000;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -10rem;
    margin-left: -10rem;
}
</style>


