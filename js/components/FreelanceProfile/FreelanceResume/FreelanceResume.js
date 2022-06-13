import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import "./FreelanceResume.scss";
import useGodzilla from '../../../hooks/useGodzilla';
import {UserContext} from '../../../contexts/UserContext';
import Pdf from '../../Pdf/Pdf';
import JmSpinner from "../../JmSpinner/JmSpinner";
import {FreelanceSectionCard} from "../../FreelanceSectionCard/FreelanceSectionCard";


const FreelanceResume = ({freelance}) => {
    const {freelancesApi} = useGodzilla();
    const {loggedUser} = useContext(UserContext);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMounted = useRef();

    const fetchResume = useCallback(() => {
        setLoading(true);

        freelancesApi.getResume({freelance}).then(url => {
            if (isMounted.current) {
                if(url === null) setResume(<ResumeMissing error/>)
                else setResume((<Pdf url={url}/>));
            }
        }).catch(err => {
            if (isMounted.current) {
                setResume(<ResumeMissing error/>)
            }
        }).finally(() => {
            if (isMounted.current) {
                setLoading(false);
            }
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [freelancesApi]);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setResume(null);

        if(!freelance.hasResume || !freelance.can_open_freelance){
            setResume(<ResumeMissing/>)
        }

        else if(freelance && freelance.hasResume){
            fetchResume()
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedUser, freelance]);


    return (
        <div className={"freelance-resume"}>
            {loading && <JmSpinner text={"Jean-Michel BIOGRAPHE"} customStyle={{marginTop: "0", marginBottom: "0"}}/>}
            {resume}
        </div>
    );
};

export default FreelanceResume;


const TEXTS = [
    "mais il y travaille",
    "mais il vous envoie beaucoup d'amour à la place",
    "car il n'est diffusé sur aucune source publique",
    "mais vous pourrez le demander au freelance :)",
    "car le freelance ne l'a pas diffusé"
];

const ResumeMissing = ({error = false}) => {

    const [randomText, setRandomText] = useState(TEXTS[0]);

    useEffect(() => {
        const random = Math.floor(Math.random() * TEXTS.length)
        setRandomText(TEXTS[random])
    }, []);


    return(
        <FreelanceSectionCard title={"CV"} className={"missing-resume"}>
            <p style={{margin: "10px 0 0"}}>
                {error ?
                    "Jean-Michel.io n'a pas réussi à charger et à afficher ce CV."
                    :
                    "Jean-Michel.io n'a pas trouvé le CV de ce profil sur le web " + randomText + "."
                }
            </p>
        </FreelanceSectionCard>
    )
}