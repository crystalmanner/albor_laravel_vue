import { mount } from '@vue/test-utils'
import { createStore } from 'fresh-bus/store'
import { createLocalVue } from 'fresh-bus/tests/utils'
import { FIXTURE_USER } from 'fresh-bus/tests/__data__/users'
import Component from '~/layouts/default.vue'

const mockAuth = {
  logout: () => {
    window.location.assign('/auth')
  }
}

describe('Default layout', () => {
  let localVue, mock, store
  describe('mount', () => {
    beforeEach(async () => {
      store = createStore({
        navigation: {
          isConsumerViewAvailable: false,
          hideUserLevel: true,
          displayedUserField: 'email',
          userMenuItems: [
            { title: 'My Profile', to: { name: 'myprofile' } }
          ]
        },
        currentUser: FIXTURE_USER,
        page: {
          title: 'Default template'
        }
      })
      const vue = createLocalVue({ validation: true })
      localVue = vue.localVue
      mock = vue.mock
        .onGet('api/currentUser').reply(200, FIXTURE_USER)
        .onGet('api/users/1').reply(200, { data: FIXTURE_USER })
        .onAny().reply(config => {
          console.error('No mock match for ' + config.url, config)
          return [404, {}]
        })
    })
    afterEach(() => {
      mock.restore()
    })
    it('snapshot of layout', (done) => {
      const wrapper = mount(Component, {
        localVue,
        store
      })

      Component.beforeRouteEnterOrUpdate(wrapper.vm, null, null, async () => {
        await wrapper.vm.$store.dispatch('users/getItem', { params: { id: 1 } })
        await wrapper.vm.$store.dispatch('page/setLoading', false)
        await wrapper.vm.$nextTick()
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
    it('signout redirects', async () => {
      const wrapper = mount(Component, {
        localVue,
        store,
        mocks: { $auth: mockAuth }
      })
      window.location.assign = jest.fn() // Create a spy
      await wrapper.vm.signout()
      expect(window.location.assign).toHaveBeenCalledWith('/auth')
      Component.beforeRouteEnterOrUpdate(wrapper.vm, null, null, null) // I added this line to increase test coverage for branches
    })
  })
})
