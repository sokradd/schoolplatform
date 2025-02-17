import {Drawer, Input, Col, Select, Form, Row, Button, Spin, message} from 'antd';
import {useState} from "react";
import StudentApi from "../services/StudentApi.js";


const {Option} = Select;

function StudentDrawerForm({showDrawer, setShowDrawer, setStudents}) {
    const [submitting, setSubmitting] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const onClose = () => setShowDrawer(false);

    const onFinish = async (student) => {
        console.log(JSON.stringify(student, null, 2));
        setSubmitting(true);
        try {
            const response = await StudentApi.addStudent(student);
            if (response.status === 200) {
                const updatedStudents = await StudentApi.getAllStudents();
                setStudents(updatedStudents.data);
                setSubmitting(false);
                onClose();
                messageApi.success(`Student ${student.name} was added!`)
            }
        } catch (error) {
            console.error("Error adding student:", error);
            messageApi.error(`Student ${student.name} can't be added`);
            setSubmitting(false);
        }
    };


    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return (
        <>
            {contextHolder}
            <Drawer
                title="Create new student"
                width={720}
                onClose={onClose}
                open={showDrawer}
                styles={{body: {paddingBottom: 80}}}
                footer={
                    <div style={{textAlign: 'right'}}>
                        <Button onClick={onClose} style={{marginRight: 8}}>Cancel</Button>
                    </div>
                }
            >
                <Form
                    layout="vertical"
                    onFinishFailed={onFinishFailed}
                    onFinish={onFinish}
                    requiredMark={false}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{required: true, message: 'Please enter student name'}]}
                            >
                                <Input placeholder="Please enter student name"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{required: true, message: 'Please enter student email'}]}
                            >
                                <Input placeholder="Please enter student email"/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[{required: true, message: 'Please enter student gender'}]}
                            >
                                <Select placeholder="Please enter student gender">
                                    <Option value="MALE">MALE</Option>
                                    <Option value="FEMALE">FEMALE</Option>
                                    <Option value="OTHER">OTHER</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button> {submitting && <Spin/>}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </>
    );
}

export default StudentDrawerForm;
