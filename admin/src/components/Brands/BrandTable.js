import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { brandDeleteOne, brandIsActive } from "../../Redux/Action/BrandAction";
import Message from "../LoadingError/Error";

function BrandTable(props) {
  const { getBrandError, brands, error } =
    props;
  const dispatch = useDispatch();

  const handleClick = (e) => {
    if (e.isActive === true || e.subcatigoryIsActive === true) {
      dispatch(brandIsActive(e._id, false));
    } else if (e.isActive === false || e.subcatigoryIsActive === false) {
      dispatch(brandIsActive(e._id, true));
    }
  };

  const handleDelete = (e) => {
    dispatch(brandDeleteOne(e));
  };

  return (
    <div className="col-md-12 col-lg-8">
      { getBrandError || error ? (
        <Message variant="alert-danger">{getBrandError || error}</Message>
      ) : (
        <table className="table">
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
              <th>Image</th>
              <th>Name</th>
              <th>Active</th>
              <th className="text-end">Action</th>
            </tr>
          </thead>
          {/* Table Data */}
          <tbody>
            {brands.map((brand, i) => (
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
                    <img src={brand.brandImage} style={{maxWidth:"50px", minWidth:"50px"}} alt={brand.title} />
                  </td>
                  <td>
                    <b>{brand.title}</b>
                  </td>
                  <td>
                    <b className="form-check form-switch">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        style={{ cursor: "pointer" }}
                        id="flexSwitchCheckChecked"
                        onClick={() => handleClick(brand)}
                        checked={brand.isActive}
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
                          to={`/brand/${brand._id}/edit`}
                        >
                          Edit info
                        </Link>
                        <Link
                          className="dropdown-item text-danger"
                          to="#"
                          onClick={() => handleDelete(brand._id)}
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BrandTable;

/* padding: 10px 0; */
// border: 1px solid;
// margin: 0;
// border-collapse: inherit;
