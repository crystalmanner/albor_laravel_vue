import { mount, shallowMount } from '@vue/test-utils'
import { createStore } from 'fresh-bus/store'
import { createLocalVue } from 'fresh-bus/tests/utils'
import { FIXTURE_USERS } from 'fresh-bus/tests/__data__/users'
import { FIXTURE_CURRENT_USER } from 'fresh-bus/tests/__data__/user'
import { FIXTURE_USER_STATUSES } from 'tests/__data__/userstatuses'
import FilterSorter from '~/components/users/FilterSorter.vue'

import Page from '~/pages/admin/users/index.vue'

describe('Admin Users Page', () => {
  describe('Visuals', () => {
    let localVue, mock, store

    beforeEach(() => {
      const vue = createLocalVue({ validation: true })
      localVue = vue.localVue
      mock = vue.mock
      mock
        .onGet('api/currentUser').reply(200, FIXTURE_CURRENT_USER)
        .onGet('api/users').reply(200, { data: FIXTURE_USERS })
        .onGet('api/userstatuses').reply(200, { data: FIXTURE_USER_STATUSES })
        .onAny().reply(200, {})

      store = createStore({
        permissions: {
          adminUserList: {
            columns: [
              { text: 'Name / Email / Title', value: 'first_name,email,title', align: 'left' },
              { text: 'Community', sortable: true, value: 'community', align: 'center' },
              { text: 'Discipline', sortable: true, value: 'discipline', align: 'center' },
              { text: 'Role', sortable: true, value: 'role', align: 'center' },
              { text: 'Status', sortable: true, value: 'status', align: 'center' },
              { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
            ],
            itemActions: [
              { action: 'edit', text: 'View / Edit' },
              { action: 'delete', text: 'Delete' }
            ]
          }
        }
      })
    })
    afterEach(() => {
      mock.restore()
    })
    test('User List Item Manage Button', (done) => {
      const wrapper = mount(Page, {
        localVue,
        store,
        mocks: {
          $route: {}
        }
      })
      Page.beforeRouteEnterOrUpdate(wrapper.vm, null, null, async () => {
        await wrapper.vm.$nextTick()
        expect(wrapper.html()).toContain('View / Edit')
        expect(wrapper.html()).not.toContain('Assign Team(s)')
        expect(wrapper.element).toMatchSnapshot()
        done()
      })
    })
    test('uses custom FilterSorter', () => {
      const wrapper = shallowMount(Page, {
        localVue,
        store
      })
      expect(wrapper.find(FilterSorter)).toBeTruthy()
      expect(wrapper.element).toMatchSnapshot()
    })
  })
})
