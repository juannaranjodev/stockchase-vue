function getValue(vm) {
  const { image } = vm.$options;

  if (image) {
    return typeof image === 'function'
      ? image.call(vm)
      : image;
  }

  return null;
}

const serverMixin = {
  created() {
    const value = getValue(this);
    if (value) this.$ssrContext.image = value;
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
