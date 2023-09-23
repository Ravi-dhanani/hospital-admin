import React from "react";
import MainLayout from "./common/header/MainLayout";
import Doctor from "./component/doctor/Doctor";

export default function doctor() {
  return (
    <div>
      <MainLayout>
        <Doctor />
      </MainLayout>
    </div>
  );
}
