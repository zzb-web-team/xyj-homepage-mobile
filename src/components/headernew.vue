<template>
<div>
    <div class="xy_con_head">
        <div class="item_l">
            <img src="../assets/images/head_l.png" alt="" @click="showPopup">
        </div>
        <div class="item_m">
            <img src="../assets/images/head_m.png" alt=""  @click="goLink('')">
        </div>
        <div class="item_r">
            <img src="../assets/images/head_r.png" alt=""  @click="goLink('loginactive')">
        </div>
    </div>
 
    <van-popup v-model="show" position="top">
        <div class="nav_list">
            <div class="item" @click="goLink('')">首页</div>
            <div class="item" @click="goLink('promotion')">推广计划</div>
            <div class="item" @click="goLink('problem')">常见问题</div>
            <div class="item" @click="goLink('income')">收益是什么</div>
            <div class="item" @click="goLink('parameter')">参数</div> 
             <!-- <div class="item" @click="goLink('problem')">常见问题</div>
               <! <div class="item" @click="goto('/','comment4')">首页</div>
            <div class="item item_active1" @click="goto('/','comment')">产品介绍</div>
            <div class="item" @click="returnCom7">推广计划</div>
            <div class="item" @click="goto('/','comment1')">APP下载</div>
         <div class="item" @click="returnComactive2">收益介绍</div> 

            <div class="item" @click="goto('/','comment3')">联系我们</div> -->
            <!-- <div class="item" @click="returnComactive1">登录</div> -->


        </div>
    </van-popup>
      <!-- <van-popup v-model="show" position="left" class="my_popup">
        <div class="popup_title"  @click="goLink('userinfocenter')">
            <div class="item_l"><img src="../assets/images/head_portrait.png"></div>
            <div class="item_r">
                <p>愤怒的APP</p>
                <p>15951813234</p>
            </div>
        </div>+
        <div class="nav_list">
            <div class="item" @click="goLink('problem')"> <img src="../assets/images/usercenter_01.png">常见问题</div>
            <div class="item" @click="goLink('income')"> <img src="../assets/images/usercenter_02.png">收益是什么</div>
            <div class="item" @click="goLink('parameter')"> <img src="../assets/images/usercenter_03.png">参数</div>

        </div>
    </van-popup> -->
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    mounted: function () {

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
        goParam(){
            this.$router.push({
                path:"/parameter"
            })
        },
        buying(){
            this.$router.push({
                path:"/buying"
            })
        },
        goIndex(){
            this.$router.push({
                path:"/"
            })
        },
        returnCom7(){
            this.$router.push({
                path:"/promotion"
            })
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
    margin:0 auto;
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
        margin:0 auto;

        .item_l {
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
            img {
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
        margin:0 auto;

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
                    background:#ffffff;
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
