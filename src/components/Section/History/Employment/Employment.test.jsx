import React from 'react'
import { mount } from 'enzyme'
import { EmploymentItem } from './Employment'

describe('The employment component', () => {
  it('no error on empty', () => {
    const expected = {
      name: 'employment'
    }
    const component = mount(<EmploymentItem {...expected} />)
    expect(component.find('h3').length).toBeGreaterThan(0)
  })
})