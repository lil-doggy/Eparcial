import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SectionApi } from '../infrastructure/section-api.js'
import { PitSectionAssembler } from '../infrastructure/pit-section.assembler.js'
import { MachineryModelAssembler } from '../infrastructure/machinery-model.assembler.js'
export const useSectionStore = defineStore('section', () => {
 const sections = ref([]), models = ref([]), loading = ref(false), error = ref('')
 const api = new SectionApi()
 async function load() {
  loading.value = true; error.value = ''
  try {
   const [sectionResponse, modelResponse] = await Promise.all([api.sections.getAll(), api.models.getAll()])
   sections.value = PitSectionAssembler.toEntitiesFromResponse(sectionResponse)
   models.value = MachineryModelAssembler.toEntitiesFromResponse(modelResponse)
  } catch (cause) { error.value = 'catalog-error'; throw cause }
  finally { loading.value = false }
 }
 function modelsBySection(id) { return models.value.filter(model => String(model.idSection) === String(id)) }
 function modelName(id) { return models.value.find(model => String(model.id) === String(id))?.modelName ?? String(id ?? '-') }
 function sectionName(id) { return sections.value.find(section => String(section.id) === String(id))?.name ?? String(id ?? '-') }
 return { sections, models, loading, error, load, modelsBySection, modelName, sectionName }
})
