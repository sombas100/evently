import React from "react";
import AdminDashboard from "../components/AdminDashboard";
import AdminSideBar from "../components/AdminSideBar";

const AdminPage: React.FC = () => {
  return (
    <>
      <AdminSideBar />
      <AdminDashboard />
    </>
  );
};

export default AdminPage;
