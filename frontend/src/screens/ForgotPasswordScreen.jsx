import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useForgotPasswordMutation } from "../slices/usersApiSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPasswordScreen = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await forgotPassword({ email }).unwrap();
      setEmail("");
      navigate(`/login?redirect=${redirect}`);
      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.message || "Something went wrong, Please try again");
    }
  };

  return (
    <Container>
      <Row className="d-flex align-items-center justify-content-center mt-5">
        <Col md={5}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="text-center">
              <Form.Label>Fortgot Password</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-2"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: "100%" }}>
              Send Password Reset Email
            </Button>
            {isLoading && <Loader />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordScreen;
