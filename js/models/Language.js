class Language {
  constructor({ name, level }) {
    this._name = name;
    this._level = level;
  }

  get name() {
    return this._name;
  }

  get level() {
    return this._level;
  }

  get stringLevel() {
    // based on the value of the level
    switch (this._level) {
      case 0:
      case 1:
        return 'Notions / Moyen';
      case 2:
        return 'Bon niveau';
      case 3:
        return 'Courant';
      case 5:
        return 'Bilingue / Langue maternelle';
      default:
        return null;
    }
  }
}

export default Language;
