<template >
  <div >
    <div class="row">
      <div class="col-4"></div>
      <div class="col-4 q-pt-xl">
        <transition
          appear
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutLeft"
        >
          <q-card v-if="waitingInput" >
            <q-card-title>
              Add links
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <q-input
                v-model="videoLink"
                type="textarea"
                float-label="Video link"
                inverted
              />

              <div class="row" v-for="link in links" v-bind:key="link.id">
                <div class="col-8">
                  <q-input
                    @blur="test"
                    @input="(val) => linkUpdated(val, link.id)"
                    v-model="link.url"
                    type="url"
                    rows="1"
                    float-label="Sponsor link"
                  />
                </div>
                <div class="col-4 q-pl-xs">
                  <q-input
                    @blur="test"
                    @input="(val) => linkUpdated(val, link.id)"
                    v-model="link.description"
                    type="textarea"
                    float-label="Link description"
                  />
                </div>

              </div>

            </q-card-main>
            <q-card-actions align="center">
              <q-btn color="primary" class="full-width" @click="submit">{{goButtonText}}</q-btn>
            </q-card-actions>
          </q-card>
          <q-card v-else>
            <q-card-title>
              Вставьте эти ссылки под видео
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <q-input
                v-model="videoLink"
                type="textarea"
                float-label="Video link"
                inverted
              />

              <div  v-for="link in shortLinks" v-bind:key="link.url">
                <div class="row">
                  <div class="col-12">
                    <q-input readonly
                             v-model="link.url"
                             type="url"
                             rows="1"
                             :float-label="link.description"
                    />

                  </div>

                </div>
              </div>

            </q-card-main>
            <q-card-actions align="center">
              <q-btn color="primary" class="full-width" @click="goToAnalytics">Поскакать к аналитике</q-btn>
            </q-card-actions>
          </q-card>

        </transition>
      </div>
      <div class="col-4 fixed-bottom-right float-right ">
        <img :src="'../statics/pony/' + currentPonyFrame + '.png'" height="300" width="300"/>
      </div>

    </div>
  </div>

</template>

<style>
</style>

<script>
import axios from 'axios'
import config from '../config'
import sequential from 'promise-sequential'

export default {
  name: 'PageIndex',
  data () {
    return {
      currentPonyFrame: '01',
      waitingInput: true,
      videoLink: '',
      goButtonText: 'Go',
      shortLinks: [],
      links: [
        {
          id: 0,
          url: '',
          description: ''
        }
      ]
    }
  },
  methods: {
    goToAnalytics: function () {
      this.$router.push('content')
    },
    swapButton: async function () {
      this.goButtonText = this.goButtonText === 'Go' ? 'И-го-го!!!' : 'Go'
      this.waitingInput = !this.waitingInput
    },
    linkUpdated: function (value, index) {
      const maxIndexLink = this.links.reduce((previousValue, currentValue) =>
        currentValue.id > previousValue.id ? currentValue : previousValue)

      console.log(maxIndexLink)
      if (maxIndexLink.id === index && value !== '') {
        this.links.push({
          id: index + 1,
          url: '',
          description: ''
        })
      }

      if (maxIndexLink.id !== index && value === '') {
        this.links = this.links.filter(link => link.id !== index)
      }
    },

    submit: async function () {
      await this.animate()
      this.swapButton()
      const shortLinks = await this.getShortLinks()
      this.shortLinks = shortLinks.map(link => ({
        url: link.short,
        description: link.description
      }))
    },

    getShortLinks: async function () {
      console.log(config.host + '/content', this.videoLink)
      const content = (await axios.post(config.host + '/content', {
        blogger_id: config.bloggerId,
        url: this.videoLink,
        type: 'video'
      })).data

      let longLinks = this.links.map(link => ({
        blogger_id: config.bloggerId,
        content_id: content.id,
        description: link.description,
        long: link.url
      }))

      longLinks = longLinks.filter(link => link.long !== '')

      console.log('links', longLinks)
      const shortLinks = (await axios.post(config.host + '/links/batch', longLinks)).data
      console.log(shortLinks
      )
      return shortLinks
    },

    later: function (delay) {
      return new Promise(function (resolve) {
        setTimeout(resolve, delay)
      })
    },

    animate: async function () {
      let animators = []

      for (let i = 2; i <= 42; i++) {
        animators.push(async () => {
          await this.later(1000 / 24)
          this.changeFrame()
        })

        console.log(i)
      }

      await sequential(animators)
      return true
    },

    changeFrame: function () {
      let frame = Number(this.currentPonyFrame) + 1
      if (frame < 10) {
        frame = '0' + frame.toString()
      }
      this.currentPonyFrame = frame
    },

    test: function () {
      console.log('test')
    }
  }
}

</script>
