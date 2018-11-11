<template>
  <div class="row q-mt-xl q-ml-xl q-mr-xl">
    <div class="col-4 q-pr-xl">
      <div class="fixed"  style="width: calc(100% / 3  - 48px - 12px)">
        <q-card>
          <q-card-media>
            <img :src="contentInfo.picurl">
          </q-card-media>
          <q-card-title>
            {{contentInfo.name}}
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            <div class="row q-mb-xs q-mt-xs">
              <q-chip square class="q-mr-xs" icon="fas fa-eye" color="primary">
                {{contentInfo.views}}
              </q-chip>

              <q-chip square class="q-mr-xs" icon="fas fa-link" color="primary">
                {{contentInfo.links_count}}
              </q-chip>
            </div>

            <div class="row">
              <q-chip class="q-mr-xs" icon="fas fa-thumbs-up" color="green">
                {{contentInfo.likes}}
              </q-chip>

              <q-chip class="q-mr-xs" icon="fas fa-thumbs-down" color="red">
                {{contentInfo.dislikes}}
              </q-chip>
            </div>
          </q-card-main>
        </q-card>
      </div>

    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-12" v-for="link in contentInfo.links" v-bind:key="link.id">
          <q-card
                  class="q-mb-md q-ml-md"
          >

            <q-card-title>
              <a :href="link.url" target="_blank">{{link.description}}</a>
            </q-card-title>
            <q-card-separator/>

            <q-card-main>
              <div class="row items-center q-mb-md">
                <div class="col-10">
                  <q-input
                    readonly
                    hide-underline
                    v-model="link.long"
                    type="url"
                    float-label="Основная ссылка"
                  />
                </div>
                <div class="col-2">
                  <q-btn @click="{}" flat icon="fas fa-external-link-alt"></q-btn>
                </div>

              </div>

              <div class="row items-center q-mb-md">
                <div class="col-10">
                  <q-input
                    readonly
                    hide-underline
                    v-model="link.short"
                    type="url"
                    float-label="Короткая ссылка"
                  />
                </div>
                <div class="col-2">
                  <q-btn flat @click="{}" icon="fas fa-external-link-alt"></q-btn>
                </div>

              </div>

              <div class="row">

                <q-chip square class="q-mr-xs" icon="fas fa-mouse-pointer" color="primary">
                  {{link.clicks}}
                </q-chip>

                <q-chip square class="q-mr-xs" icon="fas fa-chart-bar" color="primary">
                  CTR {{Number((link.clicks / contentInfo.views * 100).toFixed(2))}}%
                </q-chip>

              </div>

            </q-card-main>
          </q-card>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import axios from 'axios'
import config from '../config'

export default {
  name: 'Video',
  data: function () {
    return {
      contentInfo: {
        name: 'video',
        links: [
          {
            url: 'dd'
          }
        ]
      }
    }
  },
  methods: {
    getContentInfo: async function () {
      const contentId = this.$route.params.id
      console.log(contentId)
      const contentInfo = (await axios.get(config.host + `/content/${contentId}`)).data
      this.contentInfo = contentInfo
      console.log(contentInfo)
    }
  },
  mounted: async function () {
    await this.getContentInfo()
  }

}
</script>
