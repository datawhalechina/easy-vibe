<template>
  <div class="usb">
    <div class="usb-head">
      <div class="usb-title">{{ t('buttonSpec.title') }}</div>
      <div class="usb-sub">{{ t('buttonSpec.subtitle') }}</div>
    </div>

    <div class="usb-body">
      <div
        class="dims"
        role="group"
        :aria-label="t('buttonSpec.dimsLabel')"
      >
        <button
          v-for="(dim, i) in dims"
          :key="dim.id"
          type="button"
          class="dim"
          :class="{ on: i === idx }"
          :aria-pressed="i === idx"
          @click="idx = i"
        >
          <span class="n">{{ i + 1 }}</span>
          <span class="name">{{ dim.name }}</span>
        </button>
      </div>

      <section
        class="spec"
        aria-live="polite"
      >
        <div class="spec-q">
          <span class="k">{{ t('buttonSpec.questionLabel') }}</span>
          <span class="q">{{ current.question }}</span>
        </div>

        <div class="visual">
          <!-- 01 Purpose -->
          <template v-if="current.id === 'purpose'">
            <div class="v-row">
              <span
                v-for="(cls, i) in ['fill', 'tonal', 'danger']"
                :key="i"
                class="b"
                :class="cls"
              >
                {{ purposeExamples[i] }}
              </span>
            </div>
            <div class="v-note">{{ t('buttonSpec.purposeLine') }}</div>
          </template>

          <!-- 02 Role -->
          <template v-else-if="current.id === 'role'">
            <div class="roles">
              <div
                v-for="role in roles"
                :key="role.name"
                class="role"
              >
                <span
                  class="b"
                  :class="ROLE_CLASS[role.name]"
                >
                  {{ roleSamples[role.name] }}
                </span>
                <div class="cell-name">{{ role.name }}</div>
                <div class="cell-desc">{{ role.desc }}</div>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.rolesRule') }}</div>
          </template>

          <!-- 03 Structure -->
          <template v-else-if="current.id === 'structure'">
            <div class="anat">
              <div class="a-cap a-wide">{{ parts[0].name }}</div>
              <div class="a-bracket a-wide" />
              <div class="a-btn a-ico">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </div>
              <div class="a-btn a-lbl">{{ t('buttonSpec.anatomyBtn') }}</div>
              <div class="a-tick" />
              <div class="a-tick" />
              <div class="a-cap">{{ parts[1].name }}</div>
              <div class="a-cap">{{ parts[2].name }}</div>
            </div>
            <div class="parts">
              <div
                v-for="part in parts"
                :key="part.name"
                class="part"
              >
                <span class="part-k">{{ part.name }}</span>
                <span class="part-v">{{ part.desc }}</span>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.structureRule') }}</div>
          </template>

          <!-- 04 Visual emphasis -->
          <template v-else-if="current.id === 'visual'">
            <div class="levels">
              <div
                v-for="(level, i) in levels"
                :key="level.name"
                class="level"
              >
                <span
                  class="b"
                  :class="LEVEL_CLASS[i]"
                >
                  {{ t('buttonSpec.genericBtn') }}
                </span>
                <div class="level-info">
                  <div class="cell-name">{{ level.name }}</div>
                  <div class="cell-desc">{{ level.desc }}</div>
                </div>
                <span class="meter">
                  <i
                    v-for="n in 5"
                    :key="n"
                    :class="{ on: n <= LEVEL_WEIGHT[i] }"
                  />
                </span>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.visualRule') }}</div>
          </template>

          <!-- 05 Size -->
          <template v-else-if="current.id === 'size'">
            <div class="size">
              <div class="hit">
                <span class="b fill size-btn">{{ t('buttonSpec.genericBtn') }}</span>
              </div>
              <div class="size-legend">
                <div class="lg"><span class="sw solid" />{{ t('buttonSpec.sizeVisible') }} <code>40</code></div>
                <div class="lg"><span class="sw dashed" />{{ t('buttonSpec.sizeTarget') }} <code>44×44 pt</code> / <code>48×48 dp</code></div>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.sizeRule') }}</div>
          </template>

          <!-- 06 States -->
          <template v-else-if="current.id === 'states'">
            <div class="gallery">
              <div
                v-for="(name, i) in stateGallery"
                :key="name"
                class="cell"
              >
                <span
                  class="b fill"
                  :class="'is-' + STATE_IDS[i]"
                >
                  {{ t('buttonSpec.genericBtn') }}
                </span>
                <span class="cell-name">{{ name }}</span>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.statesRule') }}</div>
          </template>

          <!-- 07 Behavior -->
          <template v-else-if="current.id === 'behavior'">
            <div class="stages">
              <template
                v-for="(stage, i) in behaviorStages"
                :key="stage"
              >
                <div class="cell">
                  <span
                    class="b"
                    :class="STAGE_CLASS[i]"
                  >
                    <span
                      v-if="i === 2"
                      class="spinner"
                    />
                    <template v-else>{{ i === 3 ? '✓' : t('buttonSpec.genericBtn') }}</template>
                  </span>
                  <span class="cell-name">{{ stage }}</span>
                </div>
                <span
                  v-if="i < behaviorStages.length - 1"
                  class="arrow"
                  aria-hidden="true"
                >→</span>
              </template>
            </div>
            <div class="v-note">{{ t('buttonSpec.behaviorRule') }}</div>
          </template>

          <!-- 08 Adaptation -->
          <template v-else-if="current.id === 'adaptive'">
            <div class="adaptive">
              <label class="ad-controls">
                <span>{{ t('buttonSpec.fontSize') }}</span>
                <input
                  v-model.number="scale"
                  type="range"
                  min="100"
                  max="200"
                  step="10"
                />
                <b>{{ scale }}%</b>
              </label>
              <div class="ad-stage">
                <span
                  class="b fill ad-btn"
                  :style="{ fontSize: (13 * scale) / 100 + 'px' }"
                >
                  {{ t('buttonSpec.genericBtn') }}
                </span>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.adaptiveRule') }}</div>
          </template>

          <!-- 09 Accessibility -->
          <template v-else-if="current.id === 'a11y'">
            <div class="a11y">
              <div class="a-case bad">
                <span class="icon-btn">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
                  </svg>
                </span>
                <div class="a-read">{{ t('buttonSpec.a11yNoName') }}</div>
              </div>
              <div class="a-case good">
                <span
                  class="icon-btn"
                  role="img"
                  :aria-label="t('buttonSpec.deleteLabel')"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
                  </svg>
                </span>
                <div class="a-read">{{ t('buttonSpec.a11yWithName') }}</div>
                <code class="a-code">aria-label="{{ t('buttonSpec.deleteLabel') }}"</code>
              </div>
            </div>
            <div class="checks">
              <div
                v-for="check in a11yChecks"
                :key="check"
                class="check"
              >
                <span class="check-mark">✓</span>{{ check }}
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.a11yRule') }}</div>
          </template>

          <!-- 10 Boundary -->
          <template v-else>
            <div class="bounds">
              <div class="bound bound-head">
                <span>{{ t('buttonSpec.boundaryWant') }}</span>
                <span>{{ t('buttonSpec.boundaryUse') }}</span>
              </div>
              <div
                v-for="bound in boundaries"
                :key="bound.want"
                class="bound"
              >
                <span class="want">{{ bound.want }}</span>
                <span class="use">{{ bound.use }}</span>
              </div>
            </div>
            <div class="v-note">{{ t('buttonSpec.boundaryRule') }}</div>
          </template>
        </div>

        <div class="def">
          <div class="def-row">
            <span class="def-k">{{ t('buttonSpec.sampleLabel') }}</span>
            <span class="def-v">{{ current.sample }}</span>
          </div>
          <div class="def-row">
            <span class="def-k">{{ t('buttonSpec.sourceLabel') }}</span>
            <a
              class="def-link"
              :href="current.source.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ current.source.label }} ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from '../../../composables/useI18n.js'
