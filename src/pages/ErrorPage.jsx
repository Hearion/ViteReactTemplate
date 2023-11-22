import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Space, Statistic} from "antd";
import notFind from "/src/assets/images/404.jpg";

const { Countdown } = Statistic;

export default function ErrorPage() {

    const [type, setType] = useState('notFind')
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setType(location.pathname === '/tokenError' ? location.pathname : 'notFind')
    }, [])

    return (
        <div className="w-full h-full min-w-[50vh] flex justify-center items-center">
            {
                type === 'notFind' ?
                    <div className="flex flex-col justify-center items-center">
                        <h1 className="text-2xl">404 - 页面未找到！</h1>
                        <img className="w-[60px] mt-[30px] mb-[20px] rounded-full" src={notFind} alt=""/>
                        <p className="mb-[20px]" style={{marginBottom: 20}}>前面的区域，以后再来探索吧！</p>
                        <p>
                            <a onClick={() => { navigate(-1) }}>返回</a>
                        </p>
                    </div> :
                    <div id="error-page">
                        <h1>验证错误！</h1>
                        <p>您的Token不存在或已过期，请尝试重新登陆。</p>
                        <Space className="flex center justify-start">
                            <Countdown
                                format={'s'}
                                suffix={'秒后'}
                                valueStyle={{fontSize: 14}}
                                value={Date.now() + 5 * 1000}
                                onFinish={() => {navigate('/')}}
                            />
                            <a onClick={() => {navigate('/')}}>
                                前往登录
                            </a>
                        </Space>
                    </div>
            }
        </div>
    );
}
