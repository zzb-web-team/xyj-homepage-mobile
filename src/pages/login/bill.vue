<template>
<div class="container">
    <headers></headers>
    <div class="nointerval" v-show="noint" style="margin-top:0.8rem;">
        <div>
            <img src="../../assets/images/earnings_illustration4.png" alt />
            <p>暂无积分收益哦，快快绑定设备赚取积分吧</p>
        </div>
    </div>
    <!-- <van-pull-refresh class="xiala" v-model="isLoading" @refresh="onRefresh"> -->
    <div class="xiala">
        <scroller style="margin-top: 1.2rem;height: 100%;" :on-refresh="refreshs" :on-infinite="infinite" ref="myscroller" class="scroller">
            <!-- 网络异常 -->
            <div class="refresh" v-show="refresh">
                <div>
                    <img src="../../assets/images/unusual_inset.png" alt />
                    <p>网络异常，下拉刷新</p>
                </div>
            </div>
            <div class="ranking_con" v-show="!refresh" ref="sortMenu">
                <div class="ranking_con_item" v-for="(item,index) in moneyListdetails" v-bind:key="index">
                    <div class="con_item_l">
                        <div class="item_l_name">
                            <p>+{{((item.user_total_profit)/10000).toFixed(2)}}</p>
                            <span>POC</span>
                            <!-- <p class="item_p">POC</p> -->
                        </div>
                        <!-- <div class="item_l_No">
                在线西柚机
                <span>{{item.moneyOnline}}</span>台 离线西柚机
                <span>{{item.moneyOffline}}</span>台
              </div>-->
                    </div>
                    <div class="con_item_r">
                        <!-- <div class="item_r_btn">{{item.date_stamp}}</div> -->
                        <div class="item_r_btn">{{item.date_stamp | formatDate}}</div>
                    </div>
                </div>
            </div>
        </scroller>
        <!-- </van-pull-refresh> -->
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapMutations
} from "vuex";
import navBar from "../../components/navBar";
import headers from '../../components/userHead'
import {
    Tabbar,
    TabbarItem,
    Toast,
    Dialog,
    List
} from "vant";
import {
    alldevrevenue,
    devstatuslist,
    getuserdevlist
} from "../../common/js/api.js";
import {
    formatDate
} from "../../common/js/date.js";
import {
    error
} from "util";
import {
    err
} from "../../common/js/status";
export default {
    data() {
        return {
            repeats: 0, //防止重复点击
            rescount: 0, //请求计数
            title: "收益明细",
            active: 1,
            isLoading: false, //控制上拉加载的加载动画
            refresh: false,
            time: "",
            noint: false,
            loading: false,
            finished: false,
            numpag: 0, //总页码
            curpage: 0, //页码
            nelist: [],
            noData: "",
            devlist: [],

            isFirstEnter: true,
            moneyListdetails: [
                // {
                //   user_total_profit: "+200",
                //   moneyOffline: "1",
                //   moneyOnline: "3",
                //   date_stamp: 1557986072
                // },
                // {
                //   user_total_profit: "+1003",
                //   moneyOffline: "1",
                //   moneyOnline: "3",
                //   date_stamp: 1557899672
                // },
                // {
                //   user_total_profit: "+200",
                //   moneyOffline: "1",
                //   moneyOnline: "3",
                //   date_stamp: 1557986072
                // }
            ],
            offline: 0,
            online: 0
        };
    },
    computed: mapState({
        //log_token: state => localStorage.getItem('userToken'),
        phone_number: state => state.user.phone_number,
        user_name: state => state.user.user_name,
        user_sex: state => state.user.user_sex,
        charge_psd: state => state.user.charge_psd
    }),
    filters: {
        //时间戳转时间
        formatDate(time) {
            time = time * 1000;
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    created() {
        this.isFirstEnter = true;
    },
    mounted: function () {
        this.log_token = localStorage.getItem('userToken')

        this.revenue(0);
        if (this.moneyListdetails.length <= 0) {
            this.noint = true;
        } else {
            this.noint = false;
        }
    },
    methods: {
        //...mapMutations(["updateUser", "clearUser"]),
        //下拉刷新
        refreshs() {
            this.moneyListdetails = [];
            this.revenue(0, 1);
            var self = this;
            setTimeout(function () {
                self.$refs.myscroller.finishPullToRefresh(); //停止下拉刷新动效
            }, 1500);
        },
        //上拉加载
        infinite() {
            let self = this;
            console.log(this.curpage);
            if (this.numpag - 1 <= this.curpage) {
                self.$refs.myscroller.finishInfinite(true);
                self.$refs.myscroller.noData = "没有更多数据了"; //更改上拉加载的文字
            } else {
                this.curpage++;
                this.revenue(this.curpage, 1);
                self.$refs.myscroller.finishInfinite(false);
            }
        },
        showList(item) {
            this.$router.push({
                name: "billdetail",
                params: {
                    othertime: item.date_stamp, //时间
                    userprofit: item.user_total_profit, //总收益
                    devOffline: item.moneyOffline, //离线
                    devonline: item.moneyOnline //在线
                }
            });
        },
        revenue(page, key) {
            console.log(this.repeats, this.rescount);
            this.nelist = [];
            this.devlist = [];
            // alert(this.$parent.onLine)
            // if (this.$parent.onLine == false) {
            //   Toast("无法连接网络，请检查网络状态");
            // } 
            if (key != 1) {
                this.$loading.show("加载中...");
            }
            if (this.repeats == 1) {
                return false;
            }
            this.repeats = 1;
            if (this.rescount >= 3) {
                this.repeats = 0;
                this.rescount = 0;
                this.$loading.hide();
                this.refresh = true;
                Toast(`请求超时，请稍后重试`);
                return false;
            }

            let params = new Object();
            let param = new Object();
            let querydate = 90;
            let endtimes = Date.parse(new Date().toLocaleDateString()) / 1000; //获取当前年月日时间戳
            let starttime = endtimes - querydate * 24 * 3600; //获取前十天的时间戳
            console.log(this.log_token)
            let token = this.log_token;
            params.start_time = starttime;
            params.end_time = endtimes;
            params.login_token = token;
            params.query_type = 2;
            params.cur_page = page;
            params.login_type = 2

            //第二个接口参数
            // param.start_timestamp = starttime;
            // param.end_timestamp = endtimes;
            // param.login_token = token;
            getuserdevlist(params) //获取每天总收益
                .then(res => {
                    if (res) {
                        this.$loading.hide();
                    }
                    this.repeats = 0;
                    console.log(res);
                    if (res.status == 0) {
                        // this.updateUser({
                        //   log_token: res.data.token_info.token
                        // });
                        let log_token = res.data.token_info.token
                        localStorage.setItem('userToken', log_token)
                        if (res.err_code == 0) {

                            this.noint = false;
                            this.rescount = 0;
                            this.refresh = false;
                            this.numpag = res.data.total_page; //总页码
                            this.curpage = res.data.page; //页码
                            this.nelist = res.data.user_profit_list;
                            for (let i = 0; i < this.nelist.length; i++) {
                                this.devlist.push(this.nelist[i]);
                            }
                            if (res.data.page == 0) {
                                this.moneyListdetails = this.devlist;
                            } else {
                                this.moneyListdetails.push(...this.devlist); //数组拼接
                            }
                        } else {
                            this.rescount = 0;
                            const sta = err[res.err_code] ?
                                this.$t(err[res.err_code]) :
                                `请稍后重试 ${res.err_code}`;
                            this.$toast(sta);
                        }
                    } else if (res.status == -999) {
                        this.rescount = 0;
                        Toast("登录已过期，请重新登录");
                        // this.clearUser();
                        setTimeout(() => {
                            this.$router.push({
                                path: "/loginactive"
                            });
                            let loginStatus = ""

                            localStorage.setItem('loginStatus', loginStatus)
                        }, 1000);
                    } else if (res.status == -17) {
                        this.rescount = 0;
                        Dialog.alert({
                            message: "账号在其它地方登录，请重新登录"
                        }).then(() => {
                            // this.clearUser();
                            this.$router.push({
                                path: "/loginactive"
                            });
                            let loginStatus = ""

                            localStorage.setItem('loginStatus', loginStatus)
                        });
                    } else if (res.status == -500) {
                        this.rescount = 0;
                    } else if (res.status == -900) {
                        this.rescount = 0;
                        this.$router.push({
                            path: "/login"
                        });
                    } else if (res.status == -5) {
                        this.rescount++;
                        this.revenue(0);
                    } else {
                        this.rescount = 0;
                        const tip = this.$backStatusMap[res.status] || err[res.status];
                        const str = tip ? this.$t(tip) : `请稍后重试 ${res.status}`;
                        this.$toast(str);
                    }
                })
                .catch(error => {
                    debugger
                    this.repeats = 0;
                    this.rescount++;
                    this.revenue(0);
                    Toast("网络错误，请重新请求11111");
                });

        }
    },
    // beforeRouteEnter(to, from, next) {
    //   if (!sessionStorage.askPositon || from.name != "billdetail") {
    //     console.log("刷新页面");
    //     sessionStorage.askPositon = "";
    //     next(vm => {
    //       vm.revenue(0);
    //     });
    //   } else {
    //     console.log("读取位置并跳转");
    //     next(vm => {
    //       if (vm && vm.$refs.myscroller) {
    //         //通过vm实例访问this
    //         setTimeout(function() {
    //           console.log("po", sessionStorage.askPositon);
    //           try {
    //             setTimeout(() => {
    //               console.log(vm.moneyListdetails);
    //               vm.$refs.myscroller.scrollTo(
    //                 0,
    //                 sessionStorage.askPositon,
    //                 false
    //               );
    //             }, 1000);
    //           } catch (error) {
    //             setTimeout(() => {
    //               window.scrollTo(0, sessionStorage.askPositon, false);
    //             }, 300);
    //           }
    //         }, 0); //同步转异步操作
    //       }
    //     });
    //   }
    // },
    // beforeRouteLeave(to, from, next) {
    //   //记录离开时的位置
    //   sessionStorage.askPositon =
    //     this.$refs.myscroller &&
    //     this.$refs.myscroller.getPosition() &&
    //     this.$refs.myscroller.getPosition().top;
    //   console.log(sessionStorage.askPositon);
    //   console.log(this.moneyListdetails);
    //   next();
    // },
    components: {
        navBar: navBar,
        headers: headers
    }
};
</script>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
    background: #f1f6f5;

    .xiala {
        height: 100%;
        height: 1vh;

        .refresh {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
                width: 50%;
            }

            .scroller {
                -webkit-overflow-scrolling: touch;
            }
        }
    }

    .nointerval {
        // height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 50%;
            margin-top: 4rem;
        }

        p {
            margin-top: -0.6rem;
            font-size: 0.24rem;
            color: #808080;
        }
    }

    .ranking_con {
        width: 100%;
        height: auto;

        // margin-top: 1.1rem;
        .ranking_con_item {
            display: flex;
            padding: 0rem 0.2rem;
            box-sizing: border-box;
            justify-content: space-between;
            align-items: center;
            position: relative;
            font-size: 0.28rem;
            width: 6.9rem;
            height: 1rem;
            background: #ffffff;
            border-radius: 0.12rem;
            box-sizing: border-box;
            margin: 0 auto;
            margin-top: 0.2rem;

            // &:hover {
            //   background: #cccccc;
            // }
            .div_show {
                width: 100%;
                height: auto;
                position: absolute;
                background-color: #464d63;
                left: 0;
                top: 1rem;
                z-index: 10000;
                padding: 0.1rem 0;

                .show_title {
                    width: 95%;
                    height: 0.6rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #ffffff;
                    font-size: 0.26rem;
                    margin: 0 auto;
                }

                .show_text {
                    width: 95%;
                    height: 0.4rem;
                    display: flex;
                    justify-content: space-between;
                    color: #ffffff;
                    font-size: 0.26rem;
                    align-items: center;
                    margin: 0 auto;
                }
            }
        }

        .con_item_l {
            display: flex;
            flex-direction: column;

            .item_l_name {
                text-align: left;
                display: flex;
                justify-content: flex-start;
                align-items: center;

                p {
                    color: #5178D2;

                    &.item_p {
                        font-size: 0.2rem;
                    }
                }

                span {
                    color: #ccc;
                    font-size: 0.2rem;
                    margin-left: 0.1rem;
                }
            }

            .item_l_No {
                color: #9ea9d3;
                font-size: 0.2rem;

                span:nth-child(1) {
                    color: #3fccf7;
                }

                span:nth-child(2) {
                    color: #f7db3f;
                }
            }
        }

        .con_item_r {
            display: flex;
            justify-content: flex-start;

            .item_r_btn {
                width: auto;
                height: 0.4rem;

                display: flex;
                color: #7e869f;

                align-items: center;

                justify-content: center;

                p {
                    color: #ffffff;
                }
            }

            .item_r_img {
                width: 0.5rem;
                height: 0.4rem;

                display: flex;

                align-items: center;

                justify-content: center;

                img {
                    width: 0.12rem;
                    height: 0.21rem;
                }
            }
        }
    }
}

// ._v-container {
//   height: auto !important;
// }
</style>
