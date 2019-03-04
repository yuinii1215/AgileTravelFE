<template>
    <GridLayout  row="1"  class="user-apply-body">
        <Label v-if="infoList.length<=0" class="no-data" horizontalAlignment="center" text="暂无消息"/>
        <ScrollView width="100%">
            <StackLayout class="">
                <GridLayout v-for="info in infoList" :key="info.id" 
                    rows="auto,auto,auto,auto,auto" columns="*,100" class="info-block">
                <!-- <StackLayout row="0"  colSpan="2"  class="line lineBasic" width="100%" marginTop="4" marginBottom="2"/> -->
                    <GridLayout  row="1" col="0" rows="auto" columns="auto,*" width="100%">
                        <Image horizontalAlignment="right" stretch="aspectFill" col="0"
                                    row="0" class="status-profile" :src="info.avaUrl" />
                        <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="info.username" verticalAlignment="middle" horizontalAlignment="left"/>       
                    </GridLayout>
                    <GridLayout  row="2" col="0" rows="auto" columns="auto,*" width="100%" class="item-info">
                        <!-- <Image row="0" col="0" class="item-image"  :src="info.activity.cover" stretch="aspectFill" /> -->
                        <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="info.email" verticalAlignment="middle" horizontalAlignment="left"/>       
                    </GridLayout>
                    <GridLayout rowSpan="2" row="1" col="1" rows="auto,auto" columns="*" class="btn-block">
                        <Button class="info-btn acceept-btn" row="0" col="0" text="审批通过" @tap="acceptActivity(info)"/>
                        <Button class="info-btn" row="1" col="0" text="不通过" @tap="dismissActivity(info)"/>
                    </GridLayout>
                    <StackLayout row="3"  colSpan="2"  class="line lineBasic" width="100%" marginTop="2" />
                </GridLayout>
            </StackLayout>
        </ScrollView>
    </GridLayout>                                
</template>

<script>
    export default {
        data() {
            return {
                infoList:[
                    {"id":19,"username":"user1","email":"user1@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":10,"username":"user2","email":"user2@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                ]
            };
        },
        mounted(){
            this.$nextTick(()=> {
                this.getActivityApplyList()
            })
        },
        methods: {
        getActivityApplyList(){
            //获得用户审批列表
        },
        acceptActivity(info){
            // 请求：审批通过
            console.log("审批通过");
            //请求：消息列表（更
            // this.getActivityApplyList()
        },
        dismissActivity(info){
            //请求：审批不通过
            console.log("审批不通过");
            //请求：消息列表（更新）
            // this.getActivityApplyList()
        },
        }
    };
</script>

<style scoped>
    .user-apply-body{
        font-size:16px;
        padding:10px 20px;
    }
    .line{
        height:0.5;
    }
    .info-block{
        padding:2 20 2 20;
    }
</style>
