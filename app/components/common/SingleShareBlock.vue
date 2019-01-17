<template>
<StackLayout class="content">
    <Gridlayout rows="*,auto" columns="45,*"  width="100%"  class="single-shareInfo">
        <GridLayout row="0" col="0" columns="auto" rows="auto,auto" marginBottom="5" marginRight="10" >
            <Image row="0" col="0"  class="status-profile" :src="shareInfo.user.avaUrl" 
                horizontalAlignment="center" verticalAlignment="top" stretch="aspectFill"  />
            <Label row="1" col="0" class="shareInfo-name" :text="shareInfo.user.username"
                horizontalAlignment="center"  verticalAlignment="bottom" textWrap="true" />
        </GridLayout>
        <GridLayout row="0" col="1" rows="*,auto,auto" columns="auto" width="100%" verticalAlignment="middle" horizontalAlignment="left">
            <TextView row="0" v-if="shareInfo.contents" width="100%" editable="false" class="shareInfo-text" 
                                   :text="shareInfo.contents" />
            <GridLayout row="1" rows="auto" columns="auto,*" width="100%" height="100%" class="shareInfo-info" @tap="toItemDetail()">
                <Image row="0" col="0" class="shareInfo-image"  :src="shareInfo.activity.cover" stretch="aspectFill"  />
                <TextView row="0" col="1" editable="false" class="shareInfo-title" textWrap="true" :text="shareInfo.activity.title" verticalAlignment="middle" horizontalAlignment="left"/>
            </GridLayout>
            <GridLayout row="2" rows="auto" columns="auto,*" width="100%" class="bottom-wrap">
                <Label col="0" class="shareInfo-datatime" textWrap="true" :text="shareInfo.dateTime" />
                <StackLayout col="1" rows="auto" columns="auto,auto" @tap="toggleLike"   orientation="horizontal"  horizontalAlignment="right" marginRight="5">
                     <Label col="0" row="0" ref="like" class="like-icon fa" verticalAlignment="bottom"
                        :class="[shareInfo.isLike ? 'liked-active' : 'default']"
                        :text="shareInfo.isLike ? 'fa-thumbs-up':'fa-thumbs-o-up' | fonticon" />
                    <Label col="1" row="0" class="likeNum-label" :text="shareInfo.likeNum"/>
                </StackLayout>
            </GridLayout>
        </GridLayout>
        <StackLayout row="1" col="0" colSpan="2" width="100%" class="line lineBasic" marginTop="5"  />
    </Gridlayout>
</StackLayout>
</template>
<script>
import { isIOS, isAndroid } from "tns-core-modules/platform";

export default {
    props:["shareInfo"],
    data(){
        return{
        }
    },
    mounted(){
    },
    methods:{
        animateLike() {
                if (isIOS) {
                    return;
                }
                let imgLogo = this.$refs.like.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 100,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
        toggleLike(){
            this.animateLike();
            this.shareInfo.isLike = !this.shareInfo.isLike
            if(this.shareInfo.isLike){
                this.shareInfo.likeNum += 1;
                this.$backendService
                    .likeActivity(this.shareInfo.activity.id)
                    .then(res => {})
                    .catch(err=>{})
            }
            else {
                this.shareInfo.likeNum -= 1;
                this.$backendService
                    .likeActivity(this.shareInfo.activity.id)
                    .then(res => {})
                    .catch(err=>{})
            }
                
        },
        toItemDetail(){
            this.$emit("clicked", this.shareInfo);
        }
    }
}
</script>
<style scoped>
    .content{
        margin-top:5;
    }
    .status-profile {
        margin-right: 0;
    }
    .shareInfo-name{
        font-size:12px;
        text-align: center;
    }

    .shareInfo-info{
        margin-top:5;
        background-color: #e6e6e6;
        border:none;
        border-radius: 5;
        margin-left: 5;
        margin-right:5;
    }

    .shareInfo-text{
        font-size:16;
        margin-left:-5;
    }

    .shareInfo-title{
        margin-top:-5;
        background-color: transparent;
        font-size:14;
        color:#000;
        margin-right:5;
        height:60;
    }
    
    .shareInfo-image{
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 50;
        height: 50;
        margin: 10;
    }

    .bottom-wrap{
        font-size: 12;
        margin-top: 5;
        color: #828282;
    }


    .line{
        height:0.5;
    }

    .like-icon {
        vertical-align: bottom;
        height: 30;
        font-size: 16;
        margin-right: 2;
        padding: 5 5 5 5;
    }
</style>
