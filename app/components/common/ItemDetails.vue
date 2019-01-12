<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true" @loaded="onLoaded">
        <GridLayout class="main" verticalAlignment="top" >

            <StackLayout :class="{ shareDialogOpen: shareDialogOpen }">
                <GridLayout class="anim-cover" rows="auto" columns="*">
                    <Image row="0" col="0" marginTop="-40" height="180" stretch="aspectFill"
                        class="card-img" :src="item.cover" />
                    <Label row="0" col="0" verticalAlignment="top"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
                        class="fa close" fontSize="24" />
                </GridLayout>

                <ScrollView class="anim-images" orientation="horizontal">
                    <StackLayout orientation="horizontal" class="">
                        <GridLayout v-for="image in detailInfo.descriptions.images" :key="image.id" rows="auto"
                            columns="*">
                            <Image class="card-img-thumb" row="0" col="0" :src="image.src"
                                stretch="aspectFill" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView>

                <GridLayout rows="auto,auto,auto,auto" columns="auto" class="content">
                    <basic-info-block hasMore=1 :showMore="showMore" :item="item" :detailInfo="detailInfo" @showMoreChangeEvent="showMoreChange()" class="anim-itemInfo"  marginTop="15" />

                    <StackLayout v-if="showMore==1"   class="line anim-likes lineBasic" row="2" width="100%" marginTop="10" />

                    <GridLayout v-if="showMore==1"  class="anim-likes"  marginTop="5" width="100%" row="3"
                        :columns="item.isMember==1?'55,*,60':'55,*,90'" rows="auto,auto,auto,auto" marginBottom="-10">
                        <!-- <GridLayout row="0" col="0" rows="auto,auto" columns="auto,auto"> -->
                            <Label col="0" row="0" rowSpan="2" text="组织者:" class="user-type" verticalAlignment="top"/>
                            <GridLayout col="1" row="0" rows="auto,auto" columns="auto" class="user-info-wrap" horizontalAlignment="left" >
                                <Image horizontalAlignment="center"  verticalAlignment="top" stretch="aspectFill" col="0"
                                                row="0" class="status-profile" :src="item.originator.avaUrl" />
                                <Label col="0" row="1" class="patipacter-name" horizontalAlignment="center"  verticalAlignment="bottom"
                                :text="item.originator.username"/>
                            </GridLayout>
                        <!-- </GridLayout> -->
                        <!-- <GridLayout row="1" col="0" rows="auto,auto" columns="auto,auto" width="100%" marginTop="5"> -->
                            <Label col="0" row="1" rowSpan="2" text="参与者:" class="user-type" verticalAlignment="top" marginTop="8"/>
                            <GridLayout colSpan="3"  col="1" row="1" rows="auto,auto" columns="auto" class="user-info-wrap" width="100%" horizontalAlignment="left"  marginTop="6">
                                <ScrollView  orientation="horizontal" width="100%">
                                    <StackLayout orientation="horizontal" class="">
                                        <GridLayout v-for="patipacter in detailInfo.patipacters" :key="patipacter.id" 
                                            rows="auto,auto" columns="*" marginRight="5">
                                            <Image horizontalAlignment="center"  verticalAlignment="top" stretch="aspectFill" 
                                                col="0" row="0" class="status-profile" :src="patipacter.avaUrl" />
                                            <Label col="0" row="1" class="patipacter-name" horizontalAlignment="center"  verticalAlignment="bottom" 
                                            :text="patipacter.username"/>
                                        </GridLayout>
                                    </StackLayout>
                                </ScrollView>
                                
                            </GridLayout>
                        <!-- </GridLayout> -->
                        <!-- <GridLayout col="0" rows="auto" columns="auto,auto" @tap="toggleLike">
                            <Label col="0" row="0" ref="like" class="like-icon fa"
                                :class="[isLike ? 'liked-active' : 'default']"
                                :text="isLike ? 'fa-thumbs-up':'fa-thumbs-o-up' | fonticon" />
                            <Label col="1" row="0" class="layout" :text="item.likes"></Label>
                        </GridLayout> -->
                        <!-- <StackLayout col="1" orientation="horizontal" marginLeft="15">
                            <Label ref="" class="like-icon layout fa" :text="'fa-comment-o' | fonticon" />
                            <Label class="layout" :text="item.comments"></Label>
                        </StackLayout> -->
                        <!-- <GridLayout col="2" rows="auto" columns="auto,auto" marginRight="15">
                            <Label col="0" row="0" ref="favorite" class="like-icon  fa"
                                :class="[isHeart ? 'heart-active' : 'default']"
                                :text="isHeart ? 'fa-heart':'fa-heart-o' | fonticon" />
                            <Label col="1" row="0" class="layout" text="Favorite"></Label>
                        </GridLayout> -->
                        <StackLayout row="0" col="2" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="item.isMember==1" @tap="openShareDialog()">
                            <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" />
                            <Label class="layout" text="分享"></Label>
                        </StackLayout>
                        <StackLayout row="0" col="2" orientation="horizontal" horizontalAlignment="right" verticalAlignment="top" v-if="item.isMember==2"  @tap="joinInActivity">
                            <Label ref="" class="like-icon layout fa" :text="'fa-user-plus' | fonticon" />
                            <Label class="layout" text="申请加入"></Label>
                        </StackLayout>
                    </GridLayout>
                </GridLayout>

                <StackLayout width="100%" class="lineBreak anim-likes lineBasic" />

                <Gridlayout rows="auto,auto" class="content anim-content" marginTop="15" >

                    <GridLayout row="0" rows="auto" marginBottom="5" columns="auto, auto,auto">
                        <Label col="0" :text="'fa-tags' | fonticon" class="fa description-icon"
                            textWrap="true" />
                        <Label col="1" class="description-text" text="评论"
                            textWrap="true" />
                        <Label col="2" class="comment-num" :text="'共'+item.comments+'条'" 
                            verticalAlignment="bottom" textWrap="true" />
                    </GridLayout>

                    <StackLayout row="1" height="100%" marginTop="10">
                        <Label  v-if="item.isMember==2" class="comment-no" text="快快加入活动，查看所有评论！"
                            textWrap="true" />
                        <ScrollView v-if="item.isMember==1">
                            <StackLayout>
                                <GridLayout v-for="comment in detailInfo.comments" :key="comment.id" 
                                    rows="*" columns="auto">
                                    <single-comment-block :comment="comment"/>
                                </GridLayout>
                            </StackLayout>
                        </ScrollView>
                    </StackLayout>
                    
                    <!-- <StackLayout row="1">
                        <ScrollView>
                            <StackLayout verticalAlignment="top"
                                horizontalAlignment="left">
                                <Textview editable="false" class="description-value"
                                    textWrap="true" :text="description" />
                            </StackLayout>
                        </ScrollView>
                    </StackLayout> -->


                </Gridlayout>
            </StackLayout>
            <share-dialog  :item="item" :dialogOpen="shareDialogOpen" @closeShareDialogEvent="closeShareDialog"/>
        </GridLayout>
    </Page>
