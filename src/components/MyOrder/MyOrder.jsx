import React from "react";
import "./MyOrder.css";
import Table from "../Common/Table";
import useData from "../../hooks/useData";

const MyOrder = () => {
  const { data: order, error } = useData("/order");

  const getProductString = (order) => {
    const productStringArr = order.products.map(
      (p) => `${p.product.title}(${p.quantity})`
    );

    return productStringArr.join(", ");
  };

  return (
    <section className="align_center myorder_page">
      <Table headings={["Orders", "Products", "Totals", "Status"]}>
        <tbody>
          {error && <em className="form_error">{error}</em>}
          {order.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{getProductString(order)}</td>
              <td>${order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  );
};

export default MyOrder;
