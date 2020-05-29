<template>
  <div class="container" >
    <!-- <van-nav-bar
      :title="title"
      left-text="排行榜"
      left-a
      rrow
      left-arrow:true
      fixed
      @click-left="goRanking()"
      @click-right="onClickRight"
      :z-index="2000"
    >
      <van-icon name="comment" slot="right" size="0.46rem" color="#808080" />
    </van-nav-bar> -->
    <headers></headers>
    <div class="xiala">
      <scroller
        style="top: 1rem;height: 100%;"
        :on-refresh="refreshs"
        :on-infinite="infinite"
        ref="myscroller"
        class="scroller"
      >
        <!-- 网络异常 -->
        <div class="refresh" v-show="refresh">
          <div>
            <img src="../../assets/images/unusual_inset.png" alt />
            <p>网络异常，下拉刷新</p>
          </div>
        </div>
        <!--头部信息  -->
        <div class="my_income" v-show="!refresh">
          <!-- <div class="tel">
            <div class="tel_ranking_title">
             <span>{{phone_number}}</span>的设备清单 
            </div>
            <div class="tel_ranking" @click="goBind()">
              <img src="../../assets/images/device_icon_add.png" @click="goBind()" />
            </div>
          </div> -->
          <!-- 没有请求到数据 -->
          <div class="nointerval" v-show="noint">
            <div>
              <img src="../../assets/images/device_ illustration6.png" />
              <p>您还没有设备，快去绑定新设备吧</p>
            </div>
          </div>
          <!-- 主体内容 -->
          <!-- <div class="my-top" v-show="!noint">
            <div class="ranking_title">
              在线
              <span>{{onlineCnt}}</span>台,离线
              <span>{{offlineCnt}}</span>台
            </div> -->
            <!-- <div class="ranking" @click="goRanking()">
            <img src="../../assets/images/paihangbang.png" alt>排行榜
            </div>
          </div> -->
          <div class="ranking_con" v-for="(item,index) in minerInfo" v-bind:key="index">
            <div
              class="ranking_con_item"
              v-bind:style="{background:item.bgcolor,color:item.fontcolor}"
              v-bind:sn="item.dev_sn"
              @click="goInfo(item)"
            >
              <div class="con_item_l">
                <div class="item_l_top">
                  <div class="item_l_name" v-bind:style="{color:item.namecolor}">{{item.dev_name}}</div>
                  <div class="dot" v-bind:style="{background:item.oldcolor}"></div>
                  <span>{{item.equipment}}</span>
                </div>
                <div class="item_l_No">{{item.dev_sn}}</div>
              </div>
              <div class="con_item_r">
                <div>
                  <van-button class="item_r_btn" @click="settingMiner(item)" v-show="devshow">启动</van-button>
                </div>
                <!-- <div class="item_r_img">
                  <img src="../../assets/images/evenmore.png" />
                </div> -->
              </div>
            </div>
          </div>
          <!-- <div class="bind_new" @click="goBind()">
            绑定新西柚机
            <img src="../../assets/images/device_btn_icon_add.png" alt />
          </div> -->
        </div>
      </scroller>
    </div>

    <!-- <tabbar v-model="active"></tabbar> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import headers from '../../components/userHead'
