/// the constants used by the site
const Constant = {
  PRICING_TYPE: 'annual',
  PRICING_RADIN: 0,
  PRICING_SMART: 3500,
  PRICING_SMART_REDUCTION: 2900,
  PRICING_TOUT_PUISSANT: 7000,
  PRICING_TOUT_PUISSANT_REDUCTION: 5500,

  FILTER_BY_PERTINENCE: 'pertinence',
  FILTER_BY_DATE: 'date',

  SUBSCRIPTION_CODE_RADIN: 'RADIN',
  SUBSCRIPTION_CODE_SMART: 'SMART',
  SUBSCRIPTION_CODE_TOUT_PUISSANT: 'TOUT_PUISSANT',

  ENGLISH_LEVEL_DEFAULT: 0,
  ENGLISH_LEVEL_GOOD: 2,
  ENGLISH_LEVEL_FLUENT: 3,
  ENGLISH_LEVEL_NATIVE: 5,

  COMMENT_PARSER_MARKUP: '&::&',
  COMMENT_PARSER_LABEL: {
    notDipso: 'Plus Dispo',
    notFreelance: 'Plus Freelance',
    notInterested: 'Pas intéressé',
    msgSent: 'Mail/SMS envoyé',
    qualified: 'Qualifié au tel',
    noResponse: 'Call non répondu',
    blacklisted: 'Blacklisté',
    remote: 'Full remote',
  },
};

export default Constant;
