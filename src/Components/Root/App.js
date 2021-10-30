import React, {lazy, Suspense} from 'react';
import NavBar from "../Navi/NavBar";
import {Container} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import {ToastContainer} from "material-react-toastify";


const App = () => {
    const Dashboard = lazy(() => import('./Dashboard'))
    const CartDetail = lazy(() => import('../Cart/CartDetail'))
    return (
        <div>
            <ToastContainer />
            <NavBar/>
            <Container>
                <Suspense fallback={<div className={"h3 text-center d-inline"}>Loading...</div>}>
                    <Switch>
                        <Route exact path={'/'} component={Dashboard}/>
                        <Route exact path={'/:id'} component={Dashboard}/>
                        <Route exact path={'/user/cart-detail'} component={CartDetail}/>
                    </Switch>
                </Suspense>
            </Container>
        </div>
    );
}
export default App;

