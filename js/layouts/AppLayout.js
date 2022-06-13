import "./layout.scss"
import ModalRegistrationConfirmMessage from "../modals/ModalRegistration/ModalRegistrationConfirmMessage/ModalRegistrationConfirmMessage";
import SideBar from "../components/SideBar/SideBar";
import React from "react";
import PageWrapper from "./PageWrapper";
import useAuthManager from "../hooks/useAuthManager";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ModalModeration from "../modals/ModalModeration/ModalModeration";
import ModalFreelanceReport from "../modals/ModalFreelanceReport/ModalFreelanceReport";
import ModalSurprise from "../modals/ModalSurprise/ModalSurprise";
import ModalFreelanceContact from "../modals/ModalFreelanceContact/ModalFreelanceContact";
import ModalFreelancePremium from "../modals/ModalFreelancePremium/ModalFreelancePremium";
import ModalPremiumFonctionality from "../modals/ModalPremiumFonctionality/ModalPremiumFonctionality";
import ModalFreelanceTJM from "../modals/ModalFreelanceTJM/ModalFreelanceTJM";


export default function AppLayout({ children }) {

    const {isLoggedWithEsnAccount, isCollaborator} = useAuthManager()

    if(isLoggedWithEsnAccount() === true) {
        return (
            <>
                <main className={"app-layout"}>
                    <SideBar>
                        <Navbar withSideBar theme={"light"}/>
                        <PageWrapper>{children}</PageWrapper>
                        <Footer reduced/>
                    </SideBar>
                </main>

                {isCollaborator() === true &&
                    <ModalModeration/>
                }

                <ModalFreelanceTJM/>
                <ModalPremiumFonctionality/>
                <ModalFreelancePremium/>
                <ModalFreelanceContact/>
                <ModalRegistrationConfirmMessage/>
                <ModalFreelanceReport/>
                <ModalSurprise/>
            </>
        )
    }

    else {
        return (
            <>
                <main className={"app-layout"}>
                    <Navbar theme={"light"}/>
                    <PageWrapper style={{paddingTop: 80}}>{children}</PageWrapper>
                    <Footer reduced/>
                </main>

                <ModalFreelanceTJM/>
                <ModalFreelanceContact/>
            </>
        )
    }
}