import {Button, Checkbox, Input,} from "antd";
import {useNavigate} from "react-router-dom";

import loginImage from "/src/assets/images/admin/login.png";
import {useState} from "react";
import {notificationFun} from "@/utils/MessageUtil.js";

const AdminLogin = () => {

    const navigate = useNavigate();
    
    const [focusIndex, setFocusIndex] = useState(0); // 聚焦索引
    const [value1, setValue1] = useState(''); 
    const [value2, setValue2] = useState(''); 
    const [checked, setChecked] = useState(false); 
    
    // 登录
    const onLogin = () => {
        if (!value1) return notificationFun('请输入登录账号！');
        if (!value2) return notificationFun('请输入登录密码！');
        if (!checked) return notificationFun('请阅读和同意 《隐私政策》和 《用户服务协议》！');

        sessionStorage.setItem('appKey', '123')
        navigate(`/admin/banner`);
    }

    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div 
                className={`w-[75vw] h-[${75 * 0.65 + 'vw'}] flex`}
                style={{boxShadow: '0px 0px 17px 0px rgba(0, 0, 0, 0.11)'}}
            >
                <div className="w-[37vw] h-full bg-[#F2F8FF] p-[40px] relative">
                    <div className="text-[23px] text-[#333] font-normal">职业技能等级认定门户管理端</div>
                    <div className="mt-[5vh] flex ml-[8px]">
                        <div className="text-[26px] text-[#333] font-normal ">欢迎使用</div>
                        <div className="text-[26px] text-[#333] font-medium ml-[10px]">门户管理端</div>
                    </div>
                    <div className="w-full flex justify-center">
                        <img className={`mt-[15vh] mb-[10vh] ml-[5px] w-[27.5vw] h-[${27.5 * 0.8}vw]`} src={loginImage} alt=""/>
                    </div>
                    <div className="w-[32vw] absolute bottom-[1vh] text-center text-[15px] text-[#2B5182]">版本号：V1.13</div>
                    
                </div>
                <div className="w-[38vw] h-full relative flex justify-center">
                    <div className="w-[28vw]">
                        <div className="text-[34px] text-[#333] font-medium mt-[15vh]">欢迎登录</div>
                        <div className="mt-[10px] text-[16px] text-[#666666]">登录账户以设置门户</div>

                        <div className="mt-[5vh]">
                            <Input
                                placeholder="请输入账号"
                                size="large"
                                value={value1}
                                style={{width: '28vw', height: '10vh', maxHeight: 72, borderRadius: 0, marginBottom: 30, borderLeft: focusIndex === 0 ? '5px solid #2B5182' : '1px solid #d9d9d9'}}
                                onFocus={()=> { setFocusIndex(0) }}
                                onChange={e => setValue1(e.target.value)}
                            />
                            <Input.Password
                                placeholder="请输入密码"
                                size="large"
                                value={value2}
                                style={{width: '28vw', height: '10vh', maxHeight: 72, borderRadius: 0, borderLeft: focusIndex === 1 ? '5px solid #2B5182' : '1px solid #d9d9d9'}}
                                onFocus={()=> { setFocusIndex(1) }}
                                onChange={e => setValue2(e.target.value)}
                            />
                        </div>

                        <Button
                            style={{
                                background: 'linear-gradient(90deg, #5689B8 0%, #2B5182 100%)',
                                color: '#FFF',
                                fontSize: '22px',
                                fontWeight: 500,
                                width: '28vw',
                                marginTop: '8vh',
                                height: '10vh', maxHeight: 62,
                            }}
                            onClick={() => onLogin()}
                        >
                            登 录
                        </Button>

                        <Checkbox
                            style={{marginTop: '5vh'}}
                            checked={checked}
                            onChange={e => setChecked(e.target.checked)}
                        >
                            <div className="flex">
                                <div>
                                    登录即代表阅读和同意 <span className="text-[#4F9FF3]">《隐私政策》</span>和 <span className="text-[#4F9FF3]">《用户服务协议》</span>
                                </div>
                            </div>
                        </Checkbox>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AdminLogin;
