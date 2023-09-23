import React from "react";
import MainLayout from "./common/header/MainLayout";
import BookAppointment from "./component/BookAppointment/BookAppointment";

export default function bookAappointment() {
  return (
    <div>
      <MainLayout>
        <BookAppointment />
      </MainLayout>
    </div>
  );
}
