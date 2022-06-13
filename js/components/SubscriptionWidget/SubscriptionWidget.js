import "./SubscriptionWidget.scss"
import Link from "../Link/Link";
import useAuthManager from "../../hooks/useAuthManager";
import {useContext, useEffect} from "react";
import {ModalContext} from "../../contexts/ModalContext";
import {motion, useAnimation} from "framer-motion";
import moment from "moment";
import Constant from "../../constant";


export default function SubscriptionWidget() {

    const motionControls = useAnimation()
    const { toggleContactUsToSubscribe } = useContext(ModalContext);
    const {isLogged, isAdmin, isMatcher, user, isCollaborator, isInTrialPeriod, isLoggedWithPremiumEsnAccount} = useAuthManager()
    const startAnimation = isCollaborator() === false && ( user?.subscription.code === Constant.SUBSCRIPTION_CODE_RADIN || user.subscription_expiration_days < 2 )
    const motionStatus = {animate: { height: 0, opacity: 0, marginBottom: 0 }}
    const motionMsg = {animate: { fontSize: '15px', lineHeight: '18px', height: '100%', color: "#F9A634", opacity: 1, fontWeight: 500 }}
    const lastTestEndEffectDate = user.lastTestDate ? user.lastTestDate.add(6, "month") : null

    let account_details = {}

    if(isAdmin() === true){
        account_details.message = "Votre statut"
        account_details.title = "ADMIN"
        account_details.expiration = "Pas d'expiration"
    }
    else if(isMatcher() === true){
        account_details.message = "Votre statut"
        account_details.title = "MATCHER"
        account_details.expiration = "Pas d'expiration"
    }
    else{
        account_details.message = "Votre abonnement"

        if(user?.subscription.code === Constant.SUBSCRIPTION_CODE_RADIN){
            account_details.title = "GRATUIT"

            if (lastTestEndEffectDate && moment().isBefore(lastTestEndEffectDate)) {
                account_details.expiration = `Passer à la version Smart ?`
            }
            else if (lastTestEndEffectDate && moment().isAfter(lastTestEndEffectDate)) {
                account_details.expiration = `Retester gratuitement la version Smart ?`
            }
            else {
                account_details.expiration = `Tester la version Smart gratuitement ?`
            }
        }
        else{
            const expiration_timer = user.subscription_expiration_timer
            account_details.title = user?.subscription.name.toUpperCase()

            if (isInTrialPeriod()) {
                account_details.expiration = (expiration_timer !== 0)? `Expiration du test dans ${expiration_timer}` : 'Test expiré, passer à la version SMART ?'
            }
            else {
                account_details.expiration = (expiration_timer !== 0)? `Expiration dans ${expiration_timer}` : 'Abonnement expiré, à renouveler'
            }
        }
    }


    useEffect(() => {
        if(startAnimation === true){
            motionControls.start("animate")
            return () => motionControls.stop()
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleWidgetClick = (e) => {
        if(
            isCollaborator() === false &&
            user?.subscription.code === Constant.SUBSCRIPTION_CODE_RADIN &&
            (lastTestEndEffectDate === null || moment().isAfter(lastTestEndEffectDate))
        ) {
            e.stopPropagation()
            e.preventDefault()
            toggleContactUsToSubscribe({askFreeTrial: true})
        }
    }


    if(isLogged() === true) {
        return (
            <Link
                className={"subscription-details"}
                onClick={handleWidgetClick}
                to={(isLoggedWithPremiumEsnAccount() && !isInTrialPeriod()) ? "CREDIT_MANAGE" : "PRICING"}
                style={{width: startAnimation === true ? "280px" : "auto"}}
            >
                 <motion.p variants={motionStatus} animate={motionControls}
                          transition={{repeat: Infinity, repeatDelay: 7, duration: 0.3, repeatType: "reverse"}}
                          className={"info"}>

                    {account_details.message} :
                    <span>{account_details.title}</span>
                </motion.p>

                <motion.p variants={motionMsg} animate={motionControls}
                          transition={{repeat: Infinity, repeatDelay: 7, duration: 0.3, repeatType: "reverse"}}
                          className={"expiration"}>

                    {account_details.expiration}
                </motion.p>
            </Link>
        )
    }
}
