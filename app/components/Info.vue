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
                                <ScrollView width="100%">
                                    <StackLayout class="">
                                        <GridLayout v-for="info in systemInfo" :key="info.id" 
                                            rows="*" columns="*">
                                            <!-- <Image row="0"  col="0"class="mine-profile" src="~/assets/images/me.jpg" 
                                                horizontalAlignment="left" verticalAlignment="middle" stretch="aspectFill"  />
                                            <StackLayout row="0" col="1" horizontalAlignment="left" verticalAlignment="middle" >
                                                <Label text="shaodong" class=""/>
                                                <StackLayout orientation="horizontal" class="mine-email">
                                                    <Label class="fa email-icon" :text="'fa-envelope-o' | fonticon"/>
                                                    <Label text="shaodong@edu.cn" />
                                                </StackLayout>
                                            </StackLayout> -->
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
        }
    },
    methods: {
		bottomTabChangeEvent(index){
			this.selectedTab = index
			if(this.selectedTab==0){
                this.$navigateTo(Home,{animated: false})
			}else if(this.selectedTab==1){

			}else if(this.selectedTab==2){
				this.$navigateTo(Mine,{animated: false})
			}
        },
        createActivity(){
            this.$navigateTo(ActivityCreate,{
                    props: {
                        state:0
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
                console.log(`Dialog result: ${result.result}, text: ${result.text}`)
            });
        },
        showGuide(){
                this.selectedTabview = 0;
            },
        showMessage(){
                this.selectedTabview = 1;
        },
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
    padding:20 10 20 10;
}
</style>

