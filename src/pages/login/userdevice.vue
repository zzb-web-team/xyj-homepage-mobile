<template>
<div>
    <headers></headers>
    <div class="user_device" style="margin-top:0.8rem;">
        <div class="user_device_con">
        <div class="item" v-for="(item,index) in tabeldate" v-bind:key="index">
            <div class="item_l">
                <p>{{item.user_total_profit}}<span>poc</span></p>
            </div>
            <div class="item_r">{{item.date_stamp}}</div>
        </div>
        
        </div>
    </div>
</div>
</template>

<script>
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
            tabeldate:[]
        }
    },
    mounted:function(){
        this.queryInfo1()

    },
    methods:{
         queryInfo1() {
            let param = new Object()
            param.login_token = localStorage.getItem('userToken')
            param.query_type = 2,
                param.start_time = 1560873600,
                param.end_time = 1560960000,
                param.cur_page = 0

            query_user_profit_list(param).then(res => {
                if (res.status != 0) {

                } else {
                    
                    let profitArr = []
                    let date_stamp_arr = []
                    let nowarr = res.data.user_profit_list
                    for (var i = 0; i < nowarr.length; i++) {

                        //this.incomeArr=[]
                        nowarr[i].user_total_profit = ((nowarr[i].user_total_profit) / 10000).toFixed(2)
                        nowarr[i].date_stamp=this.common.getTimess((nowarr[i].date_stamp))

                        // profitArr.push(nowarr[i].user_total_profit)
                        // date_stamp_arr.push(this.common.getTimess((nowarr[i].date_stamp)*1000))
                        //this.common.getTimes
                        // this.newtableData[i].date_stamp =this.common.getTimes(this.newtableData[i].date_stamp)
                    }
                    this.tabeldate=nowarr.slice(0, 7)
                     console.log(this.tabeldate)
                  
               
                }

            }).catch(error => {

            })
        }
    },
    components: {
        headers: headers
    },
}
</script>

<style lang="less" scoped>
.user_device {
    width: 7.5rem;
    height: auto;
    overflow: hidden;
    background:rgba(249,249,249,1);
    .user_device_con{
        margin-top: 0.3rem;
        padding-bottom: 0.3rem;
    }

    .item {
        width: 6.82rem;
        height: 1.06rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 0.18rem 0px rgba(232, 232, 232, 1);
        border-radius: 0.1rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 0.1rem;
        box-sizing: border-box;
        margin-top: 0.1rem;
        .item_l{
            color: #5178D2;
            font-size: 0.36rem;
            font-weight: bold;
            span{
                color: #AAAAAA;
                font-size: 0.24rem;
            }
        }
        .item_r{
            color: #AAAAAA;
            font-size: 0.22rem;
        }
    }
}
</style>
