import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  notification,
  Collapse,
  Empty,
  Popconfirm,
} from "antd";
import { addOrUpdateItemToList, getTheList } from "./helper";
import { listItemType } from "./types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Panel } = Collapse;
function ToDo() {
  const handleAddItem = () => setOpen(true);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<listItemType[]>([]);
  const [record, setRecord] = useState<listItemType>({
    title: "",
    description: "",
  });
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const disabled = record.title == title && record.description == description;
  const handleSubmit = ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    let value = { title, description };
    if (title && description) {
      if (record && disabled) {
        notification.open({
          message: `don't play smart!..`,
          type: "warning",
        });
        return;
      }
      let result = addOrUpdateItemToList({
        value,
        type: record ? "update" : "add",
      });
      if (record) {
        notification.open({
          message: `${title} has been updated successfully :)`,
          type: "success",
        });
      } else {
        notification.open({
          message: result
            ? `${title} added successfully :)`
            : `${title} already exist :(`,
          type: result ? "success" : "info",
        });
      }
      setOpen(result ? false : true);
      setData(getTheList());
    } else {
      notification.open({
        message: "Give me title and description :(",
        type: "warning",
      });
    }
  };

  useEffect(() => {
    let list = getTheList() || [];
    setData(list);
  }, []);

  const extraElement = (element: listItemType) => (
    <div>
      <EditOutlined
        onClick={(e) => {
          e.stopPropagation();
          setRecord(element);
          setOpen(true);
          setTitle(element.title);
          setDescription(element.description);
        }}
        style={{ color: "blue", marginRight: "10px" }}
      />
      <Popconfirm
        title="Are you that you want to delete..?"
        onConfirm={() => {
          let values = [...data];
          let index = values.findIndex((i) => i.title == element.title);
          values.splice(index, 1);
          setData(values);
          localStorage.setItem("list", JSON.stringify(values));
        }}
      >
        <DeleteOutlined
          onClick={(e) => {
            e.stopPropagation();
          }}
          style={{ color: "red" }}
        />
      </Popconfirm>
    </div>
  );

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
        <div style={{ height: "10%" }}>
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
        <div
          style={{
            height: "90%",
            width: "100%",
          }}
        >
          {data?.length ? (
            <Collapse accordion={false} style={{ width: "100%" }}>
              {data.map((d, i) => (
                <Panel header={d.title} key={i} extra={extraElement(d)}>
                  <p>{d.description}</p>
                </Panel>
              ))}
            </Collapse>
          ) : (
            <Empty
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
              description="No items added !.."
            />
          )}
        </div>
      </div>

      <Modal
        title={record ? "Update the item" : "Add New Item"}
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
            initialValue={record.title}
          >
            <Input onChange={(e) => setTitle(e.target.value)} />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description!" }]}
            initialValue={record.description}
          >
            <TextArea
              rows={5}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button disabled={disabled} type="primary" htmlType="submit">
              {record ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ToDo;
