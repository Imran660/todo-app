import React, { useState } from "react";
import { Button, Modal, Form, Input, notification } from "antd";
import { addNewItemToList } from "./helper";
const { TextArea } = Input;
function ToDo() {
  const handleAddItem = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const handleSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    if (title && description) {
      let result = addNewItemToList({ title, description });
      notification.open({
        message: result
          ? `${title} added successfully :)`
          : `${title} already exist :(`,
        type: result ? "success" :"info",
      });
      setOpen(result ? false : true);
    } else {
      notification.open({
        message: "Give me title and description :(",
        type: "warning",
      });
    }
  };
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
          width: "600px",
          height: "400px",
          border: "1px solid black",
          padding: "10px 20px",
        }}
      >
        <Button
          style={{
            width: "100%",
            fontFamily: "sans-serif",
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textTransform: "uppercase",
          }}
          onClick={handleAddItem}
          type="primary"
        >
          Add Item
        </Button>
      </div>
      <Modal
        title="Add New Item"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "30px 0" }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter title!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea rows={5} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ToDo;
