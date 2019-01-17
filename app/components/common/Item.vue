<template>
    <StackLayout class="main">
        <StackLayout class="content">

            <Image stretch="aspectFill" class="card-img" @tap="onClickButton()"
                :src="item.cover" />
            <basic-info-block hasMore=0 showMore=1 :activityId="item.id"/>
            <StackLayout width="100%" marginTop="5" class="line lineBasic" />

            <ItemLike :item="item" @openShareDialogEvent="openShareDialogEvent" @modifyClick="modifyClick(item)"></ItemLike>
        </StackLayout>

        <StackLayout width="100%" class="lineBreak lineBasic" />

    </StackLayout>
</template>

<script>
    import ItemLike from "./ItemLike";
    import BasicInfoBlock from "./BasicInfoBlock";
	
    import {
        isIOS,
        isAndroid
    } from "tns-core-modules/platform";
    export default {
        components: {
            ItemLike,BasicInfoBlock
        },
        props: ["item"],
        data() {
            return {
                isLike: false,
                isHeart: false
            };
        },
        methods: {
            openShareDialogEvent(){
                this.$emit("openShareDialogEvent")
            },
            animateLike() {
                if (isIOS) {
                    return;
                }
                let imgLogo = this.$refs.like.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 100,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            animateFavorite() {
                if (isIOS) {
                    return;
                }
                let imgLogo = this.$refs.favorite.nativeView;
                imgLogo
                    .animate({
                        scale: {
                            x: 0.6,
                            y: 0.6
                        },
                        duration: 50,
                        delay: 0
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1.2,
                                y: 1.2,
                                duration: 50
                            }
                        });
                    })
                    .then(function() {
                        return imgLogo.animate({
                            scale: {
                                x: 1,
                                y: 1,
                                duration: 100
                            }
                        });
                    })
                    .then(function() {});
            },
            toggleLike() {
                this.animateLike();
                this.item.isLike = !this.item.isLike;
                if (this.item.isLike) {
                    this.item.likes += 1;
                } else {
                    this.item.likes -= 1;
                }
            },
            toggleHeart() {
                this.animateFavorite();
                this.item.isFavorite = !this.item.isFavorite;
            },
            onClickButton() {
                this.$emit("clicked", this.item);
            },
            modifyClick(){
                this.$emit("modifyClick", this.item);
            }
        }
        
    };
</script>
<style scoped>
    Label{
        padding:5px 0;
    }
    .item-category {
        font-size: 14;
        color: #828282;
    }

    .liked-active {
        color: #4080FF;
    }

    .heart-active {
        color: #b51213;
    }

    .default {
        color: #828282;
    }

    .layout {
        vertical-align: bottom;
        color: #828282;
        font-size: 14;
        height: 30;
        padding: 5 0 5 0;
    }

    .like-icon {
        vertical-align: bottom;
        height: 30;
        font-size: 16;
        margin-right: 2;
        padding: 5 5 5 5;
    }

    .card-img {
        width: 100%;
        height: 150;
        margin-bottom: 5;
    }

    .line {
        height: 0.5;
    }

    .lineBreak {
        height: 7;
    }
</style>