import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [ products, setProducts] = useState([]);
    const [ category, setCategory] = useState([]);

    useEffect(() => {
        if(params?.slug) getProductsByCat()
    }, [params?.slug])
    const getProductsByCat = async () => {
        try {
            const {data} = await axios.get(
                `http://localhost:8080/api/v1/product/product/category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Layout>
      <div className='mt-3'>
        <h4 className='text-cecnter'>Category - {category?.name}</h4>
        <h6 className='text-cecnter'>{products?.length} result found</h6>
        <div className='row'>
        <div className='col-md-9 offset-1'>
          <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div 
                key={p._id} 
                className='card m-3' 
                style={{ width: '18rem' }}
              >
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className='card-img-top'
                  alt={p.name}
                />
                <div className='card-body'>
                  <h5 className='card-title'>{p.name}</h5>
                  <p className='card-text'>
                    {p.description.substring(0,30)}...
                  </p>
                  <button 
                    class="btn ms-1" 
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button> 
                </div>
              </div>
            ))}
          </div>
          {/* <div className='m-2 p-3'>
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
          </div>  */}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
