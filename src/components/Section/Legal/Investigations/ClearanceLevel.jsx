import React from 'react'
import { i18n } from '../../../../config'
import { ValidationElement, Show, Field, RadioGroup, Radio, Textarea } from '../../../Form'

export default class ClearanceLevel extends ValidationElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateLevel = this.updateLevel.bind(this)
    this.updateExplanation = this.updateExplanation.bind(this)
  }

  update (queue) {
    if (this.props.onUpdate) {
      let obj = {
        Level: this.props.Level,
        Explanation: this.props.Explanation
      }

      for (const q of queue) {
        obj = { ...obj, [q.name]: q.value }
      }

      this.props.onUpdate(obj)
    }
  }

  updateLevel (values) {
    this.update([
      { name: 'Level', value: values.value }
    ])
  }

  updateExplanation (values) {
    this.update([
      { name: 'Explanation', value: values }
    ])
  }

  render () {
    return (
      <div className={this.props.className}>
        <RadioGroup className="clearance-levels" selectedValue={this.props.Level}>
          <Radio label={i18n.m('legal.investigations.history.label.level.none')}
                 value="None"
                 className="clearance-level-none"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.confidential')}
                 value="Confidential"
                 className="clearance-level-confidential"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.secret')}
                 value="Secret"
                 className="clearance-level-secret"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.topsecret')}
                 value="Top Secret"
                 className="clearance-level-topsecret"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.sci')}
                 value="Sensitive Compartmented Information"
                 className="clearance-level-sci"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.q')}
                 value="Q"
                 className="clearance-level-q"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.l')}
                 value="L"
                 className="clearance-level-l"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.foreign')}
                 value="Issued by foreign country"
                 className="clearance-level-foreign"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
          <Radio label={i18n.m('legal.investigations.history.label.level.other')}
                 value="Other"
                 className="clearance-level-other"
                 onUpdate={this.updateLevel}
                 onError={this.props.onError}
                 />
        </RadioGroup>

        <Show when={this.props.Level === 'Other'}>
          <Field title={i18n.t('legal.investigations.history.heading.clearanceExplanation')}
                 titleSize="label"
                 help="legal.investigations.history.help.clearanceExplanation"
                 adjustFor="textarea">
            <Textarea name="Explanation"
                      {...this.props.Explanation}
                      className="legal-investigations-history-clearance-explanation"
                      onUpdate={this.updateExplanation}
                      onError={this.props.onError}
                  />
          </Field>
        </Show>
      </div>
    )
  }
}

ClearanceLevel.defaultProps = {
  className: 'investigative-clearance-levels',
  Level: '',
  Explanation: {},
  onError: (value, arr) => { return arr }
}

ClearanceLevel.errors = []