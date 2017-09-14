import React from 'react'
import { i18n } from '../../../../config'
import { Summary, DateSummary } from '../../../Summary'
import { DiagnosesValidator, DiagnosisValidator, TreatmentValidator } from '../../../../validators'
import SubsectionElement from '../../SubsectionElement'
import { Accordion, Branch, Show } from '../../../Form'
import Diagnosis from './Diagnosis'
import Treatment from '../Treatment'

export default class Diagnoses extends SubsectionElement {
  constructor (props) {
    super(props)

    this.update = this.update.bind(this)
    this.updateDiagnosed = this.updateDiagnosed.bind(this)
    this.updateDidNotConsult = this.updateDidNotConsult.bind(this)
    this.updateInTreatment = this.updateInTreatment.bind(this)
    this.updateDiagnosisList = this.updateDiagnosisList.bind(this)
    this.updateTreatmentList = this.updateTreatmentList.bind(this)
  }

  update (queue) {
    this.props.onUpdate({
      Diagnosed: this.props.Diagnosed,
      DidNotConsult: this.props.DidNotConsult,
      InTreatment: this.props.InTreatment,
      DiagnosisList: this.props.DiagnosisList,
      DiagnosisListBranch: this.props.DiagnosisListBranch,
      TreatmentList: this.props.TreatmentList,
      TreatmentListBranch: this.props.TreatmentListBranch,
      ...queue
    })
  }

  updateDiagnosisList (values) {
    this.update({
      DiagnosisList: values.items,
      DiagnosisListBranch: values.branch
    })
  }

  updateTreatmentList (values) {
    this.update({
      TreatmentList: values.items,
      TreatmentListBranch: values.branch
    })
  }

  updateDiagnosed (values) {
    this.update({
      Diagnosed: values,
      DiagnosisList: values === 'Yes' ? this.props.DiagnosisList : [],
      DiagnosisListBranch: values === 'Yes' ? this.props.DiagnosisListBranch : '',
      DidNotConsult: values === 'Yes' ? this.props.DidNotConsult : '',
      InTreatment: values === 'Yes' ? this.props.InTreatment : '',
      TreatmentList: values === 'Yes' ? this.props.TreatmentList : [],
      TreatmentListBranch: values === 'Yes' ? this.props.TreatmentListBranch : ''
    })
  }

  updateDidNotConsult (values) {
    this.update({
      DidNotConsult: values
    })
  }

  updateInTreatment (values) {
    this.update({
      InTreatment: values,
      TreatmentList: values === 'Yes' ? this.props.TreatmentList : [],
      TreatmentListBranch: values === 'Yes' ? this.props.TreatmentListBranch : ''
    })
  }

  summary (item, index) {
    const o = (item || {}).Diagnosis || {}
    const date = (o.Diagnosed || {})
    // const diagnosisDate = dateRangeFormat(date)
    const diagnosisDate = DateSummary(date)
    const facility = (o.Condition || {}).value || ''

    return Summary({
      type: i18n.t('psychological.diagnoses.collection.itemType'),
      index: index,
      left: facility,
      right: diagnosisDate,
      placeholder: i18n.m('psychological.diagnoses.collection.summary')
    })
  }

  treatmentSummary (item, index) {
    const o = (item || {}).Treatment || {}
    const name = (o.Name || {}).value ? `${o.Name.value}` : i18n.m('psychological.diagnoses.treatment.collection.summary')
    const type = i18n.t('psychological.diagnoses.treatment.collection.itemType')

    return (
      <span>
        <span className="index">{type} {index + 1}:</span>
        <span className="info"><strong>{name}</strong></span>
      </span>
    )
  }

