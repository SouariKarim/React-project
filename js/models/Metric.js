class Metrics
{
    constructor({total_freelances, total_premium_freelances, total_esn, total_final_clients, credits_consume_by_week, month_trial}) {
        this._totalFreelances = 75000;
        this._totalPremiumFreelances = 15000;
        this._totalEsn = 900;
        this._totalFinalClients = 200;
        this._creditsConsumeByWeek = 10000
        this._monthTrial = 90

        if(total_freelances){
            this._totalFreelances = total_freelances
        }

        if(total_premium_freelances){
            this._totalPremiumFreelances = total_premium_freelances
        }

        if(total_esn){
            this._totalEsn = total_esn
        }

        if(total_final_clients){
            this._totalFinalClients = total_final_clients
        }

        if(credits_consume_by_week){
            this._creditsConsumeByWeek = credits_consume_by_week
        }

        if(month_trial){
            this._monthTrial = month_trial
        }
    }

    get totalFreelances() {
        return this._totalFreelances;
    }

    get totalPremiumFreelances() {
        return this._totalPremiumFreelances
    }

    get totalEsn() {
        return this._totalEsn
    }

    get totalFinalClients() {
        return this._totalFinalClients
    }

    get creditsConsumeByWeek() {
        return this._creditsConsumeByWeek
    }

    get monthTrial() {
        return this._monthTrial
    }
}

export default Metrics;