import React from 'react';
import {Col, Row} from "react-bootstrap";
import CategoryList from "../Categories/CategoryList";
import ProductList from "../Products/ProductList";


const Dashboard = () => {
    return (
        <Row>
            <Col sm={5} md={3}>
                <CategoryList/>
            </Col>
            <Col sm={7} md={9}>
                <ProductList/>
            </Col>
        </Row>
    );
}
export default Dashboard;