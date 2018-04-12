export default function jsonToDataURL (json: string) {
  const blob = new Blob([json], {type: 'application/json'})
  const reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.addEventListener('error', reject)
    reader.addEventListener('load', event => resolve(reader.result))
    reader.readAsDataURL(blob)
  })
}
