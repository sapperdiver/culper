import React from 'react'

import i18n from 'util/i18n'

import { MILITARY, MILITARY_DISCIPLINARY } from 'config/formSections/military'
import * as formConfig from 'config/forms'

import { Summary, DateSummary } from 'components/Summary'
import { Branch, Show, Accordion } from 'components/Form'
import Procedure from 'components/Section/Military/Disciplinary/Procedure'

import Subsection from 'components/Section/shared/Subsection'
import connectSubsection from 'components/Section/shared/SubsectionConnector'

const sectionConfig = {
  key: MILITARY_DISCIPLINARY.key,
  section: MILITARY.name,
  store: MILITARY.store,
  subsection: MILITARY_DISCIPLINARY.name,
  storeKey: MILITARY_DISCIPLINARY.storeKey,
}

class Disciplinary extends Subsection {
  constructor(props) {
    super(props)

    const {
      section, subsection, store, storeKey,
    } = sectionConfig

    this.section = section
    this.subsection = subsection
    this.store = store
    this.storeKey = storeKey

    this.update = this.update.bind(this)
    this.updateDisciplinary = this.updateDisciplinary.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  update(queue) {
    this.props.onUpdate(this.storeKey, {
      HasDisciplinary: this.props.HasDisciplinary,
      List: this.props.List,
      ...queue,
    })
  }

  updateDisciplinary(values) {
    // If there is no history clear out any previously entered data
    this.update({
      HasDisciplinary: values,
      List: values.value === 'Yes' ? this.props.List : { items: [], branch: {} },
    })
  }

  updateList(values) {
    this.update({
      List: values,
    })
  }

  /**
   * Assists in rendering the summary section.
   */
  summary = (item, index) => {
    const itemProperties = (item || {}).Item || {}
    const dates = DateSummary(itemProperties.Date)
    const service = itemProperties.Name && itemProperties.Name.value
      ? itemProperties.Name.value
      : ''

    return Summary({
      type: i18n.t('military.disciplinary.collection.summary.item'),
      index,
      left: service,
      right: dates,
      placeholder: i18n.t('military.disciplinary.collection.summary.unknown'),
    })
  }

  render() {
    const { formType, errors } = this.props
    const formTypeConfig = formType && formConfig[formType]
    const years = formTypeConfig && formTypeConfig.MILITARY_DISCIPLINARY_RECORD_YEARS
    const accordionErrors = errors && errors.filter(e => e.indexOf('List.accordion') === 0)

    return (
      <div
        className="section-content disciplinary"
        data-section={MILITARY.key}
        data-subsection={MILITARY_DISCIPLINARY.key}
      >
        <h1 className="section-header">{i18n.t('military.destination.disciplinary')}</h1>
        <Branch
          name="has_disciplinary"
          label={i18n.t('military.disciplinary.para.info', { years })}
          labelSize="h4"
          {...this.props.HasDisciplinary}
          weight={true}
          onUpdate={this.updateDisciplinary}
          required={this.props.required}
          onError={this.handleError}
          scrollIntoView={this.props.scrollIntoView}
        />

        <Show when={this.props.HasDisciplinary.value === 'Yes'}>
          <Accordion
            {...this.props.List}
            defaultState={this.props.defaultState}
            scrollToBottom={this.props.scrollToBottom}
            onUpdate={this.updateList}
            onError={this.handleError}
            errors={accordionErrors}
            summary={this.summary}
            description={i18n.t(
              'military.disciplinary.collection.summary.title',
            )}
            appendTitle={i18n.t('military.disciplinary.collection.appendTitle', { years })}
            appendLabel={i18n.t('military.disciplinary.collection.append', { years })}
            required={this.props.required}
            scrollIntoView={this.props.scrollIntoView}
          >
            <Procedure
              name="Item"
              bind={true}
              required={this.props.required}
              scrollIntoView={this.props.scrollIntoView}
            />
          </Accordion>
        </Show>
      </div>
    )
  }
}

Disciplinary.defaultProps = {
  HasDisciplinary: {},
  List: { items: [] },
  onUpdate: () => {},
  onError: (value, arr) => arr,
  section: 'military',
  subsection: 'disciplinary',
  dispatch: () => {},
  defaultState: true,
  errors: [],
}

export default connectSubsection(Disciplinary, sectionConfig)
