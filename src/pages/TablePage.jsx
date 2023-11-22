import {LessPagination, notificationErrorFun, PageTitle} from "@/components/index.js";
import {Button, Space, Tag} from "antd";
import {confirmYes} from "@/components/MessageUtil";

const TablePage = () => {

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            width: 160,
            align: 'center',
            render: (_, record) => (
                <Space>
                    <a className="editTextColor" onClick={() => { confirmYes('测试', () => {}) }}>
                        二次确认
                    </a>
                    <a className="editTextColor" onClick={() => { notificationErrorFun('操作成功')}}>
                        成功提示
                    </a>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    return (
        <div className="w-full">
            <PageTitle
                text={'成绩上网'}
                button={
                    <Space>
                        <Button disabled={true}>次级按钮-禁用</Button>
                        <Button>次级按钮</Button>
                        <Button type={'primary'} disabled={true}>主按钮-禁用</Button>
                        <Button type={'primary'}>主按钮</Button>
                    </Space>
                }
            />
            <LessPagination
                rowKey={'key'}
                serialNo={true}
                columns={columns}
                dataProvider={data}
                pagination={false}
            />
        </div>
    );
};
export default TablePage;
