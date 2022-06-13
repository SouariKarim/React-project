import React, {useContext, useState} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import Modal, {ModalBody, ModalHeader, ModalTitle} from "../Modal";
import {PulseLoader} from "react-spinners";
import Button from "../../components/Buttons/Button";
import "./ModalFreelanceReport.scss"
import {faFlag} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import useFreelancesApi from "../../hooks/useFreelancesApi";
import useToast from "../../hooks/useToast";


export default function ModalFreelanceReport() {

    const {isShowingFreelanceReport, toggleFreelanceReport, optionFreelanceReport, toggleSurprise} = useContext(ModalContext);
    const toast = useToast()
    const freelance = optionFreelanceReport ? optionFreelanceReport.freelance : null
    const [isLoading, setLoading] = useState(false)
    const {reportFreelance} = useFreelancesApi();
    const [reportData, setReportData] = useState({
        brokenPhone: false,
        invalidPhone: false,
        invalidEmail: false,
        invalidLinkedIn: false,
        notFreelance: false,
        text: ""
    })


    const reset = () => {
        setReportData({
            brokenPhone: false,
            invalidPhone: false,
            invalidEmail: false,
            invalidLinkedIn: false,
            notFreelance: false,
            text: ""
        })
    }


    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();

        toast.promise({
            promise: reportFreelance(freelance.id, reportData),
            loadingText: "Signalement en route",
            successText: "Bien reçu, merci !",
            style: {minWidth: 200}
        }).then(() => {
            toggleFreelanceReport()
            reset()
            surprise()
        }).finally(() => {
            setLoading(false)
        })
    }


    const surprise = () => {
        let reports = 9
        if (localStorage.getItem("reports")) {
            reports = parseInt(localStorage.getItem("reports")) - 1
        }

        if (reports <= 0) {
            toast.success({
                text: '10 signalements consécutifs !\nVoici ta surprise :',
                icon: '👏',
                duration: 4000
            })
            setTimeout(() => toggleSurprise(), 1000);
            reports = 10
        }
        else {
            setTimeout(() =>
                toast.normal({
                    content: (
                        <div>
                            <p>Merci d'aider à l'amélioration de<br/>Jean-Michel.io ! Plus que <span>{reports} signalements</span> pour avoir une surprise.</p>
                        </div>
                    ),
                    className: "surprise-toast",
                    duration: 4000
                })
            , 1000)
        }
        localStorage.setItem("reports", String(reports))
    }


    const updateReportData = (type, value) => {
        const data = {...reportData}
        data[type] = value
        setReportData(data)
    }


    return (
        <Modal
            isShowing={isShowingFreelanceReport}
            toggle={toggleFreelanceReport}
            className={"freelance-report-modal"}
            hideSeparation
        >
            <ModalHeader closeButton>
                <ModalTitle>Jean-Michel YAHUNBLEM</ModalTitle>
            </ModalHeader>

            <ModalBody>
                {freelance &&
                    <div className={"freelance-report"}>
                        <p className={"report-about"}>Pourquoi il te plaît pas <span>{freelance.full_name}</span> ?<br/> Aide nous à corriger d'éventuelles erreurs dans l'agrégation des données affichées.</p>
                        <form className={"report-form"} onSubmit={handleSubmit}>
                            <label>
                                <input name={"brokenPhone"} checked={reportData.brokenPhone}
                                       onChange={() => updateReportData("brokenPhone", !reportData.brokenPhone)} type={"checkbox"}/>
                                Le téléphone ne fonctionne pas
                            </label>

                            <label>
                                <input name={"invalidPhone"} checked={reportData.invalidPhone}
                                       onChange={() => updateReportData("invalidPhone", !reportData.invalidPhone)} type={"checkbox"}/>
                                Le téléphone est invalide (mauvaise personne)
                            </label>


                            <label>
                                <input name={"invalidEmail"} checked={reportData.invalidEmail}
                                       onChange={() => updateReportData("invalidEmail", !reportData.invalidEmail)} type={"checkbox"}/>
                                Le mail est invalide
                            </label>

                            <label>
                                <input name={"invalidLinkedIn"} checked={reportData.invalidLinkedIn}
                                       onChange={() => updateReportData("invalidLinkedIn", !reportData.invalidLinkedIn)} type={"checkbox"}/>
                                Le LinkedIn ne correspond pas avec le CV
                            </label>

                            <label>
                                <input name={"notFreelance"} checked={reportData.notFreelance}
                                       onChange={() => updateReportData("notFreelance", !reportData.notFreelance)} type={"checkbox"}/>
                                Le profil n'est pas freelance
                            </label>

                            <label className={"mt-3"}>
                                Autre (préciser) :
                                <textarea name={"text"} value={reportData.text} placeholder={"Explique à Jean-Michel quel est le problème."}
                                          onChange={(e) => updateReportData("text", e.currentTarget.value)}/>
                            </label>

                            <div className={"actions"}>
                                {isLoading ?
                                    <div className={"loader"}>
                                        <PulseLoader color={"#354255"}/>
                                    </div>
                                    :
                                    <Button variant={"cta secondary"} type={"submit"}>
                                        <FontAwesomeIcon icon={faFlag}/>
                                        Envoyer
                                    </Button>
                                }
                                <Button variant={"link"} onClick={toggleFreelanceReport}>Annuler</Button>
                                <p>Merci beaucoup {'<3'}</p>
                            </div>
                        </form>
                    </div>
                }
            </ModalBody>
        </Modal>
    )
}