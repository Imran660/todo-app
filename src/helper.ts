import { notification } from "antd";
export const getUserAuthStatus = () => Boolean(localStorage.getItem("isLogin")); // "true" or "false"

export const setUserAuthStatus = (value: string) =>
  localStorage.setItem("isLogin", value);

export const removeUserAuthStatus = () => localStorage.removeItem("isLogin");

export const addNewItemToList = (value: {
  title: string;
  description: string;
}) => {
  let values = getTheList() || [];
  let itemAlreadyExist = values.find(
    (v: { title: string; description: string }) => v.title.toLowerCase() == value.title.toLowerCase()
  );
  if (itemAlreadyExist) {
    return false;
  }
  values.push(value);
  localStorage.setItem("list", JSON.stringify(values));
  return true
};

export const getTheList = () =>
  //@ts-ignore localstorage of list
  JSON.parse(localStorage.getItem("list"));
