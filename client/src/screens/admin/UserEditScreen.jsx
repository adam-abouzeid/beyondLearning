import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/usersApiSlice";
const UserEditScreen = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    refetch,
    error,
  } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      refetch();
      toast.success("User updated successfully");
      navigate("/admin/userList");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div>
      <Link to="/admin/userList">Go Back</Link>
      <h1>Edit User</h1>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={submitHandler}>
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Is Admin</label>
          <input
            type="checkbox"
            placeholder="Is Admin?"
            value={isAdmin}
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
          />

          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default UserEditScreen;
