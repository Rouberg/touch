<script>
  export default {
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      checked: Boolean
    },
    render (h) {
      const icon = h('i', {
        'class': [
          'r-checkbox-i',
          {
            active: this.$props.checked
          }
        ]
      }, [
        h('input', {
          attrs: {
            type: 'checkbox',
            checked: this.$props.checked
          },
          on: {
            change: this.update
          }
        })
      ])
      if (this.$slots.default) {
        const slot = h('span', {
          'class': 'slot'
        }, [
          this.$slots.default
        ])
        return h('label', {
          'class': [
            'component-r-checkbox'
          ]
        }, [icon, slot])
      } else {
        return icon
      }
    },
    methods: {
      update (e) {
        this.$emit('change', e.target.checked)
      }
    }
  }
</script>
<style lang="less">
  .component-r-checkbox {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > .slot {
      flex: 1;
    }
  }

  .r-checkbox-i {
    position: relative;
    display: inline-block;
    background-color: #999;
    width: 16px;
    height: 16px;
    line-height: 16px;
    border-radius: 2px;
    margin-right: 6px;

    &:before {
      content: ' ';
      display: block;
      border-bottom: 2px solid white;
      border-left: 2px solid white;
      width: 16px;
      height: 8px;
      transform: rotate(-45deg) scale(.8);
    }

    [type=checkbox] {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      width: 16px;
      height: 16px;
      margin: 0;
    }

    &.active {
      background-color: #6dc54f;
    }
  }
</style>