  render () {
    return (
      <div className="diagnoses">
        {i18n.m('psychological.heading.diagnoses')}

        <Branch name="diagnosed"
                label={i18n.t('psychological.diagnoses.heading.diagnoses')}
                labelSize="h3"
                className="diagnosed"
                value={this.props.Diagnosed}
                warning={true}
                onError={this.handleError}
                onUpdate={this.updateDiagnosed}
                required={this.props.required}
                scrollIntoView={this.props.scrollIntoView}>
          {i18n.m('psychological.diagnoses.heading.examples')}
        </Branch>
        <Show when={this.props.Diagnosed === 'Yes'}>
          <div>
            <Accordion className="diagnosis-collection"
                       defaultState={this.props.defaultState}
                       items={this.props.DiagnosisList}
                       branch={this.props.DiagnosisListBranch}
                       onUpdate={this.updateDiagnosisList}
                       summary={this.summary}
                       onError={this.handleError}
                       validator={DiagnosisValidator}
                       description={i18n.t('psychological.diagnoses.collection.description')}
                       appendTitle={i18n.t('psychological.diagnoses.collection.appendTitle')}
                       appendMessage={i18n.m('psychological.diagnoses.collection.appendMessage')}
                       appendLabel={i18n.t('psychological.diagnoses.collection.appendLabel')}
                       required={this.props.required}
                       scrollIntoView={this.props.scrollIntoView}>
              <Diagnosis name="Item"
                         ApplicantBirthDate={this.props.ApplicantBirthDate}
                         required={this.props.required}
                         scrollIntoView={this.props.scrollIntoView}
                         addressBooks={this.props.addressBooks}
                         dispatch={this.props.dispatch}
                         bind={true} />
            </Accordion>

            <Branch name="didNotConsult"
                    label={i18n.t('psychological.diagnoses.heading.didNotConsult')}
                    labelSize="h3"
                    className="didnotconsult"
                    value={this.props.DidNotConsult}
                    help="psychological.diagnoses.help.didNotConsult"
                    onError={this.handleError}
                    required={this.props.required}
                    onUpdate={this.updateDidNotConsult}
                    scrollIntoView={this.props.scrollIntoView}>
            </Branch>

            <Branch name="inTreatment"
                    label={i18n.t('psychological.diagnoses.heading.inTreatment')}
                    labelSize="h3"
                    className="intreatment"
                    value={this.props.InTreatment}
                    help="psychological.diagnoses.help.inTreatment"
                    warning={true}
                    onError={this.handleError}
                    required={this.props.required}
                    onUpdate={this.updateInTreatment}
                    scrollIntoView={this.props.scrollIntoView}>
            </Branch>

            <Show when={this.props.InTreatment === 'Yes'}>
              <Accordion defaultState={this.props.defaultState}
                         items={this.props.TreatmentList}
                         scrollToBottom={this.props.scrollToBottom}
                         branch={this.props.TreatmentListBranch}
                         onUpdate={this.updateTreatmentList}
                         summary={this.treatmentSummary}
                         onError={this.handleError}
                         validator={TreatmentValidator}
                         appendTitle={i18n.t('psychological.diagnoses.treatment.collection.appendTitle')}
                         appendLabel={i18n.t('psychological.diagnoses.treatment.collection.appendLabel')}
                         required={this.props.required}
                         scrollIntoView={this.props.scrollIntoView}>
                <Treatment name="Item"
                           prefix="diagnoses.professional"
                           addressBooks={this.props.addressBooks}
                           dispatch={this.props.dispatch}
                           required={this.props.required}
                           scrollIntoView={this.props.scrollIntoView}
                           bind={true} />
              </Accordion>
            </Show>
          </div>
        </Show>
      </div>
    )
  }
}

Diagnoses.defaultProps = {
  List: [],
  DiagnosisList: [],
  DiagnosisListBranch: '',
  TreatmentList: [],
  TreatmentListBranch: '',
  defaultState: true,
  onUpdate: (queue) => {},
  onError: (value, arr) => { return arr },
  section: 'psychological',
  subsection: 'diagnoses',
  addressBooks: {},
  dispatch: () => {},
  validator: (state, props) => {
    return new DiagnosesValidator(props).isValid()
  },
  scrollToBottom: ''
}
