<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<GridLayout>
			<GridLayout rows="auto,auto,*,auto" columns="auto" :class="{ shareDialogOpen: shareDialogOpen }">

				<GridLayout row="0" ref="navStatusBar" class="navStatusBar" backgroundColor="#3d7def" verticalAlignment="top" height="40"
				width="100%" rows="auto" columns="*,auto,auto,auto">
					<Label col="0" row="0" text="社区" class="status-title"/>
					<Image col="1" row="0" @tap="search" horizontalAlignment="right" class="status-img"
							src="~/assets/images/search.png" />
					<Image col="2" row="0" @tap="bell" horizontalAlignment="right" class="status-img"
							src="~/assets/images/bell.png" />
					<Image horizontalAlignment="right" stretch="aspectFill" col="3"
							row="0" class="status-profile" :src="this.user.avaUrl" />
				</GridLayout>

				<GridLayout  row="1" ref="navTab" class="navTab" verticalAlignment="top"
						width="100%"  rows="*,auto" columns="auto,auto">
					<GridLayout class="tabview" :class="selectedTabview==0?'active':''"
							@tap="showActivity" rows="auto" cols="auto,auto" col="0" row="0" 
							verticalAlignment="middle" horizontalAlignment="center" width="50%">
						<Image v-show="selectedTabview==0"  row="0" col="0" class="navIcon" 
								:src="selectedTabview==0?'~/assets/images/activity.png':''"/>
						<Label :class="selectedTabview==0?'active':''" row="0"  col="1" 
								text="活动" class="tabviewText"/>
					</GridLayout>
					<GridLayout class="tabview" :class="selectedTabview==1?'active':''"
							@tap="showShare" rows="auto" cols="auto,auto" col="1" row="0"
							verticalAlignment="middle" horizontalAlignment="center" width="50%">
						<Image v-show="selectedTabview == 1" row="0" col="0" class="navIcon"
								:src="selectedTabview==1?'~/assets/images/share.png':''"/>
						<Label :class="selectedTabview==1?'active':''" row="0"  col="1" 
								text="分享" class="tabviewText"/>						
					</GridLayout>
				</GridLayout>

				<GridLayout v-show="selectedTabview == 0" row="2" width="100%" backgroundColor="white">
					<ScrollView >
						<StackLayout>
							<GridLayout v-for="item in items" :key="item.id" 
                                            rows="*" columns="*">
								<item  col="0" row="0" :item="item" @clicked="showItem(item)" @modifyClick="modifyClick(item)" @openShareDialogEvent="openShareDialog(item)"/>
							</GridLayout>
						</StackLayout>
					</ScrollView>
				</GridLayout>

				<GridLayout v-show="selectedTabview == 1" row="2" width="100%" backgroundColor="white">		
					<ScrollView >
						<StackLayout>
							<GridLayout v-for="shareInfo in shareInfos" :key="shareInfo.id" 
                                            rows="*" columns="*">
								<single-share-block  col="0" row="0" @clicked="showDetail(shareInfo)" :shareInfo="shareInfo"/>
							</GridLayout>
						</StackLayout>
					</ScrollView>
				</GridLayout>

				<!-- <navBottom row="3" /> -->
				<NavBottom row="3" :selectedTab="selectedTab" @tabChangeEvent="bottomTabChangeEvent"/>
			</GridLayout>

			<share-dialog  :item="sharePayload" :dialogOpen="shareDialogOpen" @closeShareDialogEvent="closeShareDialog"/>
		</GridLayout>
	</page>
</template>
<script>
	// import { SwissArmyKnife } from "nativescript-swiss-army-knife";
	import { isIOS, isAndroid } from 'tns-core-modules/platform'
	import Item from "./common/Item";
	import SingleShareBlock from "./common/SingleShareBlock";
	import ItemDetails from "./common/ItemDetails";
	import ShareDialog from './common/ShareDialog';
	import ActivityCreate from './common/ActivityCreate';
	import NavBottom from "./NavBottom";
    import Info from "./Info";
    import Mine from "./Mine";
	const gestures = require("ui/gestures"); 
	const app = require("application");

export default {
	components: {
		Item,
		SingleShareBlock,
		ShareDialog,
		NavBottom
	},
	mounted () {
		//获得用户头像
		this.user = this.$backendService.getUser()
		 this.$nextTick(()=> {
			 this.getActivityList();
			 this.getShareList();
		 })
	},
	data() {
		return {
			sharePayload:{},
			shareDialogOpen:false,
			selectedTab: 0,
			selectedTabview: 0,
			items: [],
			shareInfos: [],
			user:{}
		};
	},
	methods: {
		getActivityList(){
			//请求：获得所有活动信息
			this.$backendService
						.getAllActivityListWithPage(0)
						.then(res => {
							this.items = res
						})
						.catch(err => {})
		},
		getShareList(){
			//请求：获得所有分享列表
			this.$backendService
						.getShareList()
						.then(res => {
							this.shareInfos = res.reverse()
						})
						.catch(err => {})
		},
		bottomTabChangeEvent(index){
			this.selectedTab = index
			if(this.selectedTab==0){
			}else if(this.selectedTab==1){
				this.$navigateTo(Info,{animated: false})
			}else if(this.selectedTab==2){
				this.$navigateTo(Mine,{animated: false})
			}
        },
		openShareDialog(item){
			this.sharePayload = item
            this.shareDialogOpen = true
        },
        closeShareDialog(){
			this.shareDialogOpen = false
			this.getShareList();
        },
		search(){
			console.log('search')
		},
		bell(){
			console.log('bell')
		},
		showDetail(info){
			// 请求通过ID获得基本信息 this.shareInfo.activity.id
            this.$backendService
                    .getActivityDetailInfo(info.activity.id)
                    .then(res => {
                        this.showItem(res)
                    })
                    .catch(err=>{
                        console.log(res)
                    })
		},
		showItem(payload) {
			this.sharePayload = payload
			this.$navigateTo(ItemDetails,{
				props: {
					activityId: payload.id,
					from: 0
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
						from:1
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
			    })
		},
		showActivity() {
			this.selectedTabview = 0;
		},
		showShare() {
			this.selectedTabview = 1;
		},
	}
};
</script>

<style>
.navIcon{
	margin-right:30;
	margin-top:5;
	width:25;
}

.status-img {
	margin-top: 4;
	margin-right: 20;
	width: 30;
	height: 30;
}
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
.status-title {
	color: white;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	vertical-align: center;
}
</style>