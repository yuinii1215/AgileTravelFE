<template>
    <Page>
        <ActionBar title="去玩吧">
            <!-- <Label class="action-bar-title" text="登录"></Label> -->
        </ActionBar>

        <StackLayout>
            <Label class="body m-20" :text="message" textWrap="true"></Label>
            <Button class="btn btn-primary" text="注销" @tap="logout"></Button>
        </StackLayout>
    </Page>
</template>

<script>
    import Login from "./Login";

    export default {
        data() {
            return {
                message: "已成功登录，此为普通用户首页"
            };
        },
        methods: {
            logout() {
                this.$backendService.logout();
                this.$navigateTo(Login, {
                    clearHistory: true
                });
            }
        }
    };
</script>

<style>
</style>
