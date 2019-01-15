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
                                <TextView row="1" v-model="activity.name" hint="请输入活动标题..." class="input activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute" >
                                <Label row="0" text="活动描述" horizontalAlignment="left"  class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.description" hint="请输入活动描述信息..." class="input activity-attribute-content description-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute">
                                <Label row="0" text="活动图片" horizontalAlignment="left" class="activity-attribute-title"/>
                                <GridLayout row="1" rows="*, auto" class="activity-attribute-content images-area">
                                    <WrapLayout row="0"  columns="auto" height="100%" class="images-show" >
                                        <GridLayout v-for="item in activity.imageUrls" :key="item.id"  width="30%"
                                                rows="auto" columns="auto" class="image-item" horizontalAlignment="center">
                                            <Image class="image-pic" :src="item" stretch="aspectFill" horizontalAlignment="center"/>
                                        </GridLayout>
                                    </WrapLayout>
                                    <Button class="btn btn-primary date-btn" row="1" text="请选择相关图片上传..." @tap="onSelectMultipleTap" horizontalAlignment="left" />
                                </GridLayout>
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="举办地址" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.location" hint="请填写实际有效地址，如：中国江苏省南京市玄武区玄武巷1号玄武湖公园" class="input  activity-attribute-content address-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="是否公开" horizontalAlignment="left" class="activity-attribute-title"/>
                                <StackLayout  orientation="horizontal"  row="1" class="activity-attribute-content ispublic-area">
                                    <Label text="公开" horizontalAlignment="right" class="switch-label"/>
                                    <Switch v-model="activity.isPublic" />
                                    <Label text="不公开" horizontalAlignment="left"  class="switch-label"/>
                                </StackLayout>
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="开始时间" horizontalAlignment="left" class="activity-attribute-title"/>
                                <GridLayout row="1" rows="auto" columns="auto,auto" class="activity-attribute"  horizontalAlignment="center" >
                                    <Button col="0" :text="selectedStartDate?selectedStartDate:'选择开始日期'" @tap="selectStartDate"  class="btn btn-primary date-btn"/>
                                    <Button col="1" :text="selectedStartTime?selectedStartTime:'选择开始时间'" @tap="selectStartTime"  class="btn btn-primary date-btn"/>
                                </GridLayout>
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="结束时间" class="activity-attribute-title"  horizontalAlignment="left"/>
                                <GridLayout row="1" rows="auto" columns="auto,auto" class="activity-attribute" horizontalAlignment="center">
                                    <Button  col="0" :text="selectedEndDate?selectedEndDate:'选择结束日期'" @tap="selectEndDate"  class="btn btn-primary date-btn"/>
                                    <Button  col="1" :text="selectedEndTime?selectedEndTime:'选择结束时间'" @tap="selectEndTime"  class="btn btn-primary date-btn"/>
                                </GridLayout>
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
 import Mine from "../Mine";
 import * as imagepicker from "nativescript-imagepicker";

const startModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
const endModalPicker = require("nativescript-modal-datetimepicker")
  .ModalDatetimepicker;
 
const startPicker = new startModalPicker();
const endPicker = new endModalPicker();

