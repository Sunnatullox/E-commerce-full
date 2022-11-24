import React  from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productDelete, productIsActive } from "../../Redux/Action/ProductActions";

const Product = (props) => {
  const { products } = props;
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(productDelete(id));
    }
  };

  const handleClick = (e) => {
    if (e.isActive === true) {
      dispatch(productIsActive(e._id,false))
    }else if (e.isActive === false) {
      dispatch(productIsActive(e._id,true))
    }
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Delete</th>
              <th scope="col">State</th>
              <th scope="col" className="text-end">
                edits
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product._id}>
                <td>
                  <img style={{ "maxWidth": "35px", "minWidth": "30px" }} src={product.image} alt="Product" />
                </td>
                <td>
                  <b>{product.name}</b>
                </td>
                <td>
                  <b>${product.price}</b>
                </td>
                <td>
                  <Link
                    to="#"
                    onClick={() => deleteHandler(product._id)}
                    className="btn btn-sm btn-outline-danger pb-3" style={{ maxWidth: "30px", maxHeight: "30px" }}
                  >
                    <i className="fas fa-trash-alt fa-xs" style={{ fontSize: "0.9rem", display: "contents" }}></i>
                  </Link>
                </td>
                <td>
                  <b className="form-check form-switch">
                    <input class="form-check-input"
                      type="checkbox"
                      style={{"cursor": "pointer"}}
                      id="flexSwitchCheckChecked"
                      onClick={() => handleClick(product)}
                      checked={product.isActive} />
                  </b>
                </td>
                <td className="d-flex justify-content-end align-item-center">
                  <Link to={`/product/${product._id}/edit`} className="text-success">
                    <i className="fas fa-pen"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Product;
