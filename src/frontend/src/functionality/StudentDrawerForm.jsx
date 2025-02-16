import { Drawer, Input, Col, Select, Form, Row, Button } from 'antd';

const { Option } = Select;

function StudentDrawerForm({ showDrawer, setShowDrawer }) {
    const onClose = () => setShowDrawer(false);
    const onFinish = values => {
        alert(JSON.stringify(values, null, 2));
    };

    const onFinishFailed = errorInfo => {
        alert(JSON.stringify(errorInfo, null, 2));
    };

    return (
        <Drawer
            title="Create new student"
            width={720}
            onClose={onClose}
            open={showDrawer} // Changed from 'visible' to 'open'
            bodyStyle={{ paddingBottom: 80 }}
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
                requiredMark={false} // Changed from 'hideRequiredMark'
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
