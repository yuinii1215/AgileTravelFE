<template>
    <Page actionBarHidden="true" class="anim-page"
        backgroundSpanUnderStatusBar="true">
        <StackLayout class="activity-edit" verticalAlignment="top" >
            <GridLayout rows="auto" width="100%" columns="*" class="navTopBar">
                <Label col="0" row="0" text="发表评论" class="create-title"/>
                <Label col="0" row="0" verticalAlignment="top" class="fa close" fontSize="24"
                        horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"/>
            </GridLayout>
            <GridLayout rows="*,auto" columns="auto" >
                <GridLayout row="0" width="100%">
                    <ScrollView>
                        <StackLayout class="activity-create-body" marginTop="10" marginBottom="10">
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute" >
                                <Label row="0" text="评论文字" horizontalAlignment="left"  class="activity-attribute-title"/>
                                <TextView row="1" v-model="comment.content" hint="请输入活动描述信息..." class="input activity-attribute-content description-area" />
                            </GridLayout>
                            <GridLayout rows="auto,auto" columns="*" class="activity-attribute">
                                <Label row="0" text="评论图片" horizontalAlignment="left" class="activity-attribute-title"/>
                                <GridLayout row="1" rows="*, auto" class="activity-attribute-content images-area">
                                    <WrapLayout row="0"  columns="auto" height="100%" class="images-show" >
                                        <GridLayout v-for="item in comment.imageUrls" :key="item.id"  width="30%"
                                                rows="auto" columns="auto" class="image-item" horizontalAlignment="center">
                                            <Image class="image-pic" :src="item" stretch="aspectFill" horizontalAlignment="center"/>
                                        </GridLayout>
                                    </WrapLayout>
                                    <Button class="btn btn-primary date-btn" row="1" text="请选择评论图片并上传..." @tap="onSelectMultipleTap" horizontalAlignment="left" />
                                </GridLayout>
                            </GridLayout>
                            
                        </StackLayout>
                    </ScrollView>
                </GridLayout>
                <StackLayout  row="1"  columns="*,*" width="100%" horizontalAlignment="center">
					<Button text="发布评论" @tap="submitComment" class="btn-submit btn btn-primary" />
				</StackLayout>
            </GridLayout>
        </StackLayout>
    </Page>
</template>

<script>
import * as imagepicker from "nativescript-imagepicker";
const bgHttp = require("nativescript-background-http");
const fs = require("file-system");
 import { isIOS, isAndroid } from "tns-core-modules/platform";

 import ItemDetails from "./ItemDetails";
 var imageName;
 var counter = 0;
 
