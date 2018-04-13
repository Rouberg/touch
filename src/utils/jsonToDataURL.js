export default function jsonToDataURL (json) {
  let blob = new Blob([json], {type: 'application/json'})
  let reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.addEventListener('error', reject)
    reader.addEventListener('load', event => resolve(reader.result))
    reader.readAsDataURL(blob)
  })
}
