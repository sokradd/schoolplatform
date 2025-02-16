import {use, useEffect, useState} from 'react';
import StudentDrawerForm from "./functionality/StudentDrawerForm.jsx";
import './App.css';
import StudentApi from "./services/StudentApi.js";
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined, PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table, Spin, Empty, Button, Badge, Tag, Avatar
} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

const items = [
    getItem('Option 1', '1', <PieChartOutlined/>),
    getItem('Option 2', '2', <DesktopOutlined/>),
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined/>, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined/>),
];

const TheAvatar = ({name}) => {
    let trim = name.trim()
    if (trim.length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    } else {
        const split = trim.split(" ");
        if(split.length === 1) {
            return <Avatar>{name.charAt(0)}</Avatar>
        } else {
            return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>;
        }
    }

}

const columns = [
    {
        title:'',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) =>
            <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
];


function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await StudentApi.getAllStudents();
                setStudents(response.data);
                setFetching(false)
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }

        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin/>
        }
        if (students.length <= 0) {
            return <Empty/>;
        } else {
            return <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                />
                <Table
                    dataSource={students}
                    columns={columns}
                    bordered
                    title={() =>
                        <>
                            <Tag style={{marginLeft: "10px "}}>Number of students:</Tag>
                            <Badge count={students.length+2}
                                   showZero
                                   color="#999"
                                   style={{marginLeft: "2px"}}
                            />
                            <br/><br/>
                            <Button
                                onClick={() => setShowDrawer(!showDrawer)}
                                type="primary" shape="round" icon={<PlusOutlined/>} size={'small'}>
                                Add new student
                            </Button>
                        </>
                    }
                    pagination={{pageSize: 50}}
                    scroll={{y: 380}}
                    rowKey={(student) => student.id}
                />;
            </>
        }
    }

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                        items={[
                            {title: 'User'},
                            {title: 'Bill'},
                        ]}
                    />

                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {renderStudents()}
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    By Oleksii Garnadko
                </Footer>
            </Layout>
        </Layout>
    );
}

export default App;