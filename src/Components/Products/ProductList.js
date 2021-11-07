import React from 'react';
import {Table} from "react-bootstrap";
import {useGetCategoryProductsQuery, useGetProductsQuery, useRemoveProductMutation} from "./productSlice";
import {useDispatch, useSelector} from "react-redux";
import {addToCart} from "../Cart/cartSlice";
import alertify from "alertifyjs";
import Swal from 'sweetalert2'
import {toast} from 'material-react-toastify';
import {Link} from "react-router-dom";


const ProductList = () => {
    const[removeProduct] =useRemoveProductMutation()
    const dispatch = useDispatch()
    const {currentCategory} = useSelector((state) => state?.categories)
    const {data: products, isError, isLoading, isSuccess} = currentCategory
        // eslint-disable-next-line react-hooks/rules-of-hooks
        ? useGetCategoryProductsQuery(currentCategory.id)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        : useGetProductsQuery()
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
                    {isError && 'Error fetching...'}
                    {isLoading && 'Loading...'}
                    {isSuccess && currentCategory?.name}
                </span>
            </h3>
            <div className="card card-body px-5 pt-5">
                <Table className={"align-middle"} responsive>
                    <thead>
                    <tr className={"text-center"}>
                        <th>#</th>
                        <th>Name</th>
                        <th>Units In Stock</th>
                        <th>Unit Price</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        products && products.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{product.id}</th>
                                <td>{product.productName}</td>
                                <td>{product.unitsInStock}</td>
                                <td>{product.unitPrice}</td>
                                <td className={"text-center"}>
                                    <i role={"button"} onClick={() => onSave(product)} className="text-success bi bi-cart-plus fs-4 me-2"/>
                                    <Link to={'/edit-product/' + product.id}  className="text-primary bi bi-pencil-square fs-4 me-2" />
                                    <i role={"button"} onClick={()=>removeProduct(product.id)} className="text-danger bi bi-trash fs-4 me-2" />
                                </td>
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