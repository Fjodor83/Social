<template>
  <v-app v-if="displaySpaceNavigations" class="spaceMenuParent white">
    <v-footer 
      v-if="isMobile" 
      class="spaceButtomNavigation white">
      <v-slide-group>
        <v-bottom-navigation
          :value="selectedNavigationUri"
          grow
          color="tertiary"
          background-color="transparent"
          class="spaceButtomNavigationParent"
          flat>
          <v-btn
            v-for="nav in navigations"
            :key="nav.id"
            :value="nav.uri"
            :href="nav.uri"
            class="subtitle-2 spaceButtomNavigationItem">
            <span>{{ nav.label }}</span>
            <i :class="nav.icon"></i>
          </v-btn>
        </v-bottom-navigation>
      </v-slide-group>
    </v-footer>    
    <v-tabs
      v-else
      :value="selectedNavigationUri"
      active-class="SelectedTab"
      class="mx-auto"
      show-arrows
      center-active
      slider-size="4">
      <v-tab
        v-for="nav in navigations"
        :key="nav.id"
        :value="nav.id"
        :href="nav.uri"
        class="spaceNavigationTab">
        {{ nav.label }}
      </v-tab>
    </v-tabs>
  </v-app>
</template>

<script>

export default {
  props: {
    navigations: {
      type: Array,
      default: () => [],
    },
    selectedNavigationUri: {
      type: String,
      default: null,
    },
  },
  computed: {
    displaySpaceNavigations() {
      return this.navigations && this.navigations.length;
    },
    isMobile() {
      return this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs;
    },
  },
  watch: {
    displaySpaceNavigations() {
      this.computedSiteBodyMargin();
    },
  },
  created() {
    document.addEventListener('refreshSpaceNavigations', () => {
      this.$spaceService.getSpaceNavigations(eXo.env.portal.spaceId)
        .then(data => {
          // Compute URI of nodes of old navigation
          if (data && data.length) {
            data.forEach(nav => {
              const oldNav = this.navigations.find(oldNav => oldNav.id === nav.id);
              if (oldNav) {
                nav.uri = oldNav.uri;
              } else if (nav.uri && nav.uri.indexOf('/') >= 0) {
                nav.uri = nav.uri.split('/')[1];
              }
            });
            this.navigations = data;
          }
          return this.$nextTick();
        })
        .then(() => this.$root.$emit('application-loaded'));
    });
  },
  mounted() {
    this.$root.$applicationLoaded();
    this.computedSiteBodyMargin();
  },
  methods: {
    computedSiteBodyMargin() {
      if (this.isMobile && this.displaySpaceNavigations) {
        window.setTimeout(() => {
          $('#UISiteBody').css('margin-bottom', '70px');
        }, 200);
      }
    },
  },
};
</script>