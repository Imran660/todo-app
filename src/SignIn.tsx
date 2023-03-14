import { Form, Input, Button, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getUserAuthStatus, setUserAuthStatus } from "./helper";
function SignIn() {
  let navigate = useNavigate();
  const onFinish = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    if (username == "admin" && password == "admin@123") {
      navigate("/");
      notification.open({
        type: "success",
        message: "Login Successful!.",
      });
      setUserAuthStatus("true");
    } else {
      notification.open({
        type: "error",
        message: "Invalid Username or Password!.",
      });
    }
  };
  useEffect(() => {
    if (getUserAuthStatus()) navigate("/");
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "500px",
          height: "300px",
          border: "2px solid gray",
          borderRadius: "20px",
        }}
      >
        <h2>SignIn </h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
