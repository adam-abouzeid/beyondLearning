import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Loader/Loader";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../../slices/productsApiSlice";
import { toast } from "react-toastify";
import Paginate from "../../../components/Paginate";
const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, refetch, error } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted Successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const createProductHandler = async () => {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(err?.data?.message || error.error);
      }
    }
  };
  return (
    <div>
      <h1>PRODUCTS</h1>
      <button onClick={createProductHandler}>Create Product</button>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <h3>{error.data.message}</h3>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>COUNT</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>Edit</Link>
                  </td>
                  <td>
                    <button onClick={() => deleteHandler(product._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
      )}
    </div>
  );
};

export default ProductListScreen;
