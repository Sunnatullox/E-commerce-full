import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBrand from "./CreateBrand";
import BrandTable from "./BrandTable";
import { getbrandsList } from "../../Redux/Action/BrandAction";

const MainBrands = () => {
  const brandsList = useSelector((state) => state.brandsList);
  const { error: getBradsError, brands } = brandsList;

  const brandIsActive = useSelector((state) => state.brandIsActive);
  const { error, success } = brandIsActive;

  const brandDelete = useSelector((state) => state.brandDelete);
  const { success: deleteBrand } = brandDelete;

  const brandCreate = useSelector((state) => state.brandCreate);
  const { success: crateBradSuccess } = brandCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getbrandsList());
  }, [dispatch, success, deleteBrand, crateBradSuccess]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create brands */}
            <CreateBrand />

            {/* brand table */}
            <BrandTable
              getBrandError={getBradsError}
              brands={brands}
              error={error}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBrands;
