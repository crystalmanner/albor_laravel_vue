import { mount } from '@vue/test-utils'
import { createStore } from 'fresh-bus/store'
import { FIXTURE_USER } from 'tests/__data__/user'
import { createLocalVue } from 'fresh-bus/tests/utils'
import Component from '~/pages/myprofile/index.vue'

describe('Admin Edit User Page', () => {
  describe('Mount', () => {
    let localVue, mock, store
    beforeEach(() => {
      const vue = createLocalVue({ validation: true })
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onGet('api/users/1').reply(200, { data: FIXTURE_USER })
        .onAny().reply(config => {
          console.warn('No mock match for ' + config.url, config)
          return [404, {}]
        })
      store = createStore({
        currentUser: FIXTURE_USER
      })
    })
    afterEach(() => {
      mock.restore()
    })
    it('hides company', async () => {
      const wrapper = mount(Component, {
        localVue,
        store
      })
      await wrapper.vm.$store.dispatch('users/getItem', { params: { id: 1 } })
      await wrapper.vm.$store.dispatch('page/setLoading', false)
      await wrapper.vm.$nextTick()

      expect(wrapper.html()).not.toContain('COMPANY')
      expect(wrapper.html()).not.toContain('TEAMS')
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
