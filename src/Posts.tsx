import { Button, Modal } from "antd";
import { Component, ReactNode } from "react";
import { FileAddOutlined } from "@ant-design/icons";

class Posts extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modalVisible: false,
  //   };
  // }
  state = {
    modalVisible: false,
  };

  render(): ReactNode {
    const { modalVisible } = this.state;
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <div>
          <Button
            onClick={() =>
              this.setState({
                modalVisible: true,
              })
            }
            icon={<FileAddOutlined />}
          >
            Click here to post
          </Button>
        </div>

        <Modal
          title="Add Post"
          open={modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
        ></Modal>
      </div>
    );
  }
}

export default Posts;
