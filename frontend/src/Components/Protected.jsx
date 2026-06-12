import React from 'react';
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children
  } else {
    return <Navigate to="/" />
  }
}

export default Protected
