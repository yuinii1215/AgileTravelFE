<template>
    <page actionBarHidden="true" backgroundSpanUnderStatusBar="true" class="page">
        <GridLayout>
            <GridLayout rows="auto,auto,auto,*,auto" columns="auto" :class="{ shareDialogOpen: shareDialogOpen }">
                    <GridLayout row="0" rows="auto" width="100%" class="navTopBar" >
                        <Label col="0" row="0" text="我的" class="mine-title"/>
                    </GridLayout>
                    <GridLayout row="1" rows="auto,auto" columns="auto,*,auto" class="mine-info" width="100%">
                        <Image row="0"  col="0"class="mine-profile" :src="user.avaUrl" 
                            horizontalAlignment="left" verticalAlignment="middle" stretch="aspectFill"  />
                        <StackLayout row="0" col="1" horizontalAlignment="left" verticalAlignment="middle" >
                            <Label :text="user.username" class="mine-username"/>
                            <StackLayout orientation="horizontal" class="mine-email">
                                <Label class="fa email-icon" :text="'fa-envelope-o' | fonticon"/>
                                <Label :text="user.email" />
                            </StackLayout>
                        </StackLayout>
                        <StackLayout class="sign-out-btn" orientation="horizontal"  row="0" col="2" horizontalAlignment="right" verticalAlignment="middle" @tap="signOut">
                            <Label class="fa email-icon" :text="'fa-sign-out' | fonticon"/>
                            <Label text="退出登录" />
                        </StackLayout>
                        <StackLayout row="1" colSpan="3" width="100%" class="line lineBasic" />
                    </GridLayout>
                    <GridLayout  row="2" ref="navTab" class="navTab" verticalAlignment="top"
						width="100%"  rows="auto" columns="*,*">
                        <GridLayout class="tabview" :class="selectedTabview==0?'active':''"
                                @tap="showCreate" rows="auto" cols="auto" col="0" row="0" 
                                verticalAlignment="middle" horizontalAlignment="center" width="20%">
                            <!-- <Label v-show="selectedTabview==0"  row="0" col="0" class="navIcon" 
                                    :text="selectedTabview==0?'fa-location-arrow'|fonticon:''"/> -->
                            <Label :class="selectedTabview==0?'active':''" row="0"  col="0" 
                                    text="我创建的" class="tabviewText"/>
                        </GridLayout>
                        <GridLayout class="tabview" :class="selectedTabview==1?'active':''"
                                @tap="showJoin" rows="auto" cols="auto,auto" col="1" row="0"
                                verticalAlignment="middle" horizontalAlignment="center" width="20%">
                            <!-- <Label v-show="selectedTabview==1"  row="0" col="0" class="navIcon" 
                                    :text="selectedTabview==1?'fa-location-arrow'|fonticon:''"/> -->
                            <Label :class="selectedTabview==1?'active':''" row="0"  col="0" 
                                    text="我参与的" class="tabviewText"/>						
                        </GridLayout>
				    </GridLayout>

                    <GridLayout v-show="selectedTabview == 0" row="3" width="100%" backgroundColor="white">
                        <Label v-if="createActivityList.length<=0" class="no-data mine-none" text="暂无活动，快快创建吧" width="100%"/>
                        <ScrollView >
                            <StackLayout  v-if="createActivityList.length>0">
                                <GridLayout v-for="item in createActivityList" :key="item.id" 
                                                rows="*" columns="*">
                                    <item :item="item" @clicked="showItem(item)" @modifyClick="modifyClick(item)" @openShareDialogEvent="openShareDialog(item)"/>
                                </GridLayout>
                            </StackLayout>
					    </ScrollView>
                    </GridLayout>

                    <GridLayout v-show="selectedTabview == 1" row="3" width="100%" backgroundColor="white">	
                        <Label v-if="joinActivityList.length<=0" class="no-data mine-none" text="暂无活动，快快加入吧"/>
                        <ScrollView >
                            <StackLayout  v-if="joinActivityList.length>0">
                                <GridLayout v-for="item in joinActivityList" :key="item.id" 
                                                rows="*" columns="*">
                                    <item :item="item" @clicked="showItem(item)" @openShareDialogEvent="openShareDialog(item)"/>
                                </GridLayout>
                            </StackLayout>
					    </ScrollView>
                    </GridLayout>
                    <NavBottom row="4" :selectedTab="selectedTab" @tabChangeEvent="bottomTabChangeEvent"/>
            </GridLayout>
            
            <AbsoluteLayout  v-show="selectedTabview == 0"  marginTop="85.5%" marginLeft="79%">
				<FabButton @onButtonTap="onButtonTap" :isActive="isActive" />
			</AbsoluteLayout>

            <share-dialog  :item="sharePayload" :dialogOpen="shareDialogOpen" @closeShareDialogEvent="closeShareDialog"/>
        </GridLayout>
    </page>
