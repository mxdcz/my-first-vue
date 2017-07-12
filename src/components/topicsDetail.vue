<template>
    <div class="topic-detail-wrapper">
        <div class="main">
            <div class="main-head">
                <div class="main-top">
                    <!-- <span class="main-fourm">置顶</span> -->
                    <span class="main-title">{{resp.data.title}}</span>
                </div>
                <div class="main-bottom">
                    <span> 发布于 {{getLastTime(resp.data.create_at).num}}{{getLastTime(resp.data.create_at).unit}}前</span>
                    <span> 作者 {{resp.data.author.loginname}}</span>
                    <span> {{resp.data.visit_count}}次浏览</span>
                    <span> 来自 {{tabInfo[resp.data.tab]}}</span>
                </div>
            </div>
            <div class="main-content" v-html="resp.data.content"></div>
        </div>
        <div class="comments">
            <div class="reply-count">{{resp.data.replies.length}} 回复</div>
            <div class="replies-wrapper">
                <div class="replies" v-for="(item,index) in resp.data.replies">
                    <div class="author-content">
                        <a href="#">
                            <img :src="item.author.avatar_url" :title="item.author.loginname">
                        </a>
                        <div class="user-info">
                            <a href="#">{{item.author.loginname}}</a>
                            <span href="#">{{index+1}}楼•3 个月前</span>
                        </div>
                    </div>
                    <div class="reply-content" v-html="item.content"></div>
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
            tabInfo: { 'share': '分享', 'ask': '问答', 'job': '招聘' },
        }
    },
    methods: {
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
    },
    mounted() {
        this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
            .then(res => {
                console.log(res.data)
                res.data.success ? this.resp = res.data : this.resp = '后台取数据挂了.';
            })
            .catch(res => {
                this.resp = '后台取数据挂了.';
            });
    },
}
</script>

<style>
@import '../assets/markdown-github.css';
.topic-detail-wrapper {
    width: 60%;
    margin-top: 1rem;
    margin-left: 2rem;
}

.topic-detail-wrapper .main {
    background-color: #fff;
}

.topic-detail-wrapper .main .main-head {
    padding: 1rem;
}

.topic-detail-wrapper .main .main-head .main-top {
    margin: .8rem 0;
}

.topic-detail-wrapper .main .main-head .main-top .main-fourm {
    background-color: #80bd01;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    padding: .3rem;
    color: #fff;
    font-size: 1.2rem;
}

.topic-detail-wrapper .main .main-head .main-top .main-title {
    font-size: 2.2rem;
    font-weight: bold;
}

.topic-detail-wrapper .main-bottom {
    color: #838383;
}

.topic-detail-wrapper .main-bottom span::before {
    content: '•';
}

.topic-detail-wrapper .main-content {
    padding: 1rem;
    border-top: 1px solid #e5e5e5;
}

.topic-detail-wrapper .comments {
    margin: 1rem 0;
}

.topic-detail-wrapper .comments .reply-count {
    padding: 1rem;
    background-color: #f6f6f6;
    -webkit-border-radius: 3px 3px 0 0;
    -moz-border-radius: 3px 3px 0 0;
    border-radius: 3px 3px 0 0;
}

.topic-detail-wrapper .comments .replies-wrapper {
    background-color: #fff;
}

.topic-detail-wrapper .comments .replies-wrapper .replies {
    padding: 1rem;
    border-bottom: 1px solid #f0f0f0;
}

.topic-detail-wrapper .comments .replies-wrapper .replies .author-content a {
    display: inline-block;
    float: left;
    text-decoration: none;
    color: #000;
    font-weight: bold;
}

.topic-detail-wrapper .comments .replies-wrapper .replies .author-content a img {
    width: 3rem;
    height: 3rem;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
}

.topic-detail-wrapper .comments .replies-wrapper .replies .author-content .user-info {
    display: inline-block;
    margin-left: 1rem;
}

.topic-detail-wrapper .comments .replies-wrapper .replies .author-content .user-info span {
    margin-left: .5rem;
}

.topic-detail-wrapper .comments .replies-wrapper .replies .reply-content {
    margin-left: 5rem;
    padding-bottom: 1rem;
}
</style>


