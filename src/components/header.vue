<template>
<div>
    <div class="xy_con_head">
        <div class="item_l">
            <img src="../assets/images/head_l.png" alt="" @click="showPopup">
        </div>
        <div class="item_m">
            <img src="../assets/images/head_m.png" alt="" @click="goLink('')">
        </div>
        <div class="item_r">
            <img v-show="!loginStatus" src="../assets/images/head_r.png" alt="" @click="goLink('loginactive')">
            <img v-show="loginStatus" src="../assets/images/timg1.png" alt="" id="userImg" @click="goLink('userinfoIndex')">
        </div>
    </div>
    <!-- <div class="xy_con_buy">
        <div class="item_l" @click="goIndex()">西柚机</div>
        <div class="item_con">

            <div class="item_r" @click="goParam()">参数</div>
            <div class="item_r active"  @click="buying()">购买</div>
        </div>
    </div> -->
    <van-popup v-model="show" position="top">
        <div class="nav_list">
            <div class="item" @click="goLink('')">{{$t("hearer.item_nav1")}}</div>
            <div class="item" @click="goLink('promotion')">{{$t("hearer.item_nav2")}}</div>
            <div class="item" @click="goLink('problem')">{{$t("hearer.item_nav3")}}</div>
            <div class="item" @click="goLink('income')">{{$t("hearer.item_nav4")}}</div>
            <div class="item" @click="goLink('parameter')">{{$t("hearer.item_nav5")}}</div>
            <div class="item" @click="changelang()">{{langText}}</div>
        </div>
    </van-popup>

</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            loginStatus: false,
            langStatus: false,
            langActives: "zh",
            langText: "简体中文"
        }
    },
    mounted: function () {
        this.loginStatus = localStorage.getItem('loginStatus')
        if (this.loginStatus == null) {
            this.loginStatus = false
        }
     
           this.langActives = localStorage.getItem('langActives')
        if (this.langActives == null) {
            this.langText = "English"
        }

    },
    methods: {
        goto(page, selectId) {
            var path = page;
            var selectId = selectId;
            localStorage.setItem("toId", selectId);
            this.$router.push({
                path: path
            })
        },
        showPopup() {
            this.show = true;
        },
        goLink(a) {
            this.show = false;
            this.$router.push({
                path: "/" + a
            })

        },
        goParam() {
            this.$router.push({
                path: "/parameter"
            })
        },
        buying() {
            this.$router.push({
                path: "/buying"
            })
        },
        goIndex() {
            this.$router.push({
                path: "/"
            })
        },
        returnCom7() {
            this.$router.push({
                path: "/promotion"
            })
        },
        changelang() {
          
            this.show = false;
            this.langStatus = !this.langStatus
            if (this.langStatus == true) {
                this.langActives = 'en'
                this.langText = "简体中文"
                this.$i18n.locale = this.langActives
                let nowlangActive = localStorage.setItem('langActives', this.langActives)

            } else {
                this.langActives = 'zh'
                this.langText = "Englisn"
                this.$i18n.locale = this.langActives
                let nowlangActive = localStorage.setItem('langActives', this.langActives)
            }

        }
    }
}
</script>

<style lang="less" scoped>
.van-popup--top {
    top: 0.8rem;

    .nav_list {
        width: 7.5rem;
        height: auto;
        overflow: hidden;
        margin: 0 auto;

        .item {
            width: 100%;
            height: 0.8rem;
            border-bottom: 1px solid #ebedf0;
            display: flex;
            align-items: center;
            text-indent: 0.2rem;
            color: #969799,
        }

    }
}

.xy_con {
    width: 7.5rem;
    height: 100%;
    overflow: auto;
    margin: 0 auto;

    .xy_con_text {
        width: 7.5rem;
        height: auto;
        margin: 0 auto;
    }

    .xy_con_head {
        width: 7.5rem;
        height: 0.8rem;
        background: #242424;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;

        .item_l {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 0.44rem;
                height: 0.44rem;
                margin-left: 0.33rem;
            }
        }

        .item_m {
            img {
                width: 1.11rem;
                height: 0.41rem;
            }
        }

        .item_r {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 0.44rem;
                height: 0.44rem;
                margin-right: 0.33rem;
            }

            #userImg {
                width: 0.44rem;
                height: 0.44rem;
                margin-right: 0.33rem;
            }
        }
    }

    .xy_con_buy {
        width: 7.5rem;
        height: 0.8rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.3rem;
        color: #242424;
        margin: 0 auto;

        .item_l {
            margin-left: 0.33rem;
        }

        .item_con {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            //  margin-right: 0.33rem;
            .item_r {
                margin-right: 0.4rem;
                width: 1.13rem;
                height: 0.46rem;
                background: #ffffff;
                border-radius: 0.23rem;

                font-size: 0.3rem;
                margin-right: 0.4rem;
                line-height: 0.46rem;
                text-align: center;

                &:hover {
                    width: 1.13rem;
                    height: 0.46rem;
                    background: rgba(36, 36, 36, 1);
                    border-radius: 0.23rem;
                    color: #FFFFFF;
                    font-size: 0.3rem;
                    margin-right: 0.4rem;
                    line-height: 0.46rem;
                    text-align: center;

                }
            }
        }

    }
}
</style>
