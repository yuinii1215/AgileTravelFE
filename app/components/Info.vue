<template>
    <page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <GridLayout>
            <GridLayout rows="auto,*,auto" columns="auto" >

                <GridLayout row="0" rows="auto" columns="*,*" class="page-title" verticalAlignment="top"	width="100%"  >
                    <GridLayout class="tabview" :class="selectedTabview==0?'active':''"
                            @tap="showGuide" rows="auto" cols="auto" col="0" row="0" 
                            verticalAlignment="middle" horizontalAlignment="center" width="20%">
                        <Label :class="selectedTabview==0?'active':''" row="0"  col="0" 
                                text="指南" class="tabviewText"/>
                    </GridLayout>
                    <GridLayout class="tabview" :class="selectedTabview==1?'active':''"
                            @tap="showMessage" rows="auto" cols="auto,auto" col="1" row="0"
                            verticalAlignment="middle" horizontalAlignment="center" width="20%">
                        <Label :class="selectedTabview==1?'active':''" row="0"  col="0" 
                                text="消息" class="tabviewText"/>						
                    </GridLayout>
                </GridLayout>

                <GridLayout v-if="selectedTabview==0" row="1"  width="100%" class="guide-body">
                    <StackLayout width="100%">
                        <GridLayout rows="auto,auto" columns="*"  class="action-block">
                            <Label row="0" text="活动创建" class="action-title"/>
                            <GridLayout  row="1" rows="auto,*" columns="*,*,*" class="action-body">
                                <Button row="0" col="0" text="手动创建" @tap="createActivity" class="round-btn" horizontalAlignment="center"  />
                                <Button row="0" col="1" text="我的模板" class="round-btn" horizontalAlignment="center" />
                            </GridLayout>
                        </GridLayout>

                        <StackLayout  class="line lineBasic" width="100%" marginTop="10" marginBottom="10"/>

                        <GridLayout rows="auto,auto" columns="*"  class="action-block">
                            <Label  row="0" text="活动加入"  class="action-title"/>
                            <GridLayout row="1"  rows="auto,*" columns="*,*,*"  class="action-body">
                                <Button row="0" col="0" text="邀请码" @tap="invitePrompt" class="round-btn" horizontalAlignment="center" />
                            </GridLayout>
                        </GridLayout>
 
                    </StackLayout>  
                </GridLayout>

                <GridLayout  v-if="selectedTabview==1" row="1"  width="100%" class="message-body">
                    <GridLayout rows="auto,*"  class="action-block">
                            <Label  row="0" text="系统消息"  class="action-title"/>
                            <GridLayout  row="1"  class="action-body">
                                <Label v-if="infoList.length<=0" class="no-data" horizontalAlignment="center" text="暂无消息"/>
                                <ScrollView width="100%">
                                    <StackLayout class="">
                                        <GridLayout v-for="info in infoList" :key="info.id" 
                                            rows="auto,auto,auto,auto,auto" columns="*,100" class="info-block">
                                            <StackLayout row="0"  colSpan="2"  class="line lineBasic" width="100%" marginTop="4" marginBottom="2"/>
                                            <Label row="1" col="0" text="活动加入申请" class="info-block-title"/>
                                            <GridLayout  row="2" col="0" rows="auto" columns="auto,*" width="100%">
                                                <Image horizontalAlignment="right" stretch="aspectFill" col="0"
                                                        row="0" class="status-profile" :src="info.applicant.avaUrl" />
                                                <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="info.applicant.username" verticalAlignment="middle" horizontalAlignment="left"/>       
                                            </GridLayout>
                                            <GridLayout  row="3" col="0" rows="auto" columns="auto,*" width="100%" class="item-info">
                                                <Image row="0" col="0" class="item-image"  :src="info.activity.cover" stretch="aspectFill" />
                                                <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="info.activity.title" verticalAlignment="middle" horizontalAlignment="left"/>       
                                            </GridLayout>
                                            <GridLayout rowSpan="3" row="1" col="1" rows="auto,auto" columns="*" class="btn-block">
                                                <Button class="info-btn acceept-btn" row="0" col="0" text="同意" @tap="acceptParticipate(info)"/>
                                                <Button class="info-btn" row="1" col="0" text="拒绝" @tap="dismissParticipate(info)"/>
                                            </GridLayout>
                                            <StackLayout row="4"  colSpan="2"  class="line lineBasic" width="100%" marginTop="2" />
                                        </GridLayout>
                                    </StackLayout>
                                </ScrollView>
                            </GridLayout>
                        </GridLayout>
                </GridLayout>


                <NavBottom row="2" :selectedTab="selectedTab" @tabChangeEvent="bottomTabChangeEvent"/>
            </GridLayout>
        </GridLayout>
    </page>
