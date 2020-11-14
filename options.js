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
const updateLogSwitch = (event) => {
  const value = event.target.value
  chrome.storage.local.set({ DRAG_LOG_SWITCH: value }, _ => {
    alert(`DRAG-TO-GO-BACK Log Switch changed to ${value}`)
  })
}

const dragThresholdInputs = document.getElementsByClassName('drag-threshold')
const dragTimeLimitInputs = document.getElementsByClassName('drag-time-limit')
const dragLogSwitchInputs = document.getElementsByClassName('drag-log-switch')

for (let input of dragThresholdInputs) {
  input.addEventListener('input', updateThreshold)
}

for (let input of dragTimeLimitInputs) {
  input.addEventListener('input', updateTimeLimit)
}

for (let input of dragLogSwitchInputs) {
  input.addEventListener('input', updateLogSwitch)
}

const onBeforeunload = event => {
  // Cancel the event as stated by the standard.
  // event.preventDefault()
  // Older browsers supported custom message
  // event.returnValue = ''
  // chrome.tabs.create({}, () => console.log('hi'))
  for (let input of dragThresholdInputs) {
    input.removeEventListener('input', updateThreshold)
  }

  for (let input of dragTimeLimitInputs) {
    input.removeEventListener('input', updateTimeLimit)
  }

  for (let input of dragLogSwitchInputs) {
    input.removeEventListener('input', updateLogSwitch)
  }

  window.removeEventListener('beforeunload', onBeforeunload)
}

window.addEventListener('beforeunload', onBeforeunload)