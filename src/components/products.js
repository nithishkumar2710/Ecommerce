import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { getProducts } from '../store/action/productsAction';
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = () => {
  const dispatch = useDispatch();
  const { data: products1 } = useSelector(state => state.products);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // const addToCart = (product) => {
  //   //dispatch the action
  //   dispatch(add(product))
  // }

  useEffect(() => {
    const uniqueCategories = [...new Set(products1.map(product => product.category))];
    setCategories(uniqueCategories);
  }, [products1]);

  const renderCard = (product) => (
    <div className="col-md-3 text-decoration-none" style={{ marginBottom: '10px' }} key={product.id}>
      <Link to={`/product/${product.id}`} className="no-text-decoration black "> 
      <Card className="h-100">
        {/* <Link to={`/product/${product.id}`} className="no-text-decoration black "> */}
          <div className="text-center">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ width: '100px', height: '130px' }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>INR. {product.price}</Card.Text>
          </Card.Body>
        
        <Card.Footer style={{ background: 'white' }}>
        <Button variant="primary" 
          
          >View more</Button>
        </Card.Footer>
        {/* </Link> */}
      </Card>
      </Link>
    </div>
  );

  return (
    <>
      <h1>Product Dashboard</h1>
      <div className="row">
        {products1.map(product => renderCard(product))}
      </div>
      {categories.map(category => (
        <div key={category}>
          <h2 className="text-2xl font-bold mt-6 mb-4 flex justify-center p-2">{category}</h2>
          <div className="row">
            {products1.filter(product => product.category === category)
              .map(filteredProduct => renderCard(filteredProduct))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Products;
