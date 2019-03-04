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
                                    row="0" class="activity-image" :src="info.cover" />
                        <TextView editable="false"  row="0" col="1" class="activity-title" textWrap="true" :text="info.title" verticalAlignment="middle" horizontalAlignment="left"/>       
                    </GridLayout>
                    <GridLayout  row="2" col="0" rows="auto" columns="auto,*" width="100%" class="item-info">
                        <Image horizontalAlignment="right" stretch="aspectFill" col="0"
                                    row="0" class="status-profile" :src="info.organizer.avaUrl" />
                        <TextView editable="false"  row="0" col="1" class="item-title" textWrap="true" :text="info.organizer.email" verticalAlignment="middle" horizontalAlignment="left"/>       
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
                    {"id":1,"title":"上海二日游，来玩吧","description":"1.请大家在出发日在南京大学广州路校门口集合 \
                        2.统一住宿 \
                        3.大家注意安全，自己物品自行保管 \
                        4.如有其他疑问，可在评论区提出\
                        5.好\
                        ",
                        "address":"中国上海",
                        "startDateTime":"2019-01-20 23:38:00",
                        "endDateTime":"2019-01-21 10:38:00",
                        "cover":"http://agile-travel.oss-cn-shanghai.aliyuncs.com/images/15479986764441547998676339.jpg",
                        "comments":9,
                        "isMember":2,
                        "organizer":{"id":1,"username":"echo","email":"mf1832136@smail.nju.edu.cn","avaUrl":"https://agile-travel.oss-cn-shanghai.aliyuncs.com/images/aiyX2HYWYr.png","weChat":""},
                        "public":true
                    },

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
    .activity-title{
        margin-top:-5;
        background-color: transparent;
        font-size:14;
        color:#000;
        margin-right:5;
        height:60;
    }
    
    .activity-image{
        background-color: #828282;
        vertical-align: center;
        border-radius: 5;
        width: 50;
        height: 50;
        margin: 10;
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
        padding:20 10;
        vertical-align: middle;
    }
    .acceept-btn{
        border-bottom-color:#e0e0e0;
        border-bottom-width:1;
    }
    .status-profile{
        margin:10;
    }
</style>