</template>

<script>
	import NavBottom from "./NavBottom";
    import Info from "./Info";
    import Home from "./Home";
    import FabButton from "./common/FabButton";
    import ItemDetails from "./common/ItemDetails";
    import ShareDialog from './common/ShareDialog';
    import ActivityCreate from './common/ActivityCreate';
    import Item from "./common/Item";
    import Login from "./Login"

    export default {
        components: {
            ShareDialog,
            NavBottom,
            FabButton,
            Item
        },
        data(){
            return{
                user:{},
                sharePayload:{},
                shareDialogOpen:false,
                selectedTab:2,
                selectedTabview:0,
                isActive: false, 
                createActivityList:[],
                joinActivityList: [],  
            }
        },
        mounted(){
            //获得个人信息
            this.user = this.$backendService.getUser();
            this.$nextTick(()=> {
                //请求：通过userID获得用户创建活动列表
                this.$backendService
                    .getMyCreateActivityList()
                    .then(res => {
                        this.createActivityList = res
                    })
                    .catch(err => {
                    })
                //请求：通过userID获得用户参与活动列表
                this.$backendService
                    .getMyJoinActivityList()
                    .then(res => {
                        this.joinActivityList = res
                    })
                    .catch(err => {
                    })
            })
        },
        methods: {
            signOut(){
                //清理store
                this.$backendService.logOut()
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            onButtonTap() {
                this.$navigateTo(ActivityCreate,{
                    props: {
                        state:0,
                        from:3
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                })
            },
            openShareDialog(item){
                this.sharePayload = item
                this.shareDialogOpen = true
            },
            closeShareDialog(){
                this.shareDialogOpen = false
            },
            bottomTabChangeEvent(index){
                this.selectedTab = index
                if(this.selectedTab==0){
                    this.$navigateTo(Home,{animated: false})
                }else if(this.selectedTab==1){
                    this.$navigateTo(Info,{animated: false})
                }else if(this.selectedTab==2){
                    
                }
            },
            showCreate(){
                this.selectedTabview = 0;
            },
            showJoin(){
                this.selectedTabview = 1;
            },
            showItem(payload) {
                this.sharePayload = payload
                this.$navigateTo(ItemDetails,{
                    props: {
                        activityId: payload.id,
                        from: 1
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
                })
            },
            modifyClick(payload){
			this.$navigateTo(ActivityCreate,{
                    props: {
                        state:1,
                        item:payload,
                        from:3
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
			    })
		    },

        }
    }
</script>
<style scoped>
    .navTopBar{
        background-color:#3d7def;
        padding:10
    }
    .mine-profile{
        width:50;
        height:50;
        border-width: 1;
        border-color: #ffffff;
        background-color: #f1ebeb;
        border-radius: 50%;
        margin:10;

    }
    .mine-title{
        text-align: center;
        font-size: 18;
        vertical-align: center;
        color:#fff;
    }
    .mine-username{
        font-size: 17;
    }
    .mine-email{
        font-size: 15;
    }
    .email-icon{
        margin-right:5;
    }
    .navTab{
        background-color: transparent;
    }
    .tabview.active{
        border-bottom-color: #3d7def;
    }
    .tabviewText {
        color: #a7a7a7b4;
        margin-left:0;
        width:100%;
        text-align: center;
    }
    .tabviewText.active {
        color:#3d7def;
    }
    .line{
        height:0.5;
    }
    .sign-out-btn{
        margin-right:10;
        font-size:16;
    }
    .mine-none{
        margin-top:10;
        text-align: center;
    }
</style>

