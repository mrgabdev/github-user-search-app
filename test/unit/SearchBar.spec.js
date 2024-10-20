import SearchBar from '@/components/SearchBar.vue'
import { mount } from '@vue/test-utils'

describe('SearchBar User', () => {
  const wrapper = mount(SearchBar)
  it('renders the form correctly', () => {
    // Verificar que el formulario se renderiza correctamente
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'FindIcon' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ButtonSearch' }).exists()).toBe(true)
  })
})
