import React from 'react'
import { connect } from 'react-redux'

import {
  selectRelationshipMaritalForeignBornDocExpiration,
  selectRelationshipMaritalDivorcePhoneNumber,
  selectRelationshipRelativesUSResidenceDoc,
  selectRelationshipRelativesForeignGovtAffExplanation,
} from 'selectors/branches'

import {
  updateApplication,
  reportErrors,
} from 'actions/ApplicationActions'

const connectRelationshipsSection = (Component, {
  section, subsection, store, storeKey,
}) => {
  class ConnectedRelationshipsSection extends React.Component {
    constructor(props) {
      super(props)

      this.section = section
      this.subsection = subsection
      this.store = store
    }

    handleError = (value, arr) => {
      const { dispatch } = this.props
      const action = reportErrors(this.section, this.subsection, arr)
      dispatch(action)
      return arr
    }

    handleUpdate = (field, values) => {
      const { dispatch } = this.props
      dispatch(updateApplication(this.store, field, values))
    }

    render() {
      return (
        <Component
          onUpdate={this.handleUpdate}
          onError={this.handleError}
          {...this.props}
        />
      )
    }
  }

  const extractSpouse = (marital) => {
    if (!marital || !marital.CivilUnion || !marital.CivilUnion.Name) {
      return null
    }

    return marital.CivilUnion.Name
  }

  const mapStateToProps = (state) => {
    const { application } = state
    const {
      Identification, History, Relationships, Errors, Completed, AddressBooks,
    } = application

    const applicantBirthdate = ((Identification && Identification.ApplicantBirthDate) || {}).Date
    const spouse = Relationships && extractSpouse(Relationships.Marital)

    switch (storeKey) {
      case 'Marital':
        return {
          ...Relationships && Relationships.Marital,
          addressBooks: AddressBooks,
          applicantBirthdate,
          currentAddress: History && History.CurrentAddress,
          ...selectRelationshipMaritalForeignBornDocExpiration(state),
          ...selectRelationshipMaritalDivorcePhoneNumber(state),
        }

      case 'Cohabitants':
        return {
          ...Relationships && Relationships.Cohabitants,
          spouse,
          applicantBirthdate,
          ...selectRelationshipMaritalForeignBornDocExpiration(state),
        }

      case 'People':
        return {
          ...Relationships && Relationships.People,
          addressBooks: AddressBooks,
        }

      case 'Relatives':
        return {
          ...Relationships && Relationships.Relatives,
          applicantBirthdate,
          addressBooks: AddressBooks,
          ...selectRelationshipRelativesUSResidenceDoc(state),
          ...selectRelationshipRelativesForeignGovtAffExplanation(state),
        }

      default:
        return {
          applicantBirthdate,
          Relationships,
          Relatives: Relationships.Relatives || {},
          Marital: Relationships.Marital || {},
          Spouse: spouse,
          Cohabitants: Relationships.Cohabitants || {},
          CurrentAddress: History.CurrentAddress,
          People: Relationships.People || {},
          Errors: Errors.Relationships || [],
          Completed: Completed.Relationships || [],
          AddressBooks,
        }
    }
  }

  return connect(mapStateToProps)(ConnectedRelationshipsSection)
}

export default connectRelationshipsSection
