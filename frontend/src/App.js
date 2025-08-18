import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

import { homeRoutes, publicRoutes } from './routes';
import DefaultLayout from './components/DefaultLayout';
import ArtistDetail from './components/ArtistDetail';
import MainView from './components/DefaultLayout/MainView';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    {/* Home Layout */}
                    <Route path="/" element={<Home />}>
                        {homeRoutes.map((route, index) => {
                            const Page = route.component;
                            return <Route key={index} path={route.path} element={<Page />} />;
                        })}
                    </Route>

                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;

                        if (route.layout === null) {
                            Layout = Fragment;
                        } else if (route.layout) {
                            Layout = route.layout;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
