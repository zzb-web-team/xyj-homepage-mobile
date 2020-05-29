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
            <img src="../assets/images/head_r.png" alt="" @click="goLink('loginactive')">
        </div>
    </div>
    <van-popup v-model="show" position="top">
        <div class="nav_list">
            <div class="item" @click="goLink('problem')">常见问题</div>
            <div class="item" @click="goLink('income')">收益是什么</div>
            <div class="item" @click="goLink('parameter')">参数</div>

        </div>
    </van-popup>
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
        showPopup() {
            this.show = true;
        },
        goLink(a) {
            this.show = false;
            this.$router.push({
                path: "/" + a
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
            width: 7.5rem;
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

                &.active {
                    width: 1.13rem;
                    height: 0.46rem;
                    background: rgba(36, 36, 36, 1);
                    border-radius: 0.23rem;
                    color: #FFFFFF;
                    font-size: 0.3rem;
                    line-height: 0.46rem;
                    text-align: center;

                }
            }
        }

    }
}
</style>
