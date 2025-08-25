import ArtistDetail from '../components/ArtistDetail';
import DefaultLayout from '../components/DefaultLayout';
import MainView from '../components/DefaultLayout/MainView';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

const publicRoutes = [
    { path: '/', component: Home, layout: null },
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },
];

const privateRoutes = [];

const homeRoutes = [
    { index: true, component: MainView },
    { path: 'artists/:id', component: ArtistDetail },
];

export { publicRoutes, privateRoutes, homeRoutes };
