import useFreelancesApi from "../../hooks/useFreelancesApi";
import useToast from "../../hooks/useToast";
import StarsNotation from "../Form/StarsNotation/StarsNotation";
import classes from "./notation.module.scss"
import {useState} from "react";
import useAuthManager from "../../hooks/useAuthManager";


export default function FreelanceNotation({ freelance, label = null, className, labelClassName }) {

    const {editFreelanceNotation} = useFreelancesApi()
    const toast = useToast()
    const {user, setUser} = useAuthManager()
    const [freelanceNote, setFreelanceNote] = useState(freelance.note)


    const handleNotationChange = (note) => {
        toast.promise({
            promise: editFreelanceNotation(freelance.id, note),
            loadingText: "Modification de la notation",
            successText: note === 0 ? "Note du freelance supprimée !" : "Note du freelance modifiée !",
            style: {minWidth: 280}
        }).then((res) => {
            if (!res && note === 0) {
                setFreelanceNote(0);
                user.company.nb_freelance_notations = user.company.nb_freelance_notations - 1;
            }
            else {
                setFreelanceNote(res.note);
                user.company.nb_freelance_notations = res.company.nb_freelance_notations;
            }
            setUser(user);

        }).catch((err) => {
        })
    }


    return (
        <div className={classes.freelanceNotation}>
            {label &&
                <h3 className={labelClassName}>
                    {label}
                </h3>
            }

            <StarsNotation
                value={freelanceNote}
                setValue={handleNotationChange}
                className={className}
            />
        </div>
    )
}