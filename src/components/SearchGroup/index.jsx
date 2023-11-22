import {Input, Select, Space} from "antd";
import {notificationFun} from "@/components/index.js";
import {useState} from "react";

const { Search } = Input;

const SearchGroup = (props) => {
    const {
        childName,
        childType,
        onSelectValue,
        searchList,
        onSearchValue,
        isChange
    } = props;

    const [thisChildName, setThisChildName] = useState(childName)
    
    return (
        <Space.Compact>
            <Select
                style={{minWidth: 100}}
                placeholder="请选择"
                value={childType || null}
                onChange={onSelectValue}
                options={searchList}
                fieldNames={{ label: 'text', value: 'value', options: 'options', groupLabel: 'label' }}
            />
            <Search
                className="search"
                placeholder="输入搜索关键字"
                style={{ width: 300 }}
                value={thisChildName}
                onChange={(e) => {
                    setThisChildName(e.target.value);
                    if (isChange) {
                        onSearchValue(e.target.value, true);
                    }
                }}
                onSearch={(value) => {
                    if (childType !== "") {
                        onSearchValue(value?.trim(), false);
                    } else {
                        return notificationFun("请先选择筛选类型");
                    }
                }}
            />
        </Space.Compact>
    );
};

export {SearchGroup};
