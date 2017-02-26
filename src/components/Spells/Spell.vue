<template>
  <div class="spell panel panel-default" role="listitem">
    <div class="panel-heading">
      {{ name }}
    </div>
    <div class="panel-body">
      <div class="school">
        {{ nthLevel }} {{ school | lowercase }}
      </div>
      <div class="details">
        <div>
          <strong>Casting Time:</strong> {{ castingTime }}
        </div>
        <div>
          <strong>Range:</strong> {{ range }}
        </div>
        <div>
          <strong>Components:</strong> {{ components.raw }}
        </div>
        <div>
          <strong>Duration:</strong> {{ duration }}
        </div>
      </div>
      <div class="description">
        <span v-html="markedDescription"></span>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * Entity Escaping code from Stack Overflow:
   * https://github.com/chjj/marked
   * Question asked by Page Brooks http://stackoverflow.com/users/2657/page-brooks:
   * Does anyone know of an easy way to escape HTML from strings in jQuery? I need to be able to pass an arbitrary string and have it properly escaped for display in an HTML page (preventing JavaScript/HTML injection attacks). I'm sure it's possible to extend jQuery to do this, but I don't know enough about the framework at the moment to accomplish this.
   * Answer by Tom Gruner http://stackoverflow.com/users/420688/tom-gruner
   *
   * Licensed via creative commons by-sa 3.0 with attribution
   **/

  var marked = require('marked')
  var renderer = new marked.Renderer()
  var entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  }

  /**
   * Renders a link.
   *
   * @param {string} href
   * @param {title} title
   * @param {text} text
   *
   * @return {text}
   *   Rendered text
   */
  renderer.link = function (href, title, text) {
    return String(title).replace(/[&<>"'`=\\/]/g, function (s) {
      return entityMap[s]
    })
  }

  export default {
    name: 'spell',
    data () {
      return {}
    },
    props: {
      name: {
        type: String,
        required: true
      },
      level: {
        type: String,
        default: 'cantrip'
      },
      school: {
        type: String,
        requred: true
      },
      castingTime: {
        type: String,
        required: true
      },
      range: {
        type: String,
        required: true
      },
      components: {
        type: Object,
        default: function () {
          return {
            raw: ''
          }
        }
      },
      duration: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      },
      ritual: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      nthLevel: function () {
        if (this.level === 'cantrip') {
          return 'cantrip'
        } else {
          return this.ordinal(parseInt(this.level, 10)) + '-level'
        }
      },
      markedDescription: function () {
        return marked(this.description.toString(), {
          renderer: renderer
        })
      }
    },
    methods: {
      ordinal: function (n) {
        var s = ['th', 'st', 'nd', 'rd']
        var v = n % 100
        return n.toString() + (s[(v - 20) % 10] || s[v] || s[0])
      }
    },
    filters: {
      lowercase: function (value) {
        if (!value) return ''
        value = value.toString().toLowerCase()
        return value
      }
    }
  }
</script>

<style>
  .spell .school {
    font-style: italic;
    margin-bottom: 14px;
  }
  .spell .details {
    margin-bottom: 14px;
  }
  .spell .description .section {
    margin-bottom: 7px;
  }
</style>
