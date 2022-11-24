import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { getCategorysList } from "../../Redux/Action/CategoryAction";


const MainCategories = () => {
  const categorysList = useSelector((state) => state.categorysList);
  const {
    loading: getCategoryLoading,
    error: getCategoryError,
    categorys,
  } = categorysList;

  const getCategoryIsActive = useSelector((state) => state.categoryIsActive);
  const { error, success } = getCategoryIsActive;
  
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { success:deletedSuccess } = categoryDelete;

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { success:createCategorySuccess } = categoryCreate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategorysList());
  }, [dispatch, success, deletedSuccess, createCategorySuccess]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory
              getCategoryLoading={getCategoryLoading}
              getCategoryError={getCategoryError}
              categorys={categorys}
            />

            {/* Categories table */}
            <CategoriesTable
              getCategoryError={getCategoryError}
              categorys={categorys}
              error={error}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
