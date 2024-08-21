import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, ListGroup, Image, Button, ButtonGroup, Card } from 'react-bootstrap';
import { incrementQuantity, decrementQuantity, removeItem } from '../store/slice/addtocartSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { FaArrowRight } from 'react-icons/fa'; 


const Cart = () => {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();  

  const handleIncrement = (productId) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrement = (productId) => {
    dispatch(decrementQuantity(productId));
  };

  const handleRemove = (productId) => {
    dispatch(removeItem(productId));
  };

  // To calculate subtotal
  const subtotal = cart.reduce((total, item) => total + (item.price * item.count), 0);
  const discount = 20; 
  const deliveryFee = 50; 
  const total = subtotal - discount + deliveryFee;

  return (
    <Container>
      <h1 className="my-4">Cart</h1>
      <Row>
        <Col md={7}>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ListGroup>
              {cart.map((item, index) => (
                <ListGroup.Item key={index} className="d-flex align-items-center">
                  <Row className="w-100">
                    <Col md={3}>
                      <Image src={item.image} alt={item.title} fluid />
                    </Col>
                    <Col md={5}>
                    <h5>{item.title}</h5>
<p>Price: INR {item.price.toFixed(2)}</p>
<p>Total Cost: INR {(item.price * item.count).toFixed(2)}</p>
                    </Col>
                    <Col md={4} className="d-flex flex-column justify-content-around align-items-end">
                    <Button variant="danger" onClick={() => handleRemove(item.id)}>
  <i className="bi bi-trash"></i>
</Button>
                      <ButtonGroup className="mt-4">
                        <Button style={{ backgroundColor: 'rgba(240, 240, 240, 1)', borderColor: 'rgba(240, 240, 240, 1)', color: '#000' }} onClick={() => handleDecrement(item.id)}>-</Button>
                        <Button style={{ backgroundColor: 'rgba(240, 240, 240, 1)', borderColor: 'rgba(240, 240, 240, 1)', color: '#000' }} disabled>{item.count}</Button>
                        <Button style={{ backgroundColor: 'rgba(240, 240, 240, 1)', borderColor: 'rgba(240, 240, 240, 1)', color: '#000' }} onClick={() => handleIncrement(item.id)}>+</Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        {cart.length > 0 && (
          <Col md={4}>
            <Card className="mt-0">
              <Card.Header className='fw-bold text-start' style={{
      backgroundColor: '#ffffff', // White background
      borderBottom: 'none'        // Remove horizontal line
    }}>Order Summary</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Row>
                    <Col className='text-start'>Subtotal:</Col>
                    <Col className="text-end">INR {subtotal.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col className='text-start'>Discount:</Col>
                    <Col className="text-end">- INR {discount.toFixed(2)}</Col>
                  </Row>
                  <Row>
                    <Col className='text-start'>Delivery Fee:</Col>
                    <Col className="text-end">INR {deliveryFee.toFixed(2)}</Col>
                  </Row>
                  <Row className="mt-3">
                    <Col className='text-start'><strong>Total:</strong></Col>
                    <Col className="text-end"><strong>INR {total.toFixed(2)}</strong></Col>
                  </Row>
                  <Row className="mt-3">
              <Col>
                <Button
                  variant="primary"
                  className="w-100 d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: '#000000', borderColor: '#000000' }}
                >
                 <p className='mb-0 mr-1'>Go to Checkout</p>  <FaArrowRight />
                </Button>
              </Col>
            </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Cart;
