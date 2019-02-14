import formSections from './formSections/index'
import { FOREIGN_BUSINESS_ADVICE, FOREIGN_BUSINESS_FAMILY, FOREIGN_BUSINESS_EMPLOYMENT, FOREIGN_BUSINESS_VENTURES, FOREIGN_BUSINESS_CONFERENCES, FOREIGN_BUSINESS_CONTACT, FOREIGN_BUSINESS_SPONSORSHIP, FOREIGN_BUSINESS_POLITICAL, FOREIGN_BUSINESS_VOTING } from '../constants/sections';

export const SF85 = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ],
  },

  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_REVIEW,
    ],
  },

  // {
  //   ...formSections.CITIZENSHIP,
  //   subsections: [
  //     formSections.CITIZENSHIP_INTRO,
  //     formSections.CITIZENSHIP_STATUS,
  //     formSections.CITIZENSHIP_MULTIPLE,
  //     formSections.CITIZENSHIP_PASSPORTS,
  //     formSections.CITIZENSHIP_REVIEW,
  //   ]
  // }

  /*
  sections.CITIZENSHIP_INTRO,
  sections.CITIZENSHIP_STATUS,
  sections.CITIZENSHIP_MULTIPLE,
  sections.CITIZENSHIP_PASSPORTS,
  sections.CITIZENSHIP_REVIEW,

  sections.MILITARY_INTRO,
  sections.MILITARY_SELECTIVE,
  sections.MILITARY_HISTORY,
  sections.MILITARY_FOREIGN,
  sections.MILITARY_REVIEW,

  sections.FOREIGN_INTRO,
  sections.FOREIGN_PASSPORT,
  sections.FOREIGN_REVIEW,

  sections.FINANCIAL_INTRO,
  sections.FINANCIAL_BANKRUPTCY,
  sections.FINANCIAL_GAMBLING,
  sections.FINANCIAL_TAXES,
  sections.FINANCIAL_CARD,
  sections.FINANCIAL_CREDIT,
  sections.FINANCIAL_DELINQUENT,
  sections.FINANCIAL_NONPAYMENT,
  sections.FINANCIAL_REVIEW,

  sections.SUBSTANCE_USE_INTRO,
  sections.SUBSTANCE_USE_DRUGS,
  sections.SUBSTANCE_USE_DRUGS_USAGE,
  sections.SUBSTANCE_USE_DRUGS_PURCHASE,
  sections.SUBSTANCE_USE_DRUGS_CLEARANCE,
  sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  sections.SUBSTANCE_USE_DRUGS_MISUSE,
  sections.SUBSTANCE_USE_DRUGS_ORDERED,
  sections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
  sections.SUBSTANCE_USE_REVIEW,

  sections.LEGAL_INTRO,
  sections.LEGAL_POLICE,
  sections.LEGAL_POLICE_OFFENSES,
  sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  sections.LEGAL_INVESTIGATIONS,
  sections.LEGAL_INVESTIGATIONS_HISTORY,
  sections.LEGAL_INVESTIGATIONS_REVOKED,
  sections.LEGAL_INVESTIGATIONS_DEBARRED,
  sections.LEGAL_ASSOCIATIONS,
  sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  sections.LEGAL_REVIEW,
  */
]

