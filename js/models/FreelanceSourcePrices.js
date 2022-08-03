import moment from 'moment';

class FreelanceSourcesPrices {
  constructor({ source, tjm, date }) {
    this._source = source; // the source wich we can find the tjm : see the label below
    this._tjm = tjm;
    this._date = date.date ? new Date(date.date) : new Date(date); // the date of the given tjm
  }

  getLabel() {
    const formatedDate = moment(this._date).format('DD/MM/YYYY'); // format the date

    switch (
      this._source // the given cases are the platforms that gives a tjm
    ) {
      case 'sm':
      case 'prejent':
      case 'malt':
      case 'toit':
      case 'trello':
      case 'lh': // selon ces platformes le tjm labes devient
        return `TJM à ${
          this._tjm
        }€ sur ${this._source.toUpperCase()} le ${formatedDate}`;

      case 'jm': // selon cette platformes le tjm
        return `TJM à ${this._tjm}€ renseigné par le freelance sur Jean-Michel.io le ${formatedDate}`;

      case 'jp-short':
        return `TJM (mission courte) à ${this._tjm}€ renseigné par le freelance sur Jean-Paul.io le ${formatedDate}`;

      case 'jp-long':
        return `TJM (mission longue) à ${this._tjm}€ renseigné par le freelance sur Jean-Paul.io le ${formatedDate}`;

      case 'toit_offer':
        return `TJM à ${this._tjm}€ renseigné sur une réponse à annonce le ${formatedDate}`;

      case 'toit_d':
        return `TJM à ${this._tjm}€ sur le DUMP TOIT le ${formatedDate}`;

      default:
        return `TJM à ${this._tjm}€ le ${formatedDate} (source inconnue)`;
    }
  }
}

export default FreelanceSourcesPrices;
