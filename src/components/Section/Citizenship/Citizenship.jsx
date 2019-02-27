import React from 'react'
import { connect } from 'react-redux'
import { i18n } from '@config'
import SectionElement from '@components/Section/SectionElement'
import { SectionViews, SectionView } from '@components/Section/SectionView'
import { Field } from '@components/Form'
import Status from '@components/Section/Citizenship/Status'
import Multiple from '@components/Section/Citizenship/Multiple'
import Passports from '@components/Section/Citizenship/Multiple/Passports'

class Citizenship extends SectionElement {
  render() {
    return (
      <div>
        <SectionViews
          current={this.props.subsection}
          dispatch={this.props.dispatch}
          update={this.props.update}>

          <SectionView
            name="intro"
            back="relationships/review"
            backLabel={i18n.t('relationships.destination.review')}
            next="citizenship/status"
            nextLabel={i18n.t('citizenship.destination.status')}>
            <div>
              <h1 className="section-header">{i18n.t('citizenship.intro.title')}</h1>
              <Field
                optional={true}
                className="no-margin-bottom">
                {i18n.m('citizenship.intro.body')}
              </Field>
            </div>
          </SectionView>

          <SectionView
            name="review"
            title={i18n.t('review.title')}
            para={i18n.m('review.para')}
            showTop={true}
            back="citizenship/passports"
            backLabel={i18n.t('citizenship.destination.passports')}
            next="military/intro"
            nextLabel={i18n.t('military.destination.intro')}>
            <Status
              name="status"
              {...this.props.Status}
              section="citizenship"
              subsection="status"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Status')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <Multiple
              name="multiple"
              {...this.props.Multiple}
              section="citizenship"
              subsection="multiple"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Multiple')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />

            <hr className="section-divider" />
            <Passports
              name="passports"
              {...this.props.Passports}
              section="citizenship"
              subsection="passports"
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Passports')}
              onError={this.handleError}
              required={true}
              scrollIntoView={false}
            />
          </SectionView>

          <SectionView
            name="status"
            back="citizenship/intro"
            backLabel={i18n.t('citizenship.destination.intro')}
            next="citizenship/multiple"
            nextLabel={i18n.t('citizenship.destination.multiple')}>
            <Status
              name="status"
              {...this.props.Status}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Status')}
              onError={this.handleError}
            />
          </SectionView>

          <SectionView
            name="multiple"
            back="citizenship/status"
            backLabel={i18n.t('citizenship.destination.status')}
            next="citizenship/passports"
            nextLabel={i18n.t('citizenship.destination.passports')}>
            <Multiple
              name="multiple"
              {...this.props.Multiple}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Multiple')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>

          <SectionView
            name="passports"
            back="citizenship/multiple"
            backLabel={i18n.t('citizenship.destination.multiple')}
            next="citizenship/review"
            nextLabel={i18n.t('citizenship.destination.review')}>
            <Passports
              name="passports"
              {...this.props.Passports}
              dispatch={this.props.dispatch}
              onUpdate={this.handleUpdate.bind(this, 'Passports')}
              onError={this.handleError}
              scrollToBottom={this.props.scrollToBottom}
            />
          </SectionView>
        </SectionViews>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let app = state.application || {}
  let citizenship = app.Citizenship || {}
  let errors = app.Errors || {}
  let completed = app.Completed || {}
  return {
    Application: app,
    Citizenship: citizenship,
    Status: citizenship.Status || {},
    Multiple: citizenship.Multiple || {},
    Passports: citizenship.Passports || {},
    Errors: errors.citizenship || [],
    Completed: completed.citizenship || []
  }
}

Citizenship.defaultProps = {
  section: 'citizenship',
  store: 'Citizenship',
  scrollToBottom: SectionView.BottomButtonsSelector
}

export class CitizenshipSections extends React.Component {
  render() {
    return (
      <div>
        <Status
          name="status"
          {...this.props.Status}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Multiple
          name="multiple"
          {...this.props.Multiple}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />

        <hr className="section-divider" />
        <Passports
          name="passports"
          {...this.props.Passports}
          defaultState={false}
          dispatch={this.props.dispatch}
          onError={this.props.onError}
          required={true}
          scrollIntoView={false}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps)(Citizenship)
