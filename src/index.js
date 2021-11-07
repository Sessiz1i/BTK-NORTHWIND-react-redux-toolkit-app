import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'alertifyjs/build/css/alertify.min.css'
import 'sweetalert2'
import 'jbox/dist/jBox.all.min.css';
import 'material-react-toastify/dist/ReactToastify.css';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./Store";
import App from './Components/Root/App';



ReactDOM.render(<BrowserRouter><Provider store={store}> <App/></Provider></BrowserRouter>, document.getElementById('root'));

