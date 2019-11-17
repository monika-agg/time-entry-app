
import { connect } from 'react-redux'

export default ({
  props = () => ({}),
  actions = (dispatch) => ({ dispatch }),
  options = {}
} = {}) =>
  connect(
    props,
    actions,
    null,
    options
  )
