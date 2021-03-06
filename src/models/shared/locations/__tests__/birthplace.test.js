import { validateModel } from 'models/validate'
import birthplace from '../birthplace'

describe('The location/birthplace model', () => {
  it('city is required', () => {
    const testData = { city: '' }
    const expectedErrors = ['city.presence.REQUIRED']

    expect(validateModel(testData, birthplace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('country is required', () => {
    const testData = { country: '' }
    const expectedErrors = ['country.presence.REQUIRED']

    expect(validateModel(testData, birthplace))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  describe('for a domestic address', () => {
    it('state must be a valid US state', () => {
      const testData = { state: 'XY', country: 'United States' }
      const expectedErrors = ['state.inclusion.INCLUSION']

      expect(validateModel(testData, birthplace))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid domestic address', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        country: 'United States',
        county: 'Manhattan',
      }

      expect(validateModel(testData, birthplace)).toEqual(true)
    })
  })

  describe('for an international address', () => {
    // Skipped to fix [EN-3928], see comment in models/shared/location.js
    it.skip('state must be empty', () => {
      const testData = { state: 'MA', country: 'Canada' }
      const expectedErrors = ['state.requireEmpty.VALUE_NOT_EMPTY']

      expect(validateModel(testData, birthplace))
        .toEqual(expect.arrayContaining(expectedErrors))
    })

    it('passes a valid international address', () => {
      const testData = {
        city: 'Toronto',
        country: 'Canada',
      }

      expect(validateModel(testData, birthplace)).toEqual(true)
    })
  })

  describe('for set required fields', () => {

    it('passes when city is not required', () => {
      const testData = {
        state: 'NY',
        country: 'United States',
        county: 'Manhattan',
      }
      const options = {
        requireCity: false
      }

      expect(validateModel(testData, birthplace, options)).toEqual(true)
    })

    it('passes when county is not required', () => {
      const testData = {
        city: 'New York',
        state: 'NY',
        country: 'United States',
      }
      const options = {
        requireCounty: false
      }

      expect(validateModel(testData, birthplace, options)).toEqual(true)
    })
  })
})
