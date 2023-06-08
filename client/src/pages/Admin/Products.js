// import React, { useState, useEffect } from 'react';
// import AdminMenu from '../../components/Layout/AdminMenu';
// import Layout from '../../components/Layout/Layout';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   //get all products
//   const getAllProducts = async () => {
//     try {
//       const { data } = await axios.get(
//         'http://localhost:8080/api/v1/product/get-product'
//       );
//       setProducts(data.products);
//     } catch (error) {
//       console.log(error);
//       toast.error('Something went wrong');
//     }
//   };

//   //lifecycle method
//   useEffect(() => {
//     getAllProducts();
//   }, []);

//   return (
//     <Layout>
//       <div className='row'>
//         <div className='col-md-3'>
//           <AdminMenu />
//         </div>
//         <div className='col-md-9 '>
//           <h1 className='text-center'>All Products List</h1>
//           <div className='row'>
//             {products?.map((p) => (
//               <div key={p._id} className='col-md-3'>
//                 <Link
//                   to={`/dashboard/admin/products/${p.slug}`}
//                   className='product-link'
//                 >
//                   <div className='card m-3' style={{ width: '18rem' }}>
//                     <img
//                       src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
//                       className='card-img-top'
//                       alt={p.name}
//                     />
//                     <div className='card-body'>
//                       <h5 className='card-title'>{p.name}</h5>
//                       <p className='card-text'>{p.description}</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Products;

import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const productsPerPage = 4; // Number of products to display per page

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:8080/api/v1/product/get-product'
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // Load more products
  const loadMoreProducts = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = products.slice(currentLength, currentLength + productsPerPage);
    setDisplayedProducts([...displayedProducts, ...nextProducts]);

    // Check if there are more products to load
    if (currentLength + productsPerPage >= products.length) {
      setLoadMore(false);
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  // Initial loading of products
  useEffect(() => {
    setDisplayedProducts(products.slice(0, productsPerPage));
    setLoadMore(products.length > productsPerPage);
  }, [products]);

  return (
    <Layout>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu />
        </div>
        <div className='col-md-9'>
          <h1 className='text-center mt-4'>All Products List</h1>
          <div className='row'>
            {displayedProducts.map((p) => (
              <div key={p._id} className='col-md-3'>
                <Link to={`/dashboard/admin/products/${p.slug}`} className='product-link'>
                  <div className='card m-3' style={{ width: '18rem' }}>
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                      className='card-img-top'
                      alt={p.name}
                    />
                    <div className='card-body'>
                      <h5 className='card-title'>{p.name}</h5>
                      <p className='card-text'>{p.description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {loadMore && (
            <div>
              <button className='btn' onClick={loadMoreProducts}>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
