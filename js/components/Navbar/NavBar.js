import { useContext, useEffect, useRef, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Button from '../Buttons/Button';
import Brand from '../../res/logos/jean-michel-brand.svg';
import BrandWhite from '../../res/logos/jean-michel-brand-white.svg';
import './navbar.scss';
import { ModalContext } from '../../contexts/ModalContext'; // methods for displaying modals
import useAuthManager from '../../hooks/useAuthManager'; // auth methods
import useRoutes from '../../hooks/useRoutes'; // route hook getyrl redirect and get title method
import Burger from '../Buttons/Burger'; // burger button
import { motion, useViewportScroll } from 'framer-motion';
import Link from '../Link/Link'; // link from react-router-dom
import SubscriptionWidget from '../SubscriptionWidget/SubscriptionWidget'; // link pointing to account information
import useToast from '../../hooks/useToast'; // render a toast

export default function Navbar({ withSideBar = false, theme = 'light' }) {
  const [navTheme, setNavTheme] = useState(theme);
  const ThemedBrand = navTheme === 'light' ? Brand : BrandWhite;
  const { toggleLogin, toggleRegistration } = useContext(ModalContext);
  const {
    isLogged,
    logout,
    user,
    isLoggedWithPremiumEsnAccount,
    isCollaborator,
    isInTrialPeriod,
  } = useAuthManager();
  const { redirect, getRouteTitle } = useRoutes();
  const [open, setOpen] = useState(false);
  const expandNavRef = useRef(null);
  const { scrollY } = useViewportScroll();
  const toast = useToast();
  const [isNavbarExpand, setNavbarExpand] = useState(withSideBar === false);
  const routeTitle = getRouteTitle();

  const motionNavbar = {
    expand: { height: '80px' },
    normal: { height: '60px' },
  };

  useEffect(() => {
    if (withSideBar === false) {
      return scrollY.onChange((latest) => setNavbarExpand(latest <= 30));
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      //Sur certain elem, on a pas de className
      if (
        expandNavRef.current &&
        !expandNavRef.current.contains(event.target) &&
        event.target.className.includes &&
        !event.target.className.includes('burger')
      ) {
        handleBurgerClick(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandNavRef]);

  useEffect(() => {
    if (theme === 'dark') {
      if (isNavbarExpand === false && navTheme !== 'light') {
        setNavTheme('light');
      } else if (isNavbarExpand === true && navTheme !== 'dark') {
        setNavTheme('dark');
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNavbarExpand]);

  const handleBurgerClick = (bool) => {
    setOpen(bool);
  };

  const onMyAccountClick = () => {
    redirect({ key: 'MY_ACCOUNT' });
  };

  const onLogoutClick = () => {
    logout();
    redirect({ key: '/' });
    toast.success({
      text: 'Déconnecté',
    });
  };

  return (
    <motion.header
      className={'custom-navbar ' + navTheme}
      style={{ padding: withSideBar === true ? '0' : '0 8%' }}
      initial={false}
      animate={isNavbarExpand ? 'expand' : 'normal'}
      transition={{ duration: '0.3' }}
      variants={motionNavbar}
    >
      {withSideBar && routeTitle && (
        <div className={'nav-title'}>
          <h1>{getRouteTitle()}</h1>
        </div>
      )}
      {/* the logo in the side bar */}
      {withSideBar === false && (
        <Link to={'HOME_PAGE'} className={'brand'}>
          <img src={ThemedBrand} alt={'logo jean-michel.io'} />
        </Link>
      )}

      <nav ref={expandNavRef} className={open ? 'open' : undefined}>
        {isLogged() ? (
          <>
            <Button
              variant={'navlink ' + navTheme}
              activeClassName={'active'}
              to={'SEARCH'}
            >
              CVthèque
            </Button>

            {(withSideBar === false ||
              isCollaborator() === true ||
              isInTrialPeriod() === true ||
              isLoggedWithPremiumEsnAccount() === false) && (
              <Button
                variant={'navlink ' + navTheme}
                activeClassName={'active'}
                to={'PRICING'}
              >
                Tarifs
              </Button>
            )}

            <NavDropdown title={user.full_name} id='nav-dropdown'>
              <NavDropdown.Item onClick={onMyAccountClick}>
                Mon compte
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={onLogoutClick}>
                Déconnexion
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          // if not logged in
          <>
            <Button
              variant={'navlink ' + navTheme}
              activeClassName={'active'}
              to={'PRICING'}
            >
              Tarifs
            </Button>
            <Button variant={'navlink ' + navTheme} onClick={toggleLogin}>
              Connexion
            </Button>
            <Button
              variant={'cta secondary'}
              style={{ marginLeft: 20 }}
              onClick={toggleRegistration}
            >
              Inscription ESN gratuite
            </Button>
          </>
        )}
      </nav>

      {withSideBar === true && isLogged() && (
        // this is the component having the subscription details
        <SubscriptionWidget />
      )}

      <Burger
        active={open}
        theme={navTheme}
        className={'burger'}
        handleClick={() => handleBurgerClick(!open)}
      />
    </motion.header>
  );
}
