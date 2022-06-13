import moment from "moment";


class FreelanceSourcesPrices
{
    constructor({source, tjm, date}) {
        this._source = source;
        this._tjm = tjm;
        this._date = date.date ? new Date(date.date) : new Date(date)
    }

    getLabel() {
        const formatedDate = moment(this._date).format("DD/MM/YYYY")

        switch (this._source){
            case "sm" :
            case "prejent" :
            case "malt" :
            case "toit" :
            case "trello" :
            case "lh" :
                return `TJM à ${this._tjm}€ sur ${this._source.toUpperCase()} le ${formatedDate}`

            case "jm" :
                return `TJM à ${this._tjm}€ renseigné par le freelance sur Jean-Michel.io le ${formatedDate}`

            case "jp-short" :
                return `TJM (mission courte) à ${this._tjm}€ renseigné par le freelance sur Jean-Paul.io le ${formatedDate}`

            case "jp-long" :
                return `TJM (mission longue) à ${this._tjm}€ renseigné par le freelance sur Jean-Paul.io le ${formatedDate}`

            case "toit_offer" :
                return `TJM à ${this._tjm}€ renseigné sur une réponse à annonce le ${formatedDate}`

            case "toit_d":
                return `TJM à ${this._tjm}€ sur le DUMP TOIT le ${formatedDate}`

            default :
                return `TJM à ${this._tjm}€ le ${formatedDate} (source inconnue)`
        }
    }
}

export default FreelanceSourcesPrices