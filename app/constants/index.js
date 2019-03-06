import http from './api'
import store from '../store';


// import { Kinvey } from "kinvey-nativescript-sdk";


export default class BackendService {

    constructor() {
        this.user = {}
        this.backend_url = "http://118.25.105.127:8080";

    }

    setUser(userInfo) {
        this.user = userInfo
    }

    getBackEndUrl(){
        return this.backend_url;
    }

    isLoggedIn(){
        if(JSON.stringify(this.user)==JSON.stringify({})){
            return false
        }else{
            return true
        }
    }
    
    getUser (){
        return this.user
    }

    logOut (){
        this.user = {}
    }
 
    /**
     * 登录
     */
    login (params) {
        return http.fetchPost(this.backend_url+'/user/login', params);
    }

    /**
     * 注册
     */
    register (params) {
        return http.fetchPost(this.backend_url+'/user/register', params);
    }

    /**
     * 获得分享列表
     */
    getShareList () {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/share');
    }

    /**
     * 分享活动
     */
    shareActivity (params) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/share',params);
    }

    /**
     * 点赞分享
     */
    likeActivity (activityId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/share/'+activityId+'/star');
    }

    /**
     * 获得活动评论列表
     */
    getCommentList (activityId) {
        return http.fetchGet(this.backend_url+'/activity/'+activityId+'/post');
    }

    /**
     * 评论活动
     */
    commentActivity (activityId,params){
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/post',params);
    }

    /**
     * 按页查询公开活动
     */
    getAllActivityListWithPage (pageId) {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/public/page/'+pageId);
    }

    /**
     * 获得用户创建活动列表
     */
    getMyCreateActivityList () {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/created');
    }

    /**
     * 获得用户加入活动列表
     */
    getMyJoinActivityList (){
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/joined');
    }

    /**
     * 获得活动具体信息
     */
    getActivityDetailInfo (activityId) {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId);
    }

    /**
     * 创建活动
     */
    createActivity (params) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity',params);
    }

    /**
     * 编辑活动
     */
    modifyActivity (activityId,params){
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId,params);
    }

    /**
     * 生成邀请码
     */
    generateInviteCode (activityId) {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/invite/generate');
    }

    /**
     * 获得邀请码
     */
    getInviteCode (activityId) {
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/invite/get');
    }

    /**
     * 通过邀请码加入活动
     */
    joinWithInviteCode (code){
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/accept/'+code);
    }

    /** 
     *  获得活动参与者 
     */
    getActivityParticipants (activityId){
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/participants');
    }


    /**
     * 移除活动成员
     */
    removeActivityParticipant (activityId,participantId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/participants/'+participantId+'/remove');
    }

    /**
     * 申请加入活动
     */
    applyAddActivity (activityId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/apply');
    }

    /**
     * 申请退出活动
     */
    applyExitActivity (activityId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/exit');
    }

    /**
     *  获得活动申请
     */
    getActivityAddApply (){
        return http.fetchGet(this.backend_url+'/user/'+this.user.id+'/message/applicants');
    }

    /**
     * 同意加入活动申请
     */
    approveAddActivityApply (activityId,participantId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/applicants/'+participantId+'/approve');
    }

    /**
     * 拒绝加入活动请求
     */
    rejectAddActivityApply (activityId,participantId) {
        return http.fetchPost(this.backend_url+'/user/'+this.user.id+'/activity/'+activityId+'/applicants/'+participantId+'/refuse');
    }


    /**
     * 管理员获得用户列表
     */
    getUserListForManager () {
        return http.fetchGet(this.backend_url+'/check/users');
    }

    /**
     * 管理员获得活动列表
     */
    getActivityListForManager () {
        return http.fetchGet(this.backend_url+'/check/activities');
    }

     /**
     * 管理员审批用户
     */
    applyUserForManager (params) {
        return http.fetchPost(this.backend_url+'/check/user/'+params);
    }

     /**
     * 管理员审批活动
     */
    applyActivityForManager (params) {
        return http.fetchPost(this.backend_url+'/check/activity/'+params);
    }


    uploadToOSS(data){
        return http.doUpLoad(this.backend_url+"/upload/images",data)
    }

    uploadSimpleToOSS(data){
        return http.fetchPost(this.backend_url+"/upload/images",data)
    }

    uploadImageToOSS(data){  
        return http.doUpLoadImage(this.backend_url+"/upload/images",data)
    }  
}

export const timeChange= (datetime)=>{
     var dateee = new Date(datetime).toJSON();
     var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'')  
    return date;
}

export const getState = (startdatetime,enddatetime)=>{
    var date = new Date()

    var startdate=startdatetime.split(" ")[0].split("-")
    var starttime=startdatetime.split(" ")[1].split(":")
    var enddate=enddatetime.split(" ")[0].split("-")
    var endtime=enddatetime.split(" ")[1].split(":")
    var date1 = new Date()
    date1.setHours(starttime[0],starttime[1],starttime[2])
    date1.setYear(startdate[0])
    date1.setMonth(startdate[1]-1,startdate[2])
    var date2 = new Date()
    date2.setHours(endtime[0],endtime[1],endtime[2])
    date2.setYear(enddate[0])
    date2.setMonth(enddate[1]-1,enddate[2])

    if(date<date1) return 0
    if(date2<date) return 2
    if(date>=date1&&date<=date2) return 1
    return 1
}