</template>

<script>
 import ItemLike from "./ItemLike";
 import BasicInfoBlock from "./BasicInfoBlock";
 import SingleCommentBlock from "./SingleCommentBlock";
 import ShareDialog from './ShareDialog';

    export default {
        components: {BasicInfoBlock,SingleCommentBlock,ItemLike,ShareDialog},
        props: {
            "item" :Object,
        },
        mounted(){
            // 请求：通过id获得详细信息
            // 请求：通过ID获得所有评论信息
        },
        data() {
		    return {
                shareDialogOpen:false,
                showMore:1,
                images: null,
                isLike: false,
                isHeart: false,
                detailInfo:{
                    patipacters:[
                        {
                            id:3,
                            username:"宋杰",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/johndoe.jpg"
                        },
                        {
                            id:2,
                            username:"深深",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },
                        {
                            id:4,
                            username:"王小风",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/johndoe.jpg"
                        },
                        {
                            id:6,
                            username:"厉害的不行",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },
                        {
                            id:6,
                            username:"王元和",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },
                        {
                            id:6,
                            username:"王元和",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },
                        {
                            id:6,
                            username:"王元和",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },{
                            id:6,
                            username:"王元和",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },{
                            id:6,
                            username:"王元和",
                            email:"john@edu.cn",
                            avaUrl:"~/assets/images/me.jpg"
                        },
                    ],
                    descriptions:{
                        text:"来玩呀，有美景，有福利！\nBBQ、火锅、日料、韩餐任你选！",
                        images:[{
                                src: "~/assets/images/food/nju/nju2.png"
                            },
                            {
                                src: "~/assets/images/food/nju/nju3.png"
                            },
                            {
                                src: "~/assets/images/food/pancake640.jpg"
                            },
                            {
                                src: "~/assets/images/food/pancake640.jpg"
                            }
                        ]    
                    },
                    comments:[
                       {
                           id:1,
                           user:{
                               id:3,
                                username:"王爱思",
                                email:"john@edu.cn",
                                avaUrl:"~/assets/images/johndoe.jpg"
                           },
                           contents:{
                                text:"111111Lorem ipsum, dolor sit amet consectetur adipisicing elit. \nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
                                images:[
                                    {
                                        src: "~/assets/images/food/pancake640.jpg"
                                    }
                                ]    
                           },
                           dateTime:"2019-01-01 19:31:00" 
                       },
                       {
                           id:2,
                           user:{
                               id:4,
                                username:"王晓芬",
                                email:"john@edu.cn",
                                avaUrl:"~/assets/images/johndoe.jpg"
                           },
                           contents:{
                                text:"2222棒棒阿达",
                                images:[
                                    {
                                        src: "~/assets/images/food/pancake640.jpg"
                                    },
                                    {
                                        src: "~/assets/images/food/pancake640.jpg"
                                    }
                                ]    
                           },
                           dateTime:"2019-01-01 20:31:00" 
                       },
                        {
                            id:3,
                           user:{
                               id:4,
                                username:"王晓芬",
                                email:"john@edu.cn",
                                avaUrl:"~/assets/images/johndoe.jpg"
                           },
                           contents:{
                                text:"3333棒棒阿达",
                                images:[]    
                           },
                           dateTime:"2019-01-01 20:31:00" 
                       },
                       {
                           id:4,
                           user:{
                               id:4,
                                username:"王晓芬",
                                email:"john@edu.cn",
                                avaUrl:"~/assets/images/johndoe.jpg"
                           },
                           contents:{
                                text:"",
                                images:[{
                                        src: "~/assets/images/food/pancake640.jpg"
                                    }]    
                           },
                           dateTime:"2019-01-01 20:31:00" 
                       },
                       {
                           id:5,
                           user:{
                               id:3,
                                username:"王爱思",
                                email:"john@edu.cn",
                                avaUrl:"~/assets/images/johndoe.jpg"
                           },
                           contents:{
                                text:"5555Lorem ipsum, dolor sit amet consectetur adipisicing elit. \nRatione maiores, veritatis nesciunt sint dolorum sequi dicta omnis dolor blanditiis, ipsam officiis commodi temporibus quas non nobis tempore saepe necessitatibus quasi! Lorem ipsum, dolor sit amet consectetur adipisicing elit. ",
                                images:[
                                    {
                                        src: "~/assets/images/food/pancake640.jpg"
                                    },
                                     {
                                        src: "~/assets/images/food/nju/nju1.png"
                                    },
                                    {
                                        src: "~/assets/images/food/nju/nju2.png"
                                    },
                                    {
                                        src: "~/assets/images/food/nju/nju3.png"
                                    },
                                    {
                                        src: "~/assets/images/food/cake/cake3.jpg"
                                    }
                                ]    
                           },
                           dateTime:"2019-01-01 19:31:00" 
                       },
                    ] 
                }
            }
        },
        created() {
            this.images = this.detailInfo.images;
            this.isLike = this.item.isLike;
            this.isHeart = this.item.isFavorite;
        },
        methods: { 
            joinInActivity(){
                //加入活动请求
                confirm({
                    title: "活动加入申请",
                    message: "您确定要加入该活动吗？",
                    okButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(result => {
                    console.log(result);
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
            onLoaded() {
                // this.animateFrom()
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
                this.$navigateBack();
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
                    this.item.likes += 1;
                } else {
                    this.item.likes -= 1;
                }
            },
            toggleHeart() {
                this.animateFavorite();
                this.isHeart = !this.isHeart;
            },
            onClickButton() {
                this.$emit("clicked");
            }
        }
    };
</script>
<style scoped>
    .comment-no{
        font-size: 14;
        font-weight: bold;
        color: #828282;
    }
    .status-profile {
        margin-right: 0;
    }
    .user-info-wrap{
        margin-top:-5;
    }
    .patipacter-name{
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
        padding: 5 0 5 0;
    }

    .like-icon {
        vertical-align: bottom;
        height: 30;
        font-size: 16;
        margin-right: 2;
        padding: 5 5 5 5;
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

    .card-img-thumb {
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 130;
        height: 70;
        margin-left: 5;
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