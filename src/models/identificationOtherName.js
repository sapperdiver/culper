import { hasYesOrNo } from 'models/validate'
import name from 'models/shared/name'

const identificationOtherName = {
  Name: {
    presence: true,
    model: { validator: name },
  },
  MaidenName: { presence: true, hasValue: { validator: hasYesOrNo } },
  DatesUsed: { presence: true, daterange: true },
  Reason: { presence: true, hasValue: true },
}

export default identificationOtherName