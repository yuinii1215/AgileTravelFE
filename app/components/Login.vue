<template>
    <Page actionBarHidden="true" >
        <ScrollView class="main-body">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <!-- <Label class="logo" >🐳</Label> -->

                <Image class="logo" src="~/assets/images/logo.png"></Image>
                <Label class="header" text="去玩吧"></Label>
                <GridLayout rows="auto, auto, auto, auto">
                    
                    <StackLayout row="0" class="input-field" v-show="!isLoggingIn" >
                        <TextField class="input" hint="昵称" :isEnabled="!processing"
                            autocorrect="false"
                            autocapitalizationType="none" v-model="user.username"
                            returnKeyType="next" @returnPress="focusPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout :row="isLoggingIn? 0 : 1"   class="input-field">
                        <TextField class="input" ref="email" :isEnabled="!processing" keyboardType="email" 
                            hint="学院邮箱" v-model="user.email"
                            returnKeyType="next"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <StackLayout :row="isLoggingIn? 1 : 2" class="input-field">
                        <TextField class="input" ref="password" :isEnabled="!processing"
                            hint="密码" secure="true" v-model="user.password"
                            :returnKeyType="isLoggingIn ? 'done' : 'next'"
                            @returnPress="focusConfirmPassword"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>
 
                    <StackLayout row="3" v-show="!isLoggingIn" class="input-field">
                        <TextField class="input" ref="confirmPassword" :isEnabled="!processing"
                            hint="再次输入密码" secure="true" v-model="user.confirmPassword"
                            returnKeyType="done"></TextField>
                        <StackLayout class="hr-light"></StackLayout>
                    </StackLayout>

                    <ActivityIndicator rowSpan="4" :busy="processing"></ActivityIndicator>
                    
                </GridLayout>
                <Button :text="isLoggingIn ? '登录' : '注册'" :isEnabled="!processing"
                    @tap="submit" class="btn btn-primary m-t-20"></Button>
                <!-- <Label *v-show="isLoggingIn" text="Forgot your password?"
                    class="login-label" @tap="forgotPassword()"></Label> -->
                
            </StackLayout>
           

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? '还没有账号? ' : '返回登录'"></Span>
                    <Span :text="isLoggingIn ? '前往注册' : ''" class="bold"></Span>
                </FormattedString>
            </Label>
        </FlexboxLayout>
         </ScrollView>
    </Page>
</template>

<script>
    import Home from "./Home";
    import ManagerHome from "./Manager/Home"

    export default {
        data() {
            return {
                isLoggingIn: true,
                processing: false,
                user: {
                    username: "",
                    email: "mf1832136@smail.nju.edu.cn",
                    password: "123456",
                    confirmPassword: ""
                }
            }
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },
            submit() {
                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "请输入邮箱和密码"
                    );
                    return;
                }

                this.processing = true;
                if (this.isLoggingIn) {
                    this.login();
                } else {
                    this.register();
                }
            },

            login() {
                var user={
                    "email": this.user.email,
	                "password": this.user.password
                }
                //mf1832136@smail.nju.edu.cn  123456
                this.$backendService
                    .login(user)
                    .then(res => {
                        this.processing = false;
                        //成功后 设置user信息
                        this.$backendService.setUser(res)
                        //如果是管理员，跳转至管理员页面
                        if(this.user.email=="admin@nju.edu.cn"&&this.user.password=="123456")
                            this.$navigateTo(ManagerHome, { clearHistory: true });
                        else
                            this.$navigateTo(Home, { clearHistory: true });
                        
                    })
                    .catch((err) => {
                        this.processing = false;
                        this.alert(
                            "请检查您的邮箱和密码或等待您的审批通过"
                        );
                    });
            },

            register() {
                if (this.user.password != this.user.confirmPassword) {
                    this.alert("请保证密码一致");
                    this.processing = false;
                    return;
                }
                var user= {
                    "email": this.user.email,
                    "password": this.user.password,
                    "username": this.user.username,
                    "avatarUrl":""
                }

                this.$backendService
                    .register(user)
                    .then(() => {
                        this.processing = false;
                        this.alert(
                            "您的账户已创建成功，可尝试登录");
                        this.isLoggingIn = true;
                    })
                    .catch(() => {
                        this.processing = false;
                        this.alert(
                            "抱歉，账户已存在"
                        );
                    });
            },

            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "提示",
                    okButtonText: "好的",
                    message: message
                });
            }
        }
    };
</script>

<style scoped>
.amap-demo {
      height: 300px;
    }
    .page {
        align-items: center;
        flex-direction: column;
        /* background: transparent url(~/assets/images/mainBg.jpg) no-repeat contain; */
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 12;
        height: 200;
        font-weight: bold;
        text-align: center;
    }

    .header {
        font-size: 25;
        font-weight: 600;
        margin-bottom: 50;
        text-align: center;
        color: #3d7def;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
    }

    .input:disabled {
        background-color: white;
        opacity: 0.5;
    }

    .btn-primary {
        margin: 30 5 15 5;
    }

    .login-label {
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
        margin-top:20;
    }

    .bold {
        color: #000000;
    }
</style>
