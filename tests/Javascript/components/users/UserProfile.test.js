import { mount } from '@vue/test-utils'
import Component from '~/components/users/UserProfile.vue'

describe('User List Contact Cell component', () => {
  describe('Visuals', () => {
    test('hides company and teams', () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
      expect(wrapper.html()).not.toContain('COMPANY')
      expect(wrapper.html()).not.toContain('TEAMS')
    })
  })
})
