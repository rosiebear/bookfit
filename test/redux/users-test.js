import { expect } from 'chai'
import users, { authUser, AUTH_USER } from '../../app/redux/modules/users'

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: '',
}

describe('Authenticating User', () => {
  describe('reducer', () => {
    it('handles action with unknown type', () => {
      expect(users(undefined, {})).to.eql(initialState)
    })

    it('handles action dispatcher of action type AUTH_USER', () => {
      const payload = { uid: 123 }
      const action = { type: AUTH_USER, ...payload }
      expect(users({}, action).authedId).to.eql(123)
    })
  })

  describe('action dispatchers', () => {
    describe('authUser', () => {
      it('has the correct action type AUTH_USER', () => {
        const action = authUser()
        expect(action.type).to.equal(AUTH_USER)
      })

      it('has the correct payload', () => {
        const action = authUser(123)
        expect(action.uid).to.equal(123)
      })
    })
  })
})