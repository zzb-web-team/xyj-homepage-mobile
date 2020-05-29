<template>
<div class="users" style="margin-top:0.8rem;">
    <headers></headers>
    <div class="user_nav">
        <div class="user_nav_t user_nav_t_active">
            <div class="item_title">
                <p> <img src="../../assets/images/userinfo_03.png" alt="">{{$t("phoneIncome.item_nav7")}}</p>
            </div>
            <div class="item_con item_con_active1">
                <div class="item">
                    <p class="p1">{{$t("phoneIncome.item_nav1")}}</p>
                    <!-- <p class="p2">{{dq_income}}<span>POC</span></p> -->
                    <p class="p2">{{dq_income}}</p>

                </div>
                <div class="item">
                    <p class="p1">{{$t("phoneIncome.item_nav2")}}</p>
                    <!-- <p class="p2">{{zr_income}}<span>POC</span></p> -->
                    <p class="p2">{{zr_income}}</p>

                </div>
                <div class="item" @click="goLink()">
                    <p class="p1">{{$t("phoneIncome.item_nav3")}}</p>
                    <!-- <p class="p2">{{all_income}}<span>POC</span></p> -->
                    <p class="p2">{{all_income}}</p>

                </div>
            </div>
        </div>
        <div class="user_nav_t user_nav_t_active1">
            <div class="item_title item_title_active">
                <p class="active_p"> <img src="../../assets/images/userinfo_04.png" alt="" class="active_img">{{$t("phoneIncome.item_nav8")}}</p>
            </div>
            <div class="item_con">
                <div class="item">
                    <p class="p1" @click="goLink1()">{{$t("phoneIncome.item_nav4")}}</p>
                    <p class="p2 active">{{line_total}}</p>

                </div>
                <div class="item">
                    <p class="p1" @click="goLink1()">{{$t("phoneIncome.item_nav5")}}</p>
                    <p class="p2 active">{{online_cnt}}</p>

                </div>
                <div class="item" @click="goLink1()">
                    <p class="p1">{{$t("phoneIncome.item_nav6")}}</p>
                    <p class="p2 active">{{offline_cnt}}</p>

                </div>
            </div>
        </div>
    </div>
    <div class="user_nav user_nav_echars">
        <div id="sum_earnings" style="width:100%; height:4rem;"></div>
    </div>
    <!-- <van-popup v-model="showActive" position="left" class="my_popup">
          666666
        </van-popup>  -->

</div>
</template>

<script>
import {
    Toast
} from 'vant';
import echarts from 'echarts'
import headers from '../../components/userHead'
import footers from '../../components/footer'
import {
    query_bind_devinfo_list_by_user_id,
    query_node_profit_list,
    query_dev_phy_cap_hisgraph,
    query_user_profit_list

} from '../../common/js/api.js'
export default {
    data() {
        return {
            show: false,
            showActive: true,
            online_cnt: "",
            offline_cnt: "",
            errorline_cnt: "",
            line_total: "",
            dq_income: "",
            zr_income: "",
            all_income: "",
            pj_income: "",
            incomeArr: [],
            timeArr: []
        }
    },
    components: {
        headers: headers
    },
    mounted: function () {

        this.queryInfo()
        this.queryInfo1()
    },
    methods: {
        showPopup() {
            this.show = true;
        },
        drawColumn() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('sum_earnings'));
            let option = {
                title: {
                    text: "收益走势(poc)",
                    x: "center",
                    top: "10px",
                    textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        color: "#A0AAC7"
                    },
                },
                tooltip: {
                    trigger: "axis"
                },
                // legend: {
                //     data: ["在线节点数"]
                // },
                grid: {
                    left: "1%",
                    right: "1%",
                    bottom: "2%",
                    containLabel: true
                },
                xAxis: [{
                    type: "category",
                    name: "天",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#50697A', // X轴及其文字颜色
                        }
                    },
                    data: this.timeArr
                }],
                yAxis: {
                    type: "value",
                    // axisLabel: {
                    //     formatter: "{value}(POC)"
                    // },
                    axisLine: {
                        lineStyle: {
                            color: '#50697A', // X轴及其文字颜色
                        }
                    },
                },
                series: [{
                    name: "当天收益",
                    type: "line",
                    stack: "总量",
                    data: this.incomeArr,
                    color: ['#2A54AF'], //折线颜色
                    areaStyle: {
                        color: '#ceddff' //折线下方色块颜色
                    }
                }]
               
            };

            myChart.setOption(option);

            //建议加上以下这一行代码，不加的效果图如下（当浏览器窗口缩小的时候）。超过了div的界限（红色边框）
            window.addEventListener('resize', function () {
                myChart.resize()
            });
        },

        goLink() {
            this.$router.push({
                    path: "/bill"
                }

            )
        },
        goLink1() {
            this.$router.push({
                    path: "/managementnew"
                }

            )
        },
        queryInfo() {
            let param = new Object()
            param.login_token = localStorage.getItem('userToken')
            param.page_num = 0
            param.page_cnt = 20
            param.login_type = 2

            query_bind_devinfo_list_by_user_id(param).then(res => {
                if (res.status != 0) {
                    Toast('网络错误，请重新请求')
                } else {
                    let nowarr = res.data.bind_devinfo_list
                    console.log(nowarr)
                    this.sn_active = nowarr[0].dev_sn
                    for (var i = 0; i < nowarr.length; i++) {
                        switch (nowarr[i].dev_type) {
                            case 1:
                                nowarr[i].dev_type = "初代西柚机"
                                break;
                        }
                        switch (nowarr[i].dev_online_state) {
                            case 1:
                                nowarr[i].dev_online_state = "在线"
                                break;
                            case 0:
                                nowarr[i].dev_online_state = "离线"
                                break;
                        }
                    }
                    this.tableData = res.data.bind_devinfo_list
                    this.online_cnt = res.data.online_cnt
                    this.errorline_cnt = res.data.exception_cnt
                    this.offline_cnt = res.data.offline_cnt
                    this.line_total = res.data.online_cnt + res.data.exception_cnt + res.data.offline_cnt
                    let userToken = res.token_info.login_token
                    localStorage.setItem('userToken', userToken)
                    // this.firstgetinfo_power()
                    // this.firstgetinfo_space()

                }

            }).catch(error => {

            })

        },
        queryInfo1() {
            let param = new Object()
            param.login_token = localStorage.getItem('userToken')
            param.query_type = 2,
                param.start_time = 1560873600,
                param.end_time = 1560960000,
                param.cur_page = 0
                 param.login_type = 2

            query_user_profit_list(param).then(res => {
                if (res.status != 0) {

                } else {

                    let profitArr = []
                    let date_stamp_arr = []
                    let nowarr = res.data.user_profit_list
                    if (res.data.user_profit_list.length > 0) {
                        for (var i = 0; i < nowarr.length; i++) {

                            //this.incomeArr=[]
                            nowarr[i].user_total_profit = ((nowarr[i].user_total_profit) / 10000).toFixed(2)

                            profitArr.push(nowarr[i].user_total_profit)
                            date_stamp_arr.push(this.common.getTimess((nowarr[i].date_stamp) * 1000))
                            //this.common.getTimes
                            // this.newtableData[i].date_stamp =this.common.getTimes(this.newtableData[i].date_stamp)
                        }
                        this.incomeArr = (profitArr.slice(0, 7)).reverse()
                        this.timeArr = ((date_stamp_arr).slice(0, 7)).reverse()
                        console.log(this.incomeArr)
                        let all_num = 0
                        for (var i = 0; i < this.incomeArr.length; i++) {
                            console.log(this.incomeArr[i])
                            all_num += parseFloat(this.incomeArr[i])

                        }
                        this.dq_income = profitArr.slice(0, 1).join(",")
                        this.zr_income = profitArr.slice(1, 2).join(",")
                        this.all_income = all_num
                        this.pj_income = (all_num / 7).toFixed(2)

                        this.drawColumn()

                    } else {
                        this.dq_income = 0
                        this.zr_income = 0
                        this.all_income = 0
                        this.pj_income = 0
                    }

                }

            }).catch(error => {

            })
        }
    }
}
</script>

