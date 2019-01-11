<template>

<Page xmlns="http://schemas.nativescript.org/tns.xsd">
  <ScrollView>
    <StackLayout padding="25">
      <Button text="go to address" @tap="doAddress" class="button" />
      <Label :text="address" textWrap="true"/>
      <Button text="go to Lat/Lng" @tap="doLatLng" class="button" />
      <Label :text="lat + '/' + lng" textWrap="true"/>
    </StackLayout>
  </ScrollView>
</Page>
</template>
<script>

var LocateAddress = require("nativescript-locate-address").LocateAddress;

export default {
    data(){
        return{
            locateAddress:'',
            address:"南京大学鼓楼校区 汉口路22号",
            lat:48.8858671,
            lng:2.2188144
        }
    },
    mounted(){
        this.locateAddress = new LocateAddress();
    },
    methods:{
        onMapReady(args){
            
        },
        doCheckAvailable() {
            this.locateAddress.available().then((avail) => {
                console.log("Avail? " + avail);
                alert(avail);
            }, (err) => {
                alert(err);
            });
        },
        doAddress(){
            this.locateAddress.locate({
                address: this.address,
            }).then(() => {
            console.log(`Address: ${this.address} locateAddress launched!`);
            }, (err) => {
            alert(err);
            });
        },
         doLatLng() {
            this.locateAddress.locate({
                lat: this.lat,
                lng: this.lng,
            }).then(() => {
                console.log(`Address: ${this.lat}/${this.lng} locateAddress launched!`);
            }, (err) => {
                alert(err);
            });
        }
    }
}
</script>

<style scoped>

</style>
