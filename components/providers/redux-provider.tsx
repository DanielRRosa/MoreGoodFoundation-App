"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "../dashboard/clock/store/store";
import { Store, UnknownAction } from "@reduxjs/toolkit";

const ReduxProvider = ({
  children,
}: {
  children: ReactNode;
  store: Store<unknown, UnknownAction, unknown>;
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
