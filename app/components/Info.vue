<template>
    <page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <GridLayout>
            <GridLayout rows="auto,*,auto" columns="auto" >
                    <GridLayout row="0">
                        <Label col="0" row="0" text="消息" class="status-title"/>
                    </GridLayout>
                    <GridLayout row="1">

                    </GridLayout>
                    <NavBottom row="2" :selectedTab="selectedTab" @tabChangeEvent="bottomTabChangeEvent"/>
            </GridLayout>
        </GridLayout>
    </page>
</template>

<script>
	import NavBottom from "./NavBottom";
    import Mine from "./Mine";
    import Home from "./Home";
export default {
    components: {
        NavBottom
    },
    data(){
        return{
            selectedTab:1
        }
    },
    methods: {
		bottomTabChangeEvent(index){
			this.selectedTab = index
			if(this.selectedTab==0){
                this.$navigateTo(Home,{animated: false})
			}else if(this.selectedTab==1){

			}else if(this.selectedTab==2){
				this.$navigateTo(Mine,{animated: false})
			}
        }
    }
}
</script>
<style scoped>
.status-title {
	color: #000;
	font-size: 18;
	margin-left: 15;
	margin-top: 8;
	vertical-align: center;
}
</style>

