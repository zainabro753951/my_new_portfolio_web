export function colorGuess(lang) {
  const lower = lang.toLowerCase()

  if (lower.includes('javascript') || lower.includes('js')) return '#F7DF1E' // JS
  if (lower.includes('python') || lower.includes('py')) return '#3776AB' // Python
  if (lower.includes('jsx')) return '#61DAFB' // JSX
  if (lower.includes('typescript') || lower.includes('ts') || lower.includes('tsx'))
    return '#3178C6' // TS

  return '#000000' // default
}

// 🔹 Helper function to convert object to FormData (recursively)
export function appendFormData(formData, data, parentKey = '') {
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    Object.keys(data).forEach(key => {
      appendFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key)
    })
  } else if (Array.isArray(data)) {
    data.forEach((value, index) => {
      appendFormData(formData, value, `${parentKey}[${index}]`)
    })
  } else {
    formData.append(parentKey, data ?? '') // null/undefined ko empty string
  }
}
