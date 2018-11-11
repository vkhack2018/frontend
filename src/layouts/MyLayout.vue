<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
      >

        <q-toolbar-title>
          <div class="row items-center">
            <div class="q-pr-xs">pony.pro</div>
            <q-btn flat class="q-mr-xs">Добавить ссылки</q-btn>
            <q-btn flat class="q-mr-xs">Аналитика</q-btn>
          </div>

        </q-toolbar-title>

      </q-toolbar>
    </q-layout-header>

    <q-page-container >
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import {openURL} from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
  .q-layout{
    background-image: url(../statics/background.png);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .q-card{
    background-color: #fff;
  }
</style>
