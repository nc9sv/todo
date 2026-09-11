import React, {useState} from 'react';
import {Card, ConfigProvider, Space} from "antd";
import LoginForm from "./LoginForm.jsx";
import RegisterForm from "./RegisterForm.jsx";

function FormCard() {
    const [formType, setFormType] = useState("Login");

    const toggleFormType = () => {
        setFormType((prev) => (prev === "Login" ? "Register" : "Login"));
    }

    const oppositeFormType = formType === "Login" ? "Register" : "Login";

    return (<div className="flex justify-center items-center h-screen rounded-md">

        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#7AB8A1', colorBorderSecondary: '#9395d3', borderRadius: 7
                },
            }}
        >
            <Space direction="vertical" size={16}>
                <Card title={formType}
                      extra={<span className="text-white underline text-base hover:text-gray-200 cursor-pointer"
                                   onClick={(e) => {
                                       e.preventDefault();
                                       toggleFormType();
                                   }}>{oppositeFormType}</span>}
                      style={{width: 300}}>
                    {formType == "Login" ? <LoginForm/> : <RegisterForm/>}
                </Card>
            </Space>
        </ConfigProvider>

    </div>)
}

export default FormCard
