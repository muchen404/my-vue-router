export default {
  name: 'RouterLink',
  props: {
    to: {
      type: [String, Object],
      require: true
    }
  },
  render (h) {
    const href = typeof this.to === 'string' ? this.to : this.to.path
    const router = this.$router

    const data = {
      attrs: {
        href: router.mode === 'hash' ? '#' + href : href
      }
    }

    return h('a', data, this.$slots.default)
  }
}