export default {
    props:{
        activityId:String
    },
    mounted(){
     
    },
    data(){
        return{
            comment:{
                content:"",
                imageUrls:[]
            },
            isSingleMode:false,
            previewSize: 300,
            thumbSize: 80,
            thumbSize: null,
            session: bgHttp.session("image-upload"),
           
        }   
    },
    methods:{
        close(){
            // this.$navigateBack();
            this.getDetailInfo()
        },
        submitComment(){
            //请求：提交评论
            if(this.comment.content==""&&this.comment.imageUrls.length<=0){
                this.alert("请填写评论内容")
            }else{
                this.comment.imageUrls=[
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/Jt2jNR2jxF.jpg",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/j5RfdnpZQ5.png",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/rsRsRYT7Y8.jpg",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/t5JXn4hdxP.jpg",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/KZRPx4tzkJ.jpg",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/weBsP25bwW.png",
                    "http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/X82kwb5N2N.png"]
                console.log(JSON.stringify(this.comment))
                this.$backendService
                    .commentActivity(this.activityId,this.comment)
                    .then(res => {
                        this.alert("评论成功")
                    })
                    .catch(err => {
                        this.alert("评论失败！")
                    })

                // this.$navigateBack();
                    this.getDetailInfo()
                
            }
        },
        getDetailInfo(){
                // 请求：通过id获得详细信息
                this.$backendService
                    .getActivityDetailInfo(this.activityId)
                    .then(res => {
                        this.gotoDetail(res)
                    })
                    .catch(err=>{
                        console.log(err)
                        // this.$navigateBack();
                    })
            },
        gotoDetail(payload){
            this.$navigateTo(ItemDetails,{
				props: {
                    activityId: payload.id,
                    from: 2
				},
				animated: true,
				transition: {
					name: "slideTop",
					duration: 380,
					curve: "easeIn"
				}
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
            let _self =this;
            context
                .authorize()
                    .then(() => {
                        this.comment.imageUrls = [];
                        return context.present();
                    })
                    .then((selection) => {
                        let imageAsset = null;
                        if(selection.length > 0){
                           selection.forEach(selected_item => {
                                this.getImageFilePath(selected_item).then(path => {
                                    console.log(`path: ${path}`);
                                    this.comment.imageUrls.push(path)
                                    console.log(JSON.stringify(this.comment.imageUrls))
                                    this.uploadImage(path);
                                });
                                selected_item.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                                selected_item.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                            });
                        }
                        // this.comment.imageUrls = selection;
                        console.log(JSON.stringify(this.comment.imageUrls))
                    }).catch(function (e) {
                        console.log(e);
                    });
        },
        uploadImage(path) {
                let file = fs.File.fromPath(path);
                this.currentFileNameBeingUploaded = file.path.substr(
                    file.path.lastIndexOf("/") + 1
                );
                let request = this.createNewRequest();
                request.description = "uploading image " + file.path;
                request.headers["File-Name"] = this.currentFileNameBeingUploaded;
                // var params = [{
                //         name: "test",
                //         value: "value"
                //     },
                //     {
                //         name: "fileToUpload",
                //         filename: file.path,
                //         mimeType: "image/jpeg"
                //     }
                // ];
                // var task = this.session.multipartUpload(params, request);
                let task = this.session.uploadFile(file.path, request);
                // task.on("progress", this.logEvent);
                // task.on("error", this.logEvent);
                task.on("responded",this.logEvent);
                // task.on("complete", this.logEvent);
            },
            createNewRequest() {
                let url;
                // NOTE: using https://httpbin.org/post for testing purposes,
                // you'll need to use your own service in real-world app
                if (isIOS) {
                    url = "https://httpbin.org/post";
                } else {
                    url = "http://www.csm-testcenter.org/test";
                }
                let request = {
                    url: url,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream"
                    },
                    description: "uploading file...",
                    androidAutoDeleteAfterUpload: false,
                    androidNotificationTitle: "NativeScript HTTP background"
                };
                return request;
            },
            getImageFilePath(imageAsset) {
                return new Promise(resolve => {
                    if (isIOS) {
                        const options = PHImageRequestOptions.new();
                        options.synchronous = true;
                        options.version =
                            PHImageRequestOptionsVersion.Current;
                        options.deliveryMode =
                            PHImageRequestOptionsDeliveryMode.HighQualityFormat;

                        PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(
                            imageAsset.ios,
                            options,
                            nsData => {
                                // create file from image asset and return its path
                                const tempFolderPath = fs.knownFolders
                                    .temp()
                                    .getFolder("nsimagepicker").path;
                                const tempFilePath = fs.path.join(
                                    tempFolderPath,
                                    Date.now() + ".jpg"
                                );

                                nsData.writeToFileAtomically(
                                    tempFilePath, true);
                                resolve(tempFilePath);
                            }
                        );
                    } else {
                        // return imageAsset.android, since it 's the path of the file
                        resolve(imageAsset.android);
                    }
                });
            },
            logEvent(e) {
                console.log(JSON.stringify(e))
                console.log("currentBytes: " + e.currentBytes);
                console.log("totalBytes: " + e.totalBytes);
                console.log("eventName: " + e.eventName);
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
</style>
