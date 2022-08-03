import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout';
import useAuthManager from './hooks/useAuthManager';
import SearchPage from './pages/SearchPage';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';
import CgvPage from './pages/CgvPage';
import AccountPage from './pages/AccountPage';
import BookmarkPage from './pages/BookmarkPage';
import FreelancePage from './pages/FreelancePage';
import SavedResearchPage from './pages/SavedResearchPage';
import useRoutes from './hooks/useRoutes';
import { useLocation } from 'react-router-dom';
import CreditPage from './pages/CreditPage';
import ReactGA from 'react-ga';
import RgpdDpoPage from './pages/RgpdDpoPage';

// this is the routes array
// each route uses a layout to display a given page as a component
// each route has it own key and path
// the guard defines if the component is protected means the user has to loggin to see that component
export const ROUTES = [
  {
    index: true,
    path: '/',
    key: 'HOME_PAGE',
    layout: (props) => <SiteLayout theme={'dark'} {...props} />,
    component: (props) => <HomePage {...props} />,
  },
  {
    path: '/404',
    key: '404',
    layout: (props) => <SiteLayout {...props} />,
    component: (props) => <NotFoundPage {...props} />,
  },
  {
    path: '/conditions-generales-de-vente',
    key: 'CGV',
    layout: (props) => <SiteLayout {...props} />,
    component: (props) => <CgvPage {...props} />,
  },
  {
    path: '/account',
    key: 'MY_ACCOUNT',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <AccountPage {...props} />,
    guard: ({ userAuthManager }) => userAuthManager.isLogged(), // this gard prop is for protected routes means only if the user is logged in
    redirect: '/',
  },
  {
    path: '/company/credit',
    key: 'CREDIT_MANAGE',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <CreditPage {...props} />,
    guard: ({ userAuthManager }) => userAuthManager.isLoggedWithEsnAccount(), // protected route
  },
  {
    path: '/prix',
    key: 'PRICING',
    layout: (props) => <SiteLayout {...props} />,
    component: (props) => <PricingPage {...props} />,
  },
  {
    path: '/inscription',
    key: 'REGISTER',
    layout: (props) => <SiteLayout theme={'dark'} {...props} />,
    component: (props) => <HomePage showRegisterModal={true} {...props} />,
    guard: ({ userAuthManager }) => userAuthManager.isLogged() === false, // protedtec route
    redirect: '/',
  },
  {
    path: '/search',
    key: 'SEARCH',
    title: 'votre recherche de freelances',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <SearchPage {...props} />,
  },
  {
    path: '/favoris',
    key: 'BOOKMARK',
    title: 'vos profils favoris',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <BookmarkPage {...props} />,
    guard: ({ userAuthManager }) => userAuthManager.isLoggedWithEsnAccount(), // protected route
  },
  {
    path: '/mes-recherches',
    key: 'SAVED_RESEARCH',
    title: 'vos recherches sauvegardées',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <SavedResearchPage {...props} />,
    guard: ({ userAuthManager }) => userAuthManager.isLoggedWithEsnAccount(),
    redirect: '/',
  },
  {
    path: '/freelance/:id',
    key: 'FREELANCE_PROFILE',
    layout: (props) => <AppLayout {...props} />,
    component: (props) => <FreelancePage {...props} />,
  },
  {
    path: '/rgpd-dpo',
    key: 'RGPD_DPO',
    layout: (props) => <SiteLayout {...props} />,
    component: (props) => <RgpdDpoPage {...props} />,
  },
];

// render the routes function
export function RenderRoutes({ routes }) {
  // has all the methods for auth
  const userAuthManager = useAuthManager();
  // redirect to a given url
  const { redirect } = useRoutes();
  // react-router-dom location
  const routerLocation = useLocation();

  useEffect(() => {
    // if the user is logged redirect to the search route
    if (userAuthManager.isLogged() && routerLocation.pathname === '/') {
      redirect({ key: 'SEARCH' });
    }

    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // set the google analytics by getting the current visited page
  useEffect(() => {
    if (process.env.REACT_APP_ACTIVATE_GA === '1') {
      ReactGA.set({ page: routerLocation.pathname });
      ReactGA.pageview(routerLocation.pathname);
    }

    window.scrollTo(0, 0);
  }, [routerLocation]);

  // map the routes arr and render each route
  const routesToRender = routes.map((route, index) => {
    if (route.guard && route.guard({ userAuthManager }) === false) {
      // the gard prop is for protected routes , false means the user is not authenticated
      return (
        // construct the route
        <Route
          key={route.key + index}
          element={
            <Navigate
              to={route.redirect ? route.redirect : '/'}
              replace={true}
            /> //
          }
        />
      );
    }
    // if the user is authenticated
    else {
      const Layout = route.layout ? route.layout : SiteLayout; // if the route has a layout render the layout  otherwise render the siteLayout
      return (
        // construct the route
        <Route
          index={route.index === true}
          key={route.key + index}
          path={route.path}
          element={
            <Layout {...route}>
              <route.component routes={route.routes} />
            </Layout>
          }
        />
      );
    }
  });

  return (
    // render each route
    <Routes>{routesToRender}</Routes>
  );
}
