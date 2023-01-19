import { HistoryOutlined, HomeOutlined, LogoutOutlined, PieChartOutlined, ShoppingCartOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import Title from "antd/lib/typography/Title";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { usertValue } from "../slice/userSlice";
const { Header, Footer, Sider, Content } = Layout;
const Container = styled.div`
  flex-grow: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CustomSider = styled(Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;
const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem(<Link href="/home">Home</Link>, "1", <HomeOutlined />),
  getItem(<Link href="/Products">Products</Link>, "2", <ShoppingCartOutlined />),
  getItem(<Link href="/Users">Users</Link>, "3", <UsergroupAddOutlined />),
  getItem(<Link href="/Transaction">Transaction</Link>, "4", <HistoryOutlined />),
  getItem(<Link href="/Analytics">Analytics</Link>, "5", <PieChartOutlined />),
  // getItem(<Link href="/test">Ant Design</Link>, "link", <LinkOutlined />),
];
const item2 = [
  getItem(
    <Button
      type="link"
      style={{ color: "rgba(255, 255, 255, 0.65)" }}
      onClick={() => {
        window.location.reload(true);
        localStorage.removeItem("User");
      }}
    >
      Logout
    </Button>,
    "0",
    <LogoutOutlined />
  ),
];
export default function SideNav() {
  const user = useSelector(usertValue);
  return (
    <CustomSider>
      <Title level={4} style={{ color: "white", textAlign: "center" }}>
        Welcome, <br /> {user?.name}!
      </Title>
      <Container>
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={items} />
        <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={item2} />
      </Container>
    </CustomSider>
  );
}
