import { Drawer, Input, Col, Select, Form, Row, Button } from 'antd';
import {useState} from "react";
import StudentApi from "../services/StudentApi.js";

const { Option } = Select;

function StudentDrawerForm({ showDrawer, setShowDrawer }) {
    const [newStudents, setNewStudents] = useState([]);

    const onClose = () => setShowDrawer(false);
    const onFinish = async (student) => {
        console.log(JSON.stringify(student, null, 2));

        try {
            const response = await StudentApi.addStudent(student);
            setNewStudents(prevStudents => [...prevStudents, response.data]);
            console.log("Added student:", response.data);
        } catch (error) {
            console.error("Error adding student:", error);
        }
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return (
        <Drawer
            title="Create new student"
            width={720}
            onClose={onClose}
            open={showDrawer}
            styles={{ body: { paddingBottom: 80 } }}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button onClick={onClose} style={{ marginRight: 8 }}>Cancel</Button>
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
                            rules={[{ required: true, message: 'Please enter student name' }]}
                        >
                            <Input placeholder="Please enter student name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please enter student email' }]}
                        >
                            <Input placeholder="Please enter student email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="gender"
                            label="Gender"
                            rules={[{ required: true, message: 'Please enter student gender' }]}
                        >
                            <Select placeholder="Please enter student gender">
                                <Option value="MALE">MALE</Option>
                                <Option value="FEMALE">FEMALE</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Drawer>
    );
}

export default StudentDrawerForm;
