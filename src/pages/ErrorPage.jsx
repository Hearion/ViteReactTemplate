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
        <div style={{width: '100%', height: '100%', minHeight: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                type === 'notFind' ?
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <h1>404 - 页面未找到！</h1>
                        <img style={{width: 60, borderRadius: '50%', marginTop: 30, marginBottom: 20}} src={notFind} alt=""/>
                        <p style={{marginBottom: 20}}>前面的区域，以后再来探索吧！</p>
                        <p>
                            <a onClick={() => { navigate(-1) }}>返回</a>
                        </p>
                    </div> :
                    <div id="error-page">
                        <h1>验证错误！</h1>
                        <p>您的Token不存在或已过期，请尝试重新登陆。</p>
                        <Space className={'flex center'} style={{justifyContent: 'flex-start'}}>
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
