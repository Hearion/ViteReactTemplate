import React, {useEffect} from "react";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {useDispatch} from "react-redux";
import ErrorPage from "@/pages/ErrorPage.jsx";
import {updateState} from "@/store/app/appSlice.js";
import AdminLogin from "@/pages/AdminLogin.jsx";
import AdminLayout from "@/pages/AdminLayout.jsx";

export const IndexRouter = () => {

	const dispatch = useDispatch();
	
	const basename = import.meta.env.VITE_ROUTE_BASE_URL;

	// 当组件挂载或组件渲染时执行的效果钩子函数
	useEffect(() => {
	    // 分发一个action，更新组件的状态
	    dispatch(updateState({
	        isLogin: !!sessionStorage.getItem('appKey')
	    }))
	}, []);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route>
				<Route exact path={"/"} element={<AdminLogin/>} />
				<Route exact element={<AdminLayout />}>
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Route>
		),
		{
			basename
		}
	);

	return (
		<RouterProvider router={router} />
	)
};
