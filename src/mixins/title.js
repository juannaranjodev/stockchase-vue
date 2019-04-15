function getValue(vm) {
  const { title } = vm.$options;

  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title;
  }

  return null;
}

const serverMixin = {
  created() {
    const value = getValue(this);
    if (value) this.$ssrContext.title = `${value} — Stockchase`;
  },
};

const clientMixin = {
  mounted() {
    const value = getValue(this);
    if (value) document.title = `${value} — Stockchase`;
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverMixin
  : clientMixin;
