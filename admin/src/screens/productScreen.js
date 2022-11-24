import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainProducts from "./../components/products/MainProducts";

const ProductScreen = ({match}) => {
  
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainProducts pageNumber={pageNumber} keyword={keyword}/>
      </main>
    </>
  );
};

export default ProductScreen;
