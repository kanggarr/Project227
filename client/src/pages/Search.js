import React from 'react'
import Layout from '../components/Layout/Layout';
import { useSearch } from '../context/search';

const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={"Search results"}>
            <div className="search">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>
                    {values?.results.length < 1
                        ? 'No Products Found'
                        : `Found ${values?.results.length}`}
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map((p) => (
                            <div key={p._id} className="card m-3" style={{ width: '18rem' }}>
                            <img
                                src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description}</p>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Search;
