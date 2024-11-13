import React, { useEffect, useState } from 'react';

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);

  const fetchMyOrder = async () => {
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/myOrderData`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: localStorage.getItem("userEmail") })
    }).then(async (res) => {
      let response = await res.json();
      setOrderData(response.orderData.order_data);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div className="p-6">
  {orderData && orderData.length > 0 ? (
    [...orderData].reverse().map((order, index) => (
      <div key={index} className="mb-8 border-b pb-4">
        <h2 className="text-xl font-semibold text-center sm:text-left">Order Date: {order.date}</h2>
        <table className="min-w-full bg-white border-separate border-spacing-2 sm:border-spacing-0">
          <thead>
            <tr className="text-sm text-gray-600 bg-gray-100">
              <th className="py-2 px-4 text-left">Item</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Size</th>
              <th className="py-2 px-4 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {order.data.map((item) => (
              <tr key={item.id} className="text-sm">
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.qty}</td>
                <td className="py-2 px-4 border-b">{item.size}</td>
                <td className="py-2 px-4 border-b">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-500">No orders found.</p>
  )}
</div>
);
};

export default MyOrder;
