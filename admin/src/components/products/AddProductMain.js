import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { productsCreate } from "../../Redux/Action/ProductActions";

import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import { getCategorysList } from "../../Redux/Action/CategoryAction";
import { getbrandsList } from "../../Redux/Action/BrandAction";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imageFie, setImageFile] = useState(null);
  const [urlCloud, setUrlCloud] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [brandId, setBrandId] = useState(null);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);

  const { loading, error, product } = productCreate;

  const categorysList = useSelector((state) => state.categorysList);
  const { categorys } = categorysList;

  const brandsList = useSelector((state) => state.brandsList);
  const { brands } = brandsList;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setPrice(0);
      setCountInStock(0);
      setDescription("");
      setImage("");
    }
    if (imageFie) {
      const data = new FormData();
      data.append("file", imageFie);
      data.append("upload_preset", "uzdev_overflow");
      data.append("cloud_name", "defsmhgn9");
      fetch(`https://api.cloudinary.com/v1_1/defsmhgn9/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrlCloud(data.url);
        })
        .catch((err) => console.log(err));
    }
  }, [dispatch, imageFie, product]);

  useEffect(() => {
    dispatch(getCategorysList());
    dispatch(getbrandsList());
  }, [dispatch]);
  // console.log(brandId, categoryId)

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      productsCreate({
        name,
        price,
        description,
        categoryId,
        brandId,
        image: image || urlCloud,
        countInStock,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button
                disabled={!categoryId || !brandId || !name || !price || urlCloud ? !urlCloud : !image || !countInStock || !description}
                type="submit"
                className="btn btn-primary"
              >
                Publish now
              </button>
            </div>
          </div>

          <div className="mb-4">
            <div className="w-75">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Brand</label>
                    <select
                      value={brandId}
                      onChange={(e) => setBrandId(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value={null} selected>
                        ---
                      </option>
                      {brands?.map((brand) => (
                        <option
                          key={brand?._id}
                          disabled={!brand?.isActive}
                          value={brand?._id}
                        >
                          {brand?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Category</label>
                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option value={null} selected>
                        ---
                      </option>
                      {categorys?.map((category) => (
                        <option
                          key={category?._id}
                          disabled={!category?.isActive}
                          value={category?._id}
                        >
                          {category?.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      value={countInStock}
                      onChange={(e) => setCountInStock(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Inter Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                      className="form-control mt-3"
                      type="file"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