<style lang="less" scoped>
.van-popup--top {
    top: 0.8rem;

    .nav_list {
        width: 100%;
        height: auto;
        overflow: hidden;

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

.my_popup {
    width: 2rem;
    height: 100%;
}

.users {
    width: 7.5rem;
    height: auto;
    margin: 0 auto;
    background: rgba(249, 249, 249, 1);
    padding-bottom: 1.0rem;

    .user_nav {
        width: 7.5rem;
        height: auto;
        overflow: hidden;

        .user_nav_t {
            width: 6.81rem;
            height: auto;
            margin: 0 auto;
            border-radius: 10px;

            margin-top: 0.2rem;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-direction: column;
            background: #FFFFFF;
            overflow: hidden;

            .item {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: column;

                .p1 {
                    color: #7889A8;
                    font-size: 0.28rem;
                    display: flex;
                    justify-content: space-between;
                    text-align: center;
                    // width: 100%;
                    margin: 0 auto;
                }

                .p2 {
                    color: #3C5175;
                    font-size: 0.4rem;
                    font-weight: bold;
                    text-align: left;

                    &.active {
                        font-size: 0.66rem;
                        margin: 0 auto;
                    }

                    span {
                        color: #3C5175;
                        font-size: 0.24rem;
                    }
                }
            }

            .item_title {
                width: 6.81rem;
                height: 1.13rem;
                margin: 0 auto;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                &.item_title_active {
                    width: 6.5rem;
                    border-bottom: 1px solid rgba(208, 227, 254, 1);
                    ;
                }

                &.item_title_active1 {
                    .p2 {
                        width: 2rem;
                    }
                }

                p {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    color: #FFFFFF;
                    font-size: 0.34rem;

                    &.active_p {
                        color: #4A70C9;
                        font-size: 0.32rem;
                        font-weight: bold;
                    }

                }

                img {
                    width: 0.52rem;
                    height: 0.42rem;
                    margin-left: 0.5rem;
                    margin-right: 0.3rem;

                    &.active_img {
                        width: 0.52rem;
                        height: 0.52rem;
                    }
                }

            }

            .item_con {
                width: 6.81rem;
                height: auto;
                overflow: hidden;
                display: flex;
                justify-content: space-around;
                align-items: flex-start;
                background: #FFFFFF;
                margin: 0 auto;
                padding: 0.4rem 0rem;

                &.item_con_active1 {
                    .p2 {
                        width: 2rem;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        text-align: center;
                    }
                }
            }

            &.user_nav_t_active {

                background: url(../../assets/images/userinfo_01.png) no-repeat top;
                background-size: 6.81rem 1.13rem;
            }

            &.user_nav_t_active2 {

                background: url(../../assets/images/userinfo_01.png) no-repeat top;
                background-size: 6.81rem 1.13rem;
            }
        }
    }

    .user_nav_echars {
        margin-top: 0.4rem;
        width: 6.81rem;
        height: 4rem;
        margin: 0 auto;
        border-radius: 10px;
        background: #FFFFFF;
        margin-top: 0.4rem;
    }
}
</style>
