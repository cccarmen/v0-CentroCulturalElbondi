// Runs before `next build` so a broken edit from Pages CMS fails the Vercel
// build and the live site keeps serving the last good deployment.
import { readFileSync, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = process.argv[2] ? resolve(process.argv[2]) : join(root, 'content')
const publicDir = join(root, 'public')

const EVENT_TYPES = ['teatro', 'circo', 'musica', 'feria', 'variedades']
const PRODUCTIONS = ['bondi', 'externa']
const REQUIRED = ['slug', 'title', 'description', 'fullDescription', 'image', 'date', 'time', 'location', 'price', 'contact']
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const errors = []

function load(file) {
  try {
    const data = JSON.parse(readFileSync(join(contentDir, file), 'utf8'))
    if (!Array.isArray(data)) throw new Error('debe contener una lista')
    return data
  } catch (error) {
    errors.push(`${file}: no se pudo leer (${error.message})`)
    return []
  }
}

const isBlank = (value) => value == null || (typeof value === 'string' && value.trim() === '')

function checkImage(where, path) {
  if (isBlank(path)) return
  if (/^https?:\/\//.test(path)) return
  if (!path.startsWith('/') || !existsSync(join(publicDir, decodeURI(path)))) {
    errors.push(`${where}: la imagen "${path}" no existe en public/`)
  }
}

function isValidDate(value) {
  if (!DATE_RE.test(value)) return false
  const date = new Date(`${value}T12:00:00Z`)
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

const slugs = new Map()

function checkItems(file, items, kind) {
  items.forEach((item, index) => {
    const where = `${file} #${index + 1} (${item?.title || item?.slug || 'sin título'})`
    for (const field of REQUIRED) {
      if (isBlank(item[field])) errors.push(`${where}: falta "${field}"`)
    }
    if (!isBlank(item.slug)) {
      if (!SLUG_RE.test(item.slug)) {
        errors.push(`${where}: el slug "${item.slug}" solo puede tener minúsculas, números y guiones`)
      }
      if (slugs.has(item.slug)) {
        errors.push(`${where}: el slug "${item.slug}" ya se usa en ${slugs.get(item.slug)}`)
      } else {
        slugs.set(item.slug, where)
      }
    }
    if (!isBlank(item.calendarDate) && !isValidDate(item.calendarDate)) {
      errors.push(`${where}: calendarDate "${item.calendarDate}" debe ser una fecha válida AAAA-MM-DD`)
    }
    if (kind === 'evento') {
      if (isBlank(item.calendarDate)) errors.push(`${where}: falta "calendarDate"`)
      if (!EVENT_TYPES.includes(item.eventType)) {
        errors.push(`${where}: eventType "${item.eventType}" debe ser uno de ${EVENT_TYPES.join(', ')}`)
      }
      if (!PRODUCTIONS.includes(item.production)) {
        errors.push(`${where}: production "${item.production}" debe ser bondi o externa`)
      }
    }
    if (item.maxParticipants != null && !(Number.isInteger(item.maxParticipants) && item.maxParticipants > 0)) {
      errors.push(`${where}: maxParticipants debe ser un número entero positivo`)
    }
    checkImage(where, item.image)
    if (item.instructor && !isBlank(item.instructor.name)) {
      checkImage(`${where} instructor`, item.instructor.avatar)
    }
  })
}

const eventos = load('eventos.json')
const talleres = load('talleres.json')
const flyers = load('flyers.json')

checkItems('eventos.json', eventos, 'evento')
checkItems('talleres.json', talleres, 'taller')

flyers.forEach((flyer, index) => {
  const where = `flyers.json #${index + 1} (${flyer?.title || 'sin título'})`
  for (const field of ['src', 'alt', 'title', 'href', 'cta']) {
    if (isBlank(flyer[field])) errors.push(`${where}: falta "${field}"`)
  }
  checkImage(where, flyer.src)
  const match = typeof flyer.href === 'string' && flyer.href.match(/^\/(?:evento|entradas)\/([^/?#]+)/)
  if (match && !slugs.has(match[1])) {
    errors.push(`${where}: el enlace "${flyer.href}" apunta a un evento que no existe`)
  }
})

if (errors.length > 0) {
  console.error(`\nContenido inválido (${errors.length} problema${errors.length === 1 ? '' : 's'}):`)
  for (const error of errors) console.error(`  - ${error}`)
  console.error('')
  process.exit(1)
}

console.log(`Contenido válido: ${eventos.length} eventos, ${talleres.length} talleres, ${flyers.length} flyers.`)
