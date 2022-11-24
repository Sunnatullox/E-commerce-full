import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { categoryCreate } from "../../Redux/Action/CategoryAction";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = (props) => {
  const { getCategoryLoading, getCategoryError, categorys } = props;

  const [title, setTitle] = useState("");
  const [catigoryImage, seCatigoryImage] = useState(null);
  const [urlCloud, setUrlCloud] = useState(null);
  const [description, setDescription] = useState("");
  const [tagValue, setTagValue] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [subCategory, setSubCategory] = useState(null);
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

  const categoryCreates = useSelector((state) => state.categoryCreate);
  const { loading, error, success } = categoryCreates;

  useEffect(() => {
    if (success) {
      toast.success("Category Added", ToastObjects);
      setTitle("");
      seCatigoryImage(null);
      setUrlCloud(null);
      setDescription("");
      setTagValue([]);
      setIsActive(true);
      setSubCategory(null);
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
      categoryCreate({
        title,
        description,
        isActive,
        keywords: tagValue,
        catigoryImage: urlCloud,
        categoryId: subCategory,
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
                Name
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
              <label className="form-label">Keywords</label>
              <div className="tags">
                <ul id="ul">
                  {tagValue.map((tag, i) => (
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
            <div className="mb-4">
              <label className="form-label"> Image </label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => seCatigoryImage(e.target.files[0])}
              />
            </div>
            <div className="mb-4">
              <label className="form-label"> Description </label>
              <textarea
                placeholder="Type here"
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="form-label">Parent category</label>
              {getCategoryLoading ? (
                <Loading />
              ) : getCategoryError ? (
                <Message variant="alert-danger">{getCategoryError}</Message>
              ) : (
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  class="form-select"
                  aria-label="Default select example"
                >
                  <option value={null} selected>
                    ---
                  </option>
                  {categorys.map((category) => (
                    <option
                      key={category._id}
                      disabled={!category.isActive}
                      value={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              )}
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
                disabled={!urlCloud || !title || !subCategory}
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

export default CreateCategory;
