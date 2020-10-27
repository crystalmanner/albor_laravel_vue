import { shallowMount } from '@vue/test-utils'
import createStore from 'fresh-bus/store'
import Component from '~/pages/auth/index'

describe('Auth Page', () => {
  let localVue

  describe('Visuals', () => {
    test('hide register link and show title, logo and bg', async () => {
      const redirect = jest.fn()
      const wrapper = shallowMount(Component, {
        localVue: localVue,
        store: createStore({
          registrationType: 2,
          navigationAdmin: {
            logo: 'arbor-logo.png',
            background: 'arbor-background.png',
            title: 'Arbor Title'
          }
        }),
        mocks: {
          $auth: { redirect }
        }
      })
      expect(wrapper.html()).not.toContain("Don't have an account? Request access.")
      expect(wrapper.html()).toContain('Arbor Title')
      expect(wrapper.find('.background-image').attributes('style')).toContain('arbor-background.png')
      expect(wrapper.find('v-img-stub').attributes('src')).toContain('arbor-logo.png')
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
