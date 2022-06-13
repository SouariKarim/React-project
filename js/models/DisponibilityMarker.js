import moment from "moment/moment";

class DisponibilityMarker
{
    constructor({code, disponibility, date}) {
        this._code = code;
        this._disponibility = disponibility;
        this._date = date.date ? new Date(date.date) : new Date(date)
    }

    get code() {
        return this._code;
    }

    get date() {
        return this._date;
    }

    get disponibility() {
        return this._disponibility;
    }

    date_to_days_ago(date) {
        if (date === null) {
            return null;
        }

        const now = moment();
        const diffDays = Math.round(now.diff(date, 'days', true));

        if (diffDays < 1) {
            const diffHours = Math.round(now.diff(date, 'hours', true));
            if (diffHours < 1) {
                const diffMinutes = Math.round(now.diff(date, 'minutes', true));

                return diffMinutes + "m";
            }

            return diffHours + "h";
        }

        if (diffDays <= 31) {
            if (diffDays <= 1) {
                return diffDays + "j";
            }
            return diffDays + "j";
        }

        const diffMonths = Math.round(now.diff(date, 'months', true));
        if (diffMonths <= 12) {
            if (diffMonths <= 1) {
                return diffMonths + " mois";
            }
            return diffMonths + " mois";
        }


        const diffYears = Math.round(now.diff(date, 'years', true));
        if (diffYears <= 1) {
            return diffYears + " an";
        }

        return diffYears + " ans";
    }

    get dateFormatted() {
        let day = ("0" + (this.date.getDate())).slice(-2)
        let monthIndex = ("0" + (this.date.getMonth() + 1)).slice(-2)

        let year = this.date.getFullYear();

        return day + "/" + monthIndex + "/" + year + " (il y a " + this.date_to_days_ago(this.date)+ ") ";
    }

    get label() {
        switch (this._code) {
            case "MARKER_A_LECOUTE_ESN_PARTENAIRE":
                return "Renseigné A L'ECOUTE par une ESN partenaire le " + this.dateFormatted;
            case "MARKER_VU_DISPONIBLE_JOBBOARD":
                return "S'est mis DISPONIBLE sur un site d'emploi le " + this.dateFormatted;
            case "MARKER_RENSEIGNE_DISPONIBLE_ESN":
                return "Renseigné DISPONIBLE par une ESN partenaire le " + this.dateFormatted;
            case "MARKER_OPEN_TO_WORK_LK":
                return "OPEN TO WORK sur LinkedIn depuis le " + this.dateFormatted;
            case "MARKER_NOT_OPEN_TO_WORK_LK":
                return "N'est plus OPEN TO WORK sur LinkedIn depuis le " + this.dateFormatted;
            case "MARKER_VIEW_AVAILABLE_ON_MALT":
                return "Vu DISPONIBLE sur Malt le " + this.dateFormatted;
            case "MARKER_VIEW_NOT_AVAILABLE_ON_MALT":
                return "N'est PLUS DISPONIBLE sur Malt depuis le " + this.dateFormatted;
            case "MARKER_VIEW_AVAILABLE_ON_JM":
                return "S'est signalé DISPONIBLE sur Jean-Michel.io le " + this.dateFormatted;
            case "MARKER_VIEW_NOT_AVAILABLE_ON_JM":
                return "S'est signalé NON DISPONIBLE sur Jean-Michel.io le " + this.dateFormatted;
            case "MARKER_A_LECOUTE_APEC":
                return "Vu A L'ECOUTE sur l'APEC le " + this.dateFormatted;
            case "MARKER_VIEW_NOT_AVAILABLE_ON_APEC":
                return "A supprimé son profil sur l'APEC le " + this.dateFormatted;
            case "MARKER_UPDATE_ON_APEC":
                return "Inscription/MAJ sur l'APEC le " + this.dateFormatted;
            case "MARKER_VIEW_REMOVE_FROM_MALT":
                return "A supprimé son profil Malt le " + this.dateFormatted;
            case "MARKER_UPDATE_BY_JM_MODERATOR":
                return "Indiqué disponible par un modérateur JM le " + this.dateFormatted;
            case "MARKER_VIEW_AVAILABLE_ON_JP":
                return "S'est signalé DISPONIBLE sur Jean-Paul.io le " + this.dateFormatted;
            case "MARKER_VIEW_UNKNOWN_AVAILABLE_ON_JP":
                return "A indiqué une disponibilité INCONNUE sur Jean-Paul.io le " + this.dateFormatted;
            case "MARKER_VIEW_NOT_AVAILABLE_ON_JP":
                return "S'est signalé NON DISPONIBLE sur Jean-Paul.io le " + this.dateFormatted;
            case "MARKER_VIEW_REMOVE_FROM_JP":
                return "A supprimé son profil Jean-Paul.io le " + this.dateFormatted;
            default:
                return this._code;
        }
    }
}

export default DisponibilityMarker