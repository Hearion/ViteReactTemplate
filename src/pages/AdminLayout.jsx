import React, {useEffect, useState} from 'react';
import {Layout, Menu, Space, Spin} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {RouterData} from "@/routes/RouterData.jsx";
import {
    GlobalOutlined,
    LoginOutlined,
    PartitionOutlined,
    SafetyCertificateOutlined,
    SettingOutlined,
    SketchOutlined
} from "@ant-design/icons";
import {removeLoginData, removeMenuData} from "@/utils/SessionStorageData.js";
import {deepClone} from "@/utils/PrjUtils.js";
import {useSelector} from "react-redux";
import {confirmYes} from "@/components/index.js";

const {Header, Content, Sider} = Layout;

const iconData = {
    'demo': <SketchOutlined />,
    'portal_configuration': <SafetyCertificateOutlined/>,
    'data_online': <GlobalOutlined/>,
    'publicity_data': <SafetyCertificateOutlined/>,
    'institutional_users': <PartitionOutlined/>,
}

const AdminLayout = () => {
    const navigate = useNavigate(); // 路由
    const location = useLocation(); // 路由
    const appData = useSelector((state) => state.appData); // Redux
    const [selectMenuKey, setSelectMenuKey] = useState([]); // 选中菜单数据
    const [openKey, setOpenKey] = useState([]); // 选中菜单数据
    const [userInfo, setUserInfo] = useState({}); // 登录用户数据
    const [menuData, setMenuData] = useState([]); // 菜单数据
    const [changePasswordOpen, setChangePasswordOpen] = useState(false); // 修改密码弹框

    useEffect(() => {
        initializeMenuState();
    }, []);

    // 加载菜单数据
    const loadMenuData = () => {
        const thisRouter = deepClone(RouterData);

        return Object.values(thisRouter.admin).map((item) => {
            item.icon = iconData[item.key];
            if (item.children) {
                item.children = Object.values(item.children).filter(cItem => true);
            }
            return item;
        }).filter(item => item.children.length);
    };

    // 查找第一个菜单项的键
    const findFirstKey = (menuData, lastKey) => {
        for (let i = 0; i < menuData.length; i++) {
            const item = menuData[i];
            if (item.children.find(({ key }) => key === lastKey)) {
                return item.key;
            }
        }
    };

    // 设置初始菜单状态
    const initializeMenuState = () => {
        const menuData = loadMenuData();
        const lastKey = location.pathname.split('/').pop();
        const firstKey = findFirstKey(menuData, lastKey);

        setUserInfo(JSON.parse(sessionStorage.getItem('userInfo')) || {});
        setSelectMenuKey([firstKey, lastKey]);
        setOpenKey([firstKey]);
        setMenuData(menuData);
    };

    // 退出登录
    const onLoginOut = () => {
        confirmYes('确定要退出登录吗？', () => {
            removeLoginData();
            removeMenuData();
            navigate("/admin", { relative: "/admin" });
        })
    }

    return (
        <Spin spinning={location.state === 'loading'}>
            <Layout style={{height: '100vh'}}>
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: '#2B5182'
                    }}
                >
                    <div className="text-[26px] text-[#FFF] ffont-medium"> ViteReactTemplate </div>
                    <Space size={10}>
                        <div className="text-[20px] text-[#FFF] font-medium leading-[30px] pb-1">
                            {userInfo.nickName || ''}
                        </div>
                        <SettingOutlined
                            className="text-[18px] text-[#FFF] font-medium cursor-pointer"
                            onClick={() => setChangePasswordOpen(true)}
                        />
                        <LoginOutlined
                            className="text-[18px] text-[#FFF] font-medium cursor-pointer"
                            onClick={onLoginOut}
                        />
                    </Space>
                </Header>
                <Layout>
                    <Sider
                        width={200}
                    >
                        {
                            menuData.length ?
                                <Menu
                                    mode="inline"
                                    style={{
                                        height: '100%',
                                        borderRight: 0,
                                        backgroundColor: '#EEEEEE'
                                    }}
                                    items={menuData}
                                    openKeys={openKey}
                                    onOpenChange={(value) => setOpenKey([value.pop()])}
                                    selectedKeys={selectMenuKey}
                                    onSelect={({selectedKeys}) => {
                                        setSelectMenuKey(selectedKeys)
                                        navigate(`/admin/${selectedKeys[0]}`);
                                    }}
                                /> : null
                        }
                    </Sider>
                    <Layout>
                        <Content
                            style={{
                                padding: 24,
                                margin: 0,
                                flex: 1,
                                overflow: 'auto',
                                background: '#FFF'
                            }}
                        >
                            <div style={{height: '100%', overflow: 'auto'}}>
                                <Spin spinning={appData.isLoading}>
                                    <Outlet/>
                                </Spin>
                            </div>
                        </Content>
                    </Layout>
                </Layout>

            </Layout>
        </Spin>
    );
};
export default AdminLayout;
