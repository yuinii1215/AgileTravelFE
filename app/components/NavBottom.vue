<template>
    <GridLayout class="navBottom" height="80px" width="100%" rows="auto"
        columns="auto,auto,auto">

        <GridLayout :class="selectedTab==0?'active':''" @tap="home" rows="auto,auto"
            cols="auto" class="nav" col="0" row="0" width="33%" >
            <Label :class="selectedTab==0?'active':''" row="0" class="fa navBottomIcon"
                :text="'fa-home' | fonticon"/>
            <Label row="1" :class="selectedTab==0?'active':''" text="社区" class="navText"></Label>
        </GridLayout>
        
        <GridLayout :class="selectedTab==1?'active':''" @tap="info" rows="auto,auto"
            cols="auto" class="nav" col="1" row="0" width="33%">
            <Label :class="selectedTab==1?'active':''" row="0" class="fa navBottomIcon"
                :text="'fa-comments-o' | fonticon"/>
            <Label row="1" :class="selectedTab==1?'active':''"  text="消息" class="navText"></Label>
        </GridLayout>

        <GridLayout :class="selectedTab==2?'active':''" @tap="me" rows="auto,auto"
            cols="auto" class="nav" col="2" row="0" width="33%">
            <Label :class="selectedTab==2?'active':''" row="0" class="fa navBottomIcon"
                :text="'fa-user' | fonticon"/>
            <Label row="1" :class="selectedTab==2?'active':''"  text="我的" class="navText"></Label>
        </GridLayout>

    </GridLayout>
</template>
<script>
    export default {
        props:{
            selectedTab:Number
        },
        data() {
            return {
            };
        },
        methods: {
            home() {
                this.selectedTab = 0;
                this.$emit("tabChangeEvent",0)
            },
            info() {
                this.selectedTab = 1;
                this.$emit("tabChangeEvent",1)
            },
            me() {
                this.selectedTab = 2;
                this.$emit("tabChangeEvent",2)
            }
        }
    };
</script>

<style>
    .navBottom {
        background-color: #f4f4f4;
        border-color: #3d7def;
    }

    .nav {
        padding-top:5;
        text-align: center;
        height: 100%;
        width: 100%;
    }

    .nav.active {
        background-color: #0Dc43776;
        
    }
    .navBottomIcon {
        vertical-align: center;
        height: 20
    }

    .navBottomIcon.active {
        vertical-align: bottom;
        color:#3d7def;
    }

    .navText {
        margin-bottom: 2;
        font-size: 12;
        /* color: #c43776; */
        color: #828282;
        text-align: center;
    }
    .navText.active {
        color: #3d7def;
    }
</style>