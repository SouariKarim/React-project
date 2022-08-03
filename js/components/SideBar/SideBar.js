// render the side bar when logged in containg a bunch of images pointing to different resources

import React, { useContext } from 'react';
import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch as SearchIcon,
  faThumbtack as MyIntercontrats,
  faHeart as BookmarkIcon,
  faEye,
  faFileAlt,
  faSave,
  faEnvelope,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';
import LogoImage from '../../res/logos/jean-michel-logo-white.svg';
import Button from '../Buttons/Button';
import useAuthManager from '../../hooks/useAuthManager';
import { ModalContext } from '../../contexts/ModalContext';
import Link from '../Link/Link';
import { motion } from 'framer-motion';

export default function SideBar({ children }) {
  const { user } = useAuthManager();
  const { toggleContactUsToSubscribe, toggleContactUs } =
    useContext(ModalContext);

  const motionSidebar = {
    expand: { maxWidth: '400px' },
    normal: { maxWidth: '60px' },
  };

  const motionSidebarContent = {
    expand: { opacity: 1 },
    normal: { opacity: 0 },
  };

  return (
    <div className={'root-expand'}>
      <motion.div
        className={'sidebar'}
        initial={'normal'}
        whileHover={'expand'}
        transition={{ duration: 0.5 }}
        variants={motionSidebar}
      >
        <div className='side-content'>
          <ul>
            <li className={'brand'}>
              <Link to={'HOME_PAGE'}>
                <img
                  className={'brand-logo'}
                  src={LogoImage}
                  alt={'Jean-Michel'}
                />
                <motion.p
                  variants={motionSidebarContent}
                  className={'brand-text'}
                >
                  JEAN-MICHEL.io
                </motion.p>
              </Link>
            </li>
            <motion.li variants={motionSidebarContent} className={'heading'} />
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                to={'SEARCH'}
              >
                <FontAwesomeIcon className={'icon'} icon={SearchIcon} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Rechercher un consultant
                </motion.span>
              </Button>
            </li>
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                to={'SAVED_RESEARCH'}
              >
                <FontAwesomeIcon className={'icon'} icon={faSave} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Mes recherches sauvegardées
                </motion.span>
              </Button>
            </li>
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                to={'BOOKMARK'}
              >
                <FontAwesomeIcon className={'icon'} icon={BookmarkIcon} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Mes profils favoris
                </motion.span>
              </Button>
            </li>
            <motion.li
              variants={motionSidebarContent}
              className={'heading content-expand'}
            >
              ANNONCES
            </motion.li>
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                disabled={true}
              >
                <FontAwesomeIcon className={'icon'} icon={faEye} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Voir les annonces (bientôt)
                </motion.span>
              </Button>
            </li>
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                disabled={true}
              >
                <FontAwesomeIcon className={'icon'} icon={faFileAlt} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Gérer mes annonces (bientôt)
                </motion.span>
              </Button>
            </li>
            {/*
            <motion.li variants={motionSidebarContent} className={"heading"}>
              TEAM
            </motion.li>
            <li>
              <Button  variant={"navlink"} activeClassName={"active"} to={"CREDIT_MANAGE"}>
                <FontAwesomeIcon className={"icon"} icon={CreditCardIcon} />
                <motion.span variants={motionSidebarContent} className="icon-text">
                  Mon forfait
                </motion.span>
              </Button>
            </li>
            */}
            <motion.li variants={motionSidebarContent} className={'heading'}>
              INTERCONTRATS
            </motion.li>
            <li>
              <Button
                variant={'navlink'}
                activeClassName={'active'}
                disabled={true}
              >
                <FontAwesomeIcon className={'icon'} icon={MyIntercontrats} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Mes intercontrats (bientôt)
                </motion.span>
              </Button>
            </li>

            <motion.li variants={motionSidebarContent} className={'heading'}>
              CONTACT
            </motion.li>
            <li>
              <Button variant={'navlink'} onClick={toggleContactUs}>
                <FontAwesomeIcon className={'icon'} icon={faEnvelope} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Écrire à Jean-Michel
                </motion.span>
              </Button>
            </li>
            <li>
              <Button variant={'navlink'} disabled={true}>
                <FontAwesomeIcon className={'icon'} icon={faLightbulb} />
                <motion.span
                  variants={motionSidebarContent}
                  className='icon-text'
                >
                  Boîte à idées (bientôt)
                </motion.span>
              </Button>
            </li>
          </ul>

          <motion.div
            variants={motionSidebarContent}
            className={'sidebar-footer'}
          >
            <p>
              {user.credits_consume} / {user.credits_available} ouvertures de CV
              ce mois
            </p>
            <button onClick={toggleContactUsToSubscribe}>
              Upgrader mon compte
            </button>

            <div className={'branding'}>
              <p>🚀 Powered by</p>
              <p>Jean-Michel.io | 2019-2022</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <div id='page-content-wrapper' className={'flex-column-100'}>
        {children}
      </div>
    </div>
  );
}
