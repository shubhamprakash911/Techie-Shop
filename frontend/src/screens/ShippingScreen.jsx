import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [pincode, setPincode] = useState(shippingAddress?.pincode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, pincode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="pincode">
          <Form.Label>Pincode(PostalCode)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={pincode}
            required
            onChange={(e) => setPincode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