import { uiDesignSpecsLocale } from '../../../locales/ui-design-specs/index.js'

const { t, messages } = useI18n(uiDesignSpecsLocale)
const spec = computed(() => messages.value.buttonSpec)
const dims = computed(() => spec.value.dims)
const purposeExamples = computed(() => spec.value.purposeExamples)
const roleSamples = computed(() => spec.value.roleSamples)
const roles = computed(() => spec.value.roles)
const parts = computed(() => spec.value.parts)
const levels = computed(() => spec.value.levels)
const stateGallery = computed(() => spec.value.stateGallery)
const behaviorStages = computed(() => spec.value.behaviorStages)
const a11yChecks = computed(() => spec.value.a11yChecks)
const boundaries = computed(() => spec.value.boundaries)
const idx = ref(0)
const current = computed(() => dims.value[idx.value])

const ROLE_CLASS = { Normal: 'outlined', Primary: 'fill', Cancel: 'text', Destructive: 'danger' }
const LEVEL_CLASS = ['fill', 'tonal', 'outlined', 'text']
const LEVEL_WEIGHT = [5, 4, 3, 1]
const STATE_IDS = ['default', 'hover', 'pressed', 'focus', 'disabled']
const STAGE_CLASS = ['fill', 'fill is-pressed', 'fill is-loading', 'outlined']

