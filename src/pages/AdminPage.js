/* eslint-disable react/react-in-jsx-scope -- Unaware of jsxImportSource */
/** @jsxImportSource @emotion/react */

import React from "react";
import { css } from "@emotion/react";
import AdminTabs from "../components/Admin/AdminTabs";

import Navbar from "../components/Navbar";

const useStyles = {
  root: css`
    flex-grow: 1;
    position: relative;
  `,
  logo: css`
    font-weight: bold;
    font-size: 1.5rem;
    color: #ffffff;
  `,
  toolbar: css`
    justify-content: flex-end;
  `,
  tabbar: css`
    background: #6e6e6e;
    color: #ffffff;
  `,
};

export default function AdminPage() {
  return (
    <div css={useStyles.root}>
      <Navbar transparent={false} adminPanel={true} />
      <AdminTabs />
    </div>
  );
}
