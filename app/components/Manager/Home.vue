<template>
    <Page class="page" actionBarHidden="true">
        <GridLayout>
            <GridLayout rows="auto,auto,auto,*,auto" columns="auto" >
                    <GridLayout row="0" rows="auto" width="100%" class="navTopBar" >
                        <Label col="0" row="0" text="管理员" class="manager-title"/>
                    </GridLayout>
                    <GridLayout row="1" rows="auto,auto" columns="auto,*,auto" class="manager-info" width="100%">
                        <Image row="0"  col="0"class="manager-profile" :src="user.avaUrl" 
                            horizontalAlignment="left" verticalAlignment="middle" stretch="aspectFill"  />
                        <StackLayout row="0" col="1" horizontalAlignment="left" verticalAlignment="middle" >
                            <Label :text="user.username" class="manager-username"/>
                            <StackLayout orientation="horizontal" class="manager-email">
                                <Label class="fa email-icon" :text="'fa-envelope-o' | fonticon"/>
                                <Label :text="user.email" />
                            </StackLayout>
                        </StackLayout>
                        <StackLayout class="sign-out-btn" orientation="horizontal"  row="0" col="2" horizontalAlignment="right" verticalAlignment="middle" @tap="signOut">
                            <Label class="fa email-icon" :text="'fa-sign-out' | fonticon"/>
                            <Label text="退出登录" />
                        </StackLayout>
                        <StackLayout row="1" colSpan="3" width="100%" class="line lineBasic" />
                    </GridLayout>
                    <GridLayout  row="2" ref="navTab" class="navTab" verticalAlignment="top"
						width="100%"  rows="auto" columns="*,*">
                        <GridLayout class="tabview" :class="selectedTabview==0?'active':''"
                                @tap="showUserList" rows="auto" cols="auto" col="0" row="0" 
                                verticalAlignment="middle" horizontalAlignment="center" width="20%">
                            <Label :class="selectedTabview==0?'active':''" row="0"  col="0" 
                                    text="审批用户" class="tabviewText"/>
                        </GridLayout>
                        <GridLayout class="tabview" :class="selectedTabview==1?'active':''"
                                @tap="showActivityList" rows="auto" cols="auto,auto" col="1" row="0"
                                verticalAlignment="middle" horizontalAlignment="center" width="20%">
                            <Label :class="selectedTabview==1?'active':''" row="0"  col="0" 
                                    text="审批活动" class="tabviewText"/>						
                        </GridLayout>
				    </GridLayout>

                    <AuthUser v-show="selectedTabview == 0" row="3" width="100%" backgroundColor="white"/>
                    <AuthActivity v-show="selectedTabview == 1" row="3" width="100%" backgroundColor="white"/>
            </GridLayout>
           
        </GridLayout>
    </Page>
</template>

<script>
    import AuthUser from './AuthUser'
    import AuthActivity from './AuthActivity'
    import Login from "../Login"
    import Header from "../Header"
    export default {
        name:"manager-home",
        components: {
            AuthUser,Header,AuthActivity
        },
        data() {
            return {
                textColor:"#3d7def",
                canBack:true,
                user:{},
                selectedTabview:0,
            };
        },
        mounted(){
            this.user = this.$backendService.getUser()
            console.log(JSON.stringify(this.user));
        },
        methods: {
            signOut(){
                //清理store
                this.$backendService.logOut()
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            },
            showUserList(){
                this.selectedTabview=0;
            },
            showActivityList(){
                this.selectedTabview=1;
            }

        }
    };
</script>

<style scoped>
    .navTopBar{
        background-color:#3d7def;
        padding:10
    }
    .manager-title{
        text-align: center;
        font-size: 18;
        vertical-align: center;
        color:#fff;
    }
    .manager-profile{
        width:50;
        height:50;
        border-width: 1;
        border-color: #ffffff;
        background-color: #f1ebeb;
        border-radius: 50%;
        margin:10;

    }
    .manager-username{
        font-size: 17;
    }
    .manager-email{
        font-size: 15;
    }
    .email-icon{
        margin-right:5;
    }
    .btn-primary {
        margin: 30 5 15 5;
    }   
    .navTab{
        background-color: transparent;
    }
    .tabview.active{
        border-bottom-color: #3d7def;
    }
    .tabviewText {
        color: #a7a7a7b4;
        margin-left:0;
        width:100%;
        text-align: center;
    }
    .tabviewText.active {
        color:#3d7def;
    }
    .line{
        height:0.5;
    }
    .sign-out-btn{
        margin-right:10;
        font-size:16;
    }
</style>
