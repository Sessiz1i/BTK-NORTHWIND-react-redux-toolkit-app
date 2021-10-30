import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Cart from "../Cart/Cart";
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to={'/'}>NorthWind</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/user/cart-detail'}>Cart Detail</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto se">
                        <Cart/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default NavBar;