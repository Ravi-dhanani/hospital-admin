import React from "react";
import MainLayout from "./common/header/MainLayout";
import Admin from "./component/admin/Admin";

export default function admin() {
  return (
    <div>
      <MainLayout>
        <Admin />
      </MainLayout>
    </div>
  );
}
