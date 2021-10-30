import React from 'react';
import {ListGroup} from "react-bootstrap";
import {change, useGetCategoriesQuery} from "./categorySlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";

const CategoryList = () => {
    const dispatch = useDispatch()
    const {data, error, isLoading, isSuccess} = useGetCategoriesQuery('')
    const currentCategory = useSelector(state => state?.currentCategory)
    error && alert(error.error)
    return (
        <div className={"mt-sm-5"}>
            <h3>{isLoading ? 'Loading...' : currentCategory ? currentCategory?.name : 'Categories'}</h3>
            <ListGroup>
                {
                    isSuccess && data && data.map((category, index) =>
                        <ListGroup.Item onClick={() => dispatch(change(category))}
                                        active={category.id === currentCategory?.id}
                                        key={index}
                                        role={'button'} to={category.seoUrl} as={Link}>
                            {category?.name}
                        </ListGroup.Item>
                    )}
            </ListGroup>
        </div>
    )
}
export default CategoryList;

