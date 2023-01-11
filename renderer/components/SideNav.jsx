import { ContainerOutlined, DesktopOutlined, PieChartOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Slider } from "antd";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
const { Header, Footer, Sider, Content } = Layout;
const Container = styled(Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  getItem(<Link href="/home">Home</Link>, "1", <PieChartOutlined />),
  getItem(<Link href="/Products">Products</Link>, "2", <DesktopOutlined />),
  getItem(<Link href="/Users">Users</Link>, "3", <ContainerOutlined />),
  getItem(<Link href="/Transaction">Transaction</Link>, "4", <ContainerOutlined />),
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
    <PieChartOutlined />
  ),
];
export default function SideNav() {
  return (
    <Container>
      <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={items} />
      <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={item2} />
    </Container>
  );
}
