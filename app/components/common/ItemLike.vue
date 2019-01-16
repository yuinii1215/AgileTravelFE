<template>
    <!-- <GridLayout marginTop="5" width="100%" row="3" columns="auto,*,auto,auto" rows="auto"> -->
    <GridLayout columns="*,auto,auto,auto" rows="auto">
        <!-- <GridLayout col="0" rows="auto" columns="auto,auto" v-if="item.isMember==2" verticalAlignment="bottom" @tap="modifyActivity">
            <Label horizontalAlignment="right" verticalAlignment="bottom" stretch="aspectFill" col="0"
							row="0" class="fa like-icon layout" :text="'fa-edit'| fonticon" />
            <Label col="1" row="0" class="layout" text="编辑"></Label>
        </GridLayout> -->
        <GridLayout col="0" rows="auto" columns="auto,auto" v-if="item.isMember!=2">
            <Image horizontalAlignment="right" stretch="aspectFill" col="0"
							row="0" class="status-profile" :src="item.organizer.avaUrl" />
            <Label col="1" row="0" class="layout" :text="item.organizer.username"></Label>
        </GridLayout>
        <GridLayout col="1" rows="auto" columns="auto,auto"  orientation="horizontal" verticalAlignment="bottom" horizontalAlignment="right"  class="item-comment icon-btn">
            <Label col="0" row="0" ref="" class="like-icon layout fa" :text="'fa-comment-o' | fonticon" />
            <Label col="1" row="0" class="layout" :text="item.comments"></Label>
        </GridLayout>
        <!-- <GridLayout col="2" rows="auto" columns="auto,auto" @tap="toggleHeart"
            marginRight="15">
            <Label col="0" row="0" ref="favorite" class="like-icon  fa"
                :class="[item.isFavorite ? 'heart-active' : 'default']" :text="item.isFavorite ? 'fa-heart':'fa-heart-o' | fonticon" />
            <Label col="1" row="0" class="layout" text="Favorite"></Label>
        </GridLayout> -->
        <StackLayout  class="icon-btn"  col="2" orientation="horizontal" v-if="item.isMember==0" >
            <Label class="layout" text="加入请求待审核" ></Label>
        </StackLayout>
        <StackLayout  class="icon-btn"  col="2" orientation="horizontal" horizontalAlignment="right"  v-if="item.isMember==1" @tap="joinOutActivity">
            <Label ref="" class="like-icon layout fa" :text="'fa-user-times' | fonticon" />
            <Label class="layout" text="退出活动"></Label>
        </StackLayout>
        <StackLayout  class="icon-btn"  col="2" orientation="horizontal" horizontalAlignment="right"  v-if="item.isMember==3" @tap="joinInActivity">
            <Label ref="" class="like-icon layout fa" :text="'fa-user-plus' | fonticon" />
            <Label class="layout" text="申请加入"></Label>
        </StackLayout>
        <StackLayout class="icon-btn" :col="item.isMember==1?3:2" orientation="horizontal" v-if="item.isMember==1||item.isMember==2" @tap="openShareDialog()">
            <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" />
            <Label class="layout" text="分享" ></Label>
        </StackLayout>
        
    </GridLayout>
</template>

<script>
    // import ActivityCreate from './ActivityCreate';
    export default {
        props: {
            item:Object
        },
        data() {
            return {
            };
        },
        mounted(){
           
        },
        methods: {
            modifyActivity(){
                this.$navigateTo(ActivityCreate,{
                    props: {
                        state:1,
                        activityID:0
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
                    console.log(result);
                });
            },
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
                this.$emit("openShareDialogEvent");
            }
        }
    };
</script>
<style scoped>
    .status-profile {
        border-width: 1;
        border-color: #ffffff;
        background-color: #f1ebeb;
        border-radius: 50%;
        margin-top: 4;
        margin-right: 15;
        width: 30;
        height: 30;
    }

    .rating-icon {
        padding-top: 3;
        color: #FFE900;
        font-size: 14;
        margin-left: 10;
    }

    .rating-value {
        margin-left: 5;
    }

    .liked-active {
        color: #4080FF;
    }

    .heart-active {
        color: #b51213;
    }

    .default {
        color: #828282;
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

    .content {
        margin-left: 16;
        margin-right: 16;
        margin-bottom: 3;
        margin-top: 16;
    }

    .card-img {
        width: 100%;
        height: 150;
        margin-bottom: 10;
    }
    
    .generate-code-btn{
        border-bottom-color:#4080FF;
        border-bottom-width:1;
    }
</style>