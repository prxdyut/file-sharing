"use client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import theme from "@global/wrappers/Theme";
import AppContextWrapper from "@global/wrappers/context";
import { useEffect, useLayoutEffect } from "react";

export default function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    if (typeof navigator.serviceWorker !== "undefined") {
      navigator.serviceWorker.register("sw.js");
    }
  }, []);
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <AppContextWrapper>{children}</AppContextWrapper>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
