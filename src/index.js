import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import ReactDOM from 'react-dom/client';
import { Router } from 'routes/Router'

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<Router/>);