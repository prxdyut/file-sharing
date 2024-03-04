import AppContext from "@global/context";
import { useLocalStorage } from "@mantine/hooks";
import React, { useState } from "react";

export default function AppContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<object>({});
  const [pinned] = useLocalStorage({
    key: "pinned",
    defaultValue: [],
  });

  const value = {
    set: (newData: object) =>
      setData((oldData) => ({ ...oldData, ...newData })),
    get: (e: string | undefined) => {
      if (e == "local") return pinned;
      return data;
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
