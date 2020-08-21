const updateThreshold = (event) => {
  const value = Number(event.target.value)
  chrome.storage.local.set({ DRAG_THRESHOLD: value }, _ => {
    alert(`DRAG-TO-GO-BACK Threshold changed to ${value} Pixels`)
  })
}
const updateTimeLimit = (event) => {
  const value = Number(event.target.value)
  chrome.storage.local.set({ DRAG_TIME_LIMIT_IN_MILLISECONDS: value }, _ => {
    alert(`DRAG-TO-GO-BACK Time Limit changed to ${value} Milliseconds`)
  })
}

const dragThresholdInputs = document.getElementsByClassName('drag-threshold')
const dragTimeLimitInputs = document.getElementsByClassName('drag-time-limit')

for (let input of dragThresholdInputs) {
  input.addEventListener('input', updateThreshold)
}

for (let input of dragTimeLimitInputs) {
  input.addEventListener('input', updateTimeLimit)
}