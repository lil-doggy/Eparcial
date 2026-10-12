<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useInspectionsStore } from '../../application/inspections.store.js'
import { useSectionStore } from '../../../section/application/section.store.js'
import InspectionSummary from '../components/inspection-summary.vue'
const { t } = useI18n()
const store = useInspectionsStore(), catalog = useSectionStore()
async function reload() { await Promise.allSettled([store.load(), catalog.load()]) }
let timer
onMounted(() => { reload(); timer = setInterval(() => { if (!store.loading && !store.saving) store.load().catch(() => {}) }, 15000) })
onUnmounted(() => clearInterval(timer))
</script>
<template>
 <section :aria-label="t('home')" :aria-busy="store.loading">
  <h1>{{ t('home') }}</h1><p>{{ t('welcome') }}</p>
  <div class="flex justify-content-between align-items-center mb-3"><h2>{{ t('my-inspections') }}</h2><pv-button :label="t('refresh')" icon="pi pi-refresh" :loading="store.loading || catalog.loading" @click="reload" /></div>
  <pv-message v-if="store.error || catalog.error" severity="error" :closable="false" class="mb-3" role="alert">{{ t(store.error || catalog.error) }} <pv-button :label="t('retry')" text @click="reload" /></pv-message>
  <pv-progress-spinner v-if="store.loading && !store.inspections.length" :aria-label="t('load')" />
  <pv-message v-if="!store.loading && !store.error && !store.inspections.length" :closable="false">{{ t('no-inspections') }}</pv-message>
  <div class="grid"><div v-for="inspection in store.inspections" :key="inspection.id" class="col-12 md:col-6"><inspection-summary :inspection="inspection" /></div></div>
 </section>
</template>
