import classes from './rgpd.module.scss';
import MainTitle from '../Titles/MainTitle'; // render a h1
// render a bunch of information of this platform

import TextTitle from '../Titles/TextTitle'; // render a h4
import Button from '../Buttons/Button';
import { ModalContext } from '../../contexts/ModalContext'; // methods for displaying modals
import { useContext } from 'react';

export default function RgpdDpo() {
  const { toggleContactUsToRemove } = useContext(ModalContext);

  return (
    <div className={classes.container}>
      <MainTitle>Jean-Michel RGPD Compatible</MainTitle>

      <p className={classes.jeanMichelText}>
        Jean-Michel.io a pour objectif de constituer un annuaire exhaustif de
        tous les freelances en régie afin de faciliter leur mise en relation
        avec les ESN susceptibles de leur proposer des missions.
      </p>

      <TextTitle
        className={classes.secondaryTitle}
        title={'Pour se faire, Jean-Michel.io agrège plusieurs sources :'}
      />

      <div className={classes.sourcesContainer}>
        <div className={classes.sources}>
          <a
            href='https://www.jean-paul.io'
            target='_blank'
            rel='noopener noreferrer'
            className={classes.source}
          >
            Jean-Paul.io, notre portail freelance
          </a>

          <div className={classes.source}>
            Les freelances avec un profil publique sur les réseaux sociaux
            professionnels
          </div>

          <div className={classes.source}>
            Les freelances avec un profil publique sur certains sites d'emploi
          </div>

          <div className={classes.source}>
            Les sites/portofolio publiques des freelances (Doyoubuzz, Github,
            etc)
          </div>
        </div>

        <b className={classes.important}>
          Les données publiées sur Jean-Michel.io sont donc publiques ou ont
          fait part d'une approbation explicite sur Jean-Paul.io.
        </b>
        <p>
          Par ailleurs, les datas professionnelles ne sont pas soumises à la
          RGPD.
        </p>
      </div>

      <p className={classes.jeanMichelText}>
        Jean-Michel.io souhaite aider les freelances dans leur recherche de
        mission en offrant une vitrine à leur profil auprès des ESN qui
        utilisent son service. Si vous ne souhaitez pas que vos datas publiques
        soient relayées par Jean-Michel.io, il vous suffit de remplir{' '}
        <Button variant={'link'} onClick={toggleContactUsToRemove}>
          ce formulaire de droit à l'oubli
        </Button>{' '}
        ou d'envoyer un mail à{' '}
        <a href={'mailto:dpo@jean-michel.io'}>dpo@jean-michel.io</a> pour que
        Jean-Michel supprime vos datas aussi vite que possible.
      </p>

      <TextTitle
        className={classes.freelanceTitle}
        title={
          'Vous êtes freelance en régie et vous êtes présent sur LinkedIn ?'
        }
      />

      <p className={'text-center'}>
        Alors vous êtes très probablement référencés sur Jean-Michel.io !
      </p>

      <Button
        variant={'cta'}
        className={classes.cta}
        onClick={toggleContactUsToRemove}
      >
        Disparaitre de Jean-Michel.io
      </Button>

      <p className={classes.conditions}>
        <span>100% des utilisateurs de Jean-Michel.io sont des ESN</span>
        <br />
        Nous ne communiquons les datas à aucun partenaire commercial ni aucune
        société réalisant du démarchage.
      </p>
    </div>
  );
}
