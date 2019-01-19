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
                                <StackLayout  row="0"  orientation="horizontal">
                                    <Label text="评论图片" horizontalAlignment="left" class="activity-attribute-title"/>
                                    <Label text="最多上传5张" horizontalAlignment="left"   verticalAlignment="bottom"  class="no-data"/>
                                </StackLayout>
                                <GridLayout row="1" rows="*, auto" class="activity-attribute-content images-area">
                                    <WrapLayout row="0"  columns="auto" height="100%" class="images-show" >
                                        <GridLayout v-for="item in imagesShow" :key="item.id"  width="30%"
                                                rows="auto" columns="auto" class="image-item" horizontalAlignment="center">
                                            <Image class="image-pic" :src="item" stretch="aspectFill" horizontalAlignment="center"/>
                                        </GridLayout>
                                    </WrapLayout>
                                    <Button class="btn btn-primary date-btn" row="1" :text="uploadState?'图片上传中...':'请选择评论图片并上传...'" @tap="onSelectMultipleTap" horizontalAlignment="left" />
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
            imagesShow:[],
            isSingleMode:false,
            previewSize: 300,
            thumbSize: 80,
            thumbSize: null,
            session: bgHttp.session("image-upload"),
            uploadState:false,
            uploadImageLen:0,
            imageCount:0,
        }   
    },
    methods:{
        close(){
            // this.$navigateBack();
            this.getDetailInfo()
        },
        submitComment(){
            if(this.uploadState){
                 this.alert("请等待图片上传结束！")
            }else{
                //请求：提交评论
                if(this.comment.content==""&&this.comment.imageUrls.length<=0){
                    this.alert("请填写评论内容")
                }else{
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
                    mode: "multiple",
                    maximumNumberOfSelection:5
            });
            this.startSelection(context);
        },
        startSelection(context) {
            context
                .authorize()
                    .then(() => {
                        this.comment.imageUrls = [];
                        this.imagesShow =[];
                        this.imageCount = 0;
                        return context.present();
                    })
                    .then((selection) => {
                        let imageAsset = null;
                        this.uploadImageLen = selection.length;
                        if(selection.length > 0){
                           selection.forEach(selected_item => {
                                this.uploadState = true;
                                this.getImageFilePath(selected_item).then(path => {
                                    this.uploadImage(path);
                                });
                                selected_item.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                                selected_item.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                            });
                        }else
                            this.uploadState = false;
                        this.imagesShow = selection;
                    }).catch(function (e) {
                        console.log(e);
                    });
        },
        uploadImage(path) {
                this.uploadState = true;
                let file = fs.File.fromPath(path);
                this.currentFileNameBeingUploaded = file.path.substr(
                    file.path.lastIndexOf("/") + 1
                );
                let request = this.createNewRequest();
                request.description = "uploading image " + file.path;
                request.headers["File-Name"] = this.currentFileNameBeingUploaded;
                
                var params = [{
                        name: "test",
                        value: "value"
                    },
                    {
                        name: "fileToUpload",
                        filename:file.path,
                        mimeType: "image/jpeg"
                    }
                ];
                var task = this.session.multipartUpload(params, request);
                task.on("responded",this.logEvent); 
            },
            createNewRequest(data) {
                let request = {
                    url: this.$backendService.getBackEndUrl()+"/upload/images",
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
                this.imageCount+=1;

                if(this.imageCount==this.uploadImageLen){
                    this.uploadState = false;
                }
                console.log(JSON.stringify(e))
                if(e.responseCode==200){
                    //  this.alert("第"+this.imageCount+"张图片上传成功！")
                    console.log(e.data)
                    this.comment.imageUrls.push('http://'+e.data)
                }else{
                    // this.alert("第"+this.imageCount+"张图片上传失败！")

                }
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
