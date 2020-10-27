import { mount } from '@vue/test-utils'
import { FIXTURE_USER } from 'tests/__data__/user'
import Component from '~/components/users/UserListContactCell.vue'

describe('User List Contact Cell component', () => {
  describe('Visuals', () => {
    test('deafult', () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })
    test('basic', () => {
      let item = FIXTURE_USER
      const wrapper = mount(Component, { propsData: { item } })
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.text()).toContain(FIXTURE_USER.first_name)
      expect(wrapper.text()).toContain(FIXTURE_USER.last_name)
      expect(wrapper.text()).toContain(FIXTURE_USER.email)
    })
  })
})
