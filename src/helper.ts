import { notification } from "antd";
import { listItemType } from "./types";
export const getUserAuthStatus = () => Boolean(localStorage.getItem("isLogin")); // "true" or "false"

export const setUserAuthStatus = (value: string) =>
  localStorage.setItem("isLogin", value);

export const removeUserAuthStatus = () => localStorage.removeItem("isLogin");

export const addOrUpdateItemToList = ({
  value,
  type,
}: {
  value: listItemType;
  type: "add" | "update";
}) => {
  let values = getTheList() || [];
  let itemIndex = values?.length // ? (optional chaining)
    ? values.findIndex(
        // will be a problem for the updation
        (v: listItemType) => v.title.toLowerCase() == value.title.toLowerCase()
      )
    : false;
  if (type == "add") {
    if (itemIndex >= 0) {
      return false;
    }
    values.push(value);
  }
  if (type == "update") {
    values[itemIndex] = value;
    console.log({ updatedItem: values[itemIndex], itemIndex });
  }

  localStorage.setItem("list", JSON.stringify(values));
  return true;
};

export const getTheList = () =>
  //@ts-ignore localstorage of list
  JSON.parse(localStorage.getItem("list"));
