import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id,setId] = useState("")
  
    const navigate = useNavigate()
    const params = useParams()
  
    // get single product 
    const getSingleProduct = async() =>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            setName(data.product.name)
            setId(data.product._id)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setCategory(data.product.category._id)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getSingleProduct()
        // eslint-disable-nextline
    },[])

    // get all categories
    const getAllCategory = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API}/api/v1/category/categories`
        );
        if (data?.success) {
          setCategories(data?.category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting category");
      }
    };
  
    useEffect(() => {
      getAllCategory();
    }, []);
  
    // update product
    const handleUpdate = async(e) =>{
      e.preventDefault()
      try {
        const productData = new FormData()
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        photo && productData.append("photo", photo)
        productData.append("category", category)
        const {data} = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
        if(data?.success){
          toast.success("Product updated Successfully")
          navigate('/dashboard/admin/products')
        }else{
          toast.error(data?.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }

    // delete product
    const handleDelete =async ()=>{
      try {
        let answer = window.prompt("Are you sure want to delete this product ?")
        if(!answer) return
        const {data} = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/delete-product/${id}`)
        toast.success("Product deleted successfully")
        navigate("/dashboard/admin/products")
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
      }
    }
  return (
    <Layout title={"Update Product -  Ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                      src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${id}`}
                      alt="product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div> 
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write the product name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Write the price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Write the quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>Update Product</button>
              </div>
              <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct