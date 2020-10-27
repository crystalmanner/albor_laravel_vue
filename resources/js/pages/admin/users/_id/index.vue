<script>
import Page from 'fresh-bus/pages/admin/users/_id/index.vue'
import UserProfile from '~/components/users/UserProfile'

export default {
  components: {
    UserProfile
  },
  extends: Page,
  layout: Page.layout,
  beforeRouteEnterOrUpdate: Page.beforeRouteEnterOrUpdate
}
</script>
