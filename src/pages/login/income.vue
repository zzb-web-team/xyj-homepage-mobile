<template>
<div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="income">
            <div class="income_banner_active">
                <div class="item_text">{{$t("param.banner1_nav1")}}</div>
                <!-- <img src="../../assets/images/income_01_active.png" alt=""> -->
            </div>
            <div class="item_con1">
                <div class="item_h">{{$t("param.banner1_nav2")}}</div>
                <div class="item_text">{{$t("param.banner1_nav3")}}</div>
            </div>
            <div class="item_con1 item_con_active">
                <div class="item_h">{{$t("param.banner2_nav1")}}</div>
                <div class="item_text">
                    <p>{{$t("param.banner2_nav2")}}</p>
                    <p>{{$t("param.banner2_nav3")}}</p>
                </div>
                <div class="item_img"><img src="../../assets/images/income_02.png" alt=""></div>
            </div>
            <div class="item_con1 item_con_active1">
                <div class="item_h">{{$t("param.banner3_nav1")}}</div>
                <div class="item_text">
                    <p>{{$t("param.banner3_nav2")}}</p>
                </div>
                <div class="item_img"><img src="../../assets/images/income_03.png" alt=""></div>
            </div>
            <div class="item_con1 item_con_active2">
                <div class="item_h">{{$t("param.banner4_nav1")}}</div>
                <div class="item_text">
                    <p>{{$t("param.banner4_nav2")}}</p>
                </div>
                <div class="item_img"><img src="../../assets/images/illustrations4.png" alt=""></div>
            </div>
             <div class="item_con1 item_con_active5">
                <div class="item_h" style="font-size:0.23rem;">{{$t("param.banner5_nav1")}}</div>
                <div class="item_text">
                    <p  style="font-size:0.20rem;">{{$t("param.banner5_nav2")}}</p>
                </div>
            </div>
        </div>
        <footers></footers>

    </div>
</div>
</template>

<script>
import headers from '../../components/header'
import footers from '../../components/footer'

export default {
    data() {
        return {};
    },
    mountod: function () {},
    methods: {

    },
    components: {
        headers: headers,
        footers: footers
    }

};
</script>

<style lang="less" scoped>

.income {
    width: 7.5rem;
    height: auto;
    overflow: hidden;

    .income_banner_active {
        width: 7.5rem;
            height: 4.23rem;
        background: url('../../assets/images/income_01_active.png') no-repeat center;
        background-size:7.5rem 4.23rem; 
        display: flex;
        justify-content: center;
        align-items: center;
        .item_text{
              color: #000000;
              font-size: 0.58rem;
              font-weight: bold;

        }
      
        // img {
        //     width: 7.5rem;
        //     height: 4.23rem;
        // }
    }

    .item_con1 {
        width: 7.5rem;
        height: auto;
        overflow: hidden;

        box-sizing: border-box;

        .item_h {
            text-align: left;
            font-size: 0.35rem;
            color: #000000;
            margin: 0.37rem auto;
            width: 6.5rem;
        }

        .item_text {
            text-align: left;
            text-indent: 0.4rem;
            color: #808080;
            font-size: 0.28rem;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            width: 6.5rem;

            p {
                margin-top: 0.3rem;
                line-height: 0.4rem;
            }
        }
    }

    .item_con_active {
        background: rgba(249, 249, 249, 1);

        .item_img {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;

            img {
                width: 5.87rem;
                height: 3.9rem;
            }
        }
    }

    .item_con_active1 {
        background: #ffffff;

        .item_img {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;

            img {
                width: 6.28rem;
                height: 3.88rem;
            }
        }
    }

    .item_con_active2 {
        background: rgba(249, 249, 249, 1);

        .item_img {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;

            img {
                width: 3.49rem;
                height: 4.77rem;
            }
        }
    }

}
</style>
