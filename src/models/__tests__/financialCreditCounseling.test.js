import { validateModel } from 'models/validate'
import financialCreditCounseling from 'models/financialCreditCounseling'

describe('The financial credit counseling model', () => {
  it('errors for required fields', () => {
    const testData = {}
    const expectedErrors = [
      'Explanation.presence.REQUIRED',
      'Name.presence.REQUIRED',
      'Telephone.presence.REQUIRED',
      'Location.presence.REQUIRED',
      'Description.presence.REQUIRED',
    ]

    expect(validateModel(testData, financialCreditCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })

  it('phone number must exist', () => {
    const testData = {
      Telephone: { noNumber: true },
    }

    const expectedErrors = [
      'Telephone.model.noNumber.inclusion.INCLUSION',
    ]

    expect(validateModel(testData, financialCreditCounseling))
      .toEqual(expect.arrayContaining(expectedErrors))
  })
})
