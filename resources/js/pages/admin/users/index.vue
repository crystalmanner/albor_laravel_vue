<script>
import Page from 'fresh-bus/pages/admin/users/index.vue'
import userFilter from '~/components/users/FilterSorter.vue'

export default {
  components: {
    userFilter
  },
  extends: Page,
  layout: Page.layout,
  beforeRouteEnterOrUpdate: Page.beforeRouteEnterOrUpdate
}
</script>
