import React from "react";
import CIcon from "@coreui/icons-react";

export default function Icon({ iconName, size, color }) {
  return <CIcon icon={iconName} size={size} color={color} style={{fontSize: '10px'}}/>;
}
