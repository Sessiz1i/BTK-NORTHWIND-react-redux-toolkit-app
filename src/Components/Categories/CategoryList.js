import React from 'react';
import {ListGroup} from "react-bootstrap";
import {changeCategory, useGetCategoriesQuery} from "./categorySlice";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const CategoryList = () => {
    const dispatch = useDispatch()
    const {data: categories, loading, error} = useGetCategoriesQuery()
    const {currentCategory} = useSelector(state => state?.categories)
    // todo fetch yaparken hata oluesa error alert
    error && alert(error)
    return (
        <div className={"mt-sm-5"}>
            <h3>{loading ? 'Loading...' : currentCategory ? currentCategory?.name : 'Categories'}</h3>
            <ListGroup>
                {categories && categories.map((category, index) =>
                    <ListGroup.Item onClick={() => dispatch(changeCategory(category))}
                                    active={category.id === currentCategory?.id}
                                    key={index}
                                    role={'button'} to={category.seoUrl} as={Link}>
                        {category?.name}
                    </ListGroup.Item>)}
            </ListGroup>
        </div>
    )
}
export default CategoryList;