export const SF85P = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ],
  },

  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_FEDERAL,
      formSections.HISTORY_REVIEW,
    ],
  },

  /*
  sections.RELATIONSHIPS_INTRO,
  sections.RELATIONSHIPS_STATUS,
  sections.RELATIONSHIPS_STATUS_MARITAL,
  sections.RELATIONSHIPS_STATUS_COHABITANTS,
  sections.RELATIONSHIPS_PEOPLE,
  sections.RELATIONSHIPS_RELATIVES,
  sections.RELATIONSHIPS_REVIEW,

  sections.CITIZENSHIP_INTRO,
  sections.CITIZENSHIP_STATUS,
  sections.CITIZENSHIP_MULTIPLE,
  sections.CITIZENSHIP_PASSPORTS,
  sections.CITIZENSHIP_REVIEW,

  sections.MILITARY_INTRO,
  sections.MILITARY_SELECTIVE,
  sections.MILITARY_HISTORY,
  sections.MILITARY_FOREIGN,
  sections.MILITARY_REVIEW,

  sections.FOREIGN_INTRO,
  sections.FOREIGN_PASSPORT,
  sections.FOREIGN_TRAVEL,
  sections.FOREIGN_REVIEW,

  sections.FINANCIAL_INTRO,
  sections.FINANCIAL_BANKRUPTCY,
  sections.FINANCIAL_GAMBLING,
  sections.FINANCIAL_TAXES,
  sections.FINANCIAL_CARD,
  sections.FINANCIAL_CREDIT,
  sections.FINANCIAL_DELINQUENT,
  sections.FINANCIAL_NONPAYMENT,
  sections.FINANCIAL_REVIEW,

  sections.SUBSTANCE_USE_INTRO,
  sections.SUBSTANCE_USE_DRUGS,
  sections.SUBSTANCE_USE_DRUGS_USAGE,
  sections.SUBSTANCE_USE_DRUGS_PURCHASE,
  sections.SUBSTANCE_USE_DRUGS_CLEARANCE,
  sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  sections.SUBSTANCE_USE_DRUGS_MISUSE,
  sections.SUBSTANCE_USE_DRUGS_ORDERED,
  sections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
  sections.SUBSTANCE_USE_ALCOHOL,
  sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
  sections.SUBSTANCE_USE_ALCOHOL_ORDERED,
  sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
  sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
  sections.SUBSTANCE_USE_REVIEW,

  sections.LEGAL_INTRO,
  sections.LEGAL_POLICE,
  sections.LEGAL_POLICE_OFFENSES,
  sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  sections.LEGAL_INVESTIGATIONS,
  sections.LEGAL_INVESTIGATIONS_HISTORY,
  sections.LEGAL_INVESTIGATIONS_REVOKED,
  sections.LEGAL_INVESTIGATIONS_DEBARRED,
  sections.LEGAL_COURT,
  sections.LEGAL_TECHNOLOGY,
  sections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
  sections.LEGAL_TECHNOLOGY_MANIPULATING,
  sections.LEGAL_TECHNOLOGY_UNLAWFUL,
  sections.LEGAL_ASSOCIATIONS,
  sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  sections.LEGAL_REVIEW,
  */
]

