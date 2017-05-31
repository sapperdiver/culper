import React from 'react'
import { Field, Radio, RadioGroup } from '../../Form'

/**
 * Branch is a component that stores whether Yes/No options were selected. It contains a callback
 * function that can be used to be upated when a button is clicked. The button labels and values are
 * configurable by passing in the appropriate property which are defined in the Branch.defaultProps object.
 */
export default class Branch extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    this.handleUpdate = this.handleUpdate.bind(this)
  }

  handleUpdate (values) {
    this.setState({value: values.value}, () => {
      if (this.props.onUpdate) {
        this.props.onUpdate(values.value)
      }
    })
  }

  render () {
    const klass = `branch ${this.props.className || ''}`.trim()

    return (
      <Field title={this.props.label}
             titleSize={this.props.labelSize}
             className={klass}
             help={this.props.help}
             adjustFor={this.props.adjustFor}
             shrink={true}>
        <div className="content">
          {this.props.children}
        </div>
        <RadioGroup className="option-list branch" selectedValue={this.props.value}>
          <Radio name={this.props.name}
                 label={this.props.yesLabel}
                 value={this.props.yesValue}
                 className="yes"
                 onUpdate={this.handleUpdate}
                 onError={this.props.onError}
                 />
          <Radio name={this.props.name}
                 label={this.props.noLabel}
                 value={this.props.noValue}
                 className="no"
                 onUpdate={this.handleUpdate}
                 onError={this.props.onError}
                 />
        </RadioGroup>
      </Field>
    )
  }
}

// Default values for properties that are not specified
Branch.defaultProps = {
  yesLabel: 'Yes',
  yesValue: 'Yes',
  noLabel: 'No',
  noValue: 'No',
  labelSize: 'label',
  adjustFor: 'buttons',
  value: '',
  onError: (value, arr) => { return arr }
}
