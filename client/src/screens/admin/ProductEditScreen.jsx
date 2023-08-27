import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";
const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();
  useEffect(() => {
    if (product) {
      setName(product.name);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      image,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product Updated Successfully");
      navigate("/admin/productList");
    }
  };
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div>
      <Link to="/admin/productList">Go Back</Link>
      <h1>Edit Product</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error.data.message}</p>
      ) : (
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Category</label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label>CountInStock</label>
          <input
            type="text"
            placeholder="Enter countInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />
          <label>Image</label>
          <input
            type="text"
            placeholder="enter Image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="file"
            label="Choose File"
            placeholder="UPLOAD IMAGE"
            onChange={uploadFileHandler}
          />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default ProductEditScreen;
