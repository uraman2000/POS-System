import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import UserServices from "../../services/user.services";
import { showNotification } from "../slice/notificationSlice";
import { setInfo } from "../slice/userSlice";
const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const userServices = new UserServices();
export default function LogIn() {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const res = await userServices.login(values);
    if (res.status == 200) {
      // await dispatch(setInfo(res.data));
      localStorage.setItem("User", JSON.stringify(res.data));
      window.location.reload(true);
      // setTimeout(() => {
      //   window.location.reload(true);
      // }, 1000);
    }

    if (res.status == 404) {
      dispatch(showNotification({ type: "error", title: "Error", message: res.message }));
    }
  };

  return (
    <Container>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Space direction="vertical" size={"small"}>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button style={{ width: "100%" }} type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Container>
  );
}
