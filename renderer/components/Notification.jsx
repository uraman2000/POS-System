import React from "react";
import { Button, notification, Space } from "antd";
import { usenotification } from "../pages/_app";


const openNotificationWithIcon = (type) => {
  usenotification[type]({
    message: "Notification Title",
    description:
      "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  });
};