import { TabbarItem, Toast, PullRefresh, Dialog, NavBar } from "vant";
import {
  getMiner,
  setTing,
  isbindinglist //获取我的设备列表
} from "../../common/js/api.js";
import { err } from "../../common/js/status";
//import tabbar from "../../components/foot";
import { error, debug, log } from "util";
export default {
  data() {
    return {
      repeats: 0, //防止重复点击
      rescount: 0, //请求计数
      clientHeight: "",
      noDate: false,
      title: "西柚机管理",
      active: 0,
      isLoading: false, //控制上拉加载的加载动画
      refresh: false,
      noint: false,
      icon: { active: 0 },
      dev_online_state: "", //设备状态传入下一个页面
      devshow: false,
      onlineCnt: "0", //在线
      offlineCnt: "0", //离线
      devlist: [],
      noData: "",
      isFirstEnter: true,
      keepalive: true,
      minerInfo: [
        // {
        //   dev_name: "我的西柚机一",
        //   dev_sn: "FA12345GXete245u7002r428",
        //   dev_online_state: 0,
        //   equipment: "离线"
        // },
        // {
        //   dev_name: "我的西柚机二",
        //   dev_sn: "FA12345GXete245u7002r428",
        //   dev_online_state: 1,
        //   equipment: "在线"
        // },
        // {
        //   dev_name: "我的西柚机三",
        //   dev_sn: "FA12345GXete245u7002r428",
        //   dev_online_state: 0,
        //   equipment: "离线"
        // }
      ],
      localcache: [], //暂存
      devonline: [], //在线数组
      devoffline: [], //离线数组
      allpage: 0, //总页码
      pagenum: 0, //初始页码
      minerStatus: true,
      scroll: 0 //第一步：定义初始滚动高度
    };
  },
  computed: mapState({
    //log_token: state => state.user.log_token,
    //phone_number: state => state.user.phone_number,
    user_name: state => state.user.user_name,
    user_sex: state => state.user.user_sex,
    charge_psd: state => state.user.charge_psd,
    minerstates: state => state.management.minerstates,
    devsn: state => state.management.devsn
  }),
  created() {
    this.isFirstEnter = true;
  },
  mounted: function() {
        this.log_token=localStorage.getItem('userToken')

    this.device(0, 0);
    // this.device(0);
    // if (this.minerInfo.length <= 0) {
    //   this.noint = true;
    // } else {
    //   this.noint = false;
    // }
  },
  methods: {
    //...mapMutations(["updateUser", "clearUser", "setdevsn", "setdevstatus"]),
    //获取我的设备列表
    device(page, key) {
      this.localcache = [];
      this.devlist = [];
      // if (page == 0) {
      //   this.minerInfo = [];
      // }
      // if (this.$parent.onLine == false) {
      //   Toast("无法连接网络，请检查网络状态");
      //   // this.$loading.show("无网络连接");
      // } 
        if (key != 1) {
          this.$loading.show("加载中...");
        }
        if (key == 2) {
          return false;
        }
        if (this.repeats == 1) {
          return false;
        }
        this.repeats = 1;
        if (this.rescount >= 3) {
          this.repeats = 0;
          this.rescount = 0;
          this.refresh = true;
          this.$loading.hide();
          Toast(`请求超时，请稍后重试`);
          return false;
        }

        this.onlineCnt = 0;
        this.offlineCnt = 0;
        let params = new Object();
        params.login_token = this.log_token;
        params.page_num = page;
        console.log(params);
        isbindinglist(params)
          .then(res => {
            if (res) {
              this.$loading.hide();
            }
            this.repeats = 0;
            if (res.status == 0) {
              console.log(res)
              //this.updateUser({ log_token: res.token_info.login_token });
                let log_token= res.token_info.login_token
          localStorage.setItem('userToken', log_token)
              if (res.err_code == 0) {
                this.rescount = 0;
                this.refresh = false;
                this.noint = false;
                console.log(res);
                this.onlineCnt = res.data.online_cnt; //在线
                this.offlineCnt = res.data.offline_cnt; //离线
                this.allpage = res.data.total_page; //总页码
                this.pagenum = res.data.page_num;
                console.log(this.pagenum);
                if (res.data.bind_devinfo_list.length > 0) {
                  this.localcache = res.data.bind_devinfo_list;
                  for (let j = 0; j < this.localcache.length; j++) {
                    if (this.localcache[j].dev_online_state == 0) {
                      this.localcache[j].equipment = "离线";
                      this.localcache[j].oldcolor = "#808080";
                      this.localcache[j].bgcolor = "#FFFFFF";
                      this.localcache[j].fontcolor = "#323232";
                      this.localcache[j].namecolor = "#323232";
                    } else if (this.localcache[j].dev_online_state == 1) {
                      this.localcache[j].equipment = "在线";
                      this.localcache[j].oldcolor = "#21E21C";
                      this.localcache[j].bgcolor = "#F24C85";
                      this.localcache[j].fontcolor = "#F9C943";
                      this.localcache[j].namecolor = "#FFFFFF";
                    }

                    this.devlist.push(this.localcache[j]);
                  }
                  if (res.data.page_num == 0) {
                    this.minerInfo = this.devlist;
                  } else {
                    this.minerInfo.push(...this.devlist); //数组拼接
                  }
                }
              } else if (res.err_code == 292) {
                this.rescount = 0;
                this.noint = true;
                // Toast({
                //   message: "您暂时没有设备，请先绑定设备",
                //   duration: 1000
                // });
              } else if (res.err_code == -5) {
                this.rescount++;
                this.device(0, 0);
              } else {
                this.rescount = 0;
                const sta = err[res.err_code]
                  ? this.$t(err[res.err_code])
                  : `请稍后重试 ${res.err_code}`;
                this.$toast(sta);
              }
            } else if (res.status == -999) {
              this.rescount = 0;
              this.$toast({
                message: "登录已过期，请重新登录",
                onClose: () => {
                  //this.clearUser();
                  this.$router.push({ path: "/loginactive" });
                }
              });
            } else if (res.status == -17) {
              this.rescount = 0;
              Dialog.alert({
                message: "账号在其它地方登录，请重新登录"
              }).then(() => {
                //this.clearUser();
                this.$router.push({ path: "/loginactive" });
              });
            } else if (res.status == -500) {
              this.rescount = 0;
            } else if (res.status == -900) {
              this.rescount = 0;
              this.$router.push({ path: "/login" });
            } else if (res.status == -5) {
              this.rescount++;
              this.device(0, 0);
            } else {
              this.rescount = 0;
              const tip = this.$backStatusMap[res.status] || err[res.status];
              const str = tip ? this.$t(tip) : `请稍后重试 ${res.status}`;
              this.$toast(str);
            }
          })
          .catch(error => {
        
            this.repeats = 0;
            this.rescount++;
            this.device(0, 0);
            // Toast("网络错误，请重新请求181");
          });
     
    },
    chenaecolor(arr) {
      for (let i = 0; i < 10; i++) {
        if (arr[i].dev_online_state == 0) {
          this.equipment = "离线";
          this.oldcolor = "#F33767";
          this.devshow = true;
        } else if (arr[i].dev_online_state == 1) {
          this.equipment = "在线";
          this.oldcolor = "#21E21C";
          this.devnameno = true;
        }
      }
    },
    //下拉刷新
    refreshs() {
      this.localcache = [];
      this.devlist = [];
      this.device(0, 1);
      var self = this;
      setTimeout(function() {
        self.$refs.myscroller.finishPullToRefresh(); //停止下拉刷新动效
      }, 1500);
    },
    //上拉加载
    infinite() {
      console.log(this.pagenum);
      let self = this;
      if (this.allpage - 1 <= this.pagenum) {
        self.$refs.myscroller.finishInfinite(true);
        self.$refs.myscroller.noData = "没有更多数据了"; //更改上拉加载的文字
      } else {
        this.pagenum++;
        this.device(this.pagenum, 1);
        scrollBy(document.body.scrollWidth, document.body.scrollHeight, true);
        self.$refs.myscroller.finishInfinite(false);
      }
    },
    goLink() {
      this.$router.push({ path: "/login" });
    },
    //西柚机详情

    goInfo(item) {
      this.setdevsn(item.dev_sn);
      this.setdevstatus(item.dev_online_state);
      this.$router.push({
        path: "/managementinfo"
      });
    },
    //绑定新西柚机
    goBind() {
      this.$router.push({ path: "/binding" });
    },
    //排行榜
    goRanking() {
      this.$router.push({ path: "/allranking" });
    },
    onClickRight() {
      this.$router.push({ path: "/message" });
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (!sessionStorage.askPositon || from.name != "managementinfo") {
  //     console.log("刷新页面");
  //     sessionStorage.askPositon = "";
  //     next(vm => {
  //       vm.device(0, 0);
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
  //               vm.$refs.myscroller.scrollTo(
  //                 0,
  //                 sessionStorage.askPositon,
  //                 false
  //               );
  //             }, 10);
  //           } catch (error) {
  //             setTimeout(() => {
  //               window.scrollTo(0, sessionStorage.askPositon, false);
  //             }, 10);
  //           }
  //         }, 0); //同步转异步操作
  //       }
  //     });
  //   }
  // },
  // beforeRouteLeave(to, from, next) {
  //   to.meta.keepAlive = true; //缓存，不刷新
  //   //记录离开时的位置
  //   sessionStorage.askPositon =
  //     this.$refs.myscroller &&
  //     this.$refs.myscroller.getPosition() &&
  //     this.$refs.myscroller.getPosition().top;
  //   console.log(sessionStorage.askPositon);
  //   next();
  // },
  components: {
   // tabbar: tabbar
     headers:headers
  }
};
</script>
 
<style lang="less" scoped >
.container {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  margin-top: 1rem;
  // overflow: hidden;
  background: #f1f6f5;
  position: relative;
  .xiala {
    height: 100%;
    .refresh {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 50%;
        margin-top: 3.4rem;
      }
    }
    .scroller {
      -webkit-overflow-scrolling: touch;
    }
  }
  .van-nav-bar__left {
    font-size: 0.24rem;
    padding-left: 0.1rem;
  }
  .scroller {
   // margin-bottom: 0.2rem;
  }
}
.my_income {
  height: auto;
  // overflow: hidden;
  // margin-top: 1rem;
  .tel {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 0.64rem;
    line-height: 0.64rem;
    .tel_ranking_title {
      padding-left: 0.2rem;
      color: #000;
      span {
        color: #ff467c;
      }
    }
    img {
      padding-top: 0.1rem;
      width: 0.46rem;
      height: 0.46rem;
      padding-right: 0.2rem;
    }
  }
  .nointerval {
    height: 7.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50%;
    }
    p {
      margin-top: -0.6rem;
      color: #808080;
    }
  }
  .my-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 0.64rem;
    line-height: 0.64rem;

    .ranking {
      width: 1.34rem;
      height: 0.4rem;
      font-size: 0.3rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(255, 70, 124, 1);
      margin-right: 0.3rem;
      line-height: 0.4rem;
      img {
        width: 0.26rem;
        height: 0.26rem;
        margin-right: 0.1rem;
      }
    }
    .ranking_title {
      margin-left: 0.3rem;
      font-size: 0.24rem;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: #000000;
      line-height: 0.34rem;
      span {
        font-size: 0.32rem;
      }
    }
  }
  .ranking_con {
    width: 100%;
    height: 1.2rem;
    overflow: hidden;
    margin-top: 0.1rem;
    .ranking_con_item {
      width: 95%;
      height: 1.2rem;
      background: #ee3e79;
      border-radius: 0.12rem;
      display: flex;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center;
      color: #fff;
      margin: auto;
      padding-left: 0.3rem;
      // margin-top: 0.1rem;
      // &:hover {
      //   background: #cccccc;
      // }
    }
    .con_item_l {
      display: flex;
      flex-direction: column;
      .item_l_top {
        display: flex;
        flex-direction: row;
        // line-height: 0.42rem;
        font-size: 0.3rem;
        align-items: center;
        .dot {
          width: 0.2rem;
          height: 0.2rem;
          border-radius: 50%;
          background-color: #21e21c;
          margin-right: 0.1rem;
        }
        img {
          width: 0.16rem;
          height: 0.16rem;
        }
        .item_l_name {
          text-align: left;
          margin-right: 0.2rem;
        }
        span {
          display: inline-block;
          text-align: left;
          font-size: 0.26rem;
          color: #f9c943;
        }
      }
      .item_l_No {
        color: #f9c943;
        text-align: left;
        line-height: 0.42rem;
      }
    }
    .con_item_r {
      display: flex;
      justify-content: flex-start;
      .item_r_btn {
        width: auto;
        height: 0.56rem;
        background: #ff467c;
        border-radius: 0.12rem;
        font-size: 0.3rem;
        display: flex;
        color: #ffffff;
        align-items: center;
        justify-content: center;
        margin-right: 0.2rem;
        border: none;
      }
      .item_r_img {
        width: 0.8rem;
        height: 1rem;
        line-height: 1.2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          margin-top: 0.1rem;
          width: 0.2rem;
          height: 0.41rem;
          color: #fff;
        }
      }
    }
  }
  .bind_new {
    width: 2.61rem;
    height: 0.6rem;
    border-radius: 0.12rem;
    // border: 0.02rem dashed #646b97;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.4rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: #808080;
    background-color: #d9e3e1;
    line-height: 0.94;
    margin-bottom: 0.4rem;
    img {
      width: 20%;
      margin-left: 0.2rem;
    }
  }
}
.van-button {
  line-height: 0px;
}
.btn1,
.btn2 {
  width: 2rem;
  height: 1rem;
  color: #ffffff;
  background-color: #21e21c;
  line-height: 1rem;
  text-align: center;
  margin-top: 0.2rem;
}
// ._v-container[data-v-ecaca2b0] {
//   height: auto;
// }
// ._v-container {
//   // height: auto !important;
// }
body{
  height: 100%;
  overflow: hidden;
}
</style>
