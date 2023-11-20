import React, {useEffect} from "react";
import {Route, Routes,} from "react-router-dom";
import {useDispatch} from "react-redux";

import AdminLayout from "@/pages/Admin/AdminLayout.jsx";
import {updateState} from "@/store/app/appSlice.js";
import AdminLogin from "@/pages/Admin/AdminLogin.jsx";
import ErrorPage from "@/pages/ErrorPage.jsx";

export const AdminRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateState({
            isLogin: !!sessionStorage.getItem('appKey')
        }))
    }, []);

    return (
        <Routes>
            <Route exact path={"/"} element={<AdminLogin/>} />
            <Route exact element={<AdminLayout />}>
                <Route path="*" element={<ErrorPage />} />
            </Route>
        </Routes>
    )
};
