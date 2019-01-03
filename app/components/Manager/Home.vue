<template>
    <Page class="page" >
        <ActionBar title="去玩吧"></ActionBar>
        <DockLayout stretchLastChild="true" >
            <StackLayout dock="top">
                <SegmentedBar  v-model="selectedItem" @selectedIndexChange="onSelectedIndexChange" >
                    <SegmentedBarItem title="审核用户" />
                    <SegmentedBarItem title="审核活动" />
                </SegmentedBar>
            </StackLayout>
            <StackLayout dock="bottom">
                <Button class="btn btn-primary" text="注销" @tap="logout"></Button>
            </StackLayout>
            <StackLayout >
                <AuthUser v-if="selectedItem==0"/>
                <label  v-if="selectedItem==1" text="审核活动aaa"/>
            </StackLayout>
        </DockLayout>
    </Page>
</template>

<script>
    import AuthUser from './AuthUser'
    import Login from "../Login"
    export default {
        name:"manager-home",
        components: {
            AuthUser
        },
        data() {
            return {
               selectedItem:'0'
            };
        },
        methods: {
            onSelectedIndexChange(){
                console.log(this.selectedItem)
            },
            logout(){
                this.$backendService.logout();
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
