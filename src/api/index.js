let prefix = '/api'
if (process.env.NODE_ENV === 'development') {
  const domain = {
    dev: '/'
  }
  const remote = domain.dev
  prefix = remote + prefix
}

export default {
  TEST: prefix + '/TEST'
}
