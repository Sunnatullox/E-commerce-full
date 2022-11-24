import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { brandDetails, brandUpdateAll } from "../../Redux/Action/BrandAction";
import Header from "../Header";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import Sidebar from "../sidebar";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditeBrand = ({ match, history }) => {
  const brandId = match.params.id;

  const [title, setTitle] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [urlCloud, setUrlCloud] = useState(null);
  const [isActive, setIsActive] = useState(Boolean);

  const dispatch = useDispatch();

  const getBrandDetails = useSelector((state) => state.brandDetails);
  const { loading, error, brand } = getBrandDetails;

  const brandEdit = useSelector((state) => state.brandEdit);
  const { success } = brandEdit;

  useEffect(() => {
    if (brand) {
      setTitle(brand.title || brand.subcatigoryTitle);
      setIsActive(brand.isActive || brand.subcatigoryIsActive);
    }
    if (brandImage) {
      const data = new FormData();
      data.append("file", brandImage);
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
  }, [brand, brandImage]);

  useEffect(() => {
    dispatch(brandDetails(brandId));
  }, [brandId, dispatch]);

  if (success) {
    toast.success("Brand updated", ToastObjects);
    history.push("/brands");
  }
  const brandUpadateHandler = (e) => {
    e.preventDefault();
    dispatch(
      brandUpdateAll(brandId, {
        title,
        isActive,
        brandImage: urlCloud,
      })
    );
  };

  return (
    <>
      <Toast />
      <Sidebar />
      <main className="main-wrap">
        <Header />

        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Edit Categories</h2>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="">
                {/* Create category */}
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <div className="createCategory conteiner  d-grid justify-content-center">
                    <div style={{ width: "50rem" }}>
                      <div className="">
                        <label htmlFor="product_name" className="form-label">
                          Edit Name
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control py-3"
                          id="product_name"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </div>
                      <div className="">
                        <label className="form-label">Edite Image </label>
                        <input
                          className="form-control"
                          type="file"
                          onChange={(e) => setBrandImage(e.target.files[0])}
                        />
                      </div>
                      <div className="">
                        <div class="form-check form-switch">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="flexSwitchCheckChecked"
                            checked={isActive}
                            onClick={() => setIsActive(!isActive)}
                          />
                          <label
                            class="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                          >
                            Active
                          </label>
                        </div>
                      </div>
                      <div className="d-grid col-lg-4 d-flex ">
                        <button
                          onClick={brandUpadateHandler}
                          className="btn btn-primary py-3"
                        >
                          Save Edited category
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default EditeBrand;
