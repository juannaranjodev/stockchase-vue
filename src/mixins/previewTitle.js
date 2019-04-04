function getValue (vm) {
  const { previewTitle } = vm.$options

  if (previewTitle) {
    return typeof previewTitle === 'function'
      ? previewTitle.call(vm)
      : previewTitle
  }
}

const serverMixin = {
  created () {
    const value = getValue(this)
    if (value) this.$ssrContext.previewTitle = `${value} — Stockchase`
  }
}

const clientMixin = {
  mounted () {
    // do nothing
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverMixin
  : clientMixin
