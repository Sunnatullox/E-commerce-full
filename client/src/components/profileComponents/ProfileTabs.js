import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Redux/Action/userActions";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";

const ProfileTabs = () => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let toastId = useRef(null);

  const ToastObject = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: updateLoading,
    error: updateError,
    userInfo,
  } = userUpdateProfile;

  useEffect(() => {
    if (updateError) {
      setNewName("");
      setNewEmail("");
    }
    if (user || userInfo) {
      setNewName(userInfo ? userInfo.name : user.name);
      setNewEmail(userInfo ? userInfo.email : user.email);
    }
    if (userInfo) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.success("Profile updated successfully");
      }
    }
  }, [updateError, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    // password match
    if (newPassword !== confirmPassword) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.error("Password does not match", ToastObject);
      }
    } else {
      // Update Profie
      dispatch(
        updateUserProfile({
          id: user._id,
          name: newName,
          email: newEmail,
          password: newPassword,
        })
      );
    }
  };

  return (
    <>
      <Toast />
      {error && <Message variant="alert-danger">{error}</Message>}
      {updateError && <Message variant="alert-danger">{updateError}</Message>}
      {loading || updateLoading ? (
        <div style={{ height: "60vh" }} className="d-grid align-items-center">
          <Loading />
        </div>
      ) : (
        <form className="row  form-container" onSubmit={submitHandler}>
          <div className="col-md-6">
            <div className="form">
              <label htmlFor="account-fn">UserName</label>
              <input
                id="account-fn"
                className="form-control"
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form">
              <label htmlFor="account-email">E-mail Address</label>
              <input
                id="account-email"
                className="form-control"
                type="email"
                required
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form">
              <label htmlFor="account-pass">New Password</label>
              <input
                id="account-pass"
                className="form-control"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form">
              <label htmlFor="account-confirm-pass">Confirm Password</label>
              <input
                id="account-confirm-pass"
                className="form-control"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      )}
    </>
  );
};

export default ProfileTabs;
