<template>
   <div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="buying_con">
               {{$t("buying.item_con1_nav1")}}
        </div>
        <footers></footers>
    </div>
   </div>
</template>

<script>
import headers from '../../components/header'
import footers from '../../components/footer'
export default {
    data(){
        return{

        }
    },
    components:{
          headers: headers,
        footers: footers
    }
}
</script>

<style lang="less">
.buying_con{ 
    width: 100%;
    height: 5.0rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>
