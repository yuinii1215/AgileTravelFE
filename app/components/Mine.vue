<template>
    <page actionBarHidden="true" backgroundSpanUnderStatusBar="true">
        <GridLayout>
            <GridLayout rows="auto,*,auto" columns="auto" >
                    <GridLayout row="0">
                        <Label col="0" row="0" text="我的" class="status-title"/>
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
    import Info from "./Info";
    import Home from "./Home";
export default {
    components: {
        NavBottom
    },
    data(){
        return{
            selectedTab:2
        }
    },
    methods: {
		bottomTabChangeEvent(index){
			this.selectedTab = index
			if(this.selectedTab==0){
                this.$navigateTo(Home,{animated: false})
			}else if(this.selectedTab==1){
				this.$navigateTo(Info,{animated: false})
			}else if(this.selectedTab==2){
				
			}
        }
    }
}
</script>
<style scoped>

</style>

