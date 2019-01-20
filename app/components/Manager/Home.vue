<template>
    <Page class="page" actionBarHidden="true">
        <StackLayout orientation="vertical">
            <FlexboxLayout flexDirection="column" height="100%" width="100%">
                <Header class="header" :canBack="canBack" />
                <StackLayout flexGrow="1">
                    <TabView :selectedTabTextColor="textColor" >
                        <TabViewItem title="审核用户">
                            <AuthUser/>
                        </TabViewItem>
                        <TabViewItem title="审核活动">
                            <label text="敬请期待"/>
                        </TabViewItem>
                    </TabView>
                </StackLayout>
            </FlexboxLayout>            
        </StackLayout>
    </Page>
</template>

<script>
    import AuthUser from './AuthUser'
    import Login from "../Login"
    import Header from "../Header"
    export default {
        name:"manager-home",
        components: {
            AuthUser,Header
        },
        data() {
            return {
                textColor:"#3d7def",
                canBack:true
            };
        },
        methods: {
            logout(){
                // this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style scoped>

.page{
    font-size: 16px;
    
}
 .btn-primary {
    margin: 30 5 15 5;
}
</style>
