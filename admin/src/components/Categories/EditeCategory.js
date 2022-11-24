import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  categoryDetails,
  categoryUpdateAll,
} from "../../Redux/Action/CategoryAction";
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

const EditeCategory = ({ match, history }) => {
  const categoryId = match.params.id;

  const [title, setTitle] = useState("");
  const [catigoryImage, seCatigoryImage] = useState(null);
  const [urlCloud, setUrlCloud] = useState(null);
  const [description, setDescription] = useState("");
  const [tagValue, setTagValue] = useState([]);
  const [isActive, setIsActive] = useState(Boolean);
  const tagRef = createRef();

  const dispatch = useDispatch();

  /*remove tags */
  const removeTags = (i) => {
    const tags = [...tagValue];
    tags.splice(i, 1);
    setTagValue(tags);
  };

  /* add tags */
  const addTags = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTagValue([...tagValue, e.target.value]);
      e.target.value = "";
    }
  };


  const getOneCategoryDetails = useSelector((state) => state.categoryDetails);
  const { loading, error, category } = getOneCategoryDetails;

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const {  success } = categoryEdit;

  useEffect(() => {
    if (category) {
      setTitle(category.title || category.subcatigoryTitle);
      setDescription(category.description || category.subcatigoryDescription);
      setTagValue(category.keywords || category.subcatigoryKeywords);
      setIsActive(category.isActive || category.subcatigoryIsActive);
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
  }, [category, catigoryImage]);

  useEffect(() => {
    dispatch(categoryDetails(categoryId));
  }, [categoryId, dispatch]);

  if (success) {
    toast.success("Category Updated", ToastObjects);
     history.push("/categorys")
  }
  const categoryCreateHandler = (e) => {
    e.preventDefault();
    dispatch(
      categoryUpdateAll(categoryId,{
        title,
        description,
        isActive,
        keywords: tagValue,
        catigoryImage: urlCloud,
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
                      <label className="form-label">Edite Keywords</label>
                      <div className="tags">
                        <ul id="ul">
                          {tagValue?.map((tag, i) => (
                            <li
                              key={i}
                              className="text-white bg-info"
                              style={{ gridColumnStart: "none" }}
                            >
                              <button
                                onClick={() => removeTags(i)}
                                style={{ float: "right", font: "initial" }}
                              >
                                +
                              </button>
                              <h6
                                className="d-flex"
                                style={{ marginTop: "10px", fontSize: "large" }}
                              >
                                {tag}
                              </h6>
                            </li>
                          ))}

                          <li className="input-tags">
                            <input
                              type="text"
                              size="4"
                              placeholder="Tags"
                              onKeyUp={addTags}
                              className="form-control"
                              ref={tagRef}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="">
                      <label className="form-label">Edite Image </label>
                      <input
                        className="form-control"
                        type="file"
                        onChange={(e) => seCatigoryImage(e.target.files[0])}
                      />
                    </div>
                    <div className="">
                      <label className="form-label">Edite Description </label>
                      <textarea
                        placeholder="Type here"
                        className="form-control"
                        rows="4"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
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
                        onClick={categoryCreateHandler}
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

export default EditeCategory;
