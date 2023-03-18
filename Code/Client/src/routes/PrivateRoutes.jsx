import React from "react";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";


const PrivateRoutes = () => {
  const { isAdmin } = useContext(AdminContext);
  let authen = isAdmin;
  return authen ? <Outlet /> : <Navigate to='/front' />;
};

export default PrivateRoutes;
