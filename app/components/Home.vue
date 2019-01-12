<template>
	<page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
		<!-- @loaded="onLoaded" -->
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
							row="0" class="status-profile" src="~/assets/images/me.jpg" />
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
					<ListView ref="listview" separatorColor="transparent" for="item in items" :key="index">
						<v-template>
							<item :item="item" @clicked="showItem(item)" @openShareDialogEvent="openShareDialog(item)"/>
						</v-template>
					</ListView>
				</GridLayout>

				<GridLayout v-show="selectedTabview == 1" row="2" width="100%" backgroundColor="white">		
					<ListView ref="listview" separatorColor="transparent" for="shareInfo in shareInfos" :key="index">
						<v-template>
							<single-share-block :shareInfo="shareInfo"/>
						</v-template>
					</ListView>
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
	computed: {
	},
	mounted () {
		//请求：获得所有活动信息
		//请求：获得所有分享列表
	},
	data() {
		return {
			sharePayload:{},
			shareDialogOpen:false,
			selectedTab: 0,
			selectedTabview: 0,
			items: [
			{
				id:1000,
				title: "湖滨轰趴",
				startDateTime:"2019-01-01 20:00:00",
				endDateTime:"2019-01-01 22:00:00",
				address:"中国江苏省南京市栖霞区紫东路18-2-104号（原保利紫金山售楼处）",
				organizer:{
					id:1,
					username:"刘莉",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/johndoe.jpg"
				},
				cover:"~/assets/images/food/burger/burger1.jpg",
				comments:10,
				isMember:2, //isMember 0是申请中，1是已加入，2是非成员
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
				isMember:2,
				isPublic:true 
			},
			{
				id:3000,
				title: "玄武公园一日游",
				startDateTime:"2019-01-10 10:00:00",
				endDateTime:"2019-01-10 20:00:00",
				address:"中国江苏省南京市玄武区玄武巷1号玄武湖公园",
				organizer:{
					id:3,
					username:"王爱思",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/johndoe.jpg"
				},
				cover:"~/assets/images/food/cake/cake1.jpg",
				comments:6,
				isMember:0,
				isPublic:true 
			},
			{
				id:4000,
				title: "东南大学交流日交流日交流日交流日交流日交流日交流日交流日",
				startDateTime:"2019-02-01 09:00:00",
				endDateTime:"2019-02-01 20:30:00",
				address:"中国江苏省南京市玄武区四牌楼2号",
				organizer:{
					id:3,
					username:"王爱思",
					email:"john@edu.cn",
					avaUrl:"~/assets/images/johndoe.jpg"
				},
				cover:"~/assets/images/food/pancake/pancake1.jpg",
				comments:25,
				isMember:1,
				isPublic:true
			},
			],
			shareInfos: [
				{
					id:1,
                    user:{
                        id:3,
                        username:"王爱思",
                        email:"john@edu.cn",
                        avaUrl:"~/assets/images/johndoe.jpg"
					},
					contents:{
						text:"111厉害的不行"
					},
                    activity:{
						id:1000,
						title: "湖滨轰趴",
						cover: "~/assets/images/food/burger/burger1.jpg"
					},
					likeNum:11,
					isLike:false,
                    dateTime:"2019-01-01 19:31:00" 
				},
				{
					id:2,
                    user:{
                        id:3,
                        username:"王爱思",
                        email:"john@edu.cn",
                        avaUrl:"~/assets/images/johndoe.jpg"
					},
					contents:{
						text:"222快来参加"
					},
                    activity:{
						id:1000,
						title: "湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴湖滨轰趴",
						cover: "~/assets/images/food/nju/nju2.png"
					},
					likeNum:12,
					isLike:true,
                    dateTime:"2019-01-01 19:31:00" 
				},
				{
					id:3,
                    user:{
                        id:3,
                        username:"王爱思",
                        email:"john@edu.cn",
                        avaUrl:"~/assets/images/johndoe.jpg"
					},
					contents:{
						text:"333有很多小姐姐哦小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐小姐姐"
					},
                    activity:{
						id:1000,
						title: "湖滨轰趴是的",
						cover: "~/assets/images/food/nju/nju1.png"
					},
					likeNum:0,
					isLike:false,
                    dateTime:"2019-01-01 19:31:00" 
				},
				{
					id:4,
                    user:{
                        id:3,
                        username:"王爱思",
                        email:"john@edu.cn",
                        avaUrl:"~/assets/images/johndoe.jpg"
					},
					contents:{
						text:"444快快上车"
					},
                    activity:{
						id:1000,
						title: "湖滨轰趴",
						cover: "~/assets/images/food/cake/cake1.jpg"
					},
					likeNum:1,
					isLike:false,
                    dateTime:"2019-01-01 19:31:00" 
				},
				{
					id:5,
                    user:{
                        id:3,
                        username:"刘鑫",
                        email:"john@edu.cn",
                        avaUrl:"~/assets/images/me.jpg"
					},
					contents:{
						text:"444快快上车\n了不得了不得\n有好吃的、有好玩的！"
					},
                    activity:{
						id:1000,
						title: "湖滨轰趴dhshsj是电话费灰色空间佛挡杀佛开会",
						cover: "~/assets/images/food/burger/burger1.jpg"
					},
					likeNum:0,
					isLike:true,
                    dateTime:"2019-01-01 19:31:00" 
				}
			]
		};
	},
	methods: {
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
        },
		search(){
			console.log('search')
		},
		bell(){
			console.log('bell')
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