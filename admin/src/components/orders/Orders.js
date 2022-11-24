import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Orders = ({ order }) => {

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Total</th>
          <th scope="col">Paid</th>
          <th scope="col">Date</th>
          <th>Status</th>
          <th scope="col" className="text-end">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {order.map((item) => (
          <tr key={item._id}>
            <td>
              <b>{item.user.name}</b>
            </td>
            <td>{item.user.email}</td>
            <td>${item.totalPrice}</td>
            <td>
              {item.isPaid ? (
                <span className="badge rounded-pill alert-success">
                  Paid At {moment(order.paidAt).format("MMM DD YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Not Paid
                </span>
              )}
            </td>
            <td>{moment(order.createAt).format("MMM DD YY")}</td>
            <td>
              {item.isDelivered ? (
                <span className="badge btn-success">Delivered</span>
              ) : (
                <span className="badge btn-dark">Not delivered</span>
              )}
            </td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/order/${item._id}`} className="text-success">
              <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Orders;
