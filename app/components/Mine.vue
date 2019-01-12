<template>
    <page actionBarHidden="true" backgroundSpanUnderStatusBar="true" class="page">
        <GridLayout>
            <GridLayout rows="auto,auto,auto,*,auto" columns="auto" :class="{ shareDialogOpen: shareDialogOpen }">
                    <GridLayout row="0" rows="auto" width="100%" class="navTopBar" >
                        <Label col="0" row="0" text="我的" class="mine-title"/>
                    </GridLayout>
                    <GridLayout row="1" rows="auto,auto" columns="auto,*" class="mine-info" width="100%">
                        <Image row="0"  col="0"class="mine-profile" src="~/assets/images/me.jpg" 
                            horizontalAlignment="left" verticalAlignment="middle" stretch="aspectFill"  />
                        <StackLayout row="0" col="1" horizontalAlignment="left" verticalAlignment="middle" >
                            <Label text="shaodong" class="mine-username"/>
                            <StackLayout orientation="horizontal" class="mine-email">
                                <Label class="fa email-icon" :text="'fa-envelope-o' | fonticon"/>
                                <Label text="shaodong@edu.cn" />
                            </StackLayout>
                        </StackLayout>
                        <StackLayout row="1" colSpan="2" width="100%" class="line lineBasic" />
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
                        <ScrollView >
                            <StackLayout>
                                <GridLayout v-for="item in createActivityList" :key="item.id" 
                                                rows="*" columns="*">
                                    <item :item="item" @clicked="showItem(item)" @openShareDialogEvent="openShareDialog(item)"/>
                                </GridLayout>
                            </StackLayout>
					    </ScrollView>
                    </GridLayout>

                    <GridLayout v-show="selectedTabview == 1" row="3" width="100%" backgroundColor="white">		
                        <ScrollView >
                            <StackLayout>
                                <GridLayout v-for="item in joinActivityList" :key="item.id" 
                                                rows="*" columns="*">
                                    <item :item="item" @clicked="showItem(item)" @openShareDialogEvent="openShareDialog(item)"/>
                                </GridLayout>
                            </StackLayout>
					    </ScrollView>
                    </GridLayout>
                    <NavBottom row="4" :selectedTab="selectedTab" @tabChangeEvent="bottomTabChangeEvent"/>
            </GridLayout>
            <share-dialog  :item="sharePayload" :dialogOpen="shareDialogOpen" @closeShareDialogEvent="closeShareDialog"/>
        </GridLayout>
    </page>
</template>

<script>
	import NavBottom from "./NavBottom";
    import Info from "./Info";
    import Home from "./Home";
    import Item from "./common/Item";
    import ItemDetails from "./common/ItemDetails";
	import ShareDialog from './common/ShareDialog';
export default {
    components: {
        Item,
		ShareDialog,
        NavBottom
    },
    data(){
        return{
            sharePayload:{},
			shareDialogOpen:false,
            selectedTab:2,
            selectedTabview:0,
            createActivityList:[
                {
				id:3000,
				title: "玄武公园一日游",
				startDateTime:"2019-01-10 10:00:00",
				endDateTime:"2019-01-10 20:00:00",
				address:"中国江苏省南京市玄武区玄武巷1号玄武湖公园",
				organizer:{
					id:3,
					username:"shaodong",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/me.jpg"
				},
				cover:"~/assets/images/food/cake/cake1.jpg",
				comments:6,
                isMember:2,
                isPublic:false
			    },
			{
				id:4000,
				title: "东南大学交流日交流日交流日交流日交流日交流日交流日交流日",
				startDateTime:"2019-02-01 09:00:00",
				endDateTime:"2019-02-01 20:30:00",
				address:"中国江苏省南京市玄武区四牌楼2号",
				organizer:{
					id:3,
					username:"shaodng",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/me.jpg"
				},
				cover:"~/assets/images/food/pancake/pancake1.jpg",
				comments:25,
                isMember:2 ,
                isPublic:true
			}
            ],
            joinActivityList: [
			{
				id:1000,
				title: "湖滨轰趴",
				startDateTime:"2019-01-01 20:00:00",
				endDateTime:"2019-01-01 22:00:00",
				address:"中国江苏省南京市栖霞区紫东路18-2-104号（原保利紫金山售楼处）",
				organizer:{
					id:1,
					username:"王思爱",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/johndoe.jpg"
				},
				cover:"~/assets/images/food/burger/burger1.jpg",
				comments:10,
                isMember:1, //isMember 0是申请中，1是已加入（参与者），2是已加入（创建者），3是非成员
                isPublic:true
			},
			{
				id:2000,
				title:"上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游上海两日游",
				startDateTime:"2019-01-19 08:00:00",
				endDateTime:"2019-01-21 20:00:00",
				address:"中国上海",
				organizer:{
					id:2,
					username:"张鑫",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/johndoe.jpg"
				},
				cover:"~/assets/images/food/nju/nju1.png",
				comments:9,
                isMember: 1,
                isPublic:false
			}
			],

            
        }
    },
    mounted(){
        //请求：通过userID获得用户创建活动列表
        //请求：通过userID获得用户参与活动列表
    },
    methods: {
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
					item: payload
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
</style>

