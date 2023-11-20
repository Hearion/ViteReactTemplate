import React from "react";
import {Space} from "antd";

const PageTitle = ({text, control, button, color = '#F8FBFD'}) => {

    return (
        <div className="flex justify-between items-center mb-[20px] px-[16px] py-[18px] w-full" style={{background: color}}>
            <Space size={30}>
                <div className="text-[20px] text-[#000] font-medium">
                    {text}
                </div>
                <div>
                    {control}
                </div>
            </Space>
            <div>
                {button}
            </div>
        </div>
    );
};

export {PageTitle};
