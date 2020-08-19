const update = (event) => {
  const value = Number(event.target.value)
  chrome.storage.local.set({ DRAG_THRESHOLD: value }, _ => {
    alert(`Drag Threshold changed to ${value} pixels`)
  })
}

const inputs = document.getElementsByClassName('drag-threshold')

for (let input of inputs) {
  input.addEventListener('input', update)
}