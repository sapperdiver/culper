import { validateDrugUses } from './druguses'

describe('validateDrugUses function', () => {
  describe('for the SF-86', () => {
    it('fails if missing required fields', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF86'))
        .toEqual(expect.arrayContaining([
          'List.accordion.0.UseWhileEmployed.presence.REQUIRED',
          'List.accordion.0.UseWithClearance.presence.REQUIRED',
          'List.accordion.0.UseInFuture.presence.REQUIRED',
        ]))
    })

    it('passes valid data', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                UseWhileEmployed: { value: 'Yes' },
                UseWithClearance: { value: 'Yes' },
                UseInFuture: { value: 'No' },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF86')).toEqual(true)
    })
  })

  describe('for the SF-85', () => {
    it('fails if missing required fields', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF85'))
        .toEqual(expect.arrayContaining([
          'List.accordion.0.DrugType.presence.REQUIRED',
          'List.accordion.0.FirstUse.presence.REQUIRED',
        ]))
    })

    it('passes valid data', () => {
      const testData = {
        UsedDrugs: { value: 'Yes' },
        List: {
          branch: { value: 'No' },
          items: [
            {
              Item: {
                DrugType: {
                  value: 'Cocaine',
                },
                FirstUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                RecentUse: {
                  day: '1',
                  month: '1',
                  year: '2016',
                },
                NatureOfUse: {
                  value: 'Some use',
                },
                Explanation: {
                  value: 'Foo',
                },
              },
            },
          ],
        },
      }

      expect(validateDrugUses(testData, 'SF85')).toEqual(true)
    })
  })
})
