<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" id="header">
        <FlexboxLayout class="icons menu">
            <!-- <Image src="~/assets/images/arrow.png" class="icon" v-if="canBack"
                @tap="$navigateBack" /> -->
            <Label row="0" col="0" verticalAlignment="top"
                    horizontalAlignment="left" @tap="close" :text="'fa-arrow-left' | fonticon"
                    class="fa close" fontSize="24" />
            <!-- <Image src="~/assets/images/Menu-Red.png" class="icon" v-else-if="!secondary" />
            <Image src="~/assets/images/Menu-White.png" class="icon" v-else /> -->
        </FlexboxLayout>
        <FlexboxLayout class="icons text">
            <label text="去玩吧"/>
        </FlexboxLayout>
        <FlexboxLayout class="icons pp">
            <Image src="~/assets/images/johndoe.jpg" class="icon" />
        </FlexboxLayout>
    </FlexboxLayout>
</template>

<script>
    export default {
        name:"header",
        props: {
            secondary: {
                type: Boolean,
                default: false
            },
            canBack: {
                type: Boolean
            }
        },

        data() {
            return {};
        },
        methods:{
            close(){
                this.$navigateBack();
            }
        }
    };
</script>

<style scoped>

    #header {
        padding: 0;
        margin: 3% 10% 2%;
        height: 100;
    }


    #header .icons {

        margin: 0;
        padding: 0;
        justify-content: center;
        align-items: center;
    }

    #header .icons .icon {
        padding: 0;
        margin: 0;
    }

    #header .icons.text {
        font-size: 20px;
        color:#3d7def;
    }
    #header .icons.pp {
        height: 100%;
    }

    #header .icons.menu .icon {
        height: 60%;
    }

    #header .icons.pp .icon {
        border: 2px solid #ffffff;
        border-radius: 100%;
    }
</style>