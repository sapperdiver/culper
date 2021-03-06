import { validateModel } from 'models/validate'
import militaryService from '../militaryService'

describe('The military service model', () => {
  it('requires required fields to be filled', () => {
    const testData = {}
    const expectedErrors = [
      'Service.presence.REQUIRED',
      'Status.presence.REQUIRED',
      'Officer.presence.REQUIRED',
      'Dates.presence.REQUIRED',
      'ServiceNumber.presence.REQUIRED',
      'HasBeenDischarged.presence.REQUIRED',
    ]

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('From date cannot be before applicant birthdate', () => {
    const applicantBirthdate = { month: 1, day: 2, year: 1980 }
    const testData = {
      Dates: {
        from: { month: 1, year: 1970, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.from.date.date.datetime.DATE_TOO_EARLY',
    ]

    expect(validateModel(testData, militaryService, { applicantBirthdate }))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('To date cannot be in the future', () => {
    const testData = {
      Dates: {
        to: { month: 1, year: 2050, day: 2 },
      },
    }
    const expectedErrors = [
      'Dates.daterange.to.date.date.datetime.DATE_TOO_LATE',
    ]

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires Service to have a valid value', () => {
    const testData = {
      Service: {
        value: 'InvalidArmy',
      },
    }
    const expectedErrors = ['Service.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires Status to have a valid value', () => {
    const testData = {
      Status: {
        value: 'InvalidValue',
      },
    }
    const expectedErrors = ['Status.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires Officer to have a valid value', () => {
    const testData = {
      Officer: {
        value: 'InvalidType',
      },
    }
    const expectedErrors = ['Officer.hasValue.value.inclusion.INCLUSION']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires the ServiceNumber to be filled', () => {
    const testData = {
      ServiceNumber: {
        value: '',
      },
    }
    const expectedErrors = ['ServiceNumber.hasValue.MISSING_VALUE']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires a ServiceState if national guard is selected', () => {
    const testData = {
      Service: {
        value: 'AirNationalGuard',
      },
    }
    const expectedErrors = ['ServiceState.presence.REQUIRED']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('requires HasBeenDischarged to be filled', () => {
    const testData = {
      HasBeenDischarged: {
        value: '',
      },
    }

    const expectedErrors = ['HasBeenDischarged.hasValue.MISSING_VALUE']

    expect(validateModel(testData, militaryService))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if applicant was discharged', () => {
    it('requires DischargeType', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
      }
      const expectedErrors = ['DischargeType.presence.REQUIRED']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a valid DischargeType', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'InvalidType',
        },
      }
      const expectedErrors = ['DischargeType.hasValue.value.inclusion.INCLUSION']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a DischargeReason for discharge types other than Honorable', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'Dishonorable',
        },
      }
      const expectedErrors = ['DischargeReason.presence.REQUIRED', 'DischargeReason.hasValue.MISSING_VALUE']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a DischargeTypeOther for DischargeType = Other', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
        DischargeType: {
          value: 'Other',
        },
      }
      const expectedErrors = ['DischargeTypeOther.presence.REQUIRED', 'DischargeTypeOther.hasValue.MISSING_VALUE']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('requires a DischargeDate', () => {
      const testData = {
        HasBeenDischarged: {
          value: 'Yes',
        },
      }
      const expectedErrors = ['DischargeDate.presence.REQUIRED']

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DischargeDate cannot be before applicant birthdate', () => {
      const applicantBirthdate = { month: 1, day: 2, year: 1980 }
      const testData = {
        HasBeenDischarged: { value: 'Yes' },
        DischargeDate: { month: 1, year: 1970, day: 2 },
      }

      const expectedErrors = [
        'DischargeDate.date.date.datetime.DATE_TOO_EARLY',
      ]

      expect(validateModel(testData, militaryService, {
        applicantBirthdate,
      }))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('DischargeDate cannot be in the future', () => {
      const testData = {
        HasBeenDischarged: { value: 'Yes' },
        DischargeDate: { month: 1, year: 2050, day: 2 },
      }

      const expectedErrors = [
        'DischargeDate.date.date.datetime.DATE_TOO_LATE',
      ]

      expect(validateModel(testData, militaryService))
        .toEqual(expect.arrayContaining(expectedErrors))
    })
  })
})
