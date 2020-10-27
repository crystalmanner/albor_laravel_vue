import { mount } from '@vue/test-utils'
import Component from '~/components/users/FilterSorter.vue'

describe('Filter Sorter', () => {
  describe('Snapshots', () => {
    test('default', () => {
      const wrapper = mount(Component)
      expect(wrapper.element).toMatchSnapshot()
    })

    test('toggle expanded', async () => {
      const wrapper = mount(Component)
      expect(wrapper.find('.v-btn__content').text()).toContain('More Filters')
      wrapper.setData({
        expanded: true
      })
      await wrapper.vm.$nextTick()
      expect(wrapper.find('.v-btn__content').text()).toContain('Less Filters')
      expect(wrapper.text()).toContain('Community')
      expect(wrapper.text()).toContain('Role')
      expect(wrapper.text()).toContain('Status')
      expect(wrapper.text()).toContain('Discipline')
      expect(wrapper.element).toMatchSnapshot()
    })
  })
  describe('Methods', () => {
    test('clear', () => {
      const wrapper = mount(Component)
      wrapper.setData({
        community: [1],
        discipline: 2,
        role: [3],
        status: 4
      })
      wrapper.vm.clear({})
      expect(wrapper.emitted('runFilter')[0][0]).toEqual({
        sort: undefined,
        term: undefined,
        'filter[community_id]': '',
        'filter[discipline_id]': null,
        'filter[arbor_role_id]': '',
        'filter[status]': null
      })
    })
    test('run', () => {
      const wrapper = mount(Component)
      wrapper.setData({
        community: [{ id: 1 }, { id: 2 }],
        discipline: 3,
        role: [{ id: 4 }, { id: 5 }],
        status: 6
      })
      wrapper.vm.run({ orderBy: 'one', term: 'two' })
      expect(wrapper.emitted('runFilter')[0][0]).toEqual({
        sort: 'one',
        term: 'two',
        'filter[community_id]': '1,2',
        'filter[discipline_id]': 3,
        'filter[arbor_role_id]': '4,5',
        'filter[status]': 6
      })
    })
    test('selectCommunities', () => {
      const wrapper = mount(Component)
      wrapper.vm.selectCommunities([{ id: 1 }, { id: 2 }])
      expect(wrapper.vm.community).toEqual([{ id: 1 }, { id: 2 }])
      expect(wrapper.emitted('runFilter')).toBeTruthy()
      expect(wrapper.emitted('runFilter')[0][0]['filter[community_id]']).toEqual('1,2')
    })
    test('selectRoles', () => {
      const wrapper = mount(Component)
      wrapper.vm.selectRoles([{ id: 3 }, { id: 4 }])
      expect(wrapper.vm.role).toEqual([{ id: 3 }, { id: 4 }])
    })
    test('selectCommunities null', () => {
      const wrapper = mount(Component)
      wrapper.setData({
        community: [{ id: 1 }]
      })
      wrapper.vm.selectCommunities(null)
      expect(wrapper.vm.community).toEqual([])
    })
    test('selectRoles null', () => {
      const wrapper = mount(Component)
      wrapper.setData({
        role: [{ id: 3 }]
      })
      wrapper.vm.selectRoles(null)
      expect(wrapper.vm.role).toEqual([])
    })
  })
})
