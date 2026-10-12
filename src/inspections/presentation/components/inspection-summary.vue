<script setup>
import { useI18n } from 'vue-i18n'
import { useInspectionsStore } from '../../application/inspections.store.js'
import { useSectionStore } from '../../../section/application/section.store.js'
defineProps({ inspection: { type: Object, required: true } })
const store = useInspectionsStore(), catalog = useSectionStore()
const { t, locale } = useI18n()
const number = value => value === null ? t('unknown') : new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(value)
</script>
<template>
 <pv-card class="h-full" :aria-label="inspection.machineryCode">
  <template #header><div class="px-4 pt-4 font-bold text-xl">{{ catalog.modelName(inspection.modelId) }} · {{ inspection.machineryCode }}</div></template>
  <template #subtitle>{{ catalog.sectionName(inspection.pitSectionId) }}</template>
  <template #content>
   <pv-data-table v-if="store.readingsFor(inspection).length" :value="store.readingsFor(inspection)" size="small" :aria-label="inspection.machineryCode">
    <pv-column :header="t('operating-hours')"><template #body="{ data }">{{ number(data.operatingHours) }}</template></pv-column>
    <pv-column :header="t('temperature')"><template #body="{ data }">{{ number(data.engineTemperatureC) }}</template></pv-column>
   </pv-data-table>
   <pv-message v-else severity="info" :closable="false">{{ t('no-telemetry') }}</pv-message>
  </template>
  <template #footer><div class="flex flex-wrap justify-content-between gap-3"><span>{{ t('total-telemetry') }}: <strong>{{ number(store.totalHours(inspection)) }}</strong></span><span>{{ t('available-capacity') }}: <strong>{{ number(store.availableCapacity(inspection)) }}</strong></span></div></template>
 </pv-card>
</template>
