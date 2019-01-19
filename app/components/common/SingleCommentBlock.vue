<template>
    <Gridlayout  rows="*,auto" columns="45,auto"  width="100%" marginBottom="15" class="single-comment">
        <GridLayout row="0" col="0" columns="auto" rows="auto,auto" marginBottom="5" marginRight="10" >
            <Image row="0" col="0"  class="status-profile" :src="comment.author.avaUrl" 
                horizontalAlignment="center" verticalAlignment="top" stretch="aspectFill"  />
            <Label row="1" col="0" class="comment-name" :text="comment.author.username"
                horizontalAlignment="center"  verticalAlignment="bottom" textWrap="true" />
        </GridLayout>
        <GridLayout row="0" col="1" rows="auto" columns="auto" width=100% height="100%">
            <StackLayout width=100% height="100%">
                <Textview v-if="comment.content" editable="false" class="comment-text" 
                                   :text="comment.content" />
                <ScrollView v-if="comment.imageUrls.length>0"  orientation="horizontal" >
                    <StackLayout orientation="horizontal" class="">
                        <GridLayout v-for="image in comment.imageUrls" :key="image.id" rows="auto"
                            columns="*">
                            <Image class="comment-image" row="0" col="0" :src="image"
                                stretch="aspectFill" />
                        </GridLayout>
                    </StackLayout>
                </ScrollView>
                <Label class="comment-datatime" textWrap="true" :text="comment.postedTime" />
            </StackLayout>
        </GridLayout>
        <StackLayout row="1" col="0" colSpan="2" width="100%" class="line lineBasic" marginTop="10"  />
    </Gridlayout>
    
</template>
<script>
export default {
    props:["comment"],
    mounted(){
    }
    
}
</script>
<style scoped>
    .status-profile {
        margin-right: 0;
    }
    .comment-name{
        font-size:12px;
        text-align: center;
    }

    .comment-text{
        font-size:16px;
        margin-bottom:5;
    }

    .comment-image{
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 130;
        height: 70;
        margin-left: 5;
    }
    .comment-datatime{
        font-size: 12;
        color: #828282;
        margin-top: 5;
        margin-left: 5;
    }
    .line{
        height:0.5;
    }
</style>
