import App from '@freshinup/core-ui/src/App'
import AppComponent from 'fresh-bus/App'
import theme from './theme'
import axios from 'axios'
import Vue from 'vue'
import CoreProvider from '@freshinup/core-ui/src/Provider'
import ClientProvider from './Provider'
import FreshBusProvider from 'fresh-bus/Provider'
import CoachingProvider from '@freshinup/coaching-ui/src/Provider'
import '../fonts/css/icon.css'
import UserListContactCell from './components/users/UserListContactCell.vue'
import { install as installAuthRouter } from 'fresh-bus/router/auth'

export const initialState = {
  loginSuccessRedirectPath: '/admin/dashboard',
  permissions: {
    adminUserList: {
      columns: [
        { text: 'Name / Email', value: 'first_name,email', align: 'left', component: UserListContactCell },
        { text: 'Community', sortable: false, value: 'community', align: 'center' },
        { text: 'Discipline', sortable: false, value: 'discipline', align: 'center' },
        { text: 'Role', sortable: false, value: 'arbor_role', align: 'center' },
        { text: 'Status', sortable: true, value: 'status', align: 'center' },
        { text: 'Manage', sortable: false, value: 'manage', align: 'center' }
      ],
      itemActions: [
        { action: 'edit', text: 'View / Edit' },
        { action: 'delete', text: 'Delete' }
      ]
    }
  },
  navigation: {
    isConsumerViewAvailable: false,
    hideUserLevel: true,
    displayedUserField: 'email',
    userMenuItems: [
      { title: 'My Profile', to: { path: '/users/me/edit' } }
    ]
  },
  navigationAdmin: {
    title: 'Arbor',
    logo: '/images/logo.png',
    headerImage: '/images/img-header-background@3x.jpg',
    background: '/images/img-background.png',
    isDark: false,
    hideIcons: false,
    backgroundActiveColor: '#f25d04',
    foregroundActiveColor: 'white',
    footerColor: 'primary',
    items: [
      {
        action: 'icon-dashboard',
        title: 'Dashboard',
        to: { name: 'admin-dashboard' }
      },
      {
        action: 'icon-users',
        title: 'Users',
        to: { name: 'admin-users' }
      },
      {
        action: 'icon-documents',
        title: 'Arbor Coaching',
        to: { path: '/admin/coaching' }
      },
      {
        action: 'icon-reports',
        title: 'Reporting (coming soon)',
        to: { path: '/admin/reports' }
      },
      {
        action: 'icon-settings',
        title: 'Settings',
        active: false,
        items: [
          { title: 'Base User System settings (coming soon)', to: { path: '/admin/bus-settings' } },
          { title: 'Arbor Coaching settings (coming soon)', to: { path: '/admin/coaching-settings' } }
        ]
      }
    ]
  },
  ...window.__INITIAL_STATE__
}

const appInstance = new App({
  modules: [
    CoreProvider,
    FreshBusProvider,
    CoachingProvider,
    ClientProvider
  ],
  initialState,
  theme,
  axios,
  Vue,
  middleware: require.context('../../vendor/freshinup/fresh-bus-forms/resources/assets/js/middleware/', true, /\.js$/),
  excludePage: (key) => {
    return key.indexOf('/teams') > -1
  }
})
installAuthRouter(Vue)
appInstance.boot(AppComponent)
appInstance.addRoutes([{ path: '/', redirect: '/admin' }, { path: '', redirect: '/admin' }])

// We may consider only exposing the app when a certain key is set (true EXPOSE_APP=true)
window.__APP__ = appInstance

export default appInstance