const scale = ref(100)
</script>

<style scoped>
.usb {
  margin: 20px 0;
  padding: 18px 20px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-size: 13px;
  color: var(--vp-c-text-1);
}

.usb-head { text-align: center; margin-bottom: 14px; }
.usb-title { font-size: 17px; font-weight: 700; }
.usb-sub { margin-top: 4px; font-size: 12px; color: var(--vp-c-text-2); }

.usb-body { display: grid; grid-template-columns: 190px minmax(0, 1fr); gap: 14px; align-items: start; }

.dims { display: flex; flex-direction: column; gap: 4px; }
.dim {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  font-size: 13px;
  text-align: left;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.dim:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
.dim.on {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  font-weight: 600;
}
.dim .n {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 22px;
  height: 22px;
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-soft);
  border-radius: 50%;
}
.dim.on .n { color: var(--vp-c-white); background: var(--vp-c-brand-1); }

.spec {
  padding: 16px 18px 18px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.spec-q { display: flex; flex-wrap: wrap; align-items: baseline; gap: 6px 10px; padding-bottom: 12px; border-bottom: 1px dashed var(--vp-c-divider); }
.spec-q .k { flex-shrink: 0; font-size: 11px; color: var(--vp-c-text-3); }
.spec-q .q { font-size: 16px; font-weight: 700; }

.visual { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px 0 12px; min-height: 168px; justify-content: center; }
.v-note { width: 100%; max-width: 540px; font-size: 13px; line-height: 1.7; }
.cell { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.cell-name { font-size: 12px; font-weight: 600; }
.cell-desc { font-size: 12px; line-height: 1.5; text-align: center; color: var(--vp-c-text-2); }

/* One button look shared by every visual in this demo. */
.b {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 16px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 6px;
}
.b.fill { color: var(--vp-c-white); background: var(--vp-c-brand-1); }
.b.tonal { color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); }
.b.outlined { font-weight: 500; color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.b.text { padding: 0 8px; font-weight: 500; color: var(--vp-c-brand-1); }
.b.danger { font-weight: 500; color: var(--vp-c-danger-1); border-color: var(--vp-c-danger-1); }

.v-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

.roles { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px 12px; width: 100%; }
.role { display: flex; flex-direction: column; align-items: center; gap: 8px; }

.anat {
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: center;
  --ac: var(--vp-c-text-2);
}
.a-wide { grid-column: 1 / -1; justify-self: center; }
.a-cap { padding: 3px 0; font-size: 12px; font-weight: 600; color: var(--ac); }
.a-bracket {
  justify-self: stretch;
  height: 10px;
  margin: 0 -6px;
  border: 2px solid var(--ac);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
}
.a-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-white);
  background: var(--vp-c-brand-1);
}
.a-ico { padding-left: 16px; border-radius: 6px 0 0 6px; }
.a-lbl { padding: 0 16px 0 0; border-radius: 0 6px 6px 0; }
.a-tick { justify-self: center; width: 2px; height: 12px; background: var(--ac); }
.parts { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 18px; font-size: 12px; }
.part { display: flex; gap: 6px; }
.part-k { font-weight: 600; }
.part-v { color: var(--vp-c-text-2); }

.levels { display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 520px; }
.level { display: grid; grid-template-columns: 96px minmax(0, 1fr) 70px; align-items: center; gap: 12px; }
.level-info { display: flex; flex-direction: column; gap: 2px; }
.level .cell-desc { text-align: left; }
.meter { display: flex; gap: 3px; }
.meter i { flex: 1; height: 6px; background: var(--vp-c-bg-soft); border-radius: 3px; }
.meter i.on { background: var(--vp-c-brand-1); }

