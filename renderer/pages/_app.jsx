import { Layout } from "antd";
import "antd/dist/antd.css";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import LogIn from "../components/LogIn";
import SideNav from "../components/sideNav";
import store from "../store/store";
const { Header, Footer, Sider, Content } = Layout;

const Container = styled.div`
  border-radius: 20px;
  background: white;
  padding: 2%;
  margin: 2%;
  box-shadow: 10px 10px 32px 1px rgba(0, 0, 0, 0.68);
  -webkit-box-shadow: 10px 10px 32px 1px rgba(0, 0, 0, 0.68);
  -moz-box-shadow: 10px 10px 32px 1px rgba(0, 0, 0, 0.68);
  overflow-y: scroll;
  width: 100%;
  ::-webkit-scrollbar {
    width: 5px; /* width of the scrollbar */
    background-color: #f5f5f500; /* color of the scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #c5c5c5; /* color of the thumb */
    border-radius: 10px; /* roundness of the thumb */
  }

  ::-webkit-scrollbar-track-piece:end {
    background: transparent;
    margin-bottom: 15px;
  }

  ::-webkit-scrollbar-track-piece:start {
    background: transparent;
    margin-top: 15px;
  }
`;

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    // Perform localStorage action

    setUser(localStorage.getItem("User"));
  }, []);

  return (
    <React.Fragment>
      <Provider store={store}>
        <Content>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          {user == null && (
            <>
              <LogIn></LogIn>
            </>
          )}
          {user !== null && (
            <Layout style={{ height: "100vh" }}>
              <SideNav></SideNav>
              <Container>
                <Component {...pageProps} />
              </Container>
            </Layout>
          )}
        </Content>
      </Provider>
    </React.Fragment>
  );
}

export default MyApp;
