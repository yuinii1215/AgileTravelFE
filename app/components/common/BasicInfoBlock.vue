<template>
    <GridLayout width="100%" columns="*,auto" rows="auto,auto,auto,auto"
                verticalAlignment="center">
                <Label row="0" col="0" class="item-title" textwrap="true" 
                    :text="item.title" @tap="showCompleteTitle()"/>
                <Textview row="1" col="0" v-if="showMore&&detailInfo" editable="false" class="item-block item-desc"
                                textWrap="true" :text="detailInfo.descriptions.text" />
                <GridLayout row="2" col="0" width="100%" columns="auto,auto" rows="auto,auto" class="item-block"
                    verticalAlignment="top" horizontalAlignment="left">
                    <Label row="0" col="0"  textwrap="true" 
                            text="开始时间:" />
                    <Label row="0" col="1"  textwrap="true" 
                            :text="item.startDateTime" />
                    <Label row="1" col="0"  textwrap="true" 
                            text="结束时间:" />
                    <Label row="1" col="1"  textwrap="true" 
                            :text="item.endDateTime" />
                </GridLayout>
                <GridLayout row="3" col="0" rows="auto" columns="auto,*">
                    <Label row="0" col="0" class="fa location-icon" verticalAlignment="top" horizontalAlignment="left"
                        :text="'fa-location-arrow' | fonticon" @tap="goAddress()"/>
                    <Label row="0" col="1" class="item-address" textwrap="true"
                        :text="item.address" :title="item.address" @tap="showCompleteAddress()"/>
                </GridLayout>
        </GridLayout>
</template>

<script>
var LocateAddress = require("nativescript-locate-address").LocateAddress;
export default {
    props: {
        "item":Object,
        "detailInfo":Object,
        "showMore":Boolean
    },
    mounted(){
        this.locateAddress = new LocateAddress();
    },
    methods:{
        goAddress(){
            this.locateAddress.locate({
                address: this.item.address,
            }).then(() => {
                console.log(`Address: ${this.item.address} locateAddress launched!`);
            }, (err) => {
                alert(err);
            });
        },
        showCompleteTitle(){
            alert({
                title: "活动主题",
                message: this.item.title,
                okButtonText: "好的"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        },
        showCompleteAddress(){
            alert({
                title: "活动地点",
                message: this.item.address,
                okButtonText: "好的"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        }
    }
}
</script>


<style scoped>
    Label{
        padding:5px 0;
    }
    .item-block{
        font-size: 14;
    }   
    .item-title {
        font-size: 18;
        font-weight: bold;
    }
    .item-desc{
        margin-left:-5;
    }
    .item-address {
        font-size: 12;
        color: #828282;
    }
    .location-icon {
        color: #FFE900;
        padding-right:2px;
    }
</style>
