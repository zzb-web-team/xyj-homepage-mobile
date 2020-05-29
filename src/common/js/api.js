//import { get, post } from './http'
import axios from 'axios';

let ownbase='http://zzb.onezen.net'//本地接口
let serverUrl='http://zzb.onezen.net'//本地接口
let ownbase1='http://192.168.0.182:8089'//本地接口

//获取验证码
export const get_code= params => { return axios.post(`${ownbase}/ptfs_user_server/get_code`, params).then(res => res.data); };

//登录/注册
export const login= params => { return axios.post(`${ownbase}/ptfs_user_server/login`, params).then(res => res.data); };

//获取西柚机管理信息
export const query_bind_devinfo_list_by_user_id= params => { return axios.post(`${ownbase}/miner_ctrl/query_bind_devinfo_list_by_user_id`, params).then(res => res.data); };

//获取设备收益
export const query_node_profit_list= params => { return axios.post(`${ownbase}/miner_earn/query_node_profit_list`, params).then(res => res.data); };

//获取设备详情

export const query_node_info_list= params => { return axios.post(`${ownbase}/miner_earn/query_node_info_list`, params).then(res => res.data); };

//我的收益
 export const query_user_profit_list= params => { return axios.post(`${ownbase}/miner_earn/query_user_profit_list`, params).then(res => res.data); };
//获取用户信息
export const get_user_info= params => { return axios.post(`${ownbase}/ptfs_user_server/get_user_info`, params).then(res => res.data); };

//获取存储空间
export const query_dev_phy_cap_hisgraph= params => { return axios.post(`${ownbase}/miner_ctrl/query_dev_phy_cap_hisgraph`, params).then(res => res.data); };

//退出登录
export const logout= params => { return axios.post(`${ownbase}/ptfs_user_server/logout`, params).then(res => res.data); };


// 扫码获取设备id
export const getDevid = params => { return axios.post(`${serverUrl}/miner_ctrl/query_device_id_by_sn`, params).then(res => res.data) }
    // 查询设备状态
export const getDevstatus = params => { return axios.post(`${serverUrl}/miner_ctrl/query_device_bind_state`, params).then(res => res.data) }
    // 解绑/绑定西柚机
export const bindingmill = params => { return axios.post(`${serverUrl}/miner_ctrl/change_device_bind_state`, params).then(res => res.data) }
    // 编辑设备信息(设置设备名)
export const setDevName = params => { return axios.post(`${serverUrl}/miner_ctrl/edit_node_basicinfo`, params).then(res => res.data) }
    // 获取西柚机详情
export const getMinerInfo = params => { return axios.post(`${serverUrl}/miner_ctrl/query_node_basicinfo`, params).then(res => res.data) }
    //查询已绑定设备列表
export const isbindinglist = params => { return axios.post(`${serverUrl}/miner_ctrl/query_bind_devinfo_list_by_user_id`, params).then(res => res.data) }
    //重启设备
export const restarts = params => { return axios.post(`${serverUrl}/miner_ctrl/ctrl_node_state`, params).then(res => res.data) }
    //绑定并设置设备名称
export const bindsetname = params => { return axios.post(`${serverUrl}/miner_ctrl/bind_dev_update_dev_name`, params).then(res => res.data) }



//绑定/收益/存储力排名
export const rank = params => { return axios.post(`${serverUrl}/miner_earn/query_profit_rank`, params).then(res => res.data) }

//查询单台设备详细信息
export const devinformation = params => { return axios.post(`${serverUrl}/miner_earn/query_node_info_list`, params).then(res => res.data) }
    //获取单台设备单日收益
export const devrevenue = params => { return axios.post(`${serverUrl}/miner_earn/query_node_profit_list`, params).then(res => res.data) }
    //查询用户所有设备详细信息
export const alldevinformation = params => { return axios.post(`${serverUrl}/miner_earn/query_user_node_info_list`, params).then(res => res.data) }
    //获取用户所有设备收益
export const alldevrevenue = params => { return axios.post(`${serverUrl}/miner_earn/query_user_node_profit_list`, params).then(res => res.data) }
    //积分兑换记录
export const redeems = params => { return axios.post(`${serverUrl}/miner_earn/query_user_node_exchange_list`, params).then(res => res.data) }

//修改用户手机号码
export const settelnum = params => { return axios.post(`${serverUrl}/ptfs_user_server/change_user_telnum`, params).then(res => res.data) }
    //交易密码修改
export const updatepwd = params => { return axios.post(`${serverUrl}/ptfs_user_server/set_user_charge_psd`, params).then(res => res.data) }
    //查询交易密码设置状态
export const querystatus = params => { return axios.post(`${serverUrl}/ ptfs_user_server/get_user_charge_status`, params).then(res => res.data) }






//兑换积分
export const redeempoints = params => { return axios.post(`${serverUrl}/oauth/pay`, params).then(res => res.data) }
    //获授权
export const authorization = params => { return axios.post(`${serverUrl}/oauth/check`, params).then(res => res.data) }
    //获取设备历史状态列表
export const devstatuslist = params => { return axios.post(`${serverUrl}/miner_ctrl/query_online_histgraph`, params).then(res => res.data) }
    //查询用户历史收益
    export const getuserdevlist = params => { return axios.post(`${serverUrl}/miner_earn/query_user_profit_list`, params).then(res => res.data) }
    //授权
    export const check = params => { return axios.post(`${serverUrl}/miner_earn/query_user_profit_list`, params).then(res => res.data) }

  //意见反馈 
    export const savequestion= params => { return axios.post(`${ownbase}/miner_earn/savequestion`, params).then(res => res.data); };




