<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true" @loaded="onLoaded">
        <StackLayout class="main" verticalAlignment="top" >
            <GridLayout rows="auto" width="100%" columns="*" class="navTopBar">
                <Label col="0" row="0" text="创建活动" class="create-title"/>
                <Label col="0" row="0" verticalAlignment="top" class="fa close" fontSize="24"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"/>
            </GridLayout>
            <GridLayout rows="*,auto" columns="auto" >
                <GridLayout row="0" width="100%">
                    <ScrollView>
                        <StackLayout class="activity-create-body" marginTop="10" marginBottom="10">
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute" >
                                <Label row="0" text="活动标题" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextField row="1" v-model="activity.title" hint="请输入活动标题..." class="input input-border activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute" >
                                <Label row="0" text="活动描述" horizontalAlignment="left"  class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.description" hint="请输入活动描述信息..." class="input input-border activity-attribute-content description-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute">
                                <Label row="0" text="活动图片" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextField row="1" v-model="activity.images" hint="请上传活动相关图片..." class="input input-border activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="举办地址" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.address" hint="如：中国江苏省南京市玄武区玄武巷1号玄武湖公园" class="input input-border activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="开始时间" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextField row="1" v-model="activity.startDateTime" hint="请选择活动开始时间..." class="input input-border activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="结束时间" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextField row="1" v-model="activity.endDateTime" hint="请选择活动结束时间..." class="input input-border activity-attribute-content" />
                            </GridLayout>
                        </StackLayout>
                    </ScrollView>
                </GridLayout>
                <StackLayout  row="1" width="100%" horizontalAlignment="center">
					<Button text="提交" @tap="submitActivity" class="btn-submit btn btn-primary" />
				</StackLayout>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    data(){
        return{
            activity:{
                title:"",
                description:"",
                images:[],
                address:"",
                startDateTime:"",
                endDateTime:""
            }
        }   
    },
    methods:{
        close() {
            this.$navigateBack();
        },
        submitActivity(){
            console.log(this.activity)
        }
    }
}
</script>

<style scoped>
    .navTopBar{
        background-color:#3d7def;
        padding:10
    }
    .create-title{
        text-align: center;
        font-size: 18;
        vertical-align: center;
        color:#fff;
    }
     .close {
        font-size: 20;
        color: rgb(226, 229, 229);
        margin-left:15;
    }
    .activity-attribute{
        margin:10 10 0 10;
    }
    .activity-attribute-title{
        font-size:18;
        margin-left:10;
        padding-left:5;
        border-left-color: #3d7def;
	    border-left-width: 5;
    }
    .activity-attribute-content{
        font-size:17;
    }
    .description-area{
        height:100;
    }
    .btn-submit{
        font-size:16;
    }
</style>