</template>

<script>
	import NavBottom from "./NavBottom";
    import Mine from "./Mine";
    import Home from "./Home";
    import ActivityCreate from './common/ActivityCreate';
    const dialogs = require('tns-core-modules/ui/dialogs')
export default {
    components: {
        NavBottom
    },
    data(){
        return{
            selectedTab:1,
            selectedTabview:0,
            infoList:[]
        }
    },
    mounted(){
        //请求：获得审批信息
        this.$nextTick(()=> {
            this.getApplyList()
        });
    },
    methods: {
        acceptParticipate(info){
            // 请求：审批通过
            this.$backendService
                    .approveAddActivityApply(info.activity.id,info.applicant.id)
                    .then(res => {
                        this.alert("操作成功！");
                        this.getApplyList()
                    })
                    .catch(err=>{
                        this.alert("操作失败！");
                    })
            //请求：消息列表（更
            // this.getApplyList()
        },
        dismissParticipate(info){
            //请求：审批不通过
            this.$backendService
                    .rejectAddActivityApply(info.activity.id,info.applicant.id)
                    .then(res => {
                        this.alert("操作成功！");
                        this.getApplyList();
                    })
                    .catch(err=>{
                        this.alert("操作失败！");
                    })
            //请求：消息列表（更新）
            // this.getApplyList()
        },
        getApplyList(){
            this.$backendService
                    .getActivityAddApply()
                    .then(res => {
                        this.infoList = res
                    })
                    .catch(err=>{
                    })
        },
		bottomTabChangeEvent(index){
			this.selectedTab = index
			if(this.selectedTab==0){
                this.$navigateTo(Home,{animated: false})
			}else if(this.selectedTab==1){

			}else if(this.selectedTab==2){
				this.$navigateTo(Mine,{animated: false})
			}
        },
        alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
            },
        createActivity(){
            this.$navigateTo(ActivityCreate,{
                    props: {
                        state:0,
                        from:2
                    },
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 380,
                        curve: "easeIn"
                    }
			    })
        },
        invitePrompt(){
            prompt({
                title: "加入活动",
                message: "请输入邀请码（等待审核）:",
                okButtonText: "好的",
                cancelButtonText: "取消",
                inputType: dialogs.inputType.text
            }).then(result => {
                //请求：通过邀请码加入活动
                if(result.result){
                    this.$backendService
                        .joinWithInviteCode()
                        .then(res => {
                            this.alert("加入活动请求已发出，待审核！")
                        })
                        .catch(err => {
                            this.alert("加入活动失败！")
                        })
                }
                console.log(`Dialog result: ${result.result}, text: ${result.text}`)
            });
        },
        showGuide(){
                this.selectedTabview = 0;
            },
        showMessage(){
                this.selectedTabview = 1;
        },
        alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
            }
    }
}
</script>
<style scoped>
.page-title {
	font-size: 18;
	background-color:#3d7def;
    text-align: center;
    vertical-align: center;
    color:#fff;
}
.action-block{
    width:100%;
    margin-bottom:10;
}
.action-body{
    margin:10 0 10 0;
    width:100%;
}
.action-title{
    font-size:18;
    margin-left:10;
    padding-left:5;
    border-left-color: #3d7def;
	border-left-width: 5;
}
.line{
    height:0.5
}
.round-btn{
    width:70;
    height:70;
    vertical-align: middle;
    background-color:#3d7def;
    border-radius: 50%;
    color:#fff;
}
.tabview.active{
    border-bottom-color: #fff;
}
.tabviewText {
    color: #e0e0e0;
    font-size:18;
    text-align: center;
    margin-left:0;
}
.tabviewText.active {
    color:#fff;
}

.guide-body{
    padding:20 10 20 10;
}
.message-body{
    padding:20 10 0 10;
}
.item-info{
        border:none;
    }
.item-title{
        margin-top:-5;
        background-color: transparent;
        font-size:14;
        color:#000;
        margin-right:5;
        height:40;
    }
     .item-image {
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 40;
        height: 40;
        margin: 2 10 2 10;
    }
    .status-profile{
        margin: 2 10 0 10;
        width: 40;
        height: 40;
    }
    .info-block{
        padding:2 20 2 20;
    }
    .btn-block{
        height:100%;
        border-left-color:#e0e0e0;
        border-left-width:1;
    }
    .info-btn{
        text-align: center;
        height:100%;
        font-size:16;
        padding:30 10;
        vertical-align: middle;
    }
    .acceept-btn{
        border-bottom-color:#e0e0e0;
        border-bottom-width:1;
    }
    .info-block-title{
        margin-bottom:2;
        font-size:17;
        padding-left:10
    }
</style>

