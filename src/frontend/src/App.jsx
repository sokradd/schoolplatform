import {useEffect, useState} from 'react';
import StudentDrawerForm from "./functionality/StudentDrawerForm.jsx";
import './App.css';
import StudentApi from "./services/StudentApi.js";
import {
    BankOutlined,
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined, PlusOutlined, QuestionCircleOutlined, TableOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {
    Breadcrumb,
    Layout,
    Menu,
    theme,
    Table, Spin, Empty, Button, Badge, Tag, Avatar, Popconfirm
} from 'antd';
import {errorNotification} from "./functionality/Notification.jsx";

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
    getItem('Main page', '1', <BankOutlined/>),
    getItem('Exercises', '2', <DesktopOutlined/>),
    getItem('Data', 'sub1', <PieChartOutlined/>, [
        getItem('Schedule', '3', <TableOutlined/>),
        getItem('Students', '4', <UserOutlined/>),
    ]),
    getItem('Materials', '5', <FileOutlined/>),
];

const TheAvatar = ({name}) => {
    if (!name || typeof name !== 'string') {
        return <Avatar icon={<UserOutlined/>}/>;
    }

    const trim = name.trim();
    const split = trim.split(" ");

    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>;
    } else {
        return <Avatar>{`${name.charAt(0)}${name.charAt(name.length - 1)}`}</Avatar>;
    }
};


function App() {
    const [students, setStudents] = useState();
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
                console.log(error.response);
                error.response.json().then(res => {
                    console.log(res);
                });
            }
        }

        fetchStudents();
    }, []);

    const deleteStudent = async (id) => {
        if (!id) {
            console.error("Error: Student ID is undefined");
            return;
        }
        try {
            await StudentApi.deleteStudent(id);
            setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    const columns = [
        {
            title: '',
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
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, student) => (
                <>
                    <Button style={{marginRight: '10px'}}>Edit</Button>
                    <Popconfirm
                        title="Delete the student"
                        description={`Are you sure to delete ${student.name}?`}
                        onConfirm={() => {
                            if (student.id) {
                                deleteStudent(student.id);
                            } else {
                                console.error("Error: Student ID is undefined");
                            }
                        }}
                        icon={<QuestionCircleOutlined style={{color: 'red'}}/>}
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

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
                    setStudents={setStudents}
                />
                <Table
                    dataSource={students}
                    columns={columns}
                    bordered
                    title={() =>
                        <>
                            <Tag style={{marginLeft: "10px "}}>Number of students:</Tag>
                            <Badge count={students.length}
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
                    rowKey={(student) => student.id || student.email || Math.random().toString(36)}
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
                            {title: 'Data'},
                            {title: 'Students'},
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