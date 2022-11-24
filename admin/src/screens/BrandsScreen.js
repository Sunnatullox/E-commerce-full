import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainBrands from "../components/Brands/MainBrands";

const BrandsScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainBrands />
      </main>
    </>
  );
};

export default BrandsScreen;
