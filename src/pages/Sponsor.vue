<template>
  <div class="row q-mt-xl q-ml-xl q-mr-xl">
    <div class="col-4 q-pr-xl">
      <div class="fixed"  style="width: calc(100% / 3  - 48px - 12px)">
        <q-card>
          <q-card-title>
            {{sponsorInfo.name}}
          </q-card-title>
          <q-card-separator/>
          <q-card-main>
            {{sponsorInfo.domain}}
            <div class="q-subheading">{{sponsorInfo.bloggers.length}} видео со ссылками</div>
          </q-card-main>
        </q-card>
      </div>

    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-4" v-for="blogger in sponsorInfo.bloggers" v-bind:key="blogger.id">
          <q-card
                  class="q-mb-md q-ml-md"
                  @click.native="openVideo(blogger.id)"
          >
            <q-card-media>
              <img :src="blogger.channel_pic_url">
            </q-card-media>
            <q-card-title>
              <a :href="blogger.url" target="_blank">{{blogger.name}}</a>
            </q-card-title>
            <q-card-separator/>
            <q-card-main>
              <div class="row q-mb-md">
                <q-chip square class="q-mr-xs" icon="fas fa-user-circle" color="primary">
                  {{blogger.subscribers}}
                </q-chip>

                <q-chip square class="q-mr-xs" icon="fas fa-mouse-pointer" color="primary">
                  {{blogger.total_clicks}}
                </q-chip>
              </div>

              <div class="row">
                <q-chip square class="q-mr-xs" icon="fas fa-link" color="primary">
                  {{blogger.sponsor_links}}
                </q-chip>

                <q-chip square class="q-mr-xs" icon="fas fa-bullseye" color="primary">
                  {{blogger.sponsor_clicks}}
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
  name: 'Sponsor',
  data: function () {
    return {
      sponsorInfo: null
    }
  },
  methods: {
    openVideo: function (id) {
      this.$router.push({path: `bloggers/${id}`})
    },
    getSponsorInfo: async function () {
      this.$q.loading.show()
      const sponsorInfo = (await axios.get(config.host + `/sponsor/${config.sponsorId}/top`)).data
      this.sponsorInfo = sponsorInfo
      console.log(sponsorInfo)
      this.$q.loading.hide()
    }
  },
  mounted: async function () {
    await this.getSponsorInfo()
  }

}
</script>
