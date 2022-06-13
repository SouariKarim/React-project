import './Home.scss';
import MainTitle from "../Titles/MainTitle";
import Button from "../Buttons/Button";
import useAuthManager from "../../hooks/useAuthManager";
import SunsetBand from "../Bands/SunsetBand";
import {useContext, useEffect, useState} from "react";
import TrouvetouSection from "./Sections/TrouvetouSection";
import BasicBand from "../Bands/BasicBand";
import KomenSection from "./Sections/KomenSection";
import {faBuilding, faClipboardCheck, faUsers} from "@fortawesome/free-solid-svg-icons";
import BrandBand from "../Bands/BrandBand";
import StatsSection from "./Sections/StatsSection";
import TemoinSection from "./Sections/TemoinSection";
import KestionSection from "./Sections/KestionSection";
import {ModalContext} from "../../contexts/ModalContext";
import CountUp from "react-countup";
import useAxios from "../../hooks/useAxios";
import useMetricsApi from "../../hooks/useMetricsApi";
import Metric from "../../models/Metric";
import Parallax from "../Parallax/Parallax";


export default function Home({showRegisterModal = false}) {

    const {isLogged, user} = useAuthManager()
    const [metrics, setMetrics] = useState(new Metric({}))
    const {toggleRegistration} = useContext(ModalContext);
    const {getAllMetrics} = useMetricsApi();
    const [cancelToken] = useState(useAxios().CancelToken.source())

    const KEYS = [
        {
            icon: faClipboardCheck,
            value: {data: "RGPD", type: "string", marker: ''},
            text: "Compliant"
        },
        {
            icon: faUsers,
            value: {data: metrics.totalFreelances, type: "int", marker: ''},
            text: "Freelances IT scrapés"
        },
        {
            icon: faBuilding,
            value: {data: metrics.totalEsn, type: "marker", marker: ''},
            text: "ESN clientes"
        },
    ]


    useEffect(() => {
        if (showRegisterModal) {
            toggleRegistration(true);
        }

        getAllMetrics({
            cancelToken: cancelToken.token,
        }).then((metrics) => {
            setMetrics(metrics);
        })

        return () => {
            if (cancelToken) {
                cancelToken.cancel();
            }
        }
        // eslint-disable-next-line
    }, []);
    

    return (
        <div className={"home"}>
            <Parallax>
                <section className={"section-presentation"}>
                    <MainTitle fromHomePage>
                        Accédez à tous les freelances informatiques,<br/> enfin réunis en un seul endroit.
                    </MainTitle>
                    <p className={"subtext"}>
                        Agrégateur de freelances en régie, scrapés partout sur le web. <br/>
                        Profils enrichis avec TJM, Disponibilités et Coordonnées.
                    </p>
                    {(isLogged()) ?
                        <Button variant={"cta"} to={"SEARCH"}>
                            Ouvrir la CVthèque
                        </Button>
                        :
                        <Button variant={"cta"} onClick={toggleRegistration}>
                            Essayer la CVthèque gratuitement
                        </Button>
                    }

                    <span className={"cvtheque-indicator"}>
                        {(isLogged()) ? `Ravi de vous revoir ${user.first_name} !` : `${metrics.monthTrial} ESN ont démarré un test le mois dernier`}
                    </span>
                </section>
            </Parallax>

            <SunsetBand keys={KEYS}/>

            <TrouvetouSection className={"section-trouvetou"}/>

            <BasicBand>
                <p>Jean-Michel.io extrait les freelances partout sur le web et les complète
                    avec <br/><span>TJM</span>, <span>Coordonnées</span> et <span>Disponibilité</span></p>
            </BasicBand>

            <KomenSection className={"section-komen"}/>

            <BrandBand>
                <p className={"pt-4 pb-4"}>CVthèque de <CountUp duration={3} delay={1}
                                                                end={metrics.totalFreelances} separator={' '}
                                                                preserveValue={true}/> freelances<br/>en recherche
                    de <span>missions longues</span> chez le client en <span>Régie / AT</span></p>
            </BrandBand>

            <StatsSection className={"section-stats"}/>

            <BasicBand reverse>
                <p>98% des freelances en régie ont un compte <span>LinkedIn</span>.<br/>
                    Jean-Michel.io les <span>extrait</span> pour les mettre sur sa <span>CVthèque</span></p>
            </BasicBand>

            <TemoinSection className={"section-temoin"}/>

            <SunsetBand reverse keys={[
                <p>La plus grande CVthèque de freelances informatiques en France<br/> 100% dédiée aux ESN</p>
            ]}>
            </SunsetBand>

            <KestionSection className={"section-kestion"}/>
        </div>
    )
}