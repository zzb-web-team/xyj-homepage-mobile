<template>
<div class="xy_con">
    <div class="xy_con_text">
        <headers></headers>
        <div class="privacy">
            <div class="privacy_title">{{$t("privacy.item_nav1")}}</div>
            <div class="privacy_con">

                <p>{{$t("privacy.item_nav2")}}</p>

                <p>{{$t("privacy.item_nav3")}}</p>

                <p> {{$t("privacy.item_nav4")}}</p>

                <p>{{$t("privacy.item_nav5")}}</p>

                <p>{{$t("privacy.item_nav6")}}</p>

                <p>{{$t("privacy.item_nav7")}}</p>

                <p>{{$t("privacy.item_nav8")}}</p>

                <p>{{$t("privacy.item_nav9")}}</p>

                <p> {{$t("privacy.item_nav10")}}</p>

                <p> {{$t("privacy.item_nav11")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav12")}}</p>
                <p>{{$t("privacy.item_nav13")}}</p>

                <p> {{$t("privacy.item_nav14")}}</p>

                <p> {{$t("privacy.item_nav15")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav16")}}</p>

                <p> {{$t("privacy.item_nav17")}}</p>

                <p> {{$t("privacy.item_nav18")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav19")}}</p>
                <p> {{$t("privacy.item_nav20")}}</p>

                <p> {{$t("privacy.item_nav21")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav22")}}</p>

                <p> {{$t("privacy.item_nav23")}}</p>

                <p> {{$t("privacy.item_nav24")}}</p>

                <p> {{$t("privacy.item_nav25")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav26")}}</p>

                <p>{{$t("privacy.item_nav27")}}</p>

                <p> {{$t("privacy.item_nav28")}}</p>

                <p class="p_h1">{{$t("privacy.item_nav29")}}</p>

                <p> {{$t("privacy.item_nav30")}}</p>

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
    mounted: function () {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    },
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

    .privacy_title {
        font-size: 0.3rem;
        text-align: center;
        font-weight: bold;
    }

    .privacy_con {
        p {
            font-size: 0.2rem;
            margin-top: 0.1rem;
        }

        .p_h1 {
            font-size: 0.24rem;
            font-weight: bold;

        }
    }
}
</style>