export default {
    props:{
        state:{
            type:Number,
            default:0//0表示创建 1表示修改
        },
        activityID:String
    },
    mounted(){
        if(this.state==1){
            //请求：获得活动基本信息 更新this.activity
        }
    },
    data(){
        return{
            activity:{
                title:"",
                description:"",
                imageUrls:[],
                location:"",
                startTime:"",
                endTime:"",
                isPublic:true
            },
            isSingleMode:false,
            previewSize: 300,
            thumbSize: 80,
            thumbSize: null,
            selectedStartDate:"",
            selectedStartTime:"",
            selectedEndDate:"",
            selectedEndTime:"",
            startDate:"",
            startTime:""
        }   
    },
    methods:{
        close() {
            this.$navigateBack();
        },
        submitActivity(){
            console.log(this.activity.name)
            console.log(this.activity.description)
            console.log(this.activity.location)
            console.log(this.activity.startTime)
            console.log(this.activity.endTime)
            console.log(this.activity.isPublic)
            console.log(JSON.stringify(this.activity.imageUrls))

            //请求：新建活动
            this.$navigateTo(Mine)

        },
        onSelectMultipleTap(){
            let context = imagepicker.create({
                    mode: "multiple"
            });
            this.startSelection(context);
        },
        startSelection(context) {
            context
                .authorize()
                    .then(() => {
                        this.activity.imageUrls = [];
                        return context.present();
                    })
                    .then((selection) => {
                        // console.log("Selection done: " + JSON.stringify(selection));
                        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                        selection.forEach(element => {
                            element.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                            element.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                        });
                        this.activity.imageUrls = selection;
                    }).catch(function (e) {
                        console.log(e);
                    });
            },
        selectStartDate(){
            this.selectedEndDate=""
            this.selectedEndTime=""
            startPicker
                .pickDate({
                title: "请选择活动开始日期",
                theme: "light",
                minDate: new Date()
                })
                .then(result => {
                    if(result){
                        this.selectedStartDate =  result.year + "-" + result.month + "-" + result.day;
                        this.startDate = new Date(result.year, result.month - 1, result.day);
                    }else  if(this.selectedStartDate){
                           
                    }else{
                        var date = new Date()
                        this.selectedStartDate  =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();  
                        this.startDate = new Date()
                    }
                    this.getStartDateTime()
                })
                .catch(error => {
                    var date = new Date()
                    this.selectedStartDate  =date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();  
                    this.startDate = new Date()
                    this.getStartDateTime()
                    console.log("Error: " + error);
                });
        },
        selectStartTime() {
            this.selectedEndDate=""
            this.selectedEndTime=""
            startPicker
                .pickTime({
                title: "请选择活动开始时间",
                theme: "light"
                })
                .then(result => {
                    if(result){
                         this.selectedStartTime =  result.hour + ":" + result.minute + ":00"
                         this.startTime = new Date()
                         this.startTime.setHours(result.hour,result.minute,"0")
                    }else if(this.selectedStartTime){
        
                    }else{
                        var date = new Date()
                        this.selectedStartTime =date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
                        this.startTime = new Date()
                    }
                    this.getStartDateTime()
                })
                .catch(error => { 
                    var date = new Date()
                    this.selectedStartTime =date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
                    this.getStartDateTime()
                    console.log("Error: " + error);
                });
        },
        selectEndDate(){
            if(!this.activity.startTime){
                alert({
                    title: "提示",
                    message: "请先选定活动开始时间",
                    okButtonText: "好的"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            }else{
            endPicker
                .pickDate({
                title: "请选择活动结束日期",
                theme: "light",
                minDate: this.startDate
                })
                .then(result => { 
                    if(result){
                        this.selectedEndDate =  result.year + "-" + result.month + "-" + result.day;
                    }else if(this.selectedEndDate){
                        
                    }else{
                        this.selectedEndDate  = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
                    }
                    this.getEndDateTime()
                })
                .catch(error => {
                    this.selectedEndDate  = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
                    this.getEndDateTime()
                    console.log("Error: " + error);
                });
            }
        },
        selectEndTime() {
            if(!this.selectedEndDate){
                alert({
                    title: "提示",
                    message: "请先选定活动结束日期",
                    okButtonText: "好的"
                }).then(() => {
                    console.log("Alert dialog closed");
                });
            }else{
            endPicker
                .pickTime({
                title: "请选择活动结束时间",
                theme: "light"
                })
                .then(result => {
                    if(result){
                        this.selectedEndTime =  result.hour + ":" + result.minute + ":00"
                        var endTime = new Date()
                        endTime.setHours(result.hour,result.minute,"00")
                        if(((this.startTime>=endTime)||this.selectedStartTime==this.selectedEndTime)&&(this.selectedStartDate==this.selectedEndDate)){
                            alert({
                                title: "提示",
                                message: "请保证结束时间晚于开始时间",
                                okButtonText: "好的"
                            }).then(() => {
                                console.log("Alert dialog closed");
                            });
                            this.selectedEndTime =  this.startTime.getHours() + ':' + this.startTime.getMinutes() + ':' + (this.startTime.getSeconds()+1); 
                        }   
                    }else if(this.selectedEndTime){
                    }
                    else{
                        this.selectedEndTime  = this.startTime.getHours() + ':' + this.startTime.getMinutes() + ':' +  (this.startTime.getSeconds()+1); 
                        var endTime = new Date()
                        if(((this.startTime>=endTime)||this.selectedStartTime==this.selectedEndTime)&&(this.selectedStartDate==this.selectedEndDate)){
                            alert({
                                title: "提示",
                                message: "请保证结束时间晚于开始时间",
                                okButtonText: "好的"
                            }).then(() => {
                                console.log("Alert dialog closed");
                            });
                            this.selectedEndTime =  this.startDate.getHours() + ':' + this.startDate.getMinutes() + ':' + this.startDate.getSeconds(); 
                        }  
                    }
                    this.getEndDateTime()
                })
                .catch(error => {
                    this.selectedEndTime  = this.startDate.getHours() + ':' + this.startDate.getMinutes() + ':' + this.startDate.getSeconds(); 
                    this.getEndDateTime()
                    console.log("Error: " + error);
                });
            }
        },
        getStartDateTime(){
            var date = new Date()
            if(!this.selectedStartDate){
                this.selectedStartDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                this.startDate = new Date()
            }
           
            if(!this.selectedStartTime){
                this.selectedStartTime = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
                this.startTime = new Date() 
            }
            this.activity.startTime= this.selectedStartDate +" "+this.selectedStartTime;
            // console.log(this.activity.startTime)
        },
        getEndDateTime(){
            if(!this.selectedEndDate){
                this.selectedEndDate = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
            }
           
            if(!this.selectedEndTime){
                this.selectedEndTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()+ ':' +  (this.startTime.getSeconds()+1);  
            }
            this.activity.endTime= this.selectedEndDate +" "+this.selectedEndTime;
            // console.log(this.activity.endTime)
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
    .address-area{
        height:50;
    }
    .btn-submit{
        font-size:16;
    }
    .date-label{
        text-align: center;
    }
    .date-btn{
        background-color: transparent;
        border-width:0.5;
        border-radius: 2;
        border-color:#3d7def;
        color:#3d7def;
    }
    .images-area{
        margin:10 0 10 0;
    }
    .images-show{
         margin-top:10;
         margin-left:15;
    }
    .image-item{
        margin:5 5 5 0;
    }
    .image-pic{
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 100;
        height: 70;
    }
    .ispublic-area{
        margin:10 0 10 15;
    }
    .switch-label{
        color:#999999;
        font-size:16;
        margin:0 5 0 5;
    }
</style>
