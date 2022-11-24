import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { brandsCreate } from "../../Redux/Action/BrandAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateBrand = () => {

  const [title, setTitle] = useState("");
  const [catigoryImage, seCatigoryImage] = useState(null);
  const [urlCloud, setUrlCloud] = useState(null);
  const [isActive, setIsActive] = useState(true)

  const dispatch = useDispatch();

  const brandCreate = useSelector((state) => state.brandCreate);
  const { loading, error, success } = brandCreate;

  useEffect(() => {
    if (success) {
      toast.success("Category Added", ToastObjects);
      setTitle("");
      seCatigoryImage(null);
      setIsActive(true);
      setUrlCloud(null);
    }
    if (catigoryImage) {
      const data = new FormData();
      data.append("file", catigoryImage);
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
  }, [catigoryImage, success]);

  const categoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      brandsCreate({
        title,
        brandImage: urlCloud,
        isActive,
      })
    );
  };

  return (
    <>
      <Toast />
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="createCategory col-md-12 col-lg-4">
          <div>
            <div className="mb-4">
              <label htmlFor="product_name" className="form-label">
                title
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
            <div className="mb-4">
              <label className="form-label"> Image </label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => seCatigoryImage(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <div class="form-check form-switch">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  Active
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button
              disabled={!urlCloud}
                onClick={categoryCreateHandler}
                className="btn btn-primary py-3"
              >
                Create category
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateBrand;
