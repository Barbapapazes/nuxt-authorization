import { defineComponent, h } from 'vue'
import type { Component, PropType } from 'vue'

/**
 * Named `Primitive` to align with with Reka UI
 * @see https://github.com/unovue/radix-vue/blob/main/packages/radix-vue/src/Primitive/Primitive.ts
 */
export const Primitive = defineComponent({
  name: 'Primitive',
  props: {
    as: {
      type: [String, Object] as PropType<string | Component>,
      required: false,
    },
  },
  setup(props, { slots }) {
    const asTag = props.as

    if (asTag)
      return () => h(asTag, {}, { default: slots.default })

    return () => slots.default?.()
  },
})
