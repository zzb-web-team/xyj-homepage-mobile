<template>
<div>
    <headers></headers>
    <div class="userinfo_center" style="margin-top:0.8rem;">
        <div class="userinfo_center_con">
            <div class="item">
                <div class="item_l">昵称</div>
                <div class="item_r">{{username}}</div>
            </div>
            <div class="item">
                <div class="item_l">性别</div>
                <div class="item_r">{{usersex}}</div>
            </div>
            <div class="item">
                <div class="item_l">手机号</div>
                <div class="item_r">{{usertel}}</div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    Toast
} from "vant";

import headers from '../../components/userHead'
import footers from '../../components/footer'
import {
    get_user_info
} from '../../common/js/api.js'
export default {
    data() {
        return {
            show: false,
            username: "",
            usersex: "",
            usertel: ""
        }
    },
    mounted: function () {
        this.getuserInfo()

    },
    methods: {
        getuserInfo() {
            let param = new Object()
            let nowArr = ["user_name", "user_tel", "user_sex"]
            param.login_token = localStorage.getItem('userToken')
            param.col_name = nowArr
            param.login_type = 2

            get_user_info(param).then(res => {
                console.log(res)
                if (res.status != 0) {
                    Toast("网络错误，请重新请求")

                } else {
                    this.username = res.data.col_value[0]
                    let nowusername=res.data.col_value[0]
                    localStorage.setItem('nowusername', nowusername)
                    this.usersex = res.data.col_value[2]
                    let nowusertel=res.data.col_value[1]
                    localStorage.setItem('nowusertel', nowusertel)
                    this.usertel = res.data.col_value[1]
                }

            }).catch(error => {
                Toast("网络错误，请重新请求")

            })
        },

    },

    components: {
        headers: headers
    },
}
</script>

<style lang="less" scoped>
.userinfo_center {
    width: 7.5rem;
    height: auto;
    overflow: hidden;
    background: rgba(249, 249, 249, 1);

    .userinfo_center_con {
        width: 7.5rem;
        height: auto;
        margin: 0.3rem auto;
        background: #ffffff;

        .item {
            width: 7.0rem;
            height: 0.88rem;
            background: rgba(255, 255, 255, 1);
            margin: 0 auto;
            border-bottom: 1px solid #F1F6F5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0rem 0.15rem;
            box-sizing: border-box;

            .item_l {
                color: #525252;
                font-size: 0.3rem
            }

            .item_r {
                color: #808080;
                font-size: 0.28rem;
            }
        }
    }
}
</style>
