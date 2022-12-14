<template>
  <v-toolbar id="spacesListToolbar" flat>
    <v-toolbar-title v-if="canCreateSpace">
      <v-btn
        class="btn btn-primary pe-2 ps-0 addNewSpaceButton"
        @click="$root.$emit('addNewSpace')">
        <v-icon dark>mdi-plus</v-icon>
        <span class="d-none d-sm-inline">
          {{ $t('spacesList.label.addNewSpace') }}
        </span>
      </v-btn>
    </v-toolbar-title>
    <div
      class="text-sub-title ms-3 d-none d-sm-flex">
      {{ $t('spacesList.label.spacesSize', {0: spacesSize}) }}
    </div>
    <v-spacer />
    <v-scale-transition>
      <v-text-field
        v-model="keyword"
        :placeholder="$t('spacesList.label.filterSpaces')"
        prepend-inner-icon="fa-filter"
        class="inputSpacesFilter pa-0 me-3 my-auto" />
    </v-scale-transition>
    <v-scale-transition>
      <select
        v-model="filter"
        class="selectSpacesFilter my-auto me-2 subtitle-1 ignore-vuetify-classes d-none d-sm-inline">
        <option
          v-for="spaceFilter in spaceFilters"
          :key="spaceFilter.value"
          :value="spaceFilter.value">
          {{ spaceFilter.text }}
        </option>
      </select>
    </v-scale-transition>
    <v-icon
      class="d-sm-none"
      @click="openBottomMenu">
      fa-filter
    </v-icon>
    <v-bottom-sheet v-model="bottomMenu" class="pa-0">
      <v-sheet class="text-center" height="169px">
        <v-toolbar
          color="primary"
          dark
          class="border-box-sizing">
          <v-btn text @click="bottomMenu = false">
            {{ $t('spacesList.button.cancel') }}
          </v-btn>
          <v-spacer />
          <v-toolbar-title>
            <v-icon>fa-filter</v-icon>
            {{ $t('spacesList.label.filter') }}
          </v-toolbar-title>
          <v-spacer />
          <v-btn text @click="changeFilterSelection">
            {{ $t('spacesList.button.confirm') }}
          </v-btn>
        </v-toolbar>
        <v-list>
          <v-list-item
            v-for="spaceFilter in spaceFilters"
            :key="spaceFilter"
            @click="filterToChange = spaceFilter.value">
            <v-list-item-title class="align-center d-flex">
              <v-icon v-if="filterToChange === spaceFilter.value">fa-check</v-icon>
              <span v-else class="me-6"></span>
              <v-spacer />
              <div>
                {{ spaceFilter.text }}
              </div>
              <v-spacer />
              <span class="me-6"></span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-bottom-sheet>
  </v-toolbar>
</template>

<script>

export default {
  props: {
    canCreateSpace: {
      type: Boolean,
      default: false,
    },
    keyword: {
      type: String,
      default: null,
    },
    filter: {
      type: String,
      default: null,
    },
    spacesSize: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    filterToChange: null,
    bottomMenu: false,
  }),
  computed: {
    spaceFilters() {
      return [{
        text: this.$t('spacesList.filter.all'),
        value: 'all',
      },{
        text: this.$t('spacesList.filter.userSpaces'),
        value: 'member',
      },{
        text: this.$t('spacesList.filter.favoriteSpaces'),
        value: 'favorite',
      }];
    },
  },
  watch: {
    keyword() {
      this.$emit('keyword-changed', this.keyword);
    },
    filter() {
      this.$emit('filter-changed', this.filter);
    },
  },
  methods: {
    openBottomMenu() {
      this.filterToChange = this.filter;
      this.bottomMenu = true;
    },
    changeFilterSelection() {
      this.bottomMenu = false;
      this.filter = this.filterToChange;
    },
  }
};
</script>

