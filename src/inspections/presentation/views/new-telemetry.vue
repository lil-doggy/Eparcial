<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useInspectionsStore } from '../../application/inspections.store.js'
import { useSectionStore } from '../../../section/application/section.store.js'
const { t } = useI18n(), router = useRouter()
const store = useInspectionsStore(), catalog = useSectionStore()
const sectionId = ref(null), inspectionId = ref(null), submitted = ref(false)
const form = reactive({ operatingHours: null, engineTemperatureC: null, oilPressurePsi: null, vibrationMmS: null, alertTriggered: false })
const fields = [{ key: 'operatingHours', label: 'operating-hours', min: 0 }, { key: 'engineTemperatureC', label: 'temperature' }, { key: 'oilPressurePsi', label: 'oil-pressure', min: 0 }, { key: 'vibrationMmS', label: 'vibration', min: 0 }]
const machinery = computed(() => store.inspections.filter(item => String(item.pitSectionId) === String(sectionId.value) && catalog.modelsBySection(sectionId.value).some(model => String(model.id) === String(item.modelId))).map(item => ({ ...item, label: `${item.machineryCode} · ${catalog.modelName(item.modelId)}` })))
const inspection = computed(() => machinery.value.find(item => String(item.id) === String(inspectionId.value)))
const capacity = computed(() => inspection.value ? store.availableCapacity(inspection.value) : null)
const valid = computed(() => inspection.value && capacity.value !== null && Number.isFinite(form.operatingHours) && form.operatingHours > 0 && form.operatingHours <= capacity.value && [form.engineTemperatureC, form.oilPressurePsi, form.vibrationMmS].every(Number.isFinite) && form.oilPressurePsi >= 0 && form.vibrationMmS >= 0)
watch(sectionId, () => { inspectionId.value = null; store.error = '' })
async function reload() { await Promise.allSettled([store.load(), catalog.load()]) }
async function create() {
 submitted.value = true
 if (!valid.value || catalog.error || store.loading || catalog.loading) return
 try { if (await store.createTelemetry(inspectionId.value, form)) await router.push('/home') } catch {}
}
onMounted(reload)
</script>
<template>
 <section :aria-label="t('new-telemetry')" :aria-busy="store.loading || catalog.loading">
  <h1>{{ t('new-telemetry') }}</h1><h2>{{ t('add-telemetry') }}</h2>
  <pv-message v-if="store.error || catalog.error" severity="error" :closable="false" class="mb-3" role="alert">{{ t(store.error || catalog.error) }}<pv-button :label="t('retry')" text @click="reload" /></pv-message>
  <pv-card class="w-full lg:w-8"><template #content>
   <form class="flex flex-column gap-4" @submit.prevent="create" novalidate>
    <div class="flex flex-column gap-2"><label for="section">{{ t('section') }}</label><pv-select input-id="section" v-model="sectionId" :options="catalog.sections" option-label="name" option-value="id" :placeholder="t('section')" :loading="catalog.loading" :disabled="store.saving" :aria-label="t('section')" /></div>
    <div class="flex flex-column gap-2"><label for="machinery">{{ t('machinery') }}</label><pv-select input-id="machinery" v-model="inspectionId" :options="machinery" option-label="label" option-value="id" :placeholder="t('machinery')" :disabled="sectionId === null || store.saving" :aria-label="t('machinery')" /></div>
    <pv-message v-if="sectionId !== null && !machinery.length" :closable="false">{{ t('no-machinery') }}</pv-message>
    <pv-message v-if="inspection" severity="info" :closable="false">{{ t('available-capacity') }}: {{ capacity ?? t('unknown') }}</pv-message>
    <div v-for="field in fields" :key="field.key" class="flex flex-column gap-2"><label :for="field.key">{{ t(field.label) }}</label><pv-input-number :input-id="field.key" v-model="form[field.key]" :min="field.min" :max-fraction-digits="2" :disabled="store.saving" :aria-label="t(field.label)" :invalid="submitted && !Number.isFinite(form[field.key])" /></div>
    <div class="flex align-items-center gap-2"><pv-checkbox input-id="alert" v-model="form.alertTriggered" binary :disabled="store.saving" /><label for="alert">{{ t('alert') }}</label></div>
    <pv-message v-if="submitted && !valid" severity="error" :closable="false" role="alert">{{ t(form.operatingHours > capacity && inspection ? 'capacity-error' : 'validation-error') }}</pv-message>
    <div class="flex gap-2"><pv-button type="submit" :label="t('create')" icon="pi pi-check" :loading="store.saving" :disabled="store.loading || catalog.loading || !!catalog.error" /><pv-button :label="t('cancel')" severity="secondary" :disabled="store.saving" @click="router.push('/home')" /></div>
   </form>
  </template></pv-card>
 </section>
</template>
