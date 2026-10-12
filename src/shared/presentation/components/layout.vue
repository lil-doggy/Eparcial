<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
const { t, locale } = useI18n(), route = useRoute(), visible = ref(false), logoFailed = ref(false)
const items = [{ label: 'home', to: '/home', icon: 'pi pi-home' }, { label: 'new-telemetry', to: '/telemetry/items/new', icon: 'pi pi-plus' }]
const token = import.meta.env.VITE_LOGO_PUBLIC_KEY
const logo = computed(() => `${import.meta.env.VITE_LOGO_URL}?token=${encodeURIComponent(token)}&format=png`)
watch([locale, () => route.meta.title], () => { document.documentElement.lang = locale.value; document.title = `GeoMine - ${t(route.meta.title || 'home')}` }, { immediate: true })
</script>
<template>
 <pv-toolbar class="border-noround" role="banner"><template #start><div class="flex align-items-center gap-3"><pv-button icon="pi pi-bars" :aria-label="t('navigation')" :aria-expanded="visible" aria-controls="sidebar" @click="visible = !visible" /><pv-image v-if="token && !logoFailed" :src="logo" alt="GeoMine" width="48" @error="logoFailed = true" /><pv-avatar v-else label="G" shape="circle" aria-label="GeoMine" /><span class="font-bold text-lg">Geomine Machinery &amp; Telemetry Management</span></div></template></pv-toolbar>
 <pv-drawer id="sidebar" v-model:visible="visible" :header="t('navigation')" :aria-label="t('navigation')"><div class="flex flex-column h-full"><nav class="flex flex-column gap-3"><pv-button v-for="item in items" :key="item.to" :label="t(item.label)" :icon="item.icon" as-child v-slot="slot"><router-link :to="item.to" :class="slot.class" @click="visible = false">{{ t(item.label) }}</router-link></pv-button></nav><div class="mt-auto pt-4"><pv-select-button v-model="locale" :options="[{ label: 'EN', value: 'en' }, { label: 'ES', value: 'es' }]" option-label="label" option-value="value" :allow-empty="false" :aria-label="t('language')" /></div></div></pv-drawer>
 <main class="p-3 md:p-5 mx-auto w-full xl:w-10"><router-view /></main>
</template>
