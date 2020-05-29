<template>
<div>
    <headers></headers>
    <div class="list_con" style="margin-top:0.8rem;">
        <div class="item" v-for="(item,index) in tableData" v-bind:key=index>
           
            <div class="item_top">
                <div class="top_l">{{item.dev_name}}</div>
                <div class="top_r">
                    <span v-if="item.dev_online_state=='离线'" style="background:#999999;"></span>
                    <span v-else  style="background:green;">4</span>

                    <p>{{item.dev_online_state}}</p>
                </div>
            </div>
            <div class="item_bottom">
                <div class="bottom_con">
                    <p>型号：<span>{{item.dev_type}}</span></p>
                    <p>{{item.dev_sn}}</p>
                </div>
                 <div class="bottom_con">
                    <p>{{item.dev_ip}}</p>
                    <p>{{item.dev_mac}}</p>
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
import headers from '../../components/userHead'
import footers from '../../components/footer'
import {
    query_bind_devinfo_list_by_user_id,
} from '../../common/js/api.js'
export default {
    data() {
        return {
            show: false,
             tableData: []
        }
    },
    mounted:function(){
            this.queryInfo()

    },
    methods:{
        queryInfo() {
            let param = new Object()
            param.login_token = localStorage.getItem('userToken')
            param.page_num = 0
            param.page_cnt = 10
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

                }

            }).catch(error => {

                Toast('网络错误，请重新请求')

            })

        },

    },
    components: {
        headers: headers
    },
}
</script>

<style lang="less" scoped>
.list_con {
    width: 7.5rem;
    height: auto;
    overflow: hidden;
    margin: 0 auto;

    .item {
        width: 7.5rem;
        height: 3.1rem;
        overflow: hidden;
        background: url(../../assets/images/device_list_bg.png) no-repeat center;
        background-size: 7.29rem 3.02rem;
        margin: 0 auto;

        .item_top {
            width: 6rem;
            height: 1.0rem;
            border-bottom: 1px dashed #5178D2;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.2rem;

            .top_l {
                color: #5178D2;
                font-size: 0.36rem;
            }

            .top_r {
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    width: 0.2rem;
                    height: 0.2rem;
                    background: rgba(34, 172, 56, 1);
                    border-radius: 50%;
                    margin-right: 0.15rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.24rem;
                    color: #313131;
                }

                color: #808080;
                font-size: 0.24rem;

                p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    
                }
            }
        }
        .item_bottom{
             width: 6rem;
            height: auto;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            .bottom_con{
                width: 100%;
                   display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 0.3rem;
              p {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                        font-size: 0.24rem;
                    color: #808080;
                    span{
                        color: #313131;
                    }
                }
            }
           
        }
    }
}
</style>
