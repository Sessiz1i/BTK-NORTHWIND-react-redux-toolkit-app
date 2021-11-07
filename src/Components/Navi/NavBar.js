import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import Cart from "../Cart/Cart";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeCategory} from "../Categories/categorySlice";
const NavBar = () => {
    const dispatch = useDispatch()
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand onClick={() => dispatch(changeCategory(0))} as={Link} to={'/'}>NorthWind</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={'/user/cart-detail'}>Cart Detail</Nav.Link>
                        <Nav.Link as={Link} to={'/add-product'}>Add Category</Nav.Link>
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