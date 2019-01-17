<template>
    <GridLayout width="100%" columns="*,auto" rows="auto,auto,auto,auto,auto,auto"
                verticalAlignment="center">
                <GridLayout row="0" col="0" columns="auto,auto,*" >
                    <Label col="0" class="item-open-status" textwrap="true" 
                    :text="stateLabel" :class="{'state-unstart': state==0, 'state-going': state==1,'state-finish':state==2}"/>
                    <Label col="1" class="item-open-status" textwrap="true" 
                    :text="detailInfo.public?'公开':'私有'" :class="[detailInfo.public?'ispublic-true':'ispublic-false']"/>
                    <Label col="2" class="item-title" textwrap="true" 
                        :text="detailInfo.title" @tap="showCompleteTitle()"/>
                </GridLayout>
                <Label v-if="hasMore==1" row="0" col="1" class="fa show-more-btn" verticalAlignment="top" horizontalAlignment="right"
                        :text="'fa-list-ul' | fonticon" @tap="changeShowState()"/>
                <TextView  row="1" col="0" v-if="hasMore==1&&showMore==1&&detailInfo" editable="false" 
                        class="item-block item-desc" :class="[hasMore==1?'anim-more':'']"
                        textWrap="true" :text="detailInfo.description" />
                <GridLayout row="2" col="0" width="100%" columns="auto,auto" rows="auto,auto" 
                    v-if="showMore==1" class="item-block" :class="[hasMore==1?'anim-more':'']"
                    verticalAlignment="top" horizontalAlignment="left">
                    <Label row="0" col="0"  textwrap="true" 
                            text="开始时间:" />
                    <Label row="0" col="1"  textwrap="true" 
                            :text="detailInfo.startDateTime" />
                    <Label row="1" col="0"  textwrap="true" 
                            text="结束时间:" />
                    <Label row="1" col="1"  textwrap="true" 
                            :text="detailInfo.endDateTime" />
                </GridLayout>
                <GridLayout v-if="detailInfo.isMember==2&&inviteCode&&showMore==1" row="3" col="0" rows="auto"  class="item-block" :class="[hasMore==1?'anim-more':'']" columns="*" verticalAlignment="bottom"  @tap="showCompleteInviteCode()">
                    <Label col="0" row="0" class="layout" :text="'邀  请  码:'+inviteCode"/>
                </GridLayout>
                <GridLayout v-if="detailInfo.isMember==2&&showMore==1" row="4" col="0" rows="auto"  class="item-block" :class="[hasMore==1?'anim-more':'']" columns="auto,auto,auto" verticalAlignment="bottom">
                    <Button col="1" row="0" class="layout generate-code-btn" text="重新生成邀请码" verticalAlignment="bottom"  @tap="generateInviteCode()"/>
                </GridLayout>
                <GridLayout :row="detailInfo.isMember==2?5:4" col="0" rows="auto" columns="auto,*" v-if="showMore==1" :class="[hasMore==1?'anim-more':'']">
                    <Label row="0" col="0" class="fa location-icon" verticalAlignment="top" horizontalAlignment="left"
                        :text="'fa-location-arrow' | fonticon" @tap="goAddress()"/>
                    <Label row="0" col="1" class="item-address" textwrap="true"
                        :text="detailInfo.address" :title="detailInfo.address" @tap="showCompleteAddress()"/>
                </GridLayout>
        </GridLayout>
</template>

<script>
var LocateAddress = require("nativescript-locate-address").LocateAddress;
import Enum from '../../constants/enum'
import {getState} from '../../constants/index'

export default {
    props: {
        "activityId":String,
        "hasMore":Number,
        "showMore":Number,
    },
    data(){
        return{
            inviteCode:"",
            state:0,
            stateLabel:"",
            detailInfo:{}
        }
    },
    mounted(){
        this.locateAddress = new LocateAddress();
        this.$nextTick(()=> {
            this.getInviteCode();
            this.getDetailInfo();
        })
    },
    methods:{
        getDetailInfo(){
            // 请求：通过id获得详细信息
                this.$backendService
                    .getActivityDetailInfo(this.activityId)
                    .then(res => {
                        this.detailInfo = res;
                        this.state = getState(this.detailInfo.startDateTime,this.detailInfo.endDateTime);
                        this.stateLabel = Enum.activityState[this.state]
                    })
                    .catch(err=>{
                        console.log(err)
                        // this.$navigateBack();
                    })
        },
        getInviteCode(){
            //请求：获得inviteCode
         this.$backendService
                .getInviteCode(this.activityId)
                .then(res => {
                    this.inviteCode = res
                })
                .catch(err=>{})
        },
        generateInviteCode(){
                //请求：重新请求InviteCode更新之
                this.$backendService
                    .generateInviteCode(this.activityId)
                    .then(res => {
                        this.inviteCode = res
                    })
                    .catch(err=>{})
        },
        changeShowState(){
            if(this.showMore==0)
                this.showMore = 1
            else this.showMore = 0
            this.$emit("showMoreChangeEvent")
        },
        goAddress(){
            this.locateAddress.locate({
                address: this.detailInfo.address,
            }).then(() => {
                console.log(`Address: ${this.detailInfo.address} locateAddress launched!`);
            }, (err) => {
                alert(err);
            });
        },
        showCompleteInviteCode(){
            alert({
                title: "邀请码",
                message: this.inviteCode,
                okButtonText: "好的"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        },
        showCompleteTitle(){
            alert({
                title: "活动主题",
                message: this.detailInfo.title,
                okButtonText: "好的"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        },
        showCompleteAddress(){
            alert({
                title: "活动地点",
                message: this.detailInfo.address,
                okButtonText: "好的"
            }).then(() => {
                console.log("Alert dialog closed");
            });
        },
    }
}
</script>


<style scoped>
    .show-more-btn{
        font-size: 14;
        font-weight: bold;
        color: #3e9edb;
    }
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

    .anim-more {
        opacity: 0;
        animation-name: key-more;
        animation-duration: 1;
        animation-delay: 0.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-more {
        0% {
            opacity: 0;
            transform: translate(50, 50);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

  

    .generate-code-btn{
        background-color:transparent;
        border-color:#3e9edb;
        border-width:0.5;
        padding:2 5 2 5;
    }
</style>
