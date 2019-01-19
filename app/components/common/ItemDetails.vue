<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true">
        <GridLayout class="main" verticalAlignment="top" >
            <StackLayout :class="{ shareDialogOpen: shareDialogOpen }" v-if="detailInfo">
               
                <GridLayout class="anim-cover" rows="auto" columns="*">
                    <Image row="0" col="0" marginTop="-40" height="180" stretch="aspectFill"
                        class="card-img" :src="cover" />
                    <Label row="0" col="0" verticalAlignment="top"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
                        class="fa close" fontSize="24" />
                </GridLayout>
                <ScrollView v-if="imagesLength>1"class="anim-images" orientation="horizontal">
                    <StackLayout orientation="horizontal" class="">
                        <GridLayout v-for="image in detailInfo.images" :key="image.id" rows="auto"
                            columns="*">
                            <Image class="card-img-thumb" row="0" col="0" :src="image"
                                stretch="aspectFill" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView>

                <GridLayout rows="auto,auto,auto,auto" columns="auto" class="content">
                    <basic-info-block hasMore=1 :showMore="showMore" :activityId="activityId"  @showMoreChangeEvent="showMoreChange()" class="anim-itemInfo"  marginTop="15" />

                    <StackLayout v-if="showMore==1"   class="line anim-likes lineBasic" row="2" width="100%" marginTop="10" />

                    <GridLayout v-if="showMore==1"  class="anim-likes"  marginTop="5" width="100%" row="3"
                        :columns="detailInfo.isMember==1||detailInfo.isMember==2?detailInfo.isMember==1?'55,*,*,90,60':'55,*,*,60':'55,*,*,90'" rows="auto,auto,auto,auto" marginBottom="-10">
                            <Label col="0" row="0" rowSpan="2" text="组织者:" class="user-type" verticalAlignment="top"/>
                            <GridLayout col="1" row="0" rows="auto,auto" columns="auto" class="user-info-wrap" horizontalAlignment="left" :marginBottom="participantsLength>0?0:8">
                                <Image horizontalAlignment="center"  verticalAlignment="top" stretch="aspectFill" col="0"
                                                row="0" class="status-profile" :src="organizer.avaUrl" />
                                <Label col="0" row="1" class="participator-name" horizontalAlignment="center"  verticalAlignment="bottom"
                                :text="organizer.username"/>
                            </GridLayout>
                            <Label v-if="participantsLength>0" col="0" row="1" rowSpan="2" text="参与者:" class="user-type" verticalAlignment="top" marginTop="8"/>
                            <GridLayout  v-if="participantsLength>0"  :colSpan="detailInfo.isMember==1?4:3"  col="1" row="1" rows="auto,auto" columns="auto" class="user-info-wrap" width="100%" horizontalAlignment="left"  marginTop="6">
                                <ScrollView  orientation="horizontal" width="100%">
                                    <StackLayout orientation="horizontal" class="">
                                        <GridLayout v-for="participator in detailInfo.participants" :key="participator.id" 
                                            rows="auto,auto" columns="*" marginRight="5">
                                            <Image horizontalAlignment="center"  verticalAlignment="top" stretch="aspectFill" 
                                                col="0" row="0" class="status-profile" :src="participator.avaUrl" />
                                            <Label col="0" row="1" class="participator-name" horizontalAlignment="center"  verticalAlignment="bottom" 
                                            :text="participator.username"/>
                                        </GridLayout>
                                    </StackLayout>
                                </ScrollView>
                                
                            </GridLayout>
                        <StackLayout  class="icon-btn" row="0" col="2" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="detailInfo.isMember==2" @tap="modifyActivity">
                            <Label class="fa like-icon layout" :text="'fa-edit'| fonticon" />
                            <Label class="layout" text="编辑"></Label>
                        </StackLayout>
                        <StackLayout  class="icon-btn" row="0" col="3" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="detailInfo.isMember==1" @tap="joinOutActivity">
                            <Label ref="" class="like-icon layout fa" :text="'fa-user-times' | fonticon" />
                            <Label class="layout" text="退出活动"></Label>
                        </StackLayout>
                        <StackLayout  class="icon-btn" row="0" col="3" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="detailInfo.isMember==3"  @tap="joinInActivity">
                            <Label ref="" class="like-icon layout fa" :text="'fa-user-plus' | fonticon" />
                            <Label class="layout" text="申请加入"></Label>
                        </StackLayout>
                        <StackLayout class="icon-btn" row="0" :col="detailInfo.isMember==1?4:3"  orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="detailInfo.isMember==1||detailInfo.isMember==2" @tap="openShareDialog()">
                            <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" />
                            <Label class="layout" text="分享"></Label>
                        </StackLayout>
                    </GridLayout>
                </GridLayout>

                <StackLayout width="100%" class="lineBreak anim-likes lineBasic" />

                <Gridlayout rows="auto,auto" class="content anim-content" marginTop="15" >

                    <GridLayout row="0" rows="auto" marginBottom="5" columns="auto, auto,auto,*">
                        <Label col="0" :text="'fa-tags' | fonticon" class="fa description-icon"
                            textWrap="true" />
                        <Label col="1" class="description-text" text="评论"
                            textWrap="true" />
                        <Label col="2" class="comment-num" :text="'共'+detailInfo.comments+'条'" 
                            verticalAlignment="middle" textWrap="true" />
                        <StackLayout v-if="detailInfo.isMember==1||detailInfo.isMember==2" class="icon-btn" col="3"  orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" @tap="openComment()">
                            <Label ref="" class="like-icon layout fa" :text="'fa-commenting-o' | fonticon" />
                            <Label class="layout" text="发表评论"></Label>
                        </StackLayout>
                    </GridLayout>

                    <StackLayout row="1" height="100%" marginTop="10">
                        <Label  v-if="detailInfo.isMember==1||detailInfo.isMember==2&&comments.length<=0" class="no-data" text="暂无评论，快来评论吧！"
                            textWrap="true" />
                        <Label  v-if="detailInfo.isMember==3||detailInfo.isMember==0" class="no-data" text="快快加入活动，查看所有评论！"
                            textWrap="true" />
                        <ScrollView v-if="detailInfo.isMember==1||detailInfo.isMember==2">
                            <StackLayout>
                                <GridLayout v-for="comment in comments" :key="comment.id" 
                                    rows="*" columns="auto">
                                    <single-comment-block :comment="comment"/>
                                </GridLayout>
                            </StackLayout>
                        </ScrollView>
                    </StackLayout>
                </Gridlayout>
            </StackLayout>
            <share-dialog  :item="detailInfo" :dialogOpen="shareDialogOpen" @closeShareDialogEvent="closeShareDialog"/>
        </GridLayout>
    </Page>
