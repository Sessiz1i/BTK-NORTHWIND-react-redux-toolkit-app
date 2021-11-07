import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import {Container} from "react-bootstrap";

import {ToastContainer} from "material-react-toastify";
import NavBar from "../Navi/NavBar";
import Dashboard from "./Dashboard";
import CartDetail from "../Cart/CartDetail";
import NotFount from "../Common/NotFount";
import AddOrUpdateProduct from "../Products/AddOrUpdateProduct";

const App = () => {
    return (
        <div>
            <ToastContainer/>
            <NavBar/>
            <Container>
                <Suspense fallback={<div className={"h3 text-center text-info d-inline"}>Loading...</div>}>
                    <Switch>
                        <Route exact path={'/'} component={Dashboard}/>
                        <Route exact path={'/add-product'} component={AddOrUpdateProduct}/>
                        <Route exact path={'/edit-product/:productId'} component={AddOrUpdateProduct}/>
                        <Route exact path={'/user/cart-detail'} component={CartDetail}/>
                        <Route exact path={'/:id'} component={Dashboard}/>
                        <Route component={NotFount}/>
                    </Switch>
                </Suspense>
            </Container>
        </div>
    );
}
export default App;

