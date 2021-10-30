import React from 'react';
import {Badge, NavDropdown, Nav} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "./cartSlice";
import alertify from "alertifyjs";
import jBox from "jbox";
import {Link} from "react-router-dom";

const Cart = () => {
    const dispatch=useDispatch()
    const data = useSelector(state => state?.cart)
    const onDelete=(cartItem)=>{
        dispatch(removeFromCart(cartItem))
        alertify.error(`${cartItem.product.productName} <br> Removed from cart!`)
        new jBox('Notice', {preloadAudio: true, content: cartItem.product.productName+' Removed from cart!,', color: 'red'});

    }
    const emptyCart = () => (<Nav.Link as={"span"}>Empty Cart</Nav.Link>)
    const cart = () => {

        return (
            <NavDropdown title={`Your Cart ${data.length}`} id="basic-nav-dropdown">
                {data.length > 0 && data.map((item,index) => (
                    <NavDropdown.Item key={index} className={"d-flex justify-content-between px-1"}>
                        <span id='myModal' className="me-4">{item.product?.productName.slice(0, 20)}</span>
                        <div className="d-flex align-items-center">
                            <Badge className="bg-info me-1" pill>{item.quantity}</Badge>
                            <Badge className="bg-danger" pill
                                   onClick={()=>onDelete(item)}>X</Badge>
                        </div>
                    </NavDropdown.Item>
                ))}
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to={'/user/cart-detail'}>Cart Detail</NavDropdown.Item>
            </NavDropdown>
        )
    }
    return (
        data.length > 0 ? cart() : emptyCart()
    )
}
export default Cart;
