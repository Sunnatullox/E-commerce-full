import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  categoryDeleteOne,
  categoryIsActive,
} from "../../Redux/Action/CategoryAction";
import Message from "../LoadingError/Error";

function CategoriesTable(props) {
  const { getCategoryError, categorys, error } =
    props;
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.isActive === true || e.subcatigoryIsActive === true) {
      dispatch(categoryIsActive(e._id, false));
    } else if (e.isActive === false || e.subcatigoryIsActive === false) {
      dispatch(categoryIsActive(e._id, true));
    }
  };

  const handleDelete = (e) => {
    dispatch(categoryDeleteOne(e));
  };

  return (
    <div className="col-md-12 col-lg-8">
      { getCategoryError || error ? (
        <Message variant="alert-danger">{getCategoryError || error}</Message>
      ) : (
        <table className="table accordion">
          <thead>
            <tr>
              <th>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Active</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {categorys.map((category, i) => (
              <>
                <tr key={i}>
                  <td>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                      />
                    </div>
                  </td>
                  <td>{i + 1}</td>
                  <td>
                    <b>{category.title}</b>
                  </td>
                  <td>{category?.description.slice(0, 30)}...</td>
                  <td>
                    <b className="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        id="flexSwitchCheckChecked"
                        onClick={() => handleClick(category)}
                        checked={category.isActive}
                      />
                    </b>
                  </td>
                  <td className="text-end">
                    <div className="dropdown">
                      <Link
                        to="#"
                        data-bs-toggle="dropdown"
                        className="btn btn-light"
                      >
                        <i className="fas fa-ellipsis-h"></i>
                      </Link>
                      <div className="dropdown-menu">
                        <Link
                          className="dropdown-item"
                          to={`/category/${category._id}/edit`}
                        >
                          Edit info
                        </Link>
                        <span
                          className="dropdown-item text-info"
                          data-bs-toggle="collapse"
                          data-bs-target={"#r1" + i}
                        >
                          SubCategory
                        </span>
                        <Link
                          className="dropdown-item text-danger"
                          to="#"
                          onClick={() => handleDelete(category._id)}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr
                  class="collapse accordion-collapse"
                  id={"r1" + i}
                  data-bs-parent=".table"
                >
                  {category.subcatigory.map((subCategory, index) => (
                    <td key={index} colspan="12" className="p-0">
                      <div>
                        <table
                          class="table table-striped"
                          style={{
                            border: "1px solid",
                            borderCollapse: "initial",
                            margin: "0",
                          }}
                        >
                          <tbody>
                            <tr key={i} data-bs-target={"#r1" + i}>
                              <td>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value=""
                                  />
                                </div>
                              </td>
                              <td>{i + 1}</td>
                              <td>
                                <b>{subCategory.subcatigoryTitle}</b>
                              </td>
                              <td>
                                {subCategory?.subcatigoryDescription.slice(
                                  0,
                                  30
                                )}
                                ...
                              </td>
                              <td>
                                <b className="form-check form-switch">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    style={{ cursor: "pointer" }}
                                    id="flexSwitchCheckChecked"
                                    onClick={() => handleClick(subCategory)}
                                    checked={subCategory.subcatigoryIsActive}
                                  />
                                </b>
                              </td>
                              <td className="text-end">
                                <div className="dropdown">
                                  <Link
                                    to="#"
                                    data-bs-toggle="dropdown"
                                    className="btn btn-light"
                                  >
                                    <i className="fas fa-ellipsis-h"></i>
                                  </Link>
                                  <div className="dropdown-menu">
                                    <Link
                                      className="dropdown-item"
                                      to={`/category/${subCategory._id}/edit`}
                                    >
                                      Edit info
                                    </Link>
                                    <Link
                                      className="dropdown-item text-danger"
                                      to="#"
                                      onClick={() =>
                                        handleDelete(subCategory._id)
                                      }
                                    >
                                      Delete
                                    </Link>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  ))}
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CategoriesTable;

/* padding: 10px 0; */
// border: 1px solid;
// margin: 0;
// border-collapse: inherit;
