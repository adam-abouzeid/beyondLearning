import { FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../slices/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader/Loader";
import { useCreateOrderMutation } from "../../slices/ordersApiSlice";
import { clearCartItems } from "../../slices/cartSlice";

const BasketScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const [note, setNote] = useState("");
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };
  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };
  const checkoutHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
    // navigate("/login?redirect=/checkout");
  };
  return (
    <div>
      <h1>Basket</h1>
      {cartItems.length === 0 ? (
        <div>
          Your basket is empty <Link to="/">Go Back</Link>
        </div>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} style={{ display: "flex", height: 100 }}>
            <img src={item.image} alt={item.name} />
            <Link to={`/products/${item._id}`}>{item.name}</Link>
            <p>{item.qty}</p>
            <select
              name="quantity"
              id="quantity"
              value={item.qty}
              onChange={(e) => addToCartHandler(item, Number(e.target.value))}
            >
              {[...Array(item.countInStock).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </select>
            <button onClick={() => removeFromCartHandler(item._id)}>
              <FaTrash />
            </button>
          </div>
        ))
      )}
      <h2>Add A Special Note</h2>
      <input
        type="text"
        placeholder="Enter note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <h1>Total Items {cartItems.length}</h1>
      {error && <h1>{error}</h1>}
      <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
        Place Order
      </button>
      {isLoading && <Loader />}
    </div>
  );
};

export default BasketScreen;
