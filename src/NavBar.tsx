import React, { useState } from "react";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserAuthStatus } from "./helper";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateType } from "./types";

function NavBar() {
  const items: { label: string; key: string }[] = [
    {
      label: "To Do",
      key: "/",
    },
    {
      label: "Posts",
      key: "/posts",
    },
  ];
  const { pathname } = useLocation();
  const [selectedKey, setSelectedKey] = useState(pathname);
  const navigate = useNavigate();
  const { isLogin } = useSelector((state: stateType) => state.auth);
  const dipatch = useDispatch();
  return (
    <div>
      {isLogin && (
        <div style={{ position: "relative" }}>
          <Menu
            mode="horizontal"
            activeKey={selectedKey}
            onClick={(e) => {
              setSelectedKey(e.key);
              navigate(e.key);
            }}
            items={items}
          />
          <span
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              dipatch({ type: "LOGOUT_SUCCESS" });
              localStorage.removeItem("isLogin");
            }}
          >
            <LogoutOutlined style={{ marginRight: "5px" }} />
            Logout
          </span>
        </div>
      )}
    </div>
  );
}

export default NavBar;
