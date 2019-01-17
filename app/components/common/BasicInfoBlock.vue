<template>
    <GridLayout width="100%" columns="*,auto" rows="auto,auto,auto,auto,auto,auto"
                verticalAlignment="center">
                <GridLayout row="0" col="0" columns="auto,auto,*" >
                    <!-- <Label col="0" class="item-open-status" textwrap="true" 
                    :text="Enum.activityState(state)" :class="[detailInfo.public?'ispublic-true':'ispublic-false']"/> -->
                    <Label col="0" class="item-open-status" textwrap="true" 
                    :text="detailInfo.public?'公开':'私有'" :class="[detailInfo.public?'ispublic-true':'ispublic-false']"/>
                    <Label col="1" class="item-title" textwrap="true" 
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
        getState(){
            var date = new date()

            var startdate=this.detailInfo.startDateTime.split(" ")[0].split("-")
            var starttime=this.detailInfo.startDateTime.split(" ")[1].split(":")
            var enddate=this.detailInfo.endDateTime.split(" ")[0].split("-")
            var endtime=this.detailInfo.endDateTime.split(" ")[1].split(":")
            var date1 = new date()
            date1.setHours(starttime[0],starttime[1],starttime[2])
            date1.setYear(startdate[0])
            date1.setMonth(startdate[1]-1,startdate[2])
            var date2 = new date()
            date2.setHours(endtime[0],endtime[1],endtime[2])
            date2.setYear(enddate[0])
            date2.setMonth(enddate[1]-1,enddate[2])

            if(date<date1) return 0
            if(date2<date) return 2
            if(date>=date1&&date<=date2) return 1
            return 1
        }
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

    .item-open-status{
        width:40;
        text-align:center;
        padding:2 5 2 5;
        color:#000;
        font-size:13;
        margin-right:5;
        border-radius: 2;
    }
    .ispublic-true{
        background-color:rgb(143, 205, 255);
    }
    .ispublic-false{
        background-color:rgb(255, 191, 138);
    }

    .generate-code-btn{
        background-color:transparent;
        border-color:#3e9edb;
        border-width:0.5;
        padding:2 5 2 5;
    }
</style>
