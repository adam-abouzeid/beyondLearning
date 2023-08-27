import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    isLoading,
    refetch,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order Delivered");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    <p>{error?.data?.message || error.error}</p>
  ) : (
    <>
      {" "}
      <h1>Order {order._id}</h1>
      <div className="details">
        <strong>Name: </strong> {order.user.name}
        {order.isDelivered ? <h4>Delivered</h4> : <h4>Not Delivered</h4>}
      </div>
      <div className="order-items">
        {order.orderItems.map((item, index) => {
          <div key={index} className="order-item">
            <img src={item.image} alt={item.name} />
            <Link to={`/products/${item.item}`}>{item.name}</Link>
          </div>;
        })}
      </div>
      {loadingDeliver && <Loader />}
      {userInfo && userInfo.isAdmin && !order.isDelivered && (
        <button onClick={deliverOrderHandler}>Mark As Delivered</button>
      )}
    </>
  );
};

export default OrderScreen;