export const SF86 = [
  {
    ...formSections.IDENTIFICATION,
    subsections: [
      formSections.IDENTIFICATION_INTRO,
      formSections.IDENTIFICATION_NAME,
      formSections.IDENTIFICATION_BIRTH_DATE,
      formSections.IDENTIFICATION_BIRTH_PLACE,
      formSections.IDENTIFICATION_SSN,
      formSections.IDENTIFICATION_OTHER_NAMES,
      formSections.IDENTIFICATION_CONTACTS,
      formSections.IDENTIFICATION_PHYSICAL,
      formSections.IDENTIFICATION_REVIEW,
    ]
  },
  {
    ...formSections.HISTORY,
    subsections: [
      formSections.HISTORY_INTRO,
      formSections.HISTORY_RESIDENCE,
      formSections.HISTORY_EMPLOYMENT,
      formSections.HISTORY_EDUCATION,
      formSections.HISTORY_FEDERAL,
      formSections.HISTORY_REVIEW,
    ]
  },
  {
    ...formSections.RELATIONSHIPS,
    subsections: [
      formSections.RELATIONSHIPS_INTRO,
      formSections.RELATIONSHIPS_STATUS,
      formSections.RELATIONSHIPS_STATUS_MARITAL,
      formSections.RELATIONSHIPS_STATUS_COHABITANTS,
      formSections.RELATIONSHIPS_PEOPLE,
      formSections.RELATIONSHIPS_RELATIVES,
      formSections.RELATIONSHIPS_REVIEW
    ]
  },
  {
    ...formSections.CITIZENSHIP,
    subsections: [
      formSections.CITIZENSHIP_INTRO,
      formSections.CITIZENSHIP_STATUS,
      formSections.CITIZENSHIP_MULTIPLE,
      formSections.CITIZENSHIP_PASSPORTS,
      formSections.CITIZENSHIP_REVIEW
    ]
  },
  {
    ...formSections.MILITARY,
    subsections: [
      formSections.MILITARY_INTRO,
      formSections.MILITARY_SELECTIVE,
      formSections.MILITARY_HISTORY,
      formSections.MILITARY_DISCIPLINARY,
      formSections.MILITARY_FOREIGN,
      formSections.MILITARY_REVIEW
    ]
  },
  {
    ...formSections.FOREIGN,
    subsections: [
      formSections.FOREIGN_INTRO,
      formSections.FOREIGN_PASSPORT,
      formSections.FOREIGN_CONTACTS,
      {
        ...formSections.FOREIGN_ACTIVITIES,
        subsections: [
          formSections.FOREIGN_ACTIVITIES_DIRECT,
          formSections.FOREIGN_ACTIVITIES_INDIRECT,
          formSections.FOREIGN_ACTIVITIES_REAL_ESTATE,
          formSections.FOREIGN_ACTIVITIES_BENEFITS,
          formSections.FOREIGN_ACTIVITIES_SUPPORT
        ]
      },
      {
        ...formSections.FOREIGN_BUSINESS,
        susections: [
          formSections.FOREIGN_BUSINESS_ADVICE,
          formSections.FOREIGN_BUSINESS_FAMILY,
          formSections.FOREIGN_BUSINESS_EMPLOYMENT,
          formSections.FOREIGN_BUSINESS_VENTURES,
          formSections.FOREIGN_BUSINESS_CONFERENCES,
          formSections.FOREIGN_BUSINESS_CONTACT,
          formSections.FOREIGN_BUSINESS_SPONSORSHIP,
          formSections.FOREIGN_BUSINESS_POLITICAL,
          formSections.FOREIGN_BUSINESS_VOTING
        ]
      },
      formSections.FOREIGN_TRAVEL,
      formSections.FOREIGN_REVIEW
    ]
  }
  /*

  sections.FOREIGN_INTRO,
  sections.FOREIGN_PASSPORT,
  sections.FOREIGN_CONTACTS,
  sections.FOREIGN_ACTIVITIES,
  sections.FOREIGN_BUSINESS,
  sections.FOREIGN_TRAVEL,
  sections.FOREIGN_REVIEW,

  sections.FINANCIAL_INTRO,
  sections.FINANCIAL_BANKRUPTCY,
  sections.FINANCIAL_GAMBLING,
  sections.FINANCIAL_TAXES,
  sections.FINANCIAL_CARD,
  sections.FINANCIAL_CREDIT,
  sections.FINANCIAL_DELINQUENT,
  sections.FINANCIAL_NONPAYMENT,
  sections.FINANCIAL_REVIEW,

  sections.SUBSTANCE_USE_INTRO,
  sections.SUBSTANCE_USE_DRUGS,
  sections.SUBSTANCE_USE_DRUGS_USAGE,
  sections.SUBSTANCE_USE_DRUGS_PURCHASE,
  sections.SUBSTANCE_USE_DRUGS_CLEARANCE,
  sections.SUBSTANCE_USE_DRUGS_PUBLIC_SAFETY,
  sections.SUBSTANCE_USE_DRUGS_MISUSE,
  sections.SUBSTANCE_USE_DRUGS_ORDERED,
  sections.SUBSTANCE_USE_DRUGS_VOLUNTARY,
  sections.SUBSTANCE_USE_ALCOHOL,
  sections.SUBSTANCE_USE_ALCOHOL_NEGATIVE,
  sections.SUBSTANCE_USE_ALCOHOL_ORDERED,
  sections.SUBSTANCE_USE_ALCOHOL_VOLUNTARY,
  sections.SUBSTANCE_USE_ALCOHOL_ADDITIONAL,
  sections.SUBSTANCE_USE_REVIEW,

  sections.LEGAL_INTRO,
  sections.LEGAL_POLICE,
  sections.LEGAL_POLICE_OFFENSES,
  sections.LEGAL_POLICE_ADDITIONAL_OFFENSES,
  sections.LEGAL_POLICE_DOMESTIC_VIOLENCE,
  sections.LEGAL_INVESTIGATIONS,
  sections.LEGAL_INVESTIGATIONS_HISTORY,
  sections.LEGAL_INVESTIGATIONS_REVOKED,
  sections.LEGAL_INVESTIGATIONS_DEBARRED,
  sections.LEGAL_COURT,
  sections.LEGAL_TECHNOLOGY,
  sections.LEGAL_TECHNOLOGY_UNAUTHORIZED,
  sections.LEGAL_TECHNOLOGY_MANIPULATING,
  sections.LEGAL_TECHNOLOGY_UNLAWFUL,
  sections.LEGAL_ASSOCIATIONS,
  sections.LEGAL_ASSOCIATIONS_TERRORIST_ORGANIZATION,
  sections.LEGAL_ASSOCIATIONS_ENGAGED_IN_TERRORISM,
  sections.LEGAL_ASSOCIATIONS_ADVOCATING,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_MEMBERSHIP_VIOLENCE,
  sections.LEGAL_ASSOCIATIONS_ACTIVITIES_TO_OVERTHROW,
  sections.LEGAL_ASSOCIATIONS_TERRORISM_ASSOCIATION,
  sections.LEGAL_REVIEW,

  sections.PSYCHOLOGICAL_INTRO,
  sections.PSYCHOLOGICAL_COMPETENCE,
  sections.PSYCHOLOGICAL_CONSULTATIONS,
  sections.PSYCHOLOGICAL_HOSPITALIZATIONS,
  sections.PSYCHOLOGICAL_DIAGNOSES,
  sections.PSYCHOLOGICAL_CONDITIONS,
  sections.PSYCHOLOGICAL_REVIEW,
  */
]
