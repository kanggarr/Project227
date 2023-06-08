import React, { useState, useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from "react-hot-toast";
import axios from "axios";
import {Select} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const {Option} = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();    
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');

    //get single product
    const getSingleProduct = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:8080/api/v1/product/get-product/${params.slug}`
            );
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);
            setQuantity(data.product.quantity);
            setCategory(data.product.category._id);
        } catch(error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getSingleProduct();
        //eslin-disable-next-line
    }, []);


    //get all category
    const getAllCategory = async () => {
        try {
          const { data } = await axios.get(
            "http://localhost:8080/api/v1/category/get-category"
          );
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong in getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    //create product function
    const handleUpdate = async (e)  => {
        e.preventDefault()
        try{
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('quantity', quantity);
            photo && productData.append('photo', photo);
            productData.append('category', category);
            const {data} = axios.put(
                `http://localhost:8080/api/v1/product/update-product/${id}`, 
                productData 
            );
            if(data?.success){
                toast.error(data?.message);
            } else {
                toast.success('Product Updated Successfully');
                navigate('/dashboard/admin/products')
            }
        } catch(error) {
            console.log(error)
            toast.error('Something went wrong');
        }
    };
    
    //delete a product
    const handleDelete = async () => {
        try {
            confirmAlert({
                title: 'Confirm Deletion',
                message: 'Are you sure you want to delete this item?',
                buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                    try {
                        const { data } = await axios.delete(
                        `http://localhost:8080/api/v1/product/delete-product/${id}`
                        );
                        if (data?.success) {
                        toast.success('Product Deleted Successfully');
                        navigate('/dashboard/admin/products');
                        } else {
                        toast.error('Failed to delete product');
                        }
                    } catch (error) {
                        console.log(error);
                        toast.error('Something went wrong');
                    }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
                ]
            });
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };
    
  
    return (
        <Layout title={'Dashboard - Create Product'}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu/>
                    </div>
                    <div className='col-md-9'>
                        <h1>Update Product</h1>
                        <div className='m-1 w-75'>
                            <Select bordered={false} 
                                placeholder='Select a category' 
                                size='large' 
                                showSearch 
                                className='form-select mb-3' 
                                onChange={(value) => {
                                    setCategory(value);
                                }}
                                value={category}
                            >
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className='mb-3'>
                                <label className='btn btn-outline-secondary col-md-12'>
                                    {photo ? photo.name : 'Upload  Photo'}
                                    <input 
                                        type='file' 
                                        name='photo' 
                                        accept='image/*' 
                                        onChange={(e) => setPhoto(e.target.files[0])} 
                                        hidden
                                    />
                                </label>
                            </div>
                            <div className='mb-3'>
                                {photo ? (
                                    <div className='text-center'>
                                        <img 
                                            src={URL.createObjectURL(photo)}  
                                            alt='product-photo' 
                                            height={'200px'} 
                                            className='img img-responsive'
                                        />
                                    </div>
                                ) : (
                                    <div className='text-center'>
                                        <img 
                                            src={`http://localhost:8080/api/v1/product/product-photo/${id}`}  
                                            alt='product-photo' 
                                            height={'200px'} 
                                            className='img img-responsive'
                                        />
                                    </div>
                                )}
                            </div>
                            <div className='mb-3'>
                                <input 
                                    type='text' 
                                    value={name} 
                                    placeholder='Name' 
                                    className='form-control' 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    type="text"
                                    value={description}
                                    placeholder="Description"
                                    className="form-control"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="number"
                                    value={quantity}
                                    placeholder="Quantity"
                                    className="form-control"
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-primary' onClick={handleUpdate}>
                                    UPDATE
                                </button>
                            </div>
                            <div className='mb-3'>
                                <button className='btn btn-danger' onClick={handleDelete}>
                                    DELETE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateProduct;
