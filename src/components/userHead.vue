<template>
<div class="user_head">
    <div class="user_head_con">
        <div class="item_l">
            <img src="../assets/images/head_l.png" alt="" @click="showPopup">
        </div>
        <div class="item_m">
            <img src="../assets/images/head_m.png" alt="" @click="goBackindex()">
        </div>
        <div class="item_r"></div>
    </div>
    <van-popup v-model="show" position="left" class="my_popup">
        <div class="popup_title" @click="goLink('userinfocenter')">
            <div class="item_l"><img src="../assets/images/head_portrait.png"></div>
            <div class="item_r">
                <p>{{usernameText}}</p>
                <p>{{usertelText}}</p>
            </div>
        </div>
        <div class="nav_list">
            <div class="item" @click="goLink('userinfoIndex')"> <img src="../assets/images/pandect_icon.png">{{$t("userHead.item_nav1")}}</div>
            <div class="item" @click="goLink('managementnew')"> <img src="../assets/images/usercenter_01.png">{{$t("userHead.item_nav2")}}</div>
            <div class="item" @click="goLink('bill')"> <img src="../assets/images/usercenter_02.png">{{$t("userHead.item_nav3")}}</div>
            <div class="item" @click="goLinkout()"> <img src="../assets/images/usercenter_03.png">{{$t("userHead.item_nav4")}}</div>

        </div>
    </van-popup>
</div>
</template>

<script>
import {
    Toast
} from 'vant';
import {
    logout
} from '../common/js/api.js'
export default {
    data() {
        return {
            show: false,
            usernameText: "",
            usertelText: ""
        }

    },
    mounted: function () {
            this.$i18n.locale = localStorage.getItem('langActives')
        if (this.$i18n.locale == null) {
            this.$i18n.locale = "zh"
        }
        this.usernameText = localStorage.getItem('nowusername')

        this.usertelText = localStorage.getItem('nowusertel')

    },
    methods: {
        showPopup() {
            this.show = true;
        },
        goLink(a) {
            this.show = false;
            this.$router.push({
                path: "/" + a
            })

        },
        goBackindex() {
            this.$router.push({
                path: "/"
            })

        },
        goLinkout() {
            let param = new Object()
            param.login_token = localStorage.getItem('userToken')
            // param.login_type = 2

            logout(param).then(res => {
                if (res.status = -17) {
                    let loginStatus = ""
                    localStorage.setItem('loginStatus', loginStatus)
                    this.$router.push({
                        path: "/"
                    })
                } else if (res.status = 0) {
                    let loginStatus = ""
                    let nowusername = ""
                    let nowusertel = ""
                    localStorage.setItem('loginStatus', loginStatus)
                    localStorage.setItem('nowusername', nowusername)
                    localStorage.setItem('nowusertel', nowusertel)
                    this.$router.push({
                        path: "/"
                    })
                }

            }).catch(error => {
                if (res.status != 0) {
                    this.$message({
                        message: '网络错误，请重新请求',
                        type: 'error'
                    });
                }

            })
        }
    },

}
</script>

<style lang="less" scoped>
.my_popup {
    width: 3.9rem;
    height: 100%;
    background: #383838;

    .popup_title {
        width: 3.9rem;
        height: 1.67rem;
        background: rgba(36, 36, 36, 1);
        display: flex;
        justify-content: space-around;
        align-items: center;

        .item_l {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 1.05rem;
                height: 1.05rem;
            }

        }

        .item_r {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            color: #DDDDDD;
            font-size: 0.3rem;
        }
    }

    .nav_list {
        width: 100%;
        height: auto;
        overflow: hidden;

        .item {
            width: 100%;
            height: 0.8rem;

            display: flex;
            align-items: center;
            text-indent: 0.2rem;
            color: #ffffff;
            font-size: 0.3rem;

            img {
                width: 0.44rem;
                height: 0.44rem;
                margin-left: 0.3rem;
            }

        }

    }
}

// .van-popup--top {
//     top: 0.8rem;

// }

.user_head {
    width: 7.5rem;
    height: 0.8rem;
    background: #242424;
    z-index: 30000;
    position: fixed;
    top: 0;

    .user_head_con {
        width: 6.8rem;
        height: 0.8rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item_l {
            img {
                width: 0.44rem;
                height: 0.44rem;

            }
        }

        .item_m {
            font-size: 14px;
            color: #ffffff;

            img {
                width: 1.11rem;
                height: 0.41rem;
            }

        }
    }

}
</style>
