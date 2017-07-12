<template>
    <div class="mainArea">
        <div class="main-head">
            <ul>
                <li>
                    <a href="#" class="selected bdrs">全部</a>
                </li>
                <li>
                    <a href="#">精华</a>
                </li>
                <li>
                    <a href="#">分享</a>
                </li>
                <li>
                    <a href="#">问答</a>
                </li>
                <li>
                    <a href="#">招聘</a>
                </li>
                <li>
                    <a href="#">客户端测试</a>
                </li>
            </ul>
        </div>
        <div class="main-section">
            <div class="main-wrap" v-for='item in resp.data'>
                <div class="main-author">
                    <a href="#">
                        <img :src="item.author.avatar_url" :title="item.author.loginname">
                    </a>
                </div>
                <div class="main-number">
                    <span>{{item.reply_count}}</span>/
                    <span>{{item.visit_count}}</span>
                </div>
                <div class="main-forum bdrs" :class="isSelected(item)">{{getTab(item)}}</div>
                <div class="main-title">
                    <!--<a href="#" :title="item.title">{{item.title}}</a>-->
                    <router-link :to="{name:'topic',params:{id:item.id}}" :title="item.title">{{item.title}}</router-link>
                </div>
                <div class="main-right">
                    <div class="main-lasttime">
                        <span>{{getLastTime(item.last_reply_at).num}}</span>&nbsp;
                        <span>{{getLastTime(item.last_reply_at).unit}}</span>前
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            resp: {},
            limit: 0,
            tab: { 'share': '分享', 'ask': '问答', 'job': '招聘' },
        }
    },
    methods: {
        scrollMethod() {
            let sumH = document.body.scrollHeight,
                viewH = document.documentElement.clientHeight,
                scrollH = document.body.scrollTop;
            if (viewH + scrollH === sumH) {
                this.getData();
            }
        },
        getData() {
            this.limit += 10;
            this.$http({
                method: 'get',
                url: 'https://cnodejs.org/api/v1/topics',
                params: {
                    page: 1,
                    limit: this.limit,
                    mdrender: 'false',
                }
            }).then(res => {
                this.resp = res.data;
            }).catch(res => {
            });
        },
        getLastTime(jsonDate) {
            let show = {};
            let now = +new Date(),
                lastDate = +new Date(jsonDate),
                time = now - lastDate;
            let m = ~~(time / 1000 / 60),
                h = ~~(time / 1000 / 60 / 60),
                d = ~~(time / 1000 / 60 / 60 / 24),
                month = ~~(time / 1000 / 60 / 60 / 24 / 30);

            if (month > 0) {
                show.num = month;
                show.unit = '月';
            } else if (d > 0) {
                show.num = d;
                show.unit = '天';
            } else if (h > 0) {
                show.num = h;
                show.unit = '小时';
            } else if (m > 0) {
                show.num = m;
                show.unit = '分钟';
            } else {
                show.num = '几';
                show.unit = '秒钟';
            }

            return show;
        },
        getTab(obj) {
            if (obj.top) {
                return '置顶';
            } else {
                return obj.good ? '精华' : this.tab[obj.tab];
            }
        },
        isSelected(obj) {
            if (obj.top || obj.good) {
                return 'selected';
            } else {
                if (!obj.tab) { return }
                return 'no-selected';
            }
        },

    },
    created() {
        this.getData();
    },
    mounted() {
        window.addEventListener('scroll', this.scrollMethod);
    },
}
</script>

<style>
.mainArea {
    
    width: 60%;
    background-color: #fff;
    margin-top: 1rem;
    margin-left: 2rem;
}
.mainArea .main-head {
    width: 100%;
    padding: 1rem 0;
    font-size: 1.5rem;
    background-color: #f6f6f6;

    display: flex;
    flex-flow: row wrap;
    align-items: center;
}

.mainArea .main-head ul {
    list-style: none;
    margin-left: 2rem;
}

.mainArea .main-head ul li {
    float: left;
    margin-right: 2rem;
}

.mainArea .main-head ul li a {
    height: 1.5rem;
    font-size: 1.5rem;
    text-decoration: none;
    color: #80bd01;
}

.mainArea .main-head ul li a:hover {
    color: #005580;
}

.selected {
    color: #fff!important;
    background-color: #80bd01!important;
}

.no-selected {
    color: #999999!important;
    background-color: #e5e5e5!important;
}

.mainArea .main-section {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.bdrs {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: .2rem;
}

.mainArea .main-section .main-wrap {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 4rem;
    position: relative;
    background-color: #fff;
    border-bottom: 1px solid #f6f6f6;
}

.mainArea .main-section .main-wrap:hover {
    background-color: #f6f6f6;
}

.mainArea .main-author {
    width: 3rem;
    height: 3rem;
    margin-right: .5rem;
}

.mainArea .main-author a {
    display: inline-block;
    height: 3rem;
}

.mainArea .main-author a img {

    height: 3rem;
}

.mainArea .main-number {
    color: #aaa;
    font-size: 1.5rem;
    margin-right: .5rem;
    width: 7rem;
    text-align: center;
}

.mainArea .main-forum {
    width: 3rem;
    font-size: 1.3rem;
    text-align: center;
    margin-right: .5rem;

    position: relative;
    left: 0rem;
}

.mainArea .main-wrap .main-title {
    width: 38rem;
    margin-right: .5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.mainArea .main-wrap .main-title a {
    color: #000;
    font-size: 1.6rem;
    text-decoration: none;
}

.mainArea .main-wrap .main-title a:hover {
    text-decoration: underline;
}

.mainArea .main-right {
    height: 2rem;
    /*display: flex;
    flex-flow: row nowrap;*/
}

.mainArea .main-lasttime {
    width: 5rem;
    text-align: right;
}
</style>


