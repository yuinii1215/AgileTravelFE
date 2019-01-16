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
                                    <Button class="btn btn-primary date-btn" row="1" text="请选择评论图片上传..." @tap="onSelectMultipleTap" horizontalAlignment="left" />
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
           
        }   
    },
    methods:{
        close(){
            this.$navigateBack();
        },
        submitComment(){
            //请求：提交评论
            if(this.comment.content==""&&this.comment.imageUrls.length<=0){
                this.alert("请填写评论内容")
            }else{
                this.$backendService
                    .applyAddActivity(this.activityId,this.comment)
                    .then(res => {
                        this.alert("评论成功")
                    })
                    .catch(err => {
                        this.alert("评论失败！")
                    })

                this.$navigateBack();
            }
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
                        this.comment.imageUrls = [];
                        return context.present();
                    })
                    .then((selection) => {
                        // console.log("Selection done: " + JSON.stringify(selection));
                        // set the images to be loaded from the assets with optimal sizes (optimize memory usage)
                        selection.forEach(element => {
                            element.options.width = this.isSingleMode ? this.previewSize : this.thumbSize;
                            element.options.height = this.isSingleMode ? this.previewSize : this.thumbSize;
                        });
                        this.comment.imageUrls = selection;
                    }).catch(function (e) {
                        console.log(e);
                    });
        },
    
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
