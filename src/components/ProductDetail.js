import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productadd } from '../store/slice/addtocartSlice';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from './StarRating';

const ProductDetail = () => {
  const [count, setCount] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const product = useSelector(state => 
    state.products.data.find(product => product.id === parseInt(id))
  );

  const handleAddtocart = () => {
    dispatch(productadd({ product, count }));
    setCount(1);
    toast.success('Product added to cart successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
    // Delay navigation by 500ms to allow the toast to appear
    setTimeout(() => {
      navigate('/cart');
    }, 1500);
  };
  

  if (!product) return <div>Product not found</div>;

  return (
    <Container className="my-4">
      <Row>
        <Col md={4} className="d-flex justify-content-center">
          <Image src={product.image} alt={product.title} fluid rounded />
        </Col>
        <Col md={8}>
          <Card className="p-3">
            <Card.Body>
              <Card.Title className='fw-bold' style={{ fontWeight: 700, fontSize: '32px' }}>{product.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Price: INR {product.price}</Card.Subtitle>
              <div className='d-flex justify-content-center align-items-center'><StarRating rating={product.rating.rate} /><p className='mb-0'>{product.rating.rate}</p></div>
              <Card.Text>{product.description}</Card.Text>
              <div className='d-flex justify-content-between mt-4'>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Button variant="secondary" onClick={() => setCount(count > 1 ? count - 1 : 1)}>-</Button>
                </Col>
                <Col xs="auto">
                  <h4 className="m-0">{count}</h4>
                </Col>
                <Col xs="auto">
                  <Button variant="secondary" onClick={() => setCount(count + 1)}>+</Button>
                </Col>
              </Row>
              <div className="mt-0">
                <Button style={{background:"#000"}} onClick={handleAddtocart}>Add to cart</Button>
              </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ProductDetail;