</template>

<script>
 import BasicInfoBlock from "./BasicInfoBlock";
 import SingleCommentBlock from "./SingleCommentBlock";
 import ShareDialog from './ShareDialog';
 import CommentDialog from './CommentDialog';
 import ActivityCreate from './ActivityCreate';
 import Mine from "../Mine";
 import Home from "../Home";
 import {getState} from '../../constants/index'

    export default {
        components: {BasicInfoBlock,SingleCommentBlock,ShareDialog},
        props: {
            "activityId" :String,
            "from":Number
        },
        data() {
		    return {
                shareDialogOpen:false,
                showMore:1,
                images: null,
                isLike: false,
                isHeart: false,
                participantsLength:0,
                imagesLength:0,
                detailInfo:{},
                comments:[],
                organizer:{},
                state:0,
                cover:""
            }
        },
        mounted(){
            this.$nextTick(()=> {
                this.getDetailInfo();
                this.getComments();
            })
        },
        methods: {
            goBack(){
                //0：Home首页，1：Mine个人页面，2：评论、活动分享、页面（回到Home）3：活动编辑修改页面，回到Mine，
                if(this.from==0||this.from==2) this.gotoHomePage();
                if(this.from==1||this.from==3) this.gotoMinePage();
            },
            getDetailInfo(){
                // 请求：通过id获得详细信息
                this.$backendService
                    .getActivityDetailInfo(this.activityId)
                    .then(res => {
                        this.detailInfo = res;
                        this.state = getState(this.detailInfo.startDateTime,this.detailInfo.endDateTime);
                        this.cover = this.detailInfo.images[0];
                        this.organizer = this.detailInfo.organizer;
                        this.participantsLength = this.detailInfo.participants.length;
                        this.imagesLength = this.detailInfo.images.length;
                    })
                    .catch(err=>{
                        console.log(res)
                    })
            },
            getComments(){
                // 请求：通过ID获得所有评论信息
                this.$backendService
                    .getCommentList(this.activityId)
                    .then(res => {
                        this.comments = res.reverse()
                    })
                    .catch(err=>{
                        console.log(res)
                    })
            },
            openComment(){
                this.$navigateTo(CommentDialog,{
                    props: {
                        activityId:this.activityId
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
			    })
            },
            modifyActivity(){
                this.$navigateTo(ActivityCreate,{
                    props: {
                        state:1,
                        item:this.detailInfo,
                        from:0
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
			    })
            },
            joinOutActivity(){
                confirm({
                    title: "活动退出",
                    message: "您确定要退出该活动吗？",
                    okButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(result => {
                    if(result){
                        this.$backendService
                            .applyExitActivity(this.activityId)
                            .then(res => {
                                this.alert("退出活动成功！")
                            })
                            .catch(err => {
                                this.alert("退出活动失败！")
                            })
                    }
                });
            },
            joinInActivity(){
                if(this.state==2){
                    this.alert("抱歉，活动已结束！")
                }else{
                //加入活动请求
                    confirm({
                        title: "活动加入申请",
                        message: "您确定要加入该活动吗？",
                        okButtonText: "确定",
                        cancelButtonText: "取消"
                    }).then(result => {
                        //请求：加入活动
                        if(result){
                            this.$backendService
                                .applyAddActivity(this.activityId)
                                .then(res => {
                                    this.alert("加入活动请求已发出，待审核！")
                                })
                                .catch(err => {
                                    this.alert("加入活动失败！")
                                })
                        }
                    });
                }
            },
            alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
            },
            openShareDialog(){
                this.shareDialogOpen = true
            },
            closeShareDialog(){
                this.shareDialogOpen = false
            },
            showMoreChange(){
                if(this.showMore==0)
                    this.showMore = 1
                else this.showMore = 0
            },
            
            animateFrom() {
                let cover = this.$refs.cover.nativeView;
                let images = this.$refs.images.nativeView;
                let page = this.$refs.page.nativeView;

                images.translateY = 200;
                images.opacity = 0;
                images.scaleX = 0;
                cover.scaleY = 0;

                cover.translateY = 200;
                cover.opacity = 0;
                cover.scaleX = 0;
                cover.scaleY = 0;

                (page.backgroundColor = "#d4d6d8"), this.animateTo();
            },
            animateTo() {
                let cover = this.$refs.cover.nativeView;
                let images = this.$refs.images.nativeView;
                let page = this.$refs.page.nativeView;

                // images.animate({
                // 	scale: { x: 1, y: 1 } ,
                // 	translate: { x: 0, y: 0},
                // 	opacity: 1,
                // 	duration: 1000,
                // 	delay: 150
                // });

                cover.animate({
                    scale: {
                        x: 0.5,
                        y: 0.5
                    },
                    opacity: 1,
                    duration: 1000,
                    delay: 0
                });
                cover.animate({
                    translate: {
                        x: 0,
                        y: 0
                    },
                    scale: {
                        x: 1,
                        y: 1
                    },
                    duration: 1000,
                    delay: 1000
                });

                page.animate({
                    backgroundColor: "#ffffff",
                    duration: 2000,
                    delay: 0
                });
            },
            close() {
                // this.$navigateBack();
                this.goBack();
            },
            animateLike() {
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
            animateFavorite() {
                let imgLogo = this.$refs.favorite.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 50,
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
            toggleLike() {
                this.animateLike();
                this.isLike = !this.isLike;
                if (this.isLike) {
                    this.detailInfo.likes += 1;
                } else {
                    this.detailInfo.likes -= 1;
                }
            },
            toggleHeart() {
                this.animateFavorite();
                this.isHeart = !this.isHeart;
            },
            onClickButton() {
                this.$emit("clicked");
            },
            gotoHomePage(){
                this.$navigateTo(Home);
            },
            gotoMinePage(){
                this.$navigateTo(Mine);
            }
        }
    };
</script>
<style scoped>
    
    .status-profile {
        margin-right: 0;
    }
    .user-info-wrap{
        margin-top:-5;
    }
    .participator-name{
        font-size: 12;
        text-align: center;
        color: #828282;
    }
    .user-type{
        font-size: 14;
        color: #000;
        font-weight: bold;
        margin-right:7;
    }
    .comment-num{
        font-size: 12;
        color: #828282;
        font-weight: bold;
        margin-left:5;
    }
    .close {
        font-size: 20;
        color: rgb(226, 229, 229);
        margin: 15 0 0 15;
    }

    TextView {
        border-width: 1;
        border-color: #ffffff;
    }

    .description-text {
        font-size: 14;
        font-weight: bold;
        color: black;
    }

    .description-icon {
        font-size: 16;
        font-weight: bold;
        color: #3e9edb;
        margin-right: 8;
        vertical-align: center;
    }

    .description-value {
        font-size: 14;
        color: black;
    }

    .layout {
        vertical-align: bottom;
        color: #828282;
        font-size: 14;
        height: 30;
        padding: 5 0 5 2;
    }

    .icon-btn{
        margin-left:8;
    }

    .like-icon {
        vertical-align: bottom;
        height: 30;
        font-size: 16;
        margin-right: 2;
        padding: 5 0 5 0;
    }

    .item-name {
        font-size: 14;
        font-weight: bold;
    }

    .category-icon {
        text-align: center;
        padding-top: 5;
        color: white;
        vertical-align: center;
        font-size: 25;
        border-width: 1;
        border-color: #ffffff;
        border-radius: 50%;
        margin-top: 4;
        margin-right: 15;
        width: 40;
        height: 40;
    }

    .content {
        margin-left: 16;
        margin-right: 16;
        margin-bottom: 3;
        /* margin-top: 16; */
    }

    .card-img {
        width: 100%;
        height: 250;
        margin-bottom: 5;
    }

    .line {
        height: 0.5;
    }

    .lineBreak {
        height: 0.5;
    }

    .anim-page {
        background-color: #d4d6d8;
        animation-name: key-page;
        animation-duration: 2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-page {
        0% {
            background-color: #dadada;
        }

        20% {
            background-color: #dbd2d5;
        }

        100% {
            background-color: white;
        }
    }

    .anim-cover {
        opacity: 0;
        animation-name: key-cover;
        animation-duration: 1;
        animation-delay: 0.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-cover {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-images {
        opacity: 0;
        animation-name: key-images;
        animation-duration: 1;
        animation-delay: 0.7;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-images {
        0% {
            opacity: 0;
            transform: translate(0, 550) scale(0, 0);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        30% {
            opacity: 0.5;
            transform: scale(0.6, 0.6);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }

        100% {
            opacity: 1;
            transform: translate(0, 0) scale(1, 1);
            animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
        }
    }

    .anim-itemInfo {
        opacity: 0;
        animation-name: key-itemInfo;
        animation-duration: 1;
        animation-delay: 1.2;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-itemInfo {
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

    .anim-likes {
        opacity: 0;
        animation-name: key-likes;
        animation-duration: 1;
        animation-delay: 1.5;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-likes {
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

    .anim-content {
        opacity: 0;
        animation-name: key-content;
        animation-duration: 1;
        animation-delay: 1.8;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
        animation-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    }

    @keyframes key-content {
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

    .anim-more {
        opacity: 0;
        animation-name: key-more;
        animation-duration: 0.4;
        animation-delay: 0.2;
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
</style>