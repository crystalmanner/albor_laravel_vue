import { version, name } from '../../composer.json'
const pages = require.context('./pages', true, /\.vue$/)
const layouts = require.context('./layouts', false, /\.vue$/)
export default () => {
  return {
    name,
    pages,
    layouts,
    store: {},
    version
  }
}
