import React, { useEffect } from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import UserComponent from "../components/users/UserComponent";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../Redux/Action/userActions";

const UsersScreen = () => {

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <UserComponent />
      </main>
    </>
  );
};

export default UsersScreen;
