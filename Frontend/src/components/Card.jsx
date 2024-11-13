import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = ({id, name, img, options }) => {
  const priceRef = useRef();
  let data = useCart();
  let dispatch = useDispatchCart();
  let size = Object.keys(options);
  const [qty,setQty] = useState(1);
  const [siz,setSiz] = useState("");

  const handleAddToCart = async()=>{
    let food = data.find(item => item.id === id && item.size === siz);

    if(food){
      await dispatch({type:'UPDATE', id:id, price:finalPrice, qty:qty, size:siz})
    } else{
      await dispatch({type:"ADD", id:id, name:name, price:finalPrice, qty:qty, size:siz})
    }
  }

  let finalPrice = qty * parseInt(options[siz]);

  useEffect(()=>{
    setSiz(priceRef.current.value);
  },[])

  return (
    <div>
      <div className="w-48 overflow-hidden rounded-md border-2 border-gray-100 hover:scale-105">
        <img src={img} alt="Error" className="h-32 w-full object-cover" />

        <div className="p-2">
          <h3 className="font-bold text-sm">{name}</h3>

          <div className="flex mt-1 mb-1">
            <select className="bg-green-600 text-white mr-1 rounded-sm text-sm" onChange={(e)=>setQty(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <select className="bg-green-600 text-white mr-1 rounded-sm text-sm" ref={priceRef} onChange={(e)=>setSiz(e.target.value)}>
              {size.map((option, index) => {
                return (
                  <option key={index} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>

            <p className="text-sm">₹ {finalPrice}/-</p>
          </div>
          <hr className="mb-1"/>
          <button className="bg-green-600 text-white p-1 rounded-sm text-sm active:scale-105" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
