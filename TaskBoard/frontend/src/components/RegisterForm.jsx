import React, {useState} from 'react';
import {Alert, Button, Form, Input} from 'antd';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function RegisterForm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onFinish = async (values) => {
        const {username, password, confirm_password} = values;
        setErrorMessage("");

        try {
            const res = await axios.post("http://localhost:8000/users/create_user", {
                username,
                password,
                confirm_password,
            });
            const userId = res.data.user_id;
            localStorage.setItem("userId", userId);

            navigate("/tasks");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setErrorMessage(err.response.data.detail);
            } else {
                setErrorMessage("Произошла ошибка. Попробуйте позже.");
            }
        }
    };
    const onFinishFailed = errorInfo => {
        console.log('Ошибка валидации данных:', errorInfo);
    };

    return (
        <div>
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item
                    label="Confirm"
                    name="confirm_password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                {errorMessage && (
                    <Form.Item wrapperCol={{span: 25}}>
                        <Alert message={errorMessage} type="error" showIcon/>
                    </Form.Item>
                )}

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default RegisterForm;