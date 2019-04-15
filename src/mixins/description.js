function getValue(vm) {
  const { description } = vm.$options;

  if (description) {
    return typeof description === 'function'
      ? description.call(vm)
      : description;
  }

  return null;
}

const serverMixin = {
  created() {
    const value = getValue(this);
    if (value) this.$ssrContext.description = value;
  },
};

const clientMixin = {
  mounted() {
    // Do nothing
  },
};

export default process.env.VUE_ENV === 'server'
  ? serverMixin
  : clientMixin;
