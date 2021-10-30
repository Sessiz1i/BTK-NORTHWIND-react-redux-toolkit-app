import React from 'react';
import {Button, Table} from "react-bootstrap";
import {useGetProductsQuery, useGetSelectedCategoryProductsQuery,} from "./productSlice";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../Cart/cartSlice";
import alertify from "alertifyjs";
import Swal from 'sweetalert2'
import {toast} from 'material-react-toastify';


const ProductList = () => {
    const dispatch = useDispatch()
    const currentCategory = useSelector((state) => state?.currentCategory)
    const selectedCategoryProducts = useGetSelectedCategoryProductsQuery(currentCategory?.id)
    const products = useGetProductsQuery()
    const {data, error, isError, isSuccess, isLoading} = currentCategory ? selectedCategoryProducts : products
    const onSave = (product) => {
        dispatch(addToCart(product))
        alertify.success(`${product?.productName} <br> Added to cart!`)
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: `${product?.productName} Added to cart!`,
            showConfirmButton: false,
            timer: 1500,
            padding: 8,
            timerProgressBar: true
        })
        toast.success(`🦄 ${product?.productName} Added to cart!`, {position: 'top-left', className: "text-primary"});
    }
    return (
        <div className={"mt-sm-5"}>
            <h3>Products{` `}
                <span className="text-info">
                    {isError && error.error}
                    {isLoading && 'Loading...'}
                    {isSuccess && currentCategory?.name}
                </span>
            </h3>
            <div className="card card-body px-5 pt-5">
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Units In Stock</th>
                        <th>Unit Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{product.id}</th>
                                <td>{product.productName}</td>
                                <td>{product.unitsInStock}</td>
                                <td>{product.unitPrice}</td>
                                <td><Button onClick={() => onSave(product)} className="text-sm btn-sm" color="primary">+ Card</Button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
export default ProductList;