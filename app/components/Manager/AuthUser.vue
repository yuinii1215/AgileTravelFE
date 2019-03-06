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
                    <GridLayout rowSpan="2" row="1" col="1" rows="auto" columns="*" class="btn-block">
                        <Button v-if="info.check==0"  class="info-btn" row="0" col="0" text="审批通过" @tap="handleUser(info)"/>
                        <Button v-if="info.check==1" class="info-btn" row="0" col="0" text="不通过" @tap="handleUser(info)"/>
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
                    // {"id":19,"username":"user1","email":"user1@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":10,"username":"user2","email":"user2@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                    // {"id":11,"username":"user3","email":"user3@nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/avatar/IMG_2273.JPG","weChat":""},
                ]
            };
        },
        mounted(){
            this.$nextTick(()=> {
                this.getUserApplyList()
            })
        },
        methods: {
        getUserApplyList(){
            //获得用户列表
            this.$backendService.getUserListForManager()
            .then(res=>{
                this.infoList = res;
            }).catch(res=>{
            })
        },
        handleUser(info){
            // 请求：审批
            this.$backendService.applyUserForManager(info.id)
            .then(res=>{
                this.getUserApplyList();
            }).catch(res=>{
            })
            // this.getUserApplyList()
        }
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
    .btn-block{
        height:100%;
        border-left-color:#e0e0e0;
        border-left-width:1;
    }
    .info-btn{
        text-align: center;
        height:100%;
        font-size:16;
        padding:10 10;
        vertical-align: middle;
    }
    .acceept-btn{
        border-bottom-color:#e0e0e0;
        border-bottom-width:1;
    }
</style>
