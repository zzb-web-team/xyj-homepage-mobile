<template>
<div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="xy_login">
            <div class="xy_login_con">
                <div class="xy_login_h2">{{$t("loginactive.item_nav3")}}</div>
                <div class="xy_input_item">
                    <input type="text" :placeholder="$t('loginactive.item_nav4')" maxlength="11" v-model="user_tel">
                </div>
                <div class="xy_input_item">
                    <input type="text" class="active" maxlength="6":placeholder="$t('loginactive.item_nav5')" v-model="user_passwd">

                    <div v-show="show" class="login_yzm" @click="getCode">{{$t("loginactive.item_nav6")}}</div>
                    <div v-show="!show" class="login_yzm">{{count}} s</div>
                </div>
                <div class="xy_input_item">
                    <div class="login_sumit" @click="goUsercenter()">{{$t("loginactive.item_nav7")}}</div>
                </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import {
    Toast
} from 'vant';

import headers from '../../components/header'
import {
    get_code,
    login,
    get_user_info
} from '../../common/js/api.js'

export default {
    data() {
        return {
            activeNames: [],
            show: true,
            count: '',
            timer: null,
            user_tel: "",
            user_passwd: "",
            outStatus: ""
        };
    },
    mounted: function () {
        this.outStatus = localStorage.getItem('loginStatus')
        if (this.outStatus == true ||this.outStatus == "true") {
            this.$router.push({
                path: "/"
            })
        } else {
            this.$router.push({
                path: "/loginactive"
            })

        }

    },
    methods: {
        goUsercenter() {
            let param = new Object()
            param.user_passwd = this.user_passwd
            param.login_type = 2
            param.user_name = this.user_tel
            if (this.user_passwd == "") {
                Toast('请输入正确验证码')
                return false;
            }
            login(param).then(res => {
                if (res.status != 0) {
                    Toast('网络错误，请重新请求')

                } else {

                    let loginStatus = true
                    let userToken = res.data.login_token

                    localStorage.setItem('userInfo', this.user_tel)
                    localStorage.setItem('loginStatus', loginStatus)
                    localStorage.setItem('userToken', userToken)
                    this.getuserInfo()

                    this.$router.push({
                        path: "/userinfoIndex"
                    })
                }

            }).catch(error => {

                Toast('网络错误，请重新请求')

            })
        },
        getCode() {

            let param = new Object()
            param.user_tel = this.user_tel
            param.change_telnum_flag = 2,
                param.login_token = ""
            if (this.user_tel == "") {
                Toast('请输入正确手机号')

                return false;
            }
            if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.user_tel))) {
                Toast('请输入正确手机号码')

                return false;
            }
            get_code(param).then(res => {
                if (res.status == -14) {
                    Toast('操作过于频繁，请60S后重试')
                } else {
                    const TIME_COUNT = 60;
                    if (!this.timer) {
                        this.count = TIME_COUNT;
                        this.show = false;
                        this.timer = setInterval(() => {
                            if (this.count > 0 && this.count <= TIME_COUNT) {
                                this.count--;
                            } else {
                                this.show = true;
                                clearInterval(this.timer);
                                this.timer = null;
                            }
                        }, 1000)
                    }
                }

            }).catch(error => {
                Toast('网络错误，请重新请求')

            })

        },
        getuserInfo() {
            let param = new Object()
            let nowArr = ["user_name", "user_tel", "user_sex"]
            param.login_token = localStorage.getItem('userToken')
            param.login_type = 2
            param.col_name = nowArr

            get_user_info(param).then(res => {
                if (res.status != 0) {
                    this.$message({
                        message: '网络错误，请重新请求',
                        type: 'error'
                    });
                } else {

                    let userToken = res.data.login_token
                    localStorage.setItem('userToken', userToken)
                    this.username = res.data.col_value[0]
                    let nowusername = res.data.col_value[0]
                    localStorage.setItem('nowusername', nowusername)
                    this.usersex = res.data.col_value[2]
                    let nowusertel = res.data.col_value[1]
                    localStorage.setItem('nowusertel', nowusertel)
                    this.usertel = res.data.col_value[1]

                }

            }).catch(error => {
                this.$message({
                    message: '网络错误，请重新请求',
                    type: 'error'
                });

            })
        }

    },
    components: {
        headers: headers,

    }

};
</script>

<style lang="less" scoped>
.xy_login {
    width: 7.5rem;
    height: auto;
    margin: 0 auto;

    .xy_login_con {
        width: 6.5rem;
        height: auto;
        margin: 0 auto;

        .xy_login_h2 {
            color: #000000;
            font-size: 0.5rem;
            text-align: center;
            margin: 0.6rem auto;
        }

        .xy_input_item {
            width: 6.5rem;
            height: auto;

            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 0.5rem;

            .login_yzm {
                width: 1.9rem;
                height: 0.7rem;
                background: #515151;
                font-size: 0.28rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;

                outline: 1px solid rgba(81, 81, 81, 1);
                cursor: pointer;
            }

            .login_sumit {
                width: 6.45rem;
                height: 0.8rem;
                background: #515151;
                font-size: 0.28rem;
                color: #ffffff;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: -1px;
                cursor: pointer;
            }

            input {
                width: 6.4rem;
                height: 0.7rem;

                border: 1px solid rgba(81, 81, 81, 1);
                border-radius: 0.05rem;
                text-indent: 0.2rem;

                &.active {
                    width: 4.5rem;
                    border-right: none;
                }
            }

        }
    }

}
</style>
