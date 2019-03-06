<template>
    <AbsoluteLayout v-if="dialogOpen" class="dialog-wrapper">
		<StackLayout class="dialog" verticalAlignment="middle" horizontalAlignment="center">
            <TextView class="text-field" v-model="textFieldValue" hint="这一刻的想法..." width="100%"/>
            <GridLayout rows="auto" columns="auto,*" width="100%" class="item-info">
                <Image row="0" col="0" class="item-image"  :src="item.cover" stretch="aspectFill" />
                <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="item.title" verticalAlignment="middle" horizontalAlignment="left"/>
            </GridLayout>
            <StackLayout  class="line lineBasic" width="100%" marginTop="10" marginBottom="10"/>
            <GridLayout rows="auto" columns="*,*" width="100%" horizontalAlignment="center">
                <Button row="0" col="0" class="btn btn-primary" text="取消" horizontalAlignment="right" @tap="closeDialog"></Button>
                <Button row="0" col="1" class="btn btn-primary" text="分享"  horizontalAlignment="left" @tap="shareActivity"></Button>
            </GridLayout>
		</StackLayout>
	</AbsoluteLayout>
</template>
<script>
export default {
     props: {
        "dialogOpen":Boolean,
        "item":Object
    },
    data(){
        return{
            textFieldValue:""
        }
    },
    watch:{
        textFieldValue(){
            // console.log(this.textFieldValue)
        }
    },
    methods: {
        showDialog() {
            this.dialogOpen = true;
        },
        closeDialog() {
            this.dialogOpen = false;
            this.$emit("closeShareDialogEvent")
        },
        shareActivity(){
            var params = {
                "contents": this.textFieldValue,
                "activityId": this.item.id
            }
            this.$backendService
                    .shareActivity(params)
                    .then(res => {
                        this.alert("分享成功！")
                        this.dialogOpen = false;
                        this.$emit("closeShareDialogEvent")
                    })
                    .catch(err=>{
                        this.alert("分享失败！私有活动不可分享或活动暂未通过审批！")
                    })
        },
        alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
            },
    }
}
</script>

<style scoped>
    @keyframes show {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.dialog-wrapper {
        width:100%;
        height:100%;
		animation-name: show;
		animation-duration: 0.3s;
		animation-fill-mode: forwards;
    }

	.dialog {
		border-width: 1 0 1 0;
		border-color: #c9c9c9;
		background-color: #fff;
        width: 100%;
        margin:auto;
        padding: 20;
	}
    .text-field{
        font-size:16;
        height:80;
    }
    .item-info{
        margin-top:10;
        background-color: #e6e6e6;
        border:none;
        border-radius: 5;
    }
    .item-title{
        margin-top:-5;
        background-color: transparent;
        font-size:14;
        color:#000;
        margin-right:5;
        height:60;
    }
     .item-image {
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 50;
        height: 50;
        margin: 10;
    }

    .line{
        height:0.5
    }
</style>
