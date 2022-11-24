import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { productsList } from "../../Redux/Action/ProductActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Pagination from "../Home/pagination";

const MainProducts = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, data } = productList;
  const { products, pages, page } = data;

  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success } = productDelete;

  const productIsActive = useSelector((state) => state.productIsActive);
  const { success: successIsActive } = productIsActive;

  useEffect(() => {
    dispatch(productsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, success, successIsActive]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products</h2>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {errorDelete && (
              <Message variant="alert-danger">{errorDelete}</Message>
            )}
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <div className="row">
                {/* Products */}
                <Product products={products} />
              </div>
            )}

            <Pagination
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProducts;
