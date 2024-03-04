import { Divider } from "@mui/material";
import React from "react";

export default function FilesDivider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Divider textAlign="left">{children}</Divider>;
}
