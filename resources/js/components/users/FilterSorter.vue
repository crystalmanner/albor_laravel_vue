<template>
  <f-filter-sorter
    ref="filterSorter"
    placeholder="Search by first name, last name and email address"
    :expanded="expanded"
    @collapsed="expanded = false"
    @expanded="expanded = true"
    @run="run"
    @clear="clear"
  >
    <template v-slot:expanded="slotProps">
      <v-layout
        row
        wrap
      >
        <v-flex lg3>
          <v-layout row>
            <v-flex shrink>
              <v-card-text>Status</v-card-text>
            </v-flex>
            <v-flex>
              <v-select
                v-model="status"
                :items="statuses"
                item-text="name"
                item-value="id"
                placeholder="All"
                solo
                flat
                hide-details
                @change="slotProps.run"
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex lg3>
          <v-layout row>
            <v-flex shrink>
              <v-card-text>Community</v-card-text>
            </v-flex>
            <v-flex>
              <f-multi-simple
                ref="communities"
                url="communities"
                term-param="filter[name]"
                placeholder="All"
                background-color="white"
                class="mt-0 pt-0"
                height="48"
                :value="community"
                @input="selectCommunities"
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex lg3>
          <v-layout row>
            <v-flex shrink>
              <v-card-text>Discipline</v-card-text>
            </v-flex>
            <v-flex>
              <v-select
                v-model="discipline"
                :items="disciplines"
                placeholder="All"
                item-text="name"
                item-value="id"
                solo
                flat
                hide-details
                @change="slotProps.run"
              />
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex lg3>
          <v-layout row>
            <v-flex shrink>
              <v-card-text>Role</v-card-text>
            </v-flex>
            <v-flex>
              <f-multi-simple
                ref="roles"
                url="roles"
                term-param="filter[name]"
                placeholder="All"
                background-color="white"
                class="mt-0 pt-0"
                height="48"
                :value="role"
                @input="selectRoles"
              />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </template>
  </f-filter-sorter>
</template>

<script>
import FFilterSorter from '@freshinup/core-ui/src/components/FFilterSorter.vue'
import FMultiSimple from '@freshinup/core-ui/src/components/FMultiSimple.vue'

export default {
  components: {
    FFilterSorter,
    FMultiSimple
  },
  data () {
    return {
      expanded: false,

      disciplines: [
        { id: 1, name: 'Accounting' },
        { id: 2, name: 'Communication' },
        { id: 3, name: 'Dining' },
        { id: 4, name: 'Engagement' },
        { id: 5, name: 'Maintenance' },
        { id: 6, name: 'Operations' },
        { id: 7, name: 'People' },
        { id: 8, name: 'Resident Care' },
        { id: 9, name: 'Sales' }
      ],
      discipline: null,

      statuses: [
        { id: 1, name: 'Active' },
        { id: 4, name: 'Pending' },
        { id: 3, name: 'On hold' }
      ],
      status: null,

      community: [],
      role: []
    }
  },
  methods: {
    getRunParams (params) {
      return {
        term: params.term,
        sort: params.orderBy,
        'filter[discipline_id]': this.discipline,
        'filter[status]': this.status,
        'filter[community_id]': this.community.map(item => item.id).join(','),
        'filter[arbor_role_id]': this.role.map(item => item.id).join(',')
      }
    },
    run (value) {
      this.$emit('runFilter', this.getRunParams(value))
    },
    clear (value) {
      this.discipline = null
      this.status = null
      this.community = []
      this.role = []
      this.$refs.roles.resetTerm()
      this.$refs.communities.resetTerm()

      this.run(value)
    },
    selectCommunities (communities) {
      this.community = communities || []
      this.$refs.filterSorter.run()
    },
    selectRoles (roles) {
      this.role = roles || []
      this.$refs.filterSorter.run()
    }
  }
}
</script>

<style lang="css" scoped>
/deep/ .v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>
