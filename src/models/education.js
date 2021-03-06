import address from 'models/shared/locations/address'
import name from 'models/shared/name'
import phone from 'models/shared/phone'
import email from 'models/shared/email'
import { DEFAULT_LATEST } from 'constants/dateLimits'

import { today, dateWithinRange } from 'helpers/date'

/** Helpers */
export const educationRequiresReference = (dates = {}) => {
  const { from, present } = dates
  const to = present ? today.toObject() : dates.to
  const educationTimeFrame = { years: 3 }

  return dateWithinRange(to, educationTimeFrame)
    || dateWithinRange(from, educationTimeFrame)
}

const diploma = {
  Diploma: { presence: true, hasValue: true },
  DiplomaOther: (value, attributes) => {
    if (attributes.Diploma && attributes.Diploma.value === 'Other') {
      return {
        presence: true,
        hasValue: true,
      }
    }

    return {}
  },
  Date: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      date: { requireDay: false, earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
}

const education = {
  Dates: (value, attributes, attributeName, options = {}) => {
    const { applicantBirthdate } = options

    return {
      presence: true,
      daterange: { earliest: applicantBirthdate, latest: DEFAULT_LATEST },
    }
  },
  Address: {
    presence: true,
    location: { validator: address },
  },
  Name: {
    presence: true,
    hasValue: true,
  },
  Type: {
    presence: true,
    hasValue: true,
  },
  ReferenceName: (value, attributes = {}) => {
    const { Dates, ReferenceNameNotApplicable } = attributes
    if (!educationRequiresReference(Dates)) return {}

    if (ReferenceNameNotApplicable && !ReferenceNameNotApplicable.applicable) {
      return {}
    }

    return {
      presence: true,
      model: {
        validator: name,
        hideMiddleName: true,
      },
    }
  },
  ReferenceNameNotApplicable: {},
  ReferencePhone: (value, attributes = {}) => (
    educationRequiresReference(attributes.Dates)
      ? {
        presence: true,
        model: { validator: phone, requireNumber: true },
      }
      : {}
  ),
  ReferenceEmail: (value, attributes = {}) => {
    const { Dates, ReferenceEmailNotApplicable } = attributes
    if (!educationRequiresReference(Dates)) return {}

    if (ReferenceEmailNotApplicable && !ReferenceEmailNotApplicable.applicable) {
      return {}
    }

    return {
      presence: true,
      model: { validator: email },
    }
  },
  ReferenceEmailNotApplicable: {},
  ReferenceAddress: (value, attributes = {}) => (
    educationRequiresReference(attributes.Dates)
      ? {
        presence: true,
        location: { validator: address },
      }
      : {}
  ),
  Diplomas: {
    presence: true,
    branchCollection: {
      validator: diploma,
    },
  },
}

export default education