.size { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 20px 28px; }
.hit {
  display: grid;
  place-items: center;
  width: 96px;
  height: 96px;
  border: 1.5px dashed var(--vp-c-danger-1);
  border-radius: 12px;
}
.size-btn { height: 80px; min-width: 96px; padding: 0 12px; }
.size-legend { display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.size-legend code,
.a-code { padding: 1px 5px; font-size: 11px; color: var(--vp-c-brand-1); background: var(--vp-c-brand-soft); border-radius: 4px; }
.lg { display: flex; align-items: center; gap: 8px; }
.sw { display: inline-block; width: 16px; height: 12px; background: var(--vp-c-brand-1); border-radius: 3px; }
.sw.dashed { height: 14px; background: transparent; border: 1.5px dashed var(--vp-c-danger-1); }

.gallery, .stages { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 14px 18px; }
.is-hover { filter: brightness(1.12); }
.is-pressed { filter: brightness(0.82); }
.is-focus { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.is-disabled { opacity: 0.45; }
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #fff;
  border-radius: 50%;
}
.is-loading .spinner { animation: usb-spin 1s linear infinite; }
@keyframes usb-spin { to { transform: rotate(360deg); } }
.arrow { font-size: 14px; color: var(--vp-c-text-3); }

.adaptive { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; }
.ad-controls { display: flex; align-items: center; gap: 10px; font-size: 12px; }
.ad-controls input { width: 200px; max-width: 60vw; accent-color: var(--vp-c-brand-1); }
.ad-controls b { min-width: 44px; font-size: 13px; color: var(--vp-c-brand-1); }
.ad-stage {
  display: grid;
  place-items: center;
  width: 240px;
  min-height: 110px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
}
.ad-btn { height: auto; min-height: 36px; max-width: 100%; padding: 8px 16px; line-height: 1.3; white-space: normal; text-align: center; transition: font-size 0.15s; }

.a11y { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
.a-case {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 4px 12px;
  padding: 10px 14px;
  font-size: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
}
.a-case.bad { border-color: color-mix(in srgb, var(--vp-c-danger-1) 60%, transparent); }
.a-case.good { border-color: color-mix(in srgb, var(--vp-c-success) 60%, transparent); }
.a-read { grid-column: 2; color: var(--vp-c-text-2); }
.a-code { grid-column: 2; justify-self: start; }
.icon-btn {
  display: grid;
  grid-row: span 2;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}
.checks { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 6px 16px; width: 100%; max-width: 520px; font-size: 12px; }
.check { display: flex; gap: 8px; line-height: 1.5; }
.check-mark { flex-shrink: 0; font-weight: 700; color: var(--vp-c-success); }

.bounds { width: 100%; max-width: 520px; overflow: hidden; font-size: 12px; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.bound {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  column-gap: 28px;
  align-items: center;
  padding: 7px 12px;
  border-top: 1px solid var(--vp-c-divider);
}
.bound:first-child { border-top: 0; }
.bound-head { font-weight: 700; background: var(--vp-c-bg-soft); }
.want { color: var(--vp-c-text-2); }
.use { position: relative; font-weight: 600; color: var(--vp-c-brand-1); }
.bound:not(.bound-head) .use::before {
  content: '→';
  position: absolute;
  left: -22px;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.def { padding-top: 12px; border-top: 1px dashed var(--vp-c-divider); }
.def-row { display: grid; grid-template-columns: 84px minmax(0, 1fr); gap: 10px; margin-bottom: 6px; font-size: 12px; line-height: 1.6; }
.def-k { color: var(--vp-c-text-3); }
.def-link { font-weight: 500; color: var(--vp-c-brand-1); text-decoration: none; }
.def-link:hover { text-decoration: underline; }

@media (max-width: 720px) {
  .usb { padding: 14px 12px 16px; }
  .usb-body { grid-template-columns: minmax(0, 1fr); }
  .dims { flex-direction: row; flex-wrap: wrap; }
  .dim { flex: 1 1 30%; justify-content: center; }
  .spec { padding: 14px 12px 16px; }
  .level { grid-template-columns: 90px minmax(0, 1fr) 52px; gap: 8px; }
}
</style>
