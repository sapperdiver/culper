import name from 'models/shared/name'
import customModel from '../customModel'

describe('The model validator', () => {
  it('fails if no validator is passed', () => {
    const testData = { test: '123' }
    expect(customModel(testData, {})).toEqual('INVALID_VALIDATOR')
  })

  it('fails if the data is not valid for the given model', () => {
    const testData = { test: '123' }
    const options = { validator: name }
    expect(customModel(testData, options)).toEqual([
      'first.presence.REQUIRED',
      'last.presence.REQUIRED',
      'middle.presence.REQUIRED',
    ])
  })

  it('passes if the data is valid for the given model', () => {
    const testData = {
      first: 'Person',
      noMiddleName: true,
      last: 'Name',
    }
    const options = { validator: name }
    expect(customModel(testData, options)).toBeNull()
  })
})
