import React, {useContext} from 'react';
import Button from "../Buttons/Button";
import {ModalContext} from "../../contexts/ModalContext";

const RegisterToSeeProfile = () => {
    const { toggleRegistration } = useContext(ModalContext);

    return (
        <div className="text-center register-profile">
            <Button variant={"cta-large"} onClick={() => toggleRegistration({subtitle: "Inscrivez-vous pour voir les freelances qui correspondent à votre recherche."})}>
                Obtenir un test gratuit
            </Button>
        </div>
    );
};

export default RegisterToSeeProfile;