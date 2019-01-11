<template>
    <!-- <GridLayout marginTop="5" width="100%" row="3" columns="auto,*,auto,auto" rows="auto"> -->
    <GridLayout columns="*,auto,auto" rows="auto">
        <GridLayout col="0" rows="auto" columns="auto,auto">
            <Image horizontalAlignment="right" stretch="aspectFill" col="0"
							row="0" class="status-profile" :src="item.originator.avaUrl" />
            <Label col="1" row="0" class="layout" :text="item.originator.username"></Label>
        </GridLayout>
        <GridLayout col="1" rows="auto" columns="auto,auto"  orientation="horizontal" verticalAlignment="bottom" horizontalAlignment="right"  marginRight="10" class="item-comment">
            <Label col="0" row="0" ref="" class="like-icon layout fa" :text="'fa-comment-o' | fonticon" />
            <Label col="1" row="0" class="layout" :text="item.comments"></Label>
        </GridLayout>
        <!-- <GridLayout col="2" rows="auto" columns="auto,auto" @tap="toggleHeart"
            marginRight="15">
            <Label col="0" row="0" ref="favorite" class="like-icon  fa"
                :class="[item.isFavorite ? 'heart-active' : 'default']" :text="item.isFavorite ? 'fa-heart':'fa-heart-o' | fonticon" />
            <Label col="1" row="0" class="layout" text="Favorite"></Label>
        </GridLayout> -->
        <StackLayout col="2" orientation="horizontal" horizontalAlignment="right"  v-if="!item.isMember" @tap="joinInActivity">
            <Label ref="" class="like-icon layout fa" :text="'fa-user-plus' | fonticon" />
            <Label class="layout" text="申请加入"></Label>
        </StackLayout>
        <StackLayout col="2" orientation="horizontal" v-if="item.isMember" @tap="openShareDialog()">
            <Label ref="" class="like-icon layout fa" :text="'fa-share-square-o' | fonticon" />
            <Label class="layout" text="分享" ></Label>
        </StackLayout>
    </GridLayout>
</template>

<script>

    import { isIOS, isAndroid } from "tns-core-modules/platform";
    export default {
        props: ["item"],
        data() {
            return {
                isLike: false,
                isHeart: false
            };
        },
        components: {},
        computed: {
            categoryIcon() {
                switch (this.item.category) {
                    case "Burger":
                        return "fa-cutlery";
                        break;
                    case "Beer":
                        return "fa-beer";
                        break;
                    case "Pancake":
                        return "fa-coffee";
                        break;
                    case "Cake":
                        return "fa-birthday-cake";
                        break;
                    default:
                        return "fa-fire";
                        break;
                }
            }
        },
        created() {
            // this.isLike =  this.item.isLike
            // this.isHeart =  this.item.isFavorite
        },
        mounted() {},
        methods: {
            joinInActivity(){
                //加入活动请求
                confirm({
                    title: "活动加入申请",
                    message: "您确定要加入该活动吗？",
                    okButtonText: "确定",
                    cancelButtonText: "取消"
                }).then(result => {
                    console.log(result);
                });
            },
            openShareDialog(){
                this.$emit("openShareDialogEvent");
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
            }
        }
    };
</script>
<style scoped>
    .status-profile {
        border-width: 1;
        border-color: #ffffff;
        background-color: #f1ebeb;
        border-radius: 50%;
        margin-top: 4;
        margin-right: 15;
        width: 30;
        height: 30;
    }
    .item-category {
        font-size: 14;
        color: #828282;
    }

    .rating-icon {
        padding-top: 3;
        color: #FFE900;
        font-size: 14;
        margin-left: 10;
    }

    .rating-value {
        margin-left: 5;
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

    .item-name {
        font-size: 14;
        font-weight: bold;
    }

    .item-category {
        font-size: 14;
        color: #828282;
    }

    .category-icon {
        text-align: center;
        padding-top: 5;
        border-color: white;
        color: white;
        vertical-align: center;
        font-size: 25;
        border-width: 1;
        border-radius: 50%;
        margin-top: 4;
        margin-right: 15;
        width: 40;
        height: 40;
    }

    .content {
        margin-left: 16;
        margin-right: 16;
        margin-bottom: 3;
        margin-top: 16;
    }

    .card-img {
        width: 100%;
        height: 150;
        margin-bottom: 10;
    }
</style>