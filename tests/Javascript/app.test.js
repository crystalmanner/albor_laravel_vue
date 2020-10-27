import App from '~/app'

describe('App', () => {
  test('has version information', () => {
    expect(App.getVersions).toBeInstanceOf(Function)
    const result = App.getVersions()
    expect(result).toHaveProperty('core')
    expect(result.core).toMatch(new RegExp('^\\d.\\d{1,2}.\\d{1,2}$'))
    expect(result).toHaveProperty('freshinup/fresh-bus-forms')
    expect(result['freshinup/fresh-bus-forms']).toMatch(new RegExp('^\\d.\\d{1,2}.\\d{1,2}$'))
  })
  test('has coaching ui', () => {
    const result = App.getVersions()
    expect(result).toHaveProperty('@freshinup/coaching-ui')
    expect(result['@freshinup/coaching-ui']).toMatch(new RegExp('^\\d.\\d{1,2}.\\d{1,2}$'))
  })
})
