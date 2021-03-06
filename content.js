let dragX1 = null
let dragX2 = null
let time1InMilliseconds = null
let time2InMilliseconds = null
// const DRAG_THRESHOLD = 100
// chrome.storage.local.get('DRAG_THRESHOLD', data => {
//   if (data.DRAG_THRESHOLD === undefined) {
//     chrome.storage.local.set({ DRAG_THRESHOLD: 100 }, _ => {
//       console.log('DRAG-TO-GO-BACK Threshold: 100 Pixels')
//     })
//   } else {
//     console.log(`DRAG-TO-GO-BACK Threshold: ${data.DRAG_THRESHOLD} Pixels`)
//   }
// })

// chrome.storage.local.get('DRAG_TIME_LIMIT_IN_MILLISECONDS', data => {
//   if (data.DRAG_TIME_LIMIT_IN_MILLISECONDS === undefined) {
//     chrome.storage.local.set({ DRAG_TIME_LIMIT_IN_MILLISECONDS: 400 }, _ => {
//       console.log('DRAG-TO-GO-BACK Time Limit: 400 Milliseconds')
//     })
//   } else {
//     console.log(`DRAG-TO-GO-BACK Time Limit: ${data.DRAG_TIME_LIMIT_IN_MILLISECONDS} Milliseconds`)
//   }
// })

// chrome.storage.local.get('DRAG_LOG_SWITCH', data => {
//   if (data.DRAG_LOG_SWITCH === undefined) {
//     chrome.storage.local.set({ DRAG_LOG_SWITCH: 'ON' }, _ => {
//       console.log('DRAG-TO-GO-BACK Log Switch: ON')
//     })
//   } else {
//     console.log(`DRAG-TO-GO-BACK Log Switch: ${data.DRAG_LOG_SWITCH}`)
//   }
// })

const logger = (logSwitch, message) => {
  if (logSwitch === undefined || logSwitch === 'ON') {
    console.log(message)
  }
}

chrome.storage.local.get(['DRAG_THRESHOLD', 'DRAG_TIME_LIMIT_IN_MILLISECONDS', 'DRAG_LOG_SWITCH',], data => {
  if (data.DRAG_LOG_SWITCH === undefined) {
    chrome.storage.local.set({ DRAG_LOG_SWITCH: 'ON' }, _ => {
      logger(data.DRAG_LOG_SWITCH, 'DRAG-TO-GO-BACK Log Switch: ON')
    })
  } else {
    logger(data.DRAG_LOG_SWITCH, `DRAG-TO-GO-BACK Log Switch: ${data.DRAG_LOG_SWITCH}`)
  }

  if (data.DRAG_THRESHOLD === undefined) {
    chrome.storage.local.set({ DRAG_THRESHOLD: 100 }, _ => {
      logger(data.DRAG_LOG_SWITCH, 'DRAG-TO-GO-BACK Threshold: 100 Pixels')
    })
  } else {
    logger(data.DRAG_LOG_SWITCH, `DRAG-TO-GO-BACK Threshold: ${data.DRAG_THRESHOLD} Pixels`)
  }

  if (data.DRAG_TIME_LIMIT_IN_MILLISECONDS === undefined) {
    chrome.storage.local.set({ DRAG_TIME_LIMIT_IN_MILLISECONDS: 400 }, _ => {
      logger(data.DRAG_LOG_SWITCH, 'DRAG-TO-GO-BACK Time Limit: 400 Milliseconds')
    })
  } else {
    logger(data.DRAG_LOG_SWITCH, `DRAG-TO-GO-BACK Time Limit: ${data.DRAG_TIME_LIMIT_IN_MILLISECONDS} Milliseconds`)
  }
})

const onMousedown = event => {
  // const metaKey = navigator.platform.includes('Mac') ? event.metaKey : event.ctrlKey
  // if (event.button === 0 && metaKey) {
  //   dragX1 = event.clientX
  // }
  if (event.button === 0) {
    dragX1 = event.clientX
    time1InMilliseconds = Date.now()
  }
}

const onMouseup = event => {
  if (event.button === 0 && dragX1 !== null && time1InMilliseconds !== null) {
    dragX2 = event.clientX
    time2InMilliseconds = Date.now()

    const deltaX = Math.abs(dragX2 - dragX1)
    const deltaTime = time2InMilliseconds - time1InMilliseconds

    chrome.storage.local.get(['DRAG_THRESHOLD', 'DRAG_TIME_LIMIT_IN_MILLISECONDS', 'DRAG_LOG_SWITCH',], data => {
      const DRAG_THRESHOLD = data.DRAG_THRESHOLD
      const DRAG_TIME_LIMIT_IN_MILLISECONDS = data.DRAG_TIME_LIMIT_IN_MILLISECONDS
      const DRAG_LOG_SWITCH = data.DRAG_LOG_SWITCH

      logger(DRAG_LOG_SWITCH, `DRAG-TO-GO-BACK Threshold: ${DRAG_THRESHOLD} Pixels`)
      logger(DRAG_LOG_SWITCH, `DRAG-TO-GO-BACK Time Limit: ${DRAG_TIME_LIMIT_IN_MILLISECONDS} Milliseconds`)

      if (deltaX > DRAG_THRESHOLD && deltaTime < DRAG_TIME_LIMIT_IN_MILLISECONDS) {

        if (dragX1 < dragX2) {
          // Go back
          dragX1 = null
          dragX2 = null
          time1InMilliseconds = null
          time2InMilliseconds = null
          history.back()
        } else {
          // Go forward
          dragX1 = null
          dragX2 = null
          time1InMilliseconds = null
          time2InMilliseconds = null
          history.forward()
        }

      } else {
        // Do nothing
        dragX1 = null
        dragX2 = null
        time1InMilliseconds = null
        time2InMilliseconds = null
      }
    })
  }
}

window.addEventListener('mousedown', onMousedown)

window.addEventListener('mouseup', onMouseup)

const onBeforeunload = event => {
  window.removeEventListener('mousedown', onMousedown)
  window.removeEventListener('mouseup', onMouseup)
  window.removeEventListener('beforeunload', onBeforeunload)
}

window.addEventListener('beforeunload', onBeforeunload)