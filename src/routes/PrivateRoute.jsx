import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {notificationFun} from "@/components/index.js";

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem('appKey')) {
            notificationFun('请登录后操作！')
            return navigate(location.pathname.indexOf('admin') === -1 ? '/login' : '/admin');
        }
        setShow(true)
    }, [])

    return (
        <div className="transition ease-in-out delay-150 duration-300">
            {show && children}
        </div>
    )
};

export default PrivateRoute;
