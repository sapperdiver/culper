export const selectState = state => state

export const selectForm = state => state && state.form

export const selectSubsection = (state, sectionKey) => (
  (state && state.form && state.form[sectionKey]) || {}
)

export const formTypeSelector = state => (
  state && state.application && state.application.Settings
    && state.application.Settings.formType
)
