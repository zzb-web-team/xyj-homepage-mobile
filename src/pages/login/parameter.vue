<template>
<div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="parameter">
            <div class="item_con1">
                <div class="item_h2">{{$t("parameter.item_nav1")}}</div>
                <div class="item_img"><img src="../../assets/images/parameter_01.png" alt=""></div>
                <div class="item_xh">
                    <div class="item_icon"></div>
                    <div class="item_text">{{$t("parameter.item_nav2")}}</div>
                </div>
            </div>
            <div class="item_con2 item_con1">
                <div class="item_h2 active">{{$t("parameter.item1_nav1")}}</div>
                <div class="item_img">
                    <div class="img_con">
                        <div class="item_boador">
                            <p><img src="../../assets/images/cpu_icon.png" alt=""></p>
                            <p class="text_active1">CPU</p>
                            <p class="text_active2">{{$t("parameter.item1_nav2")}}</p>
                        </div>
                        <div class="item_boador">
                            <p><img src="../../assets/images/cpu_icon.png" alt=""></p>
                            <p class="text_active1">RAM</p>
                            <p class="text_active2">{{$t("parameter.item1_nav3")}}</p>
                        </div>
                        <div class="item_boador">
                            <p><img src="../../assets/images/rom_icon.png" alt=""></p>
                            <p class="text_active1">ROM</p>
                            <p class="text_active2">{{$t("parameter.item1_nav4")}}</p>
                        </div>
                    </div>
                    <div class="img_con">
                        <div class="item_boador">
                            <p><img src="../../assets/images/gpu_icon.png" alt=""></p>
                            <p class="text_active1">GPU</p>
                            <p class="text_active2">{{$t("parameter.item1_nav4")}}</p>
                        </div>
                        <div class="item_boador">
                            <p><img src="../../assets/images/hd_icon.png" alt=""></p>
                            <p class="text_active1">HD</p>
                            <p class="text_active2">{{$t("parameter.item1_nav5")}}</p>
                        </div>
                        <div class="item_boador">
                            <p><img src="../../assets/images/hdmi_icon.png" alt=""></p>
                            <p class="text_active1">HDMI</p>
                            <p class="text_active2">{{$t("parameter.item1_nav6")}}</p>
                        </div>
                    </div>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con1 item_con3">
                <div class="item_h2">{{$t("parameter.item2_nav1")}}</div>
                <div class="item_img"><img src="../../assets/images/parameter_03.png" alt=""></div>
                <div class="item_xh">
                    <div class="item_text">{{$t("parameter.item2_nav2")}}1000g</div>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con1 item_con4">
                <div class="item_h2">{{$t("parameter.item3_nav1")}}</div>
                <div class="item_img item_img_active">
                    <div><img class="my_img" src="../../assets/images/parameter_01_active.png" alt=""></div>
                    <div class="item_param">
                        <p>CPU<span>{{$t("parameter.item3_nav2")}}</span></p>
                        <p>GPU<span>Mali 450</span></p>
                        <p>RAM<span>2GB DDR3</span></p>

                    </div>
                </div>

                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con5">
                <div class="item_h2">{{$t("parameter.item4_nav1")}}</div>
                <div class="item_p">
                    <p>RJ45x1<span>{{$t("parameter.item4_nav2")}}</span></p>
                    <p>USB3.0 ×2<span>{{$t("parameter.item4_nav3")}}</span></p>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con5">
                <div class="item_h2">{{$t("parameter.item5_nav1")}}</div>
                <div class="item_p">
                    <p>{{$t("parameter.item5_nav2")}}<span>DC ∮5.5mm,12V/1.5A</span></p>
                    <p>{{$t("parameter.item5_nav3")}}<span>{{$t("parameter.item5_nav4")}} </span></p>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con5">
                <div class="item_h2">{{$t("parameter.item6_nav2")}}</div>
                <div class="item_p">
                    <p>{{$t("parameter.item6_nav3")}}</p>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con5">
                <div class="item_h2">{{$t("parameter.item7_nav1")}}</div>
                <div class="item_p">
                    <p>Android7.1</p>
                </div>
                <div class="item_bottom">

                </div>
            </div>
            <div class="item_con5">
                <div class="item_h2">{{$t("parameter.item8_nav1")}}</div>
                <div class="item_p">
                    <!-- <p>{{$t("index.banner1_nav3")}}</p> -->
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
.parameter {
    width: 7.5rem;
    height: auto;
    overflow: hidden;

    .item_con1 {
        .item_bottom {
            width: 7.00rem;
            height: 1px;
            background: rgba(144, 144, 144, 1);
            opacity: 0.5;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }

        .item_img {
            margin-bottom: 0.2rem;

            img {
                width: 2.78rem;
                height: 2.66rem;
            }

        }

        .item_h2 {
            color: #242424;
            font-size: 0.36rem;
            margin: 0.5rem auto;

            &.active {
                font-size: 0.3rem;
            }
        }

        .item_xh {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 1.5rem;
            margin: 0 auto;

            .item_icon {
                width: 0.39rem;
                height: 0.39rem;
                border: 1px solid rgba(100, 100, 100, 1);
                border-radius: 50%;
                background: #23221F;
            }

            .item_text {
                font-size: 0.24rem;
                font-weight: 400;
                color: rgba(128, 128, 128, 1);
            }
        }
    }

    .item_con2 {
        margin-top: 0.2rem;
        overflow: hidden;

        .item_img {
            .img_con {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-top: 0.4rem;

                img {
                    width: 0.44rem;
                    height: 0.44rem;
                }

                .item_boador {
                    width: 1.8rem;
                    height: 1.6rem;
                    border: 1px solid rgba(128, 128, 128, 1);
                    border-radius: 0.04rem;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;

                    .text_active1 {
                        font-size: 0.22rem;

                        font-weight: bold;
                        color: rgba(0, 0, 0, 1);
                    }

                    .text_active2 {
                        font-size: 0.14rem;
                        font-weight: 500;
                        color: rgba(0, 0, 0, 1);
                    }
                }
            }
        }

        .item_bottom {
            width: 7.00rem;
            height: 1px;
            background: rgba(144, 144, 144, 1);
            opacity: 0.5;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }
    }

    .item_con3 {
        .item_img {
            margin-bottom: 0.2rem;

            img {
                width: 4.00rem;
                height: 3.35rem;
            }

        }
    }

    .item_con4 {
        .item_img_active {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            .my_img{
                width: 1.97rem;
                height: 1.97rem;
                margin-right: 0.5rem;
                margin-top: 0.2rem;
            }

            .item_param {
                display: flex;
                justify-content: flex-start;
                flex-direction: column;
                align-items: flex-start;

                p {
                    margin-top: 0.35rem;
                    color: #000000;
                    font-size: 0.23rem;
                   

                    span {
                        color: #808080;
                        margin-left: 0.2rem;
                    }
                }
            }
        }
    }

    .item_con5 {
        width: 7.5rem;
        height: auto;
        overflow: hidden;

        .item_h2 {
            width: 7.5rem;
            color: #242424;
            font-size: 0.3rem;
            margin: 0.5rem 0rem;
        }

        .item_p {
            width: 7.5rem;
            margin-bottom: 0.8rem;
            height: auto;
            overflow: hidden;
        

            p {

                color: #000000;
                font-size: 0.24rem;
                margin-top: 0.1rem;
                 
                    // width: 4rem;
                    // margin:0 auto;
                    // text-align: left;

                span {
                    color: #808080;
                    margin-left: 0.2rem;

                }
            }
        }

        .item_bottom {
            width: 7.00rem;
            height: 1px;
            background: rgba(144, 144, 144, 1);
            opacity: 0.5;
            margin: 0 auto;
            margin-bottom: 0.5rem;
            margin-top: 0.5rem;
        }
    }
}
</style>
