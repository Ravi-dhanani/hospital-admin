import React from "react";
import MainLayout from "./common/header/MainLayout";
import Department from "./component/department/Department";

export default function department() {
  return (
    <div>
      <MainLayout>
        <Department />
      </MainLayout>
    </div>
  );
}
