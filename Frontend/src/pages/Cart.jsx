import React from "react";
import { LiaTrashAltSolid } from "react-icons/lia";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="m-5 w-full text-center font-bold text-gray-600">Your Cart is Empty</div>
    );
  }

  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail")
    const response = await fetch("http://localhost:5000/api/orderData",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({order_data:data,email:userEmail,order_date: new Date().toDateString(),})
    });

    if(response.status === 200){
      dispatch({type:'DROP'});
    }


  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="text-left bg-gray-100 text-gray-700 uppercase text-sm">
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Option</th>
            <th className="p-2">Amount</th>
            <th className="p-2"></th>
          </tr>
        </thead>

        <tbody>
          {data.map((food, index) => (
            <tr className="text-sm border-b" key={index}>
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{food.name}</td>
              <td className="p-2 text-center">{food.qty}</td>
              <td className="p-2 text-center">{food.size}</td>
              <td className="p-2 text-right">{food.price} /-</td>
              <td className="p-2 text-center">
                <button
                  onClick={() => dispatch({ type: "REMOVE", index: index })}
                  className="text-red-500 hover:text-red-700"
                >
                  <LiaTrashAltSolid className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right">
        <h1 className="font-bold text-lg">Total Price: {totalPrice} /-</h1>
      </div>
      <div className="text-center mt-4">
        <button className="bg-green-500 p-2 rounded-md text-white font-semibold hover:bg-green-600 active:scale-95 transition" onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
