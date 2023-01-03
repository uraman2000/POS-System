import { ContainerOutlined, DesktopOutlined, LinkOutlined, PieChartOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "next/link";
import React from "react";
const { Header, Footer, Sider, Content } = Layout;
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
  getItem(<Link href="/test">Ant Design</Link>, "link", <LinkOutlined />),
];
export default function SideNav() {
  return (
    <Sider>
      <Menu defaultSelectedKeys={["1"]} defaultOpenKeys={["sub1"]} mode="inline" theme="dark" items={items} />
    </Sider>
  );
}
