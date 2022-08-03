// displays les conditions generale de vente by making titles lists etc..
import React from 'react';
import { Card, Container } from 'react-bootstrap';
import './Cgv.scss';

const CgvContainer = (props) => {
  const { children } = props;

  return (
    <Container className={'cgv-container'} fluid>
      {children}
    </Container>
  );
};

const CgvBloc = (props) => {
  const { children } = props;

  return <div className={'cgv-bloc'}>{children}</div>;
};

const CgvTitle = (props) => {
  const { children } = props;

  return <h3 className={'cgv-title'}>{children}</h3>;
};

const CgvContent = (props) => {
  const { children } = props;

  return <div className={'cgv-content'}>{children}</div>;
};

const CgvContentTitle = (props) => {
  const { children } = props;

  return <h5 className={'cgv-content-title'}>{children}</h5>;
};

const CgvList = (props) => {
  const { children } = props;

  return <ul>{children}</ul>;
};

const CgvListItem = (props) => {
  const { children } = props;

  return <li>{children}</li>;
};

const Cgv = () => {
  return (
    <Card id={'cgv'} body={true}>
      <h1 className={'cgv-header'}>
        Conditions Générales De Ventes et d'utilisation
      </h1>

      <CgvContainer>
        <CgvBloc>
          <CgvTitle>Informations générales</CgvTitle>
          <CgvContent>
            <p>
              Les présentes conditions générales d'utilisation (ci-après
              dénommées "Conditions Générales" sont conclues entre :
            </p>
            <CgvList>
              <CgvListItem>
                La société JEAN-MICHEL.IO, immatriculée à l’Ile Maurice et dont
                l’Id est C18155718 (ci-après la "Société" ou le "Site" ou
                "JEAN-MICHEL.IO") d'une part
              </CgvListItem>
              <CgvListItem>
                L'utilisateur du site https://www.jean-michel.io
              </CgvListItem>
            </CgvList>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Préambule</CgvTitle>
          <CgvContent>
            <p>
              La société exploite un site internet accessible à l'adresse
              https://jean-michel.io proposant un logiciel de sourcing de
              consultants.
            </p>
            <p>
              Les présentes Conditions Générales ont pour objet de régir les
              conditions d'utilisation et de vente du Site ainsi que les droits
              et obligations des Utilisateurs. Tout accès ou utilisation du Site
              suppose l'acceptation sans réserve et le respect de l'ensemble des
              Conditions Générales. Tout accès et/ou utilisation du Site suppose
              l’acceptation sans réserves et le respect de l’ensemble des termes
              des présentes Conditions Générales.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Définitions</CgvTitle>
          <CgvContent>
            <p>
              Contenu : désigne tous propos, messages ou informations de quelque
              nature que ce soit (texte, image, vidéos, photographies,
              commentaires, marques, dénominations sociales, etc.), visible sur
              le Site.
            </p>
            <p>
              Consultant : désigne toute personne physique ou morale, soit
              disposant d’un numéro SIRET et inscrite au Registre du Commerce et
              des Sociétés, au Répertoire des Métiers, à la Maison des Artistes,
              à l’Agessa, ayant le statut de micro-entrepreneur soit exerçant en
              tant qu’indépendant dans des conditions légales depuis la France
              ou l’étranger et qui possède une fiche profil sur le Site.
            </p>
            <p>Site ou Société : désigne Jean-Michel.io</p>
            <p>
              Utilisateurs : désigne les personnes inscrites sur le Site en vue
              d’utiliser le service de sourcing (ESN, client finaux, société de
              portage, etc)
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Inscription au Site</CgvTitle>
          <CgvContent>
            <p>
              Pour pouvoir accéder aux services proposés par le Site,
              l’Utilisateur doit créer un compte en s’inscrivant sur le Site.
              L’Utilisateur doit être âgé d’au moins 18 ans et être capable
              juridiquement de contracter et d’utiliser le Site conformément aux
              présentes Conditions Générales. L’Utilisateur est tenu de fournir
              des informations exactes qu’il s’engage à mettre immédiatement à
              jour en cas de modification.
            </p>
            <p>
              L'Utilisateur devra en outre communiquer à la Société tout
              document relatif à son identification ou à sa situation vis-à-vis
              des obligations légales en vigueur sur simple demande et dans un
              délai de 48 heures.
            </p>
            <p>
              L’accès au compte créé pour l’Utilisateur est protégé par un
              identifiant et un mot de passe. L’utilisateur est le seul
              responsable de tout usage qui sera fait de ces deux informations
              et il est le seul garant de leur confidentialité. L’Utilisateur
              sera tenu comme seul responsable de toute utilisation de son
              compte. La Société se réserve le droit de refuser toute
              inscription ou de mettre fin à toute utilisation de compte
              d’Utilisateur sur simplement notification électronique et sans
              obligation de motivation dans le cas d’un compte gratuit.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>
            Description des Services et fonctionnement du Site
          </CgvTitle>
          <CgvContent>
            <p>
              Une fois inscrit, l'Utilisateur peut bénéficier des Services du
              Site. Ces Services comprennent notamment :
            </p>
            <CgvList>
              <CgvListItem>
                Une mise à disposition d'outils pour évaluer les compétences des
                consultants informatiques listés sur le site
              </CgvListItem>
              <CgvListItem>
                Une liste de fonctionnalités additionnelles et des informations
                complémentaires dans le cadre d’un compte payant.
              </CgvListItem>
            </CgvList>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Accès au Site et aux Services</CgvTitle>
          <CgvContent>
            <p>
              L’accès au Site et aux Services est exclusivement réservé aux
              Utilisateurs inscrits. Les Utilisateurs font leur affaire
              personnelle de la mise en place des moyens permettant l’accès au
              Site. Ils conservent à leur charge les frais de télécommunication
              lors de l’accès et de l’utilisation du Site. Le Site est
              accessible 24heures sur 24, 7 jours sur 7 pour l’ensemble des
              Utilisateurs.
            </p>
            <p>
              La Société se réserve le droit, sans préavis ni indemnité, de
              fermer temporairement ou définitivement le Site ou l’accès à un ou
              plusieurs Services pour effectuer des mises à jour ou des
              modifications techniques. Elle se réserve plus généralement le
              droit d’apporter au Site et aux Services toutes les modifications
              et améliorations qu’elle jugera nécessaires ou utiles dans le
              cadre du bon fonctionnement du Site et de ses Services.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Limitation de responsabilités</CgvTitle>
          <CgvContent>
            <p>
              L'ensemble des équipements nécessaires pour l'établissement de la
              connexion au réseau Internet sont à la charge du client. Il
              appartient à chaque client de se procurer, d'exploiter et de
              maintenir les matériels informatiques, logiciels et tous autres
              équipements nécessaires à l'utilisation du site et des Produits.
              Tous les coûts (télécommunications, informatiques ou autres)
              nécessaires, directement ou indirectement, à l'utilisation par le
              client du site ou du Produit sont à la charge exclusive du client.
            </p>
            <p>
              Notre CVthèque proposant aussi des CV originaux, nous ne pouvons
              garantir à 100% que ceux-ci sont exempts de virus ou de logiciels
              malveillant. JEAN-MICHEL.IO ne pourra pas être tenu responsable
              des conséquences du téléchargement et de l'ouverture d'un CV au
              format word ou pdf contenant des virus, des macros ou tout autre
              type de logiciel malveillant.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Engagements</CgvTitle>
          <CgvContent>
            <p>
              L’Utilisateur s’engage à accéder et à utiliser le Site
              conformément aux lois et règlements en vigueur et en accord avec
              les dispositions des présentes Conditions d’Utilisation.
              L’Utilisateur s’engage notamment à :<br />
              (1) Satisfaire à toutes les obligations légales et réglementaires.
              L’Utilisateur, notamment lorsqu’il est consultant, s’engage à
              accomplir toutes les déclarations et toutes les formalités
              nécessaires à son activité et à l’utilisation des Services, en
              matière juridique, sociale, administrative et fiscale notamment.
              Sur simple demande, l’Utilisateur s’engage à fournir tout document
              prouvant qu’il remplit toutes les obligations énoncées ci-dessus.
              <br />
              (2) Utiliser de manière loyale le Site. L’Utilisateur s’interdit
              d’utiliser le contenu du site pour mettre en place toute action de
              promotion commerciale pour son compte ou celui d’un tiers autre
              que pour les prestations de conseils visées par le Site.
              L’Utilisateur s’interdit également de constituer des bases de
              données commerciales à but de démarchage ou d’utiliser les
              informations collectées sur le site en vue d’établir des études ou
              en vue de mener des actions de recrutement non autorisées par la
              Société.
              <br />
              (3) L’Utilisateur s’interdit notamment d’utiliser tout scrapeur ou
              toute autre manière de collecter la data pour alimenter ses
              propres systèmes de données.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Responsabilité de l’Utilisateur</CgvTitle>
          <CgvContent>
            <p>
              L’Utilisateur est seul responsable des informations et contenus
              qu’il diffuse par le biais du Site. Le Site ne contrôlant pas ces
              éléments avant mise en ligne. L’Utilisateur est seul responsable
              des conséquences et préjudices qui résulteraient de la
              communication d’informations ou contenus inexactes ou trompeurs.
            </p>
            <p>
              L’Utilisateur s’interdit également de publier tout contenu
              susceptibles de porter atteinte aux droits, à la réputation et à
              l’image du Site et d’une manière générale tout contenu qui
              enfreindrait les lois et règlements en vigueur.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Responsabilité de la Société</CgvTitle>
          <CgvContent>
            <p>
              Le Site réalise ses meilleurs efforts pour assurer l’accès et le
              fonctionnement du Site 24 heures sur 24, 7 jours sur 7. Toutefois,
              de par la nature du fonctionnement d’Internet, la Société ne
              saurait exclure l’interruption ou le mauvais fonctionnement du
              Site et des Services. Aussi la Société ne saurait être tenue pour
              responsable d’une quelconque interruption de Service, volontaire
              ou non, et des conséquences potentielles pour les Utilisateurs.
            </p>
            <p>
              Le Site ne saurait être tenue pour responsables des informations
              erronées, inexactes ou trompeuses publiées par des Utilisateurs
              sur le Site ou récoltées sur des sources externes.
            </p>
            <p>
              Le Site sert d'intermédiaire entre l'Utilisateur et le consultant,
              et il ne saurait être tenu responsable de tout problème qui aurait
              lieu suite à cette mise en contact. Il convient aux deux parties
              de s'assurer de l'intégrité de l'autre partie avant de s'engager
              mutuellement sur une quelconque prestation.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Données personnelles et RGPD</CgvTitle>
          <CgvContent>
            <p>
              Des données à caractère personnelles de l’Utilisateur font l’objet
              d’un traitement informatisé par la Société destiné à assurer le
              bon fonctionnement du Site et des Services et également à des fins
              statistiques et de prospection commerciale. La Société est seule
              destinataire de ces données, les informations collectées ne sont
              ni revendue ni communiquée à des tiers.
            </p>
            <p>
              Conformément à la loi "informatique et libertés" du 6 janvier 1978
              modifiée, l’Utilisateur bénéficie d’un droit d’accès et de
              rectification aux informations qui le concernent. Pour exercer ce
              droit et obtenir communication des informations le concernant,
              l’Utilisateur peut contacter la Société par courrier adressé à son
              siège social ou par email. L’Utilisateur peut également s’opposer
              à ce traitement pour des motifs légitimes. Cette opposition peut
              toutefois entrainer une fermeture du compte de l’Utilisateur.
            </p>
            <CgvContentTitle>
              Protection des données personnelles
            </CgvContentTitle>
            <p>
              Le Règlement Général de Protection des données (RGPD) définit les
              principes à respecter lors de la collecte, du traitement et de la
              conservation de données personnelles. Il garantit aussi les droits
              pour les personnes concernées.
            </p>
            <p>
              Le Site propose plusieurs formulaires afin de collecter les
              données d’un visiteur. Le Site collecte également de la donnée sur
              des sources externes pour collecter les données des consultants.
            </p>
            <CgvContentTitle>Informations que nous collectons</CgvContentTitle>
            <p>
              Informations fournies par les utilisateurs pour utiliser notre
              service.
            </p>

            <p>
              Dans le cadre de votre utilisation de nos services et de votre
              navigation sur notre site internet, le Site collecte plusieurs
              catégories de données dont vous trouverez le détail ci-dessous.
              Ces données proviennent :
            </p>

            <CgvList>
              <CgvListItem>
                Des informations que vous nous communiquez lorsque vous créez
                votre compte, que vous mettez à jour votre profil.
              </CgvListItem>
              <CgvListItem>
                Des informations résultant de votre utilisation de nos services
                comme votre activité sur la plateforme.
              </CgvListItem>
            </CgvList>

            <p>
              Nous ne traitons pas de catégories particulières de données
              (données sensibles) telles que les données qui révèlent l'origine
              raciale ou ethnique, les opinions politiques, les convictions
              religieuses ou philosophiques ou l'appartenance syndicale, des
              données génétiques, des données biométriques, des données
              concernant la santé ou des données concernant la vie sexuelle ou
              l'orientation sexuelle des personnes.
            </p>

            <CgvContentTitle>
              Générées par votre utilisation de la plateforme
            </CgvContentTitle>
            <p>Données de navigation - Cookie et adresse IP</p>

            <CgvContentTitle>
              Données relatives aux Utilisateurs ESN
            </CgvContentTitle>
            <p>
              Nous informons au moment de la collecte du caractère obligatoire
              ou non de la donnée.
            </p>
            <CgvContentTitle>
              Communiquées par les Utilisateurs ESN
            </CgvContentTitle>
            <p>Informations personnelles</p>
            <CgvList>
              <CgvListItem>Nom</CgvListItem>
              <CgvListItem>Prénom</CgvListItem>
              <CgvListItem>Adresse email</CgvListItem>
              <CgvListItem>Fonction dans l’entreprise</CgvListItem>
              <CgvListItem>Numéro de téléphone</CgvListItem>
              <CgvListItem>Informations générales sur l'entreprise</CgvListItem>
              <CgvListItem>Logo de l'entreprise</CgvListItem>
              <CgvListItem>Nom de l'entreprise</CgvListItem>
            </CgvList>
            <br />
            <p>Générées par votre utilisation de la plateforme</p>
            <CgvList>
              <CgvListItem>Données de navigation</CgvListItem>
              <CgvListItem>Cookies et adresse IP</CgvListItem>
              <CgvListItem>Pages profils visitées</CgvListItem>
              <CgvListItem>Requêtes de recherche exécutées</CgvListItem>
            </CgvList>

            <CgvContentTitle>
              Informations statistiques relatives à votre utilisation de nos
              services
            </CgvContentTitle>
            <p>
              Nous recueillons par exemple des données statistiques sur
              l’utilisation du moteur de recherche ou du formulaire de contact
            </p>
            <p>
              Les statistiques portent également sur des données commerciales
              telles que le nombre de missions réalisées, les volumes d’affaires
              par catégorie de consultants, clients.
            </p>
            <CgvContentTitle>Finalités</CgvContentTitle>
            <p>
              Les données que nous collectons nous permettent de fournir, gérer,
              protéger et améliorer nos services, d'en développer de nouveaux,
              et de protéger aussi bien nos utilisateurs que nous-mêmes.
            </p>
            <p>En particulier, ces données sont destinées à</p>

            <CgvList>
              <CgvListItem>
                La création et la gestion de votre compte
              </CgvListItem>
              <CgvListItem>L'utilisation des services du site</CgvListItem>
              <CgvListItem>
                Effectuer un suivi personnalisé pour vous adresser que des
                communications pertinentes et adaptées à vos besoins directement
                en lien avec les services du site
              </CgvListItem>
              <CgvListItem>
                Garantir la qualité des profils, lutter contre la fraude,
                vérifier les informations des profils
              </CgvListItem>
            </CgvList>

            <CgvContentTitle>Destinataires des données</CgvContentTitle>
            <p>
              Le Site est destinataire des données à caractère personnel
              recueillies par l'intermédiaire du site.
            </p>
            <p>
              Certains des services et fonctionnalités mis à votre disposition
              par Le Site requièrent que nous partagions des informations avec
              d'autres services ou partenaires comme un service d'emailing, un
              CRM, et autres outils d'analyse statistiques. Nous sommes
              également susceptibles de partager ces informations pour des
              raisons juridiques ou en cas de litige.
            </p>
            <p>
              Le Site ne revend pas vos données/les informations et documents
              que vous nous confiez à des tiers et nous ne divulguons pas
              d’informations personnelles et privées en dehors des situations
              décrites dans la présente Politique de confidentialité.
            </p>

            <CgvContentTitle>Sécurité des données</CgvContentTitle>
            <p>
              Nous mettons en œuvre les mesures les mesures techniques et
              organisationnelles appropriées afin de garantir la sécurité, la
              confidentialité, l'intégrité, la disponibilité et la résilience
              constantes des systèmes et des services de traitement de notre
              système d’information et de vos données et protéger les données
              contre destruction, la perte, l'altération, la divulgation non
              autorisée de données à caractère personnel transmises, conservées
              ou traitées d'une autre manière, ou l'accès non autorisé à de
              telles données.
            </p>
            <p>
              Nous nous engageons à mettre en œuvre tous les moyens disponibles
              pour assurer la sécurité et la confidentialité de ces données, en
              particulier :
            </p>
            <CgvList>
              <CgvListItem>
                Nous chiffrons la plupart de nos services à l’aide de la
                technologie SSL.
              </CgvListItem>
              <CgvListItem>
                L’accès aux données personnelles des utilisateurs est
                strictement réservé aux salariés et prestataires du Site qui ont
                besoin d’y accéder afin de les traiter en notre nom. Ces
                personnes sont soumises à de strictes obligations de
                confidentialité et sont susceptibles de faire l’objet de
                sanctions disciplinaires pouvant aller jusqu’au licenciement en
                cas de manquement à ces obligations.
              </CgvListItem>
            </CgvList>

            <CgvContentTitle>Gestion de vos informations</CgvContentTitle>
            <CgvList>
              <CgvListItem>
                Vous pouvez accéder et mettre à jour certaines de vos
                informations par le biais des paramètres de votre compte
                JEAN-MICHEL.IO
              </CgvListItem>
            </CgvList>

            <p>Rectification d’informations inexactes ou incomplètes :</p>
            <CgvList>
              <CgvListItem>
                Vous avez le droit de nous demander de corriger des informations
                personnelles inexactes ou incomplètes vous concernant.
              </CgvListItem>
            </CgvList>

            <p>Conservation des données :</p>
            <CgvList>
              <CgvListItem>
                Après clôture d'un compte, les données sont définitivement
                supprimées à l’exception de celles pouvant permettre au Site de
                justifier de l’exécution de ses obligations légales ou
                contractuelles. Les données ainsi conservées le sont pendant une
                période limitée
              </CgvListItem>
              <CgvListItem>Objection et suppression des données</CgvListItem>
              <CgvListItem>
                Lorsque vos informations personnelles sont traitées à des fins
                de marketing direct, vous pouvez, à tout moment, nous demander
                de cesser de traiter vos données en envoyant un e-mail via notre
                formulaire de contact en ligne.
              </CgvListItem>
            </CgvList>

            <p>Atteinte aux données et communication sous 72h :</p>
            <CgvList>
              <CgvListItem>
                En cas de violation ou suspicion de violation de données à
                caractères personnels, Le Site et ses sous-traitants notifieront
                la CNIL, 72h au plus tard, après en avoir pris connaissance.
              </CgvListItem>
              <CgvListItem>
                Le Site se réserve le droit de modifier à tout moment cette
                Politique de protection des données. En cas de modification
                substantielle telle que l’introduction d’une nouvelle finalité.
              </CgvListItem>
            </CgvList>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Cookies</CgvTitle>
          <CgvContent>
            <p>
              Lors de la consultation du Site, des cookies sont susceptibles
              d’être déposés sur le disque dur du terminal de l’Utilisateur
              (ordinateur, tablette, mobile, etc.). Un cookie est un fichier
              texte, qui a notamment pour but de collecter des informations
              relatives à la navigation et à l’identification de l’Utilisateur.
            </p>
            <p>
              La durée maximale de conservation des cookies implantés par la
              Société est de 12 mois. L’Utilisateur dispose toutefois de la
              possibilité de s’opposer à l’utilisation de ces cookies en
              configurant de manière appropriée son logiciel de navigation.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Propriété intellectuelle du Site</CgvTitle>
          <CgvContent>
            <p>
              Le Site et chacun des éléments qui le composent constituent,
              ensemble, une œuvre protégée par les lois en vigueur sur la
              propriété intellectuelle, dont JEAN-MICHEL.IO est titulaire.
              Aucune exploitation commerciale, reproduction, représentation,
              utilisation, adaptation, modification, incorporation, traduction,
              commercialisation, partielle ou intégrale de ces éléments ne
              pourra en être faite sans l'accord préalable et écrit du Site.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Propriété intellectuelle des contenus publiés</CgvTitle>
          <CgvContent>
            <p>
              Tout Utilisateur qui publie des éléments de contenu (texte,
              images, commentaires …) sur le Site garde l’entière propriété de
              tout ce qu’il publie
            </p>
            <p>
              En communiquant des contenus par le biais du Site, l’Utilisateur
              autorise expressément Le Site à utiliser, diffuser, héberger,
              stocker, reproduire, communiquer, publier, modifier, adapter,
              traduire et afficher tout ou partie du Contenu sur le Site, les
              réseaux sociaux ou sur tous autres supports, par tous moyens, à
              des fins d’exploitation, d’amélioration, de promotion, de
              marketing, de publicité des Services et du Site ou pour les
              besoins de la mise en place de partenariats. Cette autorisation
              est valable pour le monde entier et pour toute la durée de
              l’inscription de l’Utilisateur
            </p>
            <p>
              L’Utilisateur reconnaît que toute utilisation de son contenu
              effectuée par JEAN-MICHEL.IO préalablement à sa désinscription, la
              suppression ou la résiliation de son compte ne pourra pas être
              remise en cause.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Durée, résiliation et sanctions</CgvTitle>
          <CgvContent>
            <p>
              Le présent contrat est conclu pour une durée indéterminée à
              compter de l’acceptation des Conditions Générales par
              l'Utilisateur.
            </p>
            <p>
              Dans le cas où l’Utilisateur ne respecterait pas tout ou partie
              des Conditions Générales ou plus largement les lois et règlements
              en vigueur, la Société se réserve le droit de suspendre ou fermer
              le compte de l’Utilisateur immédiatement, sans préjudice de tous
              les dommages et intérêts éventuels que la Société pourrait
              réclamer
            </p>
            <p>
              La fermeture du compte de l’Utilisateur par la Société entraîne de
              plein droit la résiliation des présentes Conditions Générales.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Modification des conditions générales</CgvTitle>
          <CgvContent>
            <p>
              La Société se réserve le droit de modifier tout ou partie des
              présentes Conditions Générales. En cas de modification, la Société
              informera les Utilisateurs par tout moyen à sa disposition.
            </p>
            <p>
              L’Utilisateur disposera d’un délai de 48h à compter de la date de
              notification pour faire part de son éventuel désaccord quant aux
              nouvelles dispositions des Conditions Générales par tout moyen. A
              défaut de notification du désaccord dans les délais précisés
              ci-dessus, l’Utilisateur sera réputé avoir accepté les
              modifications apportées aux Conditions Générales.
            </p>
          </CgvContent>
        </CgvBloc>

        <CgvBloc>
          <CgvTitle>Droit applicable et juridiction compétente</CgvTitle>
          <CgvContent>
            <p>
              Les présentes Conditions Générales sont soumises au droit
              Mauricien.
            </p>
          </CgvContent>
        </CgvBloc>
      </CgvContainer>
    </Card>
  );
};

export default Cgv;
