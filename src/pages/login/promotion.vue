<template>
<div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="privacy">
            <div class="promotion_con">
                 {{$t("promotion.item_con1_nav1")}}
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
        return {
            activeNames: []
        };
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
.van-cell {
    font-size: 0.24rem;
}

.privacy {
    width: 7.5rem;
    height: auto;
    padding: 0.2rem;
    box-sizing: border-box;
    text-align: left;
    margin-bottom: 0.5rem;
    .promotion_con{
        width: 7.3rem;
        height: 4rem;
        display: flex;
        justify-content: center;
        align-items: center;
           font-size: 0.3rem;

    }
    .privacy_title{
        font-size: 0.3rem;
        text-align: center;
        font-weight: bold;
    }
    .privacy_con{
        p{
            font-size: 0.2rem;
            margin-top: 0.1rem;
        }
        .p_h1{
            font-size: 0.24rem;
            font-weight: bold;

        }
    }
}
</style>
