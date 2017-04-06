import React from 'react'
import { mount } from 'enzyme'
import Diagnosis from './Diagnosis'

describe('The Diagnosis component', () => {
  it('Renders without errors', () => {
    const component = mount(<Diagnosis />)
    expect(component.find('.diagnosis').length).toBe(1)
  })

  it('Performs updates', () => {
    let updates = 0
    const onUpdate = () => { updates++ }
    const component = mount(<Diagnosis onUpdate={onUpdate} />)
    component.find('input[name="Facility"]').simulate('change')
    component.find('.datecontrol .year input').first().simulate('change', { target: { value: '2010' } })
    component.find('.person .treatment input[name="Name"]').simulate('change')
    component.find('.facility .treatment input[name="Name"]').simulate('change')
    component.find('.effective .yes input').simulate('click')
    expect(updates).toBe(5)
  })
})
