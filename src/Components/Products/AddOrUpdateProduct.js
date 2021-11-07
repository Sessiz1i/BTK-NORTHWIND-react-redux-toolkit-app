import React, {useEffect, useState} from 'react';
import {useGetCategoriesQuery} from "../Categories/categorySlice";
import {Button, Col, Form, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {useAddProductMutation, useGetProductQuery, useUpdateProductMutation} from "./productSlice";

const AddOrUpdateProduct = ({history}) => {
    const [addProduct] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()
    const {productId} = useParams()
    const [errors, setErrors] = useState(0)
    const [product, setProduct] = useState(0)
    const {data: categories} = useGetCategoriesQuery()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const editProduct = productId ? useGetProductQuery(productId).data : 0


    const handleChange = async (event) => {
        const inputs = [event.target]
        if (inputs) await validator(inputs)
    }
    const validator = async (inputs) => {
        let result = {};
        for (const input of inputs) {
            let {name, value, min, max} = input
            if (name) {
                if (value.length < 1) {
                    Object.assign(result, {[name]: "Bu alan gereklidir."})
                } else if (min && value.length < min) {
                    Object.assign(result, {[name]: `En az ${min} karakter olmalıdır.`})
                } else if (max && value.length > max) {
                    Object.assign(result, {[name]: `En fazla ${max} karakter olmalıdır.`})
                } else {
                    delete errors[name]
                    setErrors({...errors})
                    setProduct(prevState => ({...prevState, [name]: value}))
                }
            }
        }
        setErrors(prevState => ({...prevState, ...result}))
        if (Object.keys(result).length > 0) return result
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        const {target: inputs} = event
        if (inputs) validator(inputs).then(result => {
            if (!result) {
                if (product && product.id) return updateProduct(product)
                else if (product && !product.id) return addProduct(product)
            }
        }).then(result => {
            if (result) history.push("/")
        }).catch(err => console.error(err))
    }
    useEffect(() => {
        if (productId && !product) {
            setProduct(editProduct)
        }
    }, [productId, editProduct, product])
    console.log("Errors", errors)
    return (
        <div className={"col-md-8 mx-auto mt-5"}>
            <h3>{productId ? 'Edit Product' : 'Create Product'}</h3>
            <div className={"card pt-3 px-3 shadow"}>
                <div className={"card-body"}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Form.Group as={Col} className={"mb-2"} controlId="productName">
                                <Form.Label className={"mb-1"}>Product Name</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="text"
                                    name="productName"
                                    min={3} max={50}
                                    className={errors?.productName ? "is-invalid" : ''}
                                    defaultValue={product?.productName && product?.productName}
                                    placeholder="Enter product name..."/>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={"text-capitalize"}>
                                    {errors?.productName}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className={"mb-2"} xs={12} md={6}>
                                <Form.Label className={"mb-1"}>Category</Form.Label>
                                <Form.Select
                                    onChange={handleChange}
                                    name={"categoryId"}
                                    className={errors?.categoryId ? "is-invalid" : ''}>
                                    <option key={categories} value={''}>Bir seçim yapınız</option>
                                    {categories && categories.map((category, key) => (
                                        category?.id === product?.categoryId
                                            ? <option key={key} value={category.id} selected>{category.name}</option>
                                            : <option key={key} value={category.id}>{category.name}</option>))}
                                </Form.Select>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={"text-capitalize"}>
                                    {errors?.categoryId}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="unitsInStock">
                                <Form.Label className={"mb-1"}>Units In Stock</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="text"
                                    name="unitsInStock"
                                    max={20}
                                    className={errors?.unitsInStock ? "is-invalid" : ''}
                                    defaultValue={product?.unitsInStock && product?.unitsInStock}
                                    placeholder="Please enter..."/>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={"text-capitalize"}>
                                    {errors?.unitsInStock}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="quantityPerUnit">
                                <Form.Label className={"mb-1"}>Quantity Per Unit</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="text"
                                    name="quantityPerUnit"
                                    max={20}
                                    className={errors?.quantityPerUnit ? "is-invalid" : ''}
                                    defaultValue={product?.quantityPerUnit && product?.quantityPerUnit}
                                    placeholder="Please enter..."/>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={"text-capitalize"}>
                                    {errors?.quantityPerUnit}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="productName">
                                <Form.Label className={"mb-1"}>Unit Price</Form.Label>
                                <Form.Control
                                    onChange={handleChange}
                                    type="text"
                                    name="unitPrice"
                                    max={20}
                                    className={errors?.unitPrice ? "is-invalid" : ''}
                                    defaultValue={product?.unitPrice && product?.unitPrice}
                                    placeholder="Please enter..."/>
                                <Form.Control.Feedback
                                    type="invalid"
                                    className={"text-capitalize"}>
                                    {errors?.unitPrice}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Form.Group className="pt-1 float-end">
                            <Button onSubmit={handleSubmit} type={"submit"}
                                    disabled={Object.keys(errors).length > 0}
                                    variant={Object.keys(errors).length > 0 ? "danger" : "success"}>
                                {Object.keys(errors).length > 0 ? 'Fill in the fields' : "Save Product"}
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default AddOrUpdateProduct;