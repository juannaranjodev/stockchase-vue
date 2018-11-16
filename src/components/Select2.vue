<template>
  <div :id="wrapperId">
    <select :id="selectId" :class="selectClass" :placeholder="placeholder" :disabled="disabled"></select>
  </div>

</template>

<script>
import $ from 'jquery'

if (process.browser) {
  require('select2')
  require('select2/dist/css/select2.min.css')
}

export default {
  name: 'Select2',
  data() {
    return {
      select2: null
    }
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  props: {
    wrapperId: {
      type: String,
      default: ''
    },
    selectId: {
      type: String,
      default: ''
    },
    selectClass: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    settings: {
      type: Object,
      default: () => {}
    },
    value: null
  },
  watch: {
    options(val) {
      this.setOption(val)
    },
    value(val) {
      this.setValue(val)
    }
  },
  methods: {
    setOption(data = []) {
      this.select2.empty()
      this.select2.select2({
        ...this.settings,
        data
      })
      this.setValue(this.value)
    },
    setValue(val) {
      if (val instanceof Array) {
        this.select2.val([...val])
      } else {
        this.select2.val([val])
      }
      this.select2.trigger('change')
    },
  },
  mounted() {
    this.select2 = $(this.$el)
      .find('select')
      .select2({
        ...this.settings,
        data: this.options
      })
      .on('select2:select select2:unselect', ev => {
        this.$emit('change', this.select2.val())
        this.$emit('select', ev['params']['data'])
      })
      .on('select2:selecting', ev => {
        this.$emit('selecting', ev)
      })
    const self = this
    $(this.$el).on('keyup.select2vue', '.select2-search__field', function (e) {
      if((e.key === 'Enter' || e.key === 'Return')){
        self.$emit('enterPressed', e.target.value)
      }
    })
    this.setValue(this.value)
  },
  beforeDestroy() {
    $(this.$el).off('keyup.select2vue', '.select2-search__field')
    this.select2.select2('destroy')
  }
}
</script>
