import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/Scene.vue'

describe('Scene.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
