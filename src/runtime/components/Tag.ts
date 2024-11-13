import { defineComponent, h } from 'vue'
import type { PropType } from 'vue'

export const Tag = defineComponent({
  name: 'Tag',
  props: {
    as: {
      type: String as PropType<keyof HTMLElementTagNameMap>,
      required: false,
    },
  },
  setup(props, { slots }) {
    return () => {
      if (props.as) {
        return h(props.as, {}, slots.default?.())
      }

      return slots.default?.()
    }
  },
})

export default Tag
