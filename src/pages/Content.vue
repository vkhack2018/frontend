<template>
  <div class="row q-mt-xl q-ml-xl q-mr-xl">
    <div class="col-4 q-pr-xl">
      <div class="fixed"  style="width: calc(100% / 3  - 48px - 12px)">
        <q-card>
          <q-card-title>
            {{bloggerInfo.name}}
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            <div class="q-subheading">{{bloggerInfo.content.length}} видео со ссылками</div>
          </q-card-main>
        </q-card>
      </div>

    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-6" v-for="video in bloggerInfo.content" v-bind:key="video.id">
          <q-card
                  class="q-mb-md q-ml-md"
                  @click.native="openVideo(video.id)"
          >
            <q-card-media>
              <img :src="video.picurl">
            </q-card-media>
            <q-card-title>
              <a :href="video.url" target="_blank">{{video.name}}</a>
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <div class="row q-mb-md">
                <q-chip square class="q-mr-xs" icon="fas fa-eye" color="primary">
                  {{video.views}}
                </q-chip>

                <q-chip class="q-mr-xs" icon="fas fa-thumbs-up" color="green">
                  {{video.likes}}
                </q-chip>

                <q-chip class="q-mr-xs" icon="fas fa-thumbs-down" color="red">
                  {{video.dislikes}}
                </q-chip>
              </div>

              <div class="row">
                <q-chip square class="q-mr-xs" icon="fas fa-link" color="primary">
                  {{video.links_count}}
                </q-chip>

                <q-chip square class="q-mr-xs" icon="fas fa-mouse-pointer" color="primary">
                  {{video.clicks_sum}}
                </q-chip>

                <q-chip square class="q-mr-xs" icon="fas fa-chart-bar" color="primary">
                  CTR {{Number((video.clicks_sum / video.views * 100).toFixed(2))}}%
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
  name: 'Content',
  data: function () {
    return {
      bloggerInfo: {
        name: 'Petr',
        content: [
          {
            url: 'dd'
          }
        ]
      }
    }
  },
  methods: {
    openVideo: function (id) {
      this.$router.push({path: `videos/${id}`})
    },
    getBloggerInfo: async function () {
      const bloggerInfo = (await axios.get(config.host + `/blogger/${config.bloggerId}/content`)).data
      this.bloggerInfo = bloggerInfo
      console.log(bloggerInfo)
    }
  },
  mounted: async function () {
    await this.getBloggerInfo()
  }

}
</script>
