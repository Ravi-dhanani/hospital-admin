import DataTable from "@/pages/common/DataTable";
import MainLayout from "@/pages/common/header/MainLayout";
import React from "react";
import Dashboard from "../Dashboard/Dashboard";

export default function HomePage() {
  return (
    <div>
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </div>
  );
}
