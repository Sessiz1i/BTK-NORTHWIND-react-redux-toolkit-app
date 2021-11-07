// import React, {useLayoutEffect, useState} from 'react';
// import {useParams} from "react-router-dom";
// import {useAddProductMutation, useGetProductQuery, useUpdateProductMutation} from "./productSlice";
// import {useGetCategoriesQuery} from "../Categories/categorySlice";
// import {Button, Col, Form, Row} from "react-bootstrap";
//
// const AddOrUpdateForm = ({history}) => {
//     const {productId} = useParams()
//     const [product, setProduct] = useState(0)
//     const [errors, setErrors] = useState(0)
//     const [addProduct] = useAddProductMutation()
//     const [updateProduct] = useUpdateProductMutation()
//     const {data: categories} = useGetCategoriesQuery()
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const {data: editProduct} = productId ? useGetProductQuery(productId) : 0
//
//     const onSubmit = (event) => {
//         event.preventDefault()
//         for (const targetElement of event.target) {
//             handleChange({target: {name: targetElement.name, value: targetElement.value}})
//             if (errors.error) {
//                 event.stopPropagation()
//                 break;
//             }
//         }
//         if (errors.error) {
//             event.stopPropagation()
//             return
//         } else {
//             if (product.id) {
//                 updateProduct(product).unwrap()
//                 history.push('/')
//             } else {
//                 addProduct(product).unwrap()
//                 history.push('/')
//             }
//             event.stopPropagation()
//         }
//     }
//
//     const handleChange = async (event) => {
//         if (event.target.name === "productName") await validate({name: event.target.name, value: event.target.value, required: true, min: 5, max: 50})
//         if (event.target.name === "categoryId") await validate({name: event.target.name, value: event.target.value, required: true})
//         if (event.target.name === "unitsInStock") await validate({name: event.target.name, value: event.target.value, required: true, max: 25})
//         if (event.target.name === "quantityPerUnit") await validate({name: event.target.name, value: event.target.value, required: true, max: 25})
//         if (event.target.name === "unitPrice") await validate({name: event.target.name, value: event.target.value, required: true, max: 25})
//         setProduct(prevState => ({...prevState, [event.target.name]: event.target.value}))
//     }
//     const validate = (data) => {
//         const {name, value, required, min, max} = data
//         // Require
//         if (required && (!value || value === '')) {
//             setErrors(prevState =>
//                 ({...prevState, error: true, [name]: {message: "Bu alan gereklidir", class: "is-invalid"}}))
//         }
//         // Min
//         else if (min && value.length < min) {
//             setErrors(prevState =>
//                 ({...prevState, error: true, [name]: {message: `En az ${min} Karakter olmalıdır.`, class: "is-invalid"}}))
//         }
//         // Max
//         else if (max && value.length > max) {
//             setErrors(prevState =>
//                 ({...prevState, error: true, [name]: {message: `En fazla ${max} Karakter olmalıdır`, class: "is-invalid"}}))
//         } else setErrors(prevState => {
//             delete prevState[name]
//             return {...prevState, error: false, [name]: {class: "is-valid"}}
//         })
//     }
//
//
//     useLayoutEffect(() => {
//         if (editProduct && !product) {
//             setProduct(editProduct)
//         }
//     }, [product, editProduct])
//     console.log(product, errors.error)
//     return (
//         <div className={"col-md-8 mx-auto mt-5"}>
//             <h3>{product ? 'Edit Product' : 'Create Product'}</h3>
//             <div className={"card pt-3 px-3 shadow"}>
//                 <div className={"card-body"}>
//                     <Form onSubmit={onSubmit}>
//                         <Row>
//                             <Form.Group as={Col} className={"mb-2"} controlId="productName">
//                                 <Form.Label className={"mb-1"}>Product Name</Form.Label>
//                                 <Form.Control
//                                     onChange={handleChange}
//                                     type="text"
//                                     name="productName"
//                                     className={` ${errors?.productName?.class}`}
//                                     defaultValue={product?.productName && product?.productName}
//                                     placeholder="Enter product name..."/>
//                                 <Form.Control.Feedback
//                                     type="invalid"
//                                     className={"text-capitalize"}>
//                                     {errors?.productName?.message}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                         </Row>
//                         <Row>
//                             <Form.Group as={Col} className={"mb-2"} xs={12} md={6}>
//                                 <Form.Label className={"mb-1"}>Category</Form.Label>
//                                 <Form.Select
//                                     onChange={handleChange}
//                                     name={"categoryId"}
//                                     className={` ${errors?.categoryId?.class}`}>
//                                     {categories && categories.map((category, key) => (
//                                         category?.id === product?.categoryId
//                                             ? <option key={key} value={category.id} selected>{category.name}</option>
//                                             : <option key={key} value={category.id}>{category.name}</option>))}
//                                 </Form.Select>
//                                 <Form.Control.Feedback
//                                     type="invalid"
//                                     className={"text-capitalize"}>
//                                     {errors?.categoryId?.message}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="unitsInStock">
//                                 <Form.Label className={"mb-1"}>Units In Stock</Form.Label>
//                                 <Form.Control
//                                     onChange={handleChange}
//                                     type="text"
//                                     name="unitsInStock"
//                                     className={` ${errors?.unitsInStock?.class}`}
//                                     defaultValue={product?.unitsInStock && product?.unitsInStock}
//                                     placeholder="Please enter..."/>
//                                 <Form.Control.Feedback
//                                     type="invalid"
//                                     className={"text-capitalize"}>
//                                     {errors?.unitsInStock?.message}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                         </Row>
//                         <Row>
//                             <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="quantityPerUnit">
//                                 <Form.Label className={"mb-1"}>Quantity Per Unit</Form.Label>
//                                 <Form.Control
//                                     onChange={handleChange}
//                                     type="text"
//                                     name="quantityPerUnit"
//                                     className={` ${errors?.quantityPerUnit?.class}`}
//                                     defaultValue={product?.quantityPerUnit && product?.quantityPerUnit}
//                                     placeholder="Please enter..."/>
//                                 <Form.Control.Feedback
//                                     type="invalid"
//                                     className={"text-capitalize"}>
//                                     {errors?.quantityPerUnit?.message}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                             <Form.Group as={Col} className={"mb-2"} xs={12} md={6} controlId="productName">
//                                 <Form.Label className={"mb-1"}>Unit Price</Form.Label>
//                                 <Form.Control
//                                     onChange={handleChange}
//                                     type="text"
//                                     name="unitPrice"
//                                     className={` ${errors?.unitPrice?.class}`}
//                                     defaultValue={product?.unitPrice && product?.unitPrice}
//                                     placeholder="Please enter..."/>
//                                 <Form.Control.Feedback
//                                     type="invalid"
//                                     className={"text-capitalize"}>
//                                     {errors?.unitPrice?.message}
//                                 </Form.Control.Feedback>
//                             </Form.Group>
//                         </Row>
//                         <Form.Group className="pt-1 float-end">
//                             {/*<Button type="reset" variant={"light"} className={"btn-outline-secondary me-2"}>Cancel</Button>*/}
//                             <Button type={"submit"} variant={"light"} disabled={errors.error} className={"btn-outline-success"}>Save Product</Button>
//                         </Form.Group>
//                     </Form>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default AddOrUpdateForm;