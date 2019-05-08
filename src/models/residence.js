import {
  relationshipOptions,
  roleOptions,
} from 'constants/enums/residenceOptions'

const residence = {
  Dates: {
    // DateRangeValidator
  },
  Address: {
    // LocationValidator ADDRESS
  },
  AlternateAddress: {},
  // reference required if date range is within 3 years
  ReferenceName: {
    // valid name
  },
  ReferenceLastContact: {
    // valid date
  },
  ReferenceComments: {}, // not used?
  ReferenceRelationship: {
    inclusive: relationshipOptions,
  },
  ReferenceRelationshipOther: {
    // required if relationship is other
  },
  // valid phone numbers
  ReferencePhoneEvening: {},
  ReferencePhoneDay: {},
  ReferencePhoneMobile: {},
  // valid not applicable
  ReferenceEmailNotApplicable: {},
  ReferenceEmail: {},
  ReferenceAddress: {
    // LocationValidator ADDRESS
  },
  ReferenceAlternateAddress: {},
  Role: {
    inclusive: roleOptions,
  },
  RoleOther: {},
}

export default residence
