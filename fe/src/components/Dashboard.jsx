import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout, List, Typography, ConfigProvider } from "antd";
import { PatientModal } from "./PatientModal";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/api/patients",
    })
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNew = (newData) => {
    setData([...data, newData]);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#de7c41",
        },
        components: {
          Layout: {
            headerBg: "#de7c41",
          },
          List: {
            footerBg: "#f0eadf",
          },
        },
      }}
    >
      <Layout style={{ width: "100%" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <Title level={2}>Finni Health Take Home EHR</Title>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <List
            pagination={{
              position: "bottom",
              align: "center",
            }}
            style={{ marginTop: 5 }}
            header={
              <span
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 style={{ align: "left" }}>Patients</h2>
                <PatientModal update={handleNew} />
              </span>
            }
            dataSource={data}
            bordered
            renderItem={(item) => (
              <List.Item key={item.id} actions={[<PatientModal data={item} />]}>
                {item.first_name + " " + item.last_name}
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </ConfigProvider>
  );
};
