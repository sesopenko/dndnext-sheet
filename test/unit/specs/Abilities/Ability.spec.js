import Vue from 'vue'
import Ability from 'src/components/Abilities/Ability'

describe('Ability.vue', () => {
  it('should render correct contents', () => {
    var mount = document.createElement('div')
    const Constructor = Vue.extend(Ability)
    const vm = new Constructor({
      el: mount,
      propsData: {
        label: 'Agility',
        value: 10
      }
    })

    expect(vm.$el.querySelector('label').textContent)
      .to.equal('Agility')

    expect(vm.$el.querySelector('select').value)
      .to.equal('10')
  })

  it('should have correct modifier', () => {
    var data = [
      [3, '-4'],
      [4, '-3'],
      [5, '-3'],
      [6, '-2'],
      [7, '-2'],
      [8, '-1'],
      [9, '-1'],
      [10, '+0'],
      [11, '+0'],
      [12, '+1'],
      [13, '+1'],
      [14, '+2'],
      [15, '+2'],
      [16, '+3'],
      [17, '+3'],
      [18, '+4']
    ]
    data.forEach(function(dataItem) {
      var mount = document.createElement('div')
      const Constructor = Vue.extend(Ability)
      const vm = new Constructor({
        el: mount,
        propsData: {
          label: 'Agility',
          value: dataItem[0]
        }
      })

      expect(vm.$el.querySelector('select').value)
        .to.equal(dataItem[0].toString())

      expect(vm.$el.querySelector('.modifier').textContent.trim())
        .to.equal(dataItem[1])
    })
    var mount = document.createElement('div')
  })
})
