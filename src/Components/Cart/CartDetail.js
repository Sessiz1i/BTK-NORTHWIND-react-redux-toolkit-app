import React from 'react';
import {Button, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {removeFromCart} from "./cartSlice";
import {toast} from "material-react-toastify";

const CartDetail = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state?.cart)
    const onDelete = (cartItem) => {
        dispatch(removeFromCart(cartItem))
        toast.error(`X ${cartItem?.product?.productName} Added to cart!`, {position: 'bottom-left'});

    }
    return (
        <div className="mt-5 col-sm-9 mx-sm-auto">
            <h3>Cart Detail</h3>
            <div className="card card-body px-5 pt-5">
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data?.map((item, index) =>
                            <tr key={index}>
                                <td>{item.product.id}</td>
                                <td>{item.product.productName}</td>
                                <td>{item.product.unitPrice}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button onClick={() => onDelete(item)}
                                            className="btn btn-sm btn-danger"

                                    >X Remove</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default CartDetail
