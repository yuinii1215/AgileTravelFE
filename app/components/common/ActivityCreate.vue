<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true">
        <StackLayout class="activity-edit" verticalAlignment="top" >
            <GridLayout rows="auto" width="100%" columns="*" class="navTopBar">
                <Label col="0" row="0" :text="state==0?'创建活动':'编辑活动'" class="create-title"/>
                <Label col="0" row="0" verticalAlignment="top" class="fa close" fontSize="24"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"/>
            </GridLayout>
            <GridLayout rows="*,auto" columns="auto" >
                <GridLayout row="0" width="100%">
                    <ScrollView>
                        <StackLayout class="activity-create-body" marginTop="10" marginBottom="10">
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute" >
                                <Label row="0" text="活动标题" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.title" hint="请输入活动标题..." class="input activity-attribute-content" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute" >
                                <Label row="0" text="活动描述" horizontalAlignment="left"  class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.description" hint="请输入活动描述信息..." class="input activity-attribute-content description-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute">
                                <Label row="0" text="活动图片" horizontalAlignment="left" class="activity-attribute-title"/>
                                <GridLayout row="1" rows="*, auto" class="activity-attribute-content images-area">
                                    <WrapLayout row="0"  columns="auto" height="100%" class="images-show" >
                                        <GridLayout v-for="item in activity.images" :key="item.id"  width="30%"
                                                rows="auto" columns="auto" class="image-item" horizontalAlignment="center">
                                            <Image class="image-pic" :src="item" stretch="aspectFill" horizontalAlignment="center"/>
                                        </GridLayout>
                                    </WrapLayout>
                                    <Button class="btn btn-primary date-btn" row="1" text="请选择相关图片上传..." @tap="onSelectMultipleTap" horizontalAlignment="left" />
                                </GridLayout>
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="举办地址" horizontalAlignment="left" class="activity-attribute-title"/>
                                <TextView row="1" v-model="activity.address" hint="请填写实际有效地址，如：中国江苏省南京市玄武区玄武巷1号玄武湖公园" class="input  activity-attribute-content address-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*"  class="activity-attribute">
                                <Label row="0" text="是否公开" horizontalAlignment="left" class="activity-attribute-title"/>
                                <StackLayout  orientation="horizontal"  row="1" class="activity-attribute-content ispublic-area">
                                    <Label text="公开" horizontalAlignment="right" class="switch-label"/>
                                    <Switch v-model="activity.public" />
                                    <Label text="私有" horizontalAlignment="left"  class="switch-label"/>
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

                            <GridLayout v-if="state==1" rows="auto,auto" columns="*" class="activity-attribute">
                                <Label row="0" text="活动成员" horizontalAlignment="left" class="activity-attribute-title"/>
                                <GridLayout row="1" rows="*, auto" class="activity-attribute-content">
                                    <ScrollView class="participant-list-scroll" :height="participantsSize>5?200:''">
                                        <StackLayout>
                                            <WrapLayout v-for="participant in participants" :key="participant.id"
                                                class="participant-list">
                                                <StackLayout  width="33%" >
                                                    <Image class="status-profile" :src="participant.avaUrl" verticalAlignment="top" 
                                                    horizontalAlignment="center"  stretch="aspectFill"  />
                                                </StackLayout>
                                                <StackLayout width="33%" class="participant-name-block">
                                                    <Label class="participant-name" :text="participant.username"
                                                        horizontalAlignment="left" textWrap="true" />
                                                </StackLayout>
                                                <StackLayout width="33%">
                                                    <Button text="移除" @tap="removeParticipant(participant.id)"   horizontalAlignment="center" verticalAlignment="middle"  class="btn btn-small delete-btn"/>
                                                 </StackLayout>
                                            </WrapLayout>
                                        </StackLayout>
                                    </ScrollView>
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
 import Info from "../Info";
 import Home from "../Home";
 import ItemDetails from "./ItemDetails";
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
        item:Object,
        from:Number
    },
    mounted(){
        if(this.state==1){
            //请求：通过id获得活动详细信息
            this.$nextTick(()=> {
             this.$backendService
                    .getActivityDetailInfo(this.item.id)
                    .then(res => {
                        this.activity = res;
                        this.participants = this.activity.participants;
                        this.participantsSize = this.participants.length;
                      
                        if(this.activity.startDateTime.split(" ").length>1){
                            this.selectedStartDate = this.activity.startDateTime.split(" ")[0]
                            this.selectedStartTime = this.activity.startDateTime.split(" ")[1]
                        }
                        if(this.activity.endDateTime.split(" ").length>1){
                            this.selectedEndDate = this.activity.endDateTime.split(" ")[0]
                            this.selectedEndTime = this.activity.endDateTime.split(" ")[1]
                        }
                    })
                    .catch(err=>{
                        console.log(res)
                    })
            })
        }
    },
    data(){
        return{
            activity:{
                title:"",
                description:"",
                images:[],
                address:"",
                startDateTime:"",
                endDateTime:"",
                public:true
            },
            participants: [],
            participantsSize:0,
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
        getBack(){
            console.log(this.from)
            if(this.from ==0) this.getDetailInfo();
            if(this.from ==1) this.gotoHomePage();
            if(this.from ==2) this.gotoInfoPage();
            if(this.from ==3) this.gotoMinePage();
            //0:详细信息页面，1:Home页面，2:Info页面，3：Mine页面
        },
        close() {
            // this.$navigateBack();
            this.getBack()
        },
        submitActivity(){
            console.log(this.activity.title)
            console.log(this.activity.description)
            console.log(this.activity.address)
            console.log(this.activity.startDateTime)
            console.log(this.activity.endDateTime)
            console.log(this.activity.public)
            console.log(JSON.stringify(this.activity.images))

            var info ={
                "name": this.activity.title,
                "description":  this.activity.description,
                "location": this.activity.address,
                "startTime": this.activity.startDateTime,
                "endTime": this.activity.endDateTime,
                "imageUrls":this.activity.images,
                "isPublic": this.activity.public,
            }
            //请求：新建活动
            if(this.state==0){
                this.$backendService
                    .createActivity(info)
                    .then(res => {
                        this.$navigateTo(Mine)
                        this.alert("创建成功！")
                        
                    })
                    .catch(err=>{
                        this.alert("创建失败！")
                    })
            }
            //请求：修改活动
            if(this.state==1){
                this.$backendService
                    .modifyActivity(this.item.id,info)
                    .then(res => {
                        this.getBack();
                        this.alert("编辑成功！");
                        // this.$navigateBack();
                        
                    })
                    .catch(err=>{
                        this.alert("编辑失败！")
                    })
            }
                

        },
        removeParticipant(userId){
            //请求：删除成员
            this.$backendService
                    .removeActivityParticipant(this.item.id,userId)
                    .then(res => {
                        this.alert("移除成功！")
                        //刷新列表
                        this.getParticipant()
                    })
                    .catch(err=>{
                        this.alert("移除失败！")
                    })
            
        },
        getParticipant(){
            this.$backendService
                    .getActivityParticipants(this.item.id)
                    .then(res => {
                        this.participants = res;
                         this.participantsSize = this.participants.length;
                    })
                    .catch(err=>{
                    })
        },
        alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
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
                        this.activity.images = [];
                        return context.present();
                    })
                    .then((selection) => {
                        // console.log("Selection done: " + JSON.stringify(selection));
                        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                        selection.forEach(element => {
                            element.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                            element.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                        });
                        this.activity.images = selection;
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
            if(!this.activity.startDateTime){
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
            this.activity.startDateTime= this.selectedStartDate +" "+this.selectedStartTime;
            // console.log(this.activity.startDateTime)
        },
        getEndDateTime(){
            if(!this.selectedEndDate){
                this.selectedEndDate = this.startDate.getFullYear() + '-' + (this.startDate.getMonth() + 1) + '-' + this.startDate.getDate();
            }
           
            if(!this.selectedEndTime){
                this.selectedEndTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()+ ':' +  (this.startTime.getSeconds()+1);  
            }
            this.activity.endDateTime= this.selectedEndDate +" "+this.selectedEndTime;
            // console.log(this.activity.endDateTime)
        },
        getDetailInfo(){
                // 请求：通过id获得详细信息
                this.$backendService
                    .getActivityDetailInfo(this.item.id)
                    .then(res => {
                        this.gotoDetailPage(res)
                    })
                    .catch(err=>{
                        console.log(err)
                        // this.$navigateBack();
                    })
        },
        gotoDetailPage(payload){
            this.$navigateTo(ItemDetails,{
                props: {
                    activityId: payload.id,
                    from: 3
				},
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
			})
        },
        gotoHomePage(){
            this.$navigateTo(Home);
        },
        gotoInfoPage(){
            this.$navigateTo(Info);
        },
        gotoMinePage(){
            this.$navigateTo(Mine);
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
    .status-profile {
        margin-right: 0;
        width:45;
        height:45;
    }
    .participant-name{
    }
    .delete-btn{
        background-color: transparent;
        border-width:0.5;
        border-radius: 2;
        border-color:#3d7def;
        color:#3d7def;
    }
    .participant-name-block{
        height:100%;
        vertical-align: middle;
    }
</style>
