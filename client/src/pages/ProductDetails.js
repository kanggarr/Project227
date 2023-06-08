import axios from 'axios';
import Layout from '../components/Layout/Layout';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState(null); 
  const [relatedProducts, setRelatedProducts] = useState([])

  // Initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category_.id);
    } catch (error) {
      console.log(error);
    }
  };

  // Render loading state while product is being fetched
  if (product === null) {
    return <p>Loading...</p>;
  }

  //get similar product
  const getSimilarProduct = async (pid,cid) => {
    try {
        const {data} = await axios.get(
            `http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`
        );
        setRelatedProducts(data?.products);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className='card-img-top'
            alt={product.name}
            // height='300'
            // width={'350px'}
          />
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
          <h6>Name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Category: {product?.category?.name}</h6>
        </div>
      </div>
      {/* <div className='row'>
        <h1>Similar Products</h1>
        <div className='d-flex flex-wrap'>
            {relatedProducts?.map((p) => (
              <div key={p._id} className='card m-3' style={{ width: '18rem' }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>{p.description.substring(0,30)}...</p>
                </div>
              </div>
            ))}
          </div>
      </div> */}
    </Layout>
  );
};

export default ProductDetails;

