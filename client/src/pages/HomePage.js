import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
// import { Type } from '../components/Type';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
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
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-list/${page}`
      );
      setLoading(false)
      setProducts(data.products);
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  //getTotal count
  const getTotal = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:8080/api/v1/product/product-count"
      );
      setTotal(data?.total);
    }catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
   if(page === 1) return;
     loadMore();
  }, [page]);
  //load more
  const loadMore = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    if (value) {
      setChecked([...checked, id]);
    } else {
      setChecked(checked.filter((c) => c !== id));
    }
  };

  useEffect(() => {
    if (!checked.length || !radio) getAllProducts();
  }, [checked.length, radio]);

  useEffect(() => {
    if (checked.length || radio) filterProduct();
  }, [checked, radio]);

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/product/product-filters', {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={'Herhobs'}>
      {/* banner image */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      {/* banner image */}
      <div className='container-fluid row m-3'>
        <div className='col-md-2'>
          {/* Bears filter */}
          <h4>BEARS</h4>
          <div className='d-flex flex-column'>
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>
        <div className='col-md-9'>
          <h1 className='text-center'>All Carebears</h1>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div key={p._id} className='card m-3' style={{ width: '18rem' }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>{p.description.substring(0,30)}...</p>
                  <button class="btn ms-1" 
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button> 
                  {/* <button class="btn btn-secondary ms-1">BEARS</button> */}
                </div>
              </div>
            ))}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button 
                className='btn'
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? 'Loading ...' : 'Loadmore'}
              </button>
            )}
          </div> 
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;

