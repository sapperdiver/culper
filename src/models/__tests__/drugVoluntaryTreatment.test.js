import { validateModel } from 'models/validate'
import drugVoluntaryTreatment from '../drugVoluntaryTreatment'

describe('The drugVoluntaryTreatment model', () => {
  it('validates required fields', () => {
    const testData = {}
    const expectedErrors = [
      'TreatmentProvider.required',
      'TreatmentProviderAddress.required',
      'TreatmentProviderTelephone.required',
      'TreatmentDates.required',
      'TreatmentCompleted.required',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProvider must have a value', () => {
    const testData = {}
    const expectedErrors = [
      'TreatmentProvider.hasValue',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderAddress must be a valid location', () => {
    const testData = {
      TreatmentProviderAddress: 'invalid address',
    }
    const expectedErrors = [
      'TreatmentProviderAddress.location',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentProviderTelephone must be a valid phone', () => {
    const testData = {
      TreatmentProviderTelephone: '1234567890',
    }
    const expectedErrors = [
      'TreatmentProviderTelephone.model',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentDates must be a valid date range', () => {
    const testData = {
      TreatmentDates: false,
    }
    const expectedErrors = [
      'TreatmentDates.daterange',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('TreatmentCompleted must have a valid value', () => {
    const testData = {
      TreatmentCompleted: { value: 'maybe' },
    }
    const expectedErrors = [
      'TreatmentCompleted.hasValue',
    ]

    expect(validateModel(testData, drugVoluntaryTreatment))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('if TreatmentCompleted is "Yes"', () => {
    it('passes a valid drugVoluntaryTreatment', () => {
      const testData = {
        TreatmentProvider: { value: 'Testing' },
        TreatmentProviderAddress: {
          street: '50 Provider ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        TreatmentProviderTelephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        TreatmentDates: {
          from: { month: 8, day: 20, year: 2010 },
          to: { month: 10, day: 23, year: 2012 },
        },
        TreatmentCompleted: { value: 'Yes' },
      }

      expect(validateModel(testData, drugVoluntaryTreatment)).toEqual(true)
    })
  })

  describe('if TreatmentCompleted is "No', () => {
    it('NoTreatmentExplanation must have a value', () => {
      const testData = {
        TreatmentCompleted: { value: 'No' },
      }
      const expectedErrors = [
        'NoTreatmentExplanation.hasValue',
      ]

      expect(validateModel(testData, drugVoluntaryTreatment))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid drugVoluntaryTreatment', () => {
      const testData = {
        TreatmentProvider: { value: 'Testing' },
        TreatmentProviderAddress: {
          street: '50 Provider ST',
          city: 'New York',
          state: 'NY',
          zipcode: '10023',
          country: 'United States',
        },
        TreatmentProviderTelephone: {
          number: '1234567890',
          type: 'Domestic',
          timeOfDay: 'Both',
        },
        TreatmentDates: {
          from: { month: 8, day: 20, year: 2010 },
          to: { month: 10, day: 23, year: 2012 },
        },
        TreatmentCompleted: { value: 'No' },
        NoTreatmentExplanation: { value: 'Because' },
      }

      expect(validateModel(testData, drugVoluntaryTreatment)).toEqual(true)
    })
  })
})