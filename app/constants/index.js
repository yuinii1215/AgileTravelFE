
import http from './api'
import store from '../store';
// import { Kinvey } from "kinvey-nativescript-sdk";
const backend_url = "https://118.25.105.127:8080";
var user = ""
export default class BackendService {

    setUser(userInfo) {
        user = userInfo
    }

    isLoggedIn(){
        if(user){
            return true
        }else{
            return false
        }
    }
    
    getUser (){
        return user
    }

    logOut (){
        user = ""
    }
 
    /**
     * 登录
     */
    login (params) {
        return http.fetchPost(backend_url+'/user/login', params);
    }

    /**
     * 注册
     */
    register (params) {
        return http.fetchPost(backend_url+'/user/register', params);
    }

    /**
     * 获得分享列表
     */
    getShareList () {
        return http.fetchGet(backend_url+'/user/'+user.id+'/share');
    }

    /**
     * 分享活动
     */
    shareActivity (params) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/share',params);
    }

    /**
     * 点赞分享
     */
    likeActivity (activityId) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/share/'+activityId+'/star');
    }

    /**
     * 活动活动评论列表
     */
    getCommentList (activityId) {
        return http.fetchGet(backend_url+'/activity/'+activityId+'/post');
    }

    /**
     * 评论活动
     */
    commentActivity (activityId,params){
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId+'/post',params);
    }

    /**
     * 按页查询公开活动
     */
    getAllActivityListWithPage (pageId) {
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/public/page/'+pageId);
    }

    /**
     * 获得用户创建活动列表
     */
    getMyCreateActivityList () {
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/created');
    }

    /**
     * 获得用户加入活动列表
     */
    getMyJoinActivityList (){
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/joined');
    }

    /**
     * 获得活动具体信息
     */
    getActivityDetailInfo (activityId) {
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/'+activityId);
    }

    /**
     * 创建活动
     */
    createActivity (params) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity',params);
    }

    /**
     * 编辑活动
     */
    modifyActivity (activityId,params){
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId,params);
    }

    /**
     * 生成邀请码
     */
    generateInviteCode (activityId) {
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/'+activityId+'/invite/generate');
    }

    /**
     * 获得邀请码
     */
    getInviteCode (activityId) {
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/'+activityId+'/invite/get');
    }

    /**
     * 通过邀请码加入活动
     */
    joinWithInviteCode (code){
        return http.fetchGet(backend_url+'/user/'+user.id+'/accept/'+code);
    }

    /** 
     *  获得活动参与者 
     */
    getActivityParticipants (activityId){
        return http.fetchGet(backend_url+'/user/'+user.id+'/activity/'+activityId+'/participants');
    }

    /**
     *  获得活动申请
     */
    getActivityAddApply (){
        return http.fetchGet(backend_url+'/user/'+user.id+'/message/applicants');
    }

    /**
     * 移除活动成员
     */
    removeActivityParticipant (activityId,participantId) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId+'/participants/'+participantId+'/remove');
    }

    /**
     * 申请加入活动
     */
    applyAddActivity (activityId) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId+'/apply');
    }

    /**
     * 同意加入活动申请
     */
    approveAddActivityApply (activityId,participantId) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId+'/applicants/'+participantId+'/approve');
    }

    /**
     * 拒绝加入活动请求
     */
    rejectAddActivityApply (activityId,participantId) {
        return http.fetchPost(backend_url+'/user/'+user.id+'/activity/'+activityId+'/applicants/'+participantId+'/refuse');
    }

}