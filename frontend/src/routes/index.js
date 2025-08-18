import ArtistDetail from '../components/ArtistDetail';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/', component: Home, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
