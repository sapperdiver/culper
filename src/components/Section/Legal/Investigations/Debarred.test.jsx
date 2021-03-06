import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { Debarred } from './Debarred'

describe('The legal investigations debarred component', () => {
  const mockStore = configureMockStore()
  let createComponent

  beforeEach(() => {
    const store = mockStore()
    createComponent = (expected = {}) => (
      mount(
        <Provider store={store}>
          <Debarred {...expected} />
        </Provider>
      )
    )
  })

  it('renders without errors', () => {
    const component = createComponent()
    expect(component.find('.investigations-debarred').length).toBe(1)
  })

  it('can select "yes"', () => {
    let updates = 0
    const expected = {
      onUpdate: () => {
        updates += 1
      },
    }
    const component = createComponent(expected)
    component
      .find('.legal-investigations-debarred-has-debarment .yes input')
      .simulate('change')
    expect(updates).toBe(1)
  })

  it('list displayed if "yes" is clicked', () => {
    const props = {
      HasDebarment: { value: 'Yes' },
    }
    const component = createComponent(props)
    expect(component.find('.accordion').length).toBe(1)
  })

  it('renders summary', () => {
    const props = {
      HasDebarment: { value: 'Yes' },
      List: {
        items: [
          {
            Item: {
              Agency: {
                value: 'U.S. Department of Defense',
              },
              Date: {
                month: '1',
                day: '1',
                year: '2010',
              },
            },
          },
        ],
      },
    }
    const component = createComponent(props)
    const text = component.find('.accordion .summary .left').text()
    expect(text).toContain('U.S. Department of Defense')
    expect(text).toContain('1/2010')
  })
})
