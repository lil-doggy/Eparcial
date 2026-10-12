<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
const route = useRoute(), router = useRouter(), { t } = useI18n()
</script>
<template><section :aria-label="t('not-found')"><h1>{{ t('not-found') }}</h1><p>{{ t('route-missing', { path: route.path }) }}</p><pv-button :label="t('go-home')" icon="pi pi-home" @click="router.push('/home')" /></section></template>
