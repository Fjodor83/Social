<template>
  <exo-drawer
    ref="spaceFormDrawer"
    right
    class="spaceFormDrawer"
    @opened="stepper = 1"
    @closed="stepper = 0">
    <template slot="title">
      {{ title }}
    </template>
    <template slot="content">
      <div></div>
      <div>
        <v-stepper
          v-model="stepper"
          vertical
          flat
          class="ma-0 py-0 me-4"
          :class="`${isMobile ? 'pr-3' : ''}`">
          <v-stepper-step
            :complete="stepper > 1"
            step="1"
            class="ma-0">
            {{ $t('spacesList.label.spaceDetails') }}
          </v-stepper-step>
          <v-stepper-content step="1" class="ps-4 pe-6 my-0">
            <form ref="form1" @submit="nextStep">
              <v-label for="name">
                {{ $t('spacesList.label.name') }}
              </v-label>
              <input
                ref="autoFocusInput1"
                v-model="space.displayName"
                :placeholder="$t('spacesList.label.displayName')"
                type="text"
                name="name"
                class="input-block-level ignore-vuetify-classes my-3"
                required>
              <v-label for="description">
                {{ $t('spacesList.label.description') }}
              </v-label>
              <textarea
                v-model="space.description"
                :placeholder="$t('spacesList.label.description')"
                name="description"
                rows="20"
                maxlength="2000"
                noresize
                class="input-block-level ignore-vuetify-classes my-3">
              </textarea>
              <v-label for="spaceTemplate">
                {{ $t('spacesList.label.spaceTemplate') }}
              </v-label>
              <select
                v-model="template"
                :disabled="space && space.id"
                name="spaceTemplate"
                class="input-block-level ignore-vuetify-classes my-3"
                required>
                <option
                  v-for="item in templates"
                  :key="item.name"
                  :value="item.name">
                  {{ item.resolvedLabel || item.name }}
                </option>
              </select>
              <div class="caption font-italic font-weight-light ps-1 muted">{{ spaceTemplate && spaceTemplate.resolvedDescription || '' }}</div>
              <v-card-actions class="px-0">
                <v-spacer />
                <v-btn
                  class="btn btn-primary"
                  outlined
                  @click="nextStep">
                  {{ $t('spacesList.button.continue') }}
                  <v-icon size="18" class="ms-2">
                    {{ $vuetify.rtl && 'fa-caret-left' || 'fa-caret-right' }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </form>
          </v-stepper-content>
          <v-stepper-step
            :complete="stepper > 2"
            step="2"
            class="ma-0">
            {{ $t('spacesList.label.spaceAccess') }}
          </v-stepper-step>
          <v-stepper-content step="2" class="ps-4 pe-6 my-0">
            <form ref="form2" @submit="nextStep">
              <div class="d-flex flex-wrap pt-2">
                <label for="hidden" class="v-label theme--light my-auto float-left">
                  {{ $t('spacesList.label.hidden') }}
                </label>
                <v-switch
                  ref="autoFocusInput2"
                  v-model="space.visibility"
                  true-value="hidden"
                  false-value="private"
                  class="float-left my-0 ms-4" />
              </div>
              <div class="caption font-italic font-weight-light ps-1 muted mb-2 mt-1">
                {{ $t(`spacesList.description.${space.visibility || 'hidden'}`) }}
              </div>
              <div class="d-flex flex-wrap pt-2">
                <label for="hidden" class="v-label theme--light">
                  {{ $t('spacesList.label.registration') }}
                </label>
                <v-radio-group
                  v-model="space.subscription"
                  class="mt-2 ms-2"
                  mandatory
                  row
                  inset>
                  <v-radio
                    :label="$t('spacesList.label.open')"
                    value="open"
                    class="my-0" />
                  <v-radio
                    :label="$t('spacesList.label.validation')"
                    value="validation"
                    class="my-0" />
                  <v-radio
                    :label="$t('spacesList.label.closed')"
                    value="closed"
                    class="my-0" />
                </v-radio-group>
              </div>
              <div class="caption font-italic font-weight-light ps-1 muted">{{ $t(`spacesList.description.${space.subscription || 'open'}`) }}</div>
              <v-card-actions class="mt-4 px-0">
                <v-btn class="btn" @click="previousStep">
                  <v-icon size="18" class="me-2">
                    {{ $vuetify.rtl && 'fa-caret-right' || 'fa-caret-left' }}
                  </v-icon>
                  {{ $t('spacesList.button.back') }}
                </v-btn>
                <v-spacer />
                <v-btn
                  class="btn btn-primary"
                  outlined
                  @click="nextStep">
                  {{ $t('spacesList.button.continue') }}
                  <v-icon size="18" class="ms-2">
                    {{ $vuetify.rtl && 'fa-caret-left' || 'fa-caret-right' }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </form>
          </v-stepper-content>
          <v-stepper-step
            :complete="stepper > 3"
            step="3"
            class="ma-0">
            {{ $t('spacesList.label.inviteUsers') }}
          </v-stepper-step>
          <v-stepper-content step="3" class="ps-4 pe-6 my-0">
            <form
              ref="form3"
              :disabled="savingSpace || spaceSaved"
              @submit="saveSpace">
              <v-label for="inviteMembers" class="mb-4">
                {{ $t('spacesList.label.users') }}
              </v-label>
              <exo-identity-suggester
                ref="autoFocusInput3"
                v-model="space.invitedMembers"
                :labels="suggesterLabels"
                :disabled="savingSpace || spaceSaved"
                :search-options="{
                  spaceURL: space.prettyName,
                }"
                name="inviteMembers"
                type-of-relations="user_to_invite"
                height="100"
                include-users
                include-spaces
                multiple />
              <v-card-actions class="mt-4 px-0">
                <v-btn
                  :disabled="savingSpace || spaceSaved"
                  class="btn"
                  @click="previousStep">
                  <v-icon size="18" class="me-2">
                    {{ $vuetify.rtl && 'fa-caret-right' || 'fa-caret-left' }}
                  </v-icon>
                  {{ $t('spacesList.button.back') }}
                </v-btn>
              </v-card-actions>
              <v-alert v-if="error" type="error">
                {{ error }}
              </v-alert>
            </form>
          </v-stepper-content>
        </v-stepper>
        <div>
          <v-alert
            v-if="selectedSpacesWithExternals.length != 0"
            v-model="externalAlert"
            dismissible
            class="elevation-0 mb-14 me-2 pe-4"
            icon="mdi-alert-circle"
            type="warning">
            <p v-sanitized-html="invitedSpacesWithExternals"></p>
          </v-alert>
        </div>
      </div>
    </template>
    <template slot="footer">
      <div class="d-flex">
        <v-spacer />
        <v-btn
          :disabled="savingSpace || spaceSaved"
          class="btn me-2"
          @click="cancel">
          <template>
            {{ $t('spacesList.button.cancel') }}
          </template>
        </v-btn>
        <v-btn
          :loading="savingSpace"
          :disabled="saveButtonDisabled"
          class="btn btn-primary"
          @click="saveSpace">
          <v-icon v-if="spaceSaved">mdi-check-all</v-icon>
          <template v-else-if="spaceToUpdate">
            {{ $t('spacesList.button.updateSpace') }}
          </template>
          <template v-else>
            {{ $t('spacesList.button.createSpace') }}
          </template>
        </v-btn>
      </div>
    </template>
  </exo-drawer>
</template>
<script>

export default {
  data: () => ({
    savingSpace: false,
    spaceSaved: false,
    space: {},
    spaceToUpdate: {},
    title: null,
    error: null,
    stepper: 0,
    template: null,
    spaceTemplate: null,
    templates: [],
    selectedSpacesWithExternals: [],
    externalAlert: false
  }),
  computed: {
    saveButtonDisabled() {
      return this.savingSpace || this.spaceSaved || this.stepper < 3 && !this.space.id;
    },
    displayedForm() {
      return this.$refs && this.$refs[`form${this.stepper}`];
    },
    suggesterLabels() {
      return {
        placeholder: this.$t('spacesList.label.inviteMembers'),
        noDataLabel: this.$t('spacesList.label.noDataLabel'),
      };
    },
    invitedSpacesWithExternals() {
      return this.$t && this.$t('spaceList.checkExternals.warning', {
        0: `<strong>[${this.selectedSpacesWithExternals.join(',')}]</strong>`,
      });
    },
    isMobile() {
      return this.$vuetify && this.$vuetify.breakpoint && this.$vuetify.breakpoint.name === 'xs';
    }
  },
  watch: {
    savingSpace() {
      if (this.savingSpace) {
        this.$refs.spaceFormDrawer.startLoading();
      } else {
        this.$refs.spaceFormDrawer.endLoading();
      }
    },
    stepper() {
      this.error = null;
      if (this.stepper) {
        // Used to focus on space name field
        this.$nextTick().then(() => {
          let elementToFocusOn = this.$refs[`autoFocusInput${this.stepper}`];
          if (elementToFocusOn) {
            elementToFocusOn = elementToFocusOn.focus || !elementToFocusOn.$el ? elementToFocusOn : elementToFocusOn.$el || elementToFocusOn;
          }
          if (elementToFocusOn) {
            window.setTimeout(() => {
              elementToFocusOn.focus();
            }, 200);
          }
        });
      } else {
        this.spaceSaved = false;
        this.savingSpace = false;
        this.error = null;
      }
    },
    template() {
      if (this.template && !this.space.id) {
        this.spaceTemplate = this.templates.find(temp => temp.name === this.template);
        this.setSpaceTemplateProperties();
      }
    },
    'space.invitedMembers': function (items){
      this.selectedSpacesWithExternals = [];
      items.filter(item => item.providerId === 'space')
        .forEach(space => {
          this.$spaceService.checkExternals(space.spaceId).then(hasExternals => {
            if (hasExternals && hasExternals === 'true') {
              this.selectedSpacesWithExternals.push(space.displayName);
              this.externalAlert = true;
            }
          });
        });
    }
  },
  created() {
    const search = window.location.search && window.location.search.substring(1);
    if (search) {
      const parameters = JSON.parse(
        `{"${decodeURI(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')}"}`
      );
      const createSpace = parameters['createSpace'];
      if (createSpace && Boolean(createSpace)) {
        this.$root.$once('application-loaded', () => {
          this.$nextTick().then(() => {
            this.spaceToUpdate = null;
            this.setSpaceTemplateProperties();
            this.title= this.$t('spacesList.label.addNewSpace');
            this.$refs.spaceFormDrawer.open();
          });
        });
      }
    }
  },
  mounted() {
    this.$root.$on('addNewSpace', () => {
      this.spaceToUpdate = null;
      this.space = {
        subscription: 'open',
        visibility: 'private',
      };
      this.setSpaceTemplateProperties();
      this.title= this.$t('spacesList.label.addNewSpace');
      this.$refs.spaceFormDrawer.open();
    });
    document.addEventListener('meeds.social.editSpace', this.editSpace);
    this.$root.$on('editSpace', this.editSpace);
    this.$spaceService.getSpaceTemplates()
      .then(data => {
        this.templates = data || [];
        this.spaceTemplate = this.templates.length && this.templates[0] || null;
        this.template = this.spaceTemplate && this.spaceTemplate.name;
      });
  },
  methods: {
    setSpaceTemplateProperties() {
      if (this.spaceTemplate) {
        this.$set(this.space, 'template', this.template);
        this.$set(this.space, 'subscription', this.spaceTemplate.registration);
        this.$set(this.space, 'visibility', this.spaceTemplate.visibility);
        this.$set(this.space, 'invitedMembers', this.spaceTemplate.invitees && this.spaceTemplate.invitees.split(',') || []);
        if (this.space.invitedMembers && this.space.invitedMembers.length) {
          this.space.invitedMembers = this.space.invitedMembers.map(user => ({
            id: `organization:${user}`,
            providerId: 'organization',
            remoteId: user,
          }));
        }
      }
    },
    editSpace(space) {
      space = space.detail && space.detail.data || space;
      if (!space || !space.id) {
        // eslint-disable-next-line no-console
        console.warn('space does not have an id ', space, ' ignore user action');
        return;
      }
      this.spaceToUpdate = space;
      this.space = Object.assign({}, space);
      this.template = this.space.template || this.template;
      this.title= this.$t('spacesList.label.editSpace', { 0: this.space.displayName });
      this.$refs.spaceFormDrawer.open();
    },
    previousStep() {
      this.stepper--;
    },
    nextStep(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (this.displayedForm && this.displayedForm.reportValidity()) {
        this.stepper++;
      }
    },
    cancel() {
      this.$refs.spaceFormDrawer.close();
    },
    saveSpace(event) {
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (this.spaceSaved || this.savingSpace) {
        return;
      }
      this.error = null;
      this.savingSpace = true;
      if (this.space.id) {
        this.$spaceService.updateSpace({
          id: this.space.id,
          displayName: this.space.displayName,
          description: this.space.description,
          visibility: this.space.visibility,
          subscription: this.space.subscription,
          invitedMembers: this.space.invitedMembers,
        })
          .then(space => {
            Object.assign(this.spaceToUpdate, space, {managers: this.spaceToUpdate.managers}, {description: space.description || ''});
            this.spaceSaved = true;

            window.setTimeout(() => {
              this.$refs.spaceFormDrawer.close();
            }, 200);
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.warn('Error updating space ', this.space, e);
            if (String(e).indexOf('SPACE_ALREADY_EXIST') >= 0) {
              this.error = this.$t('spacesList.error.spaceWithSameNameExists');
            } else {
              this.error = this.$t('spacesList.error.unknownErrorWhenSavingSpace');
            }
          })
          .finally(() => this.savingSpace = false);
      } else {
        this.space.template = this.template;
        this.$spaceService.createSpace(this.space)
          .then(space => {
            this.spaceSaved = true;
            window.location.href = `${eXo.env.portal.context}/g/${space.groupId.replace(/\//g, ':')}`;
          })
          .catch(e => {
            // eslint-disable-next-line no-console
            console.warn('Error creating space ', this.space, e);
            if (String(e).indexOf('SPACE_ALREADY_EXIST') >= 0) {
              this.error = this.$t('spacesList.error.spaceWithSameNameExists');
            } else if (String(e).indexOf('INVALID_SPACE_NAME') >= 0) {
              this.error = this.$t('spacesList.error.InvalidSpaceName');
            } else {
              this.error = this.$t('spacesList.error.unknownErrorWhenSavingSpace');
            }
          })
          .finally(() => this.savingSpace = false);
      }
    },
  },
};
</script>
