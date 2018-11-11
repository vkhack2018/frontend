<template>
  <div class="row q-mt-xl q-ml-xl q-mr-xl">
    <div class="col-4 q-pr-xl">
      <div class="fixed"  style="width: calc(100% / 3  - 48px - 12px)">
        <q-card>
          <q-card-title>
            <div class="row">
              <div class="col">
                <q-card-media>
                  <img :src="bloggerInfo.channel_pic_url" height="128px" style="!important; width: 128px">
                </q-card-media>
              </div>
              <div class="col">
                {{bloggerInfo.name}}
                <q-chip square class="q-mb-xs" icon="fas fa-user-circle" color="primary">
                  {{bloggerInfo.subscribers}}
                </q-chip>

                <q-chip square class="q-mb-xs" icon="fas fa-mouse-pointer" color="primary">
                  {{bloggerInfo.total_clicks}}
                </q-chip>

                <q-chip square class="q-mb-xs" icon="fas fa-bullseye" color="primary">
                  {{bloggerInfo.sponsor_total_clicks}}
                </q-chip>
              </div>

            </div>

          </q-card-title>
          <q-card-main>
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
              Всего
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
  name: 'BloggersForSponsor',
  data: function () {
    return {
      bloggerInfo: null
    }
  },
  methods: {
    getBloggerInfo: async function () {
      this.$q.loading.show()
      const bloggerId = this.$route.params.id
      console.log(bloggerId)
      const bloggerInfo = (await axios.get(config.host + `/blogger/${bloggerId}/links/sponsor/${config.sponsorId}`)).data
      this.bloggerInfo = bloggerInfo
      console.log(bloggerInfo)
      this.$q.loading.hide()
    }
  },
  mounted: async function () {
    await this.getBloggerInfo()
  }

}
</script>
