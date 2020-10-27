<template>
  <div
    v-if="currentUser"
    class="page-layout"
  >
    <slot name="navigation-drawer">
      <v-navigation-drawer
        v-model="isDrawerOpen"
        :clipped="isClipped"
        disable-resize-watcher
        stateless
        app
        dark
        width="220px"
      >
        <div
          v-if="navDrawerLogo"
          class="logo-container"
        >
          <img :src="logo">
        </div>
        <navigation-drawer-list
          :items="items"
          :no-actions="navDrawerNoActions"
        />
      </v-navigation-drawer>
    </slot>
    <slot name="navigation-top">
      <v-toolbar
        fixed
        app
        flat
        color="white"
      >
        <v-toolbar-title>
          <v-flex class="primary--text">
            <template v-if="isAdmin">
              Arbor
            </template>
            <img
              v-else
              :src="logo"
            >
          </v-flex>
        </v-toolbar-title>
        <v-spacer />
        <v-menu
          v-show="notifications"
          left
          offset-y
          max-width="320"
          origin="right top"
          :disabled="!notifications.length"
        >
          <v-btn
            slot="activator"
            icon
            flat
            :disabled="!notifications.length"
          >
            <v-badge
              color="red"
              overlap
            >
              <span
                v-if="notifications.length"
                slot="badge"
              >
                {{ notifications.length }}
              </span>
              <v-icon
                medium
                color="grey darken-2"
              >
                notifications
              </v-icon>
            </v-badge>
          </v-btn>

          <notification-menu />
        </v-menu>
        <v-menu
          v-if="currentUser"
          left
          offset-y
          content-class="user-menu"
          max-width="300"
        >
          <v-btn
            slot="activator"
            icon
            flat
            class="avatar"
          >
            <v-avatar size="48">
              <img
                :src="currentUser.avatar"
                :alt="currentUser.name"
              >
            </v-avatar>
          </v-btn>

          <user-menu
            :user="currentUser"
            :user-is-admin="isCurrentUserAdmin"
            :menu-items="userMenuItems"
            :consumer-view="isConsumerViewAvailable"
            :user-field="displayedUserField"
            :hide-level="hideUserLevel"
            @signout="signout"
          />
        </v-menu>
      </v-toolbar>
    </slot>
    <v-content class="main-page-container">
      <v-progress-linear
        v-if="isLoading"
        :indeterminate="true"
      />
      <router-view v-show="!isLoading" />
      <v-snackbar
        v-model="isVisible"
        color="error"
        :timeout="6000"
        top
      >
        {{ errorMessages }}
        <v-btn
          dark
          flat
          @click="setErrorVisibility(false)"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-snackbar
        v-model="isMessageVisible"
        color="success"
        :timeout="6000"
        top
      >
        {{ message }}
        <v-btn
          dark
          flat
          @click="setMessageVisibility(false)"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-content>
    <slot name="footer">
      <fresh-bus-footer />
    </slot>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'
import UserMenu from 'fresh-bus/components/layout/UserMenu.vue'
import NavigationDrawerList from 'fresh-bus/components/layout/NavigationDrawerList.vue'
import NotificationMenu from 'fresh-bus/components/layout/NotificationMenu.vue'
import FreshBusFooter from 'fresh-bus/components/Footer.vue'

const generalErrorMessageFields = createHelpers({
  getterType: 'generalErrorMessages/getField',
  mutationType: 'generalErrorMessages/updateField'
}).mapFields

const generalMessageFields = createHelpers({
  getterType: 'generalMessage/getField',
  mutationType: 'generalMessage/updateField'
}).mapFields

const navigationAdminFields = createHelpers({
  getterType: 'navigationAdmin/getField',
  mutationType: 'navigationAdmin/updateField'
}).mapFields

export default {
  components: {
    UserMenu,
    NotificationMenu,
    NavigationDrawerList,
    FreshBusFooter
  },
  data: () => ({
    isAdmin: true,
    navDrawerLogo: true,
    navDrawerNoActions: false
  }),
  computed: {
    ...mapState('navigationAdmin', [
      'items',
      'logo'
    ]),
    ...generalErrorMessageFields([
      'isVisible'
    ]),
    ...navigationAdminFields({
      isDrawerOpen: 'isDrawerOpen',
      isClipped: 'isClipped'
    }),
    ...generalMessageFields({
      isMessageVisible: 'isVisible'
    }),
    ...mapState('navigation', {
      isConsumerViewAvailable: state => state.isConsumerViewAvailable,
      hideUserLevel: state => state.hideUserLevel,
      displayedUserField: state => state.displayedUserField
    }),
    ...mapGetters('generalErrorMessages', {
      errorMessages: 'errorMessages'
    }),
    ...mapGetters('generalMessage', {
      message: 'message'
    }),
    ...mapGetters(['currentUser']),
    ...mapGetters('currentUser', {
      isCurrentUserAdmin: 'isAdmin'
    }),
    ...mapState('navigation', {
      userMenuItems: state => state.userMenuItems
    }),
    ...mapGetters(['currentUser']),
    ...mapGetters('userNotifications', { 'notifications': 'unacknowledged' }),
    ...mapGetters('page', ['isLoading'])
  },
  methods: {
    ...mapActions('generalErrorMessages', {
      setErrorVisibility: 'setVisibility'
    }),
    ...mapActions('generalMessage', {
      setMessageVisibility: 'setVisibility'
    }),
    signout () {
      this.$auth.logout({
        redirect: 'auth'
      })
    }
  },
  beforeRouteEnterOrUpdate (vm, to, from, next) {
    vm.$store.dispatch('page/setLoading', true)
    Promise.all([
      vm.$store.dispatch('currentUser/getCurrentUser')
    ]).then(() => {
      vm.$store.dispatch('page/setLoading', false)
      if (next) next()
    })
  }
}
</script>

<style scoped>
  .main-page-container {
    background-color: transparent;
    min-height: 650px;
  }
  /deep/ .main-page-container .v-content__wrap {
    background: url('/images/img-header-background@3x.jpg') no-repeat top left;
    background-size: auto 550px;
  }

  .page-title {
    color: white;
  }

  .logo-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    background-color: #FCFBF9;
    height: 64px;
  }
  .logo-container img {
    width: 180px
  }

  .theme--dark.v-navigation-drawer {
    background-color: #192530;
  }

  /deep/ .v-navigation-drawer .v-list .v-list__tile {
    padding: 0 24px !important;
  }
  /deep/ .v-navigation-drawer .v-list .v-list__tile .v-list__tile__title {
  }
  /deep/ .v-navigation-drawer .v-list .v-list__tile.v-list__tile--active,
  /deep/ .v-navigation-drawer .v-list .v-list__tile:hover {
    background-color: var(--v-primary-base);
    color: white !important
  }

  /deep/ .v-toolbar__content {
    padding-left: 10px;
  }
</style>
