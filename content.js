let dragX1 = null
let dragX2 = null
// const DRAG_THRESHOLD = 100
chrome.storage.local.get('DRAG_THRESHOLD', data => {
  if (data.DRAG_THRESHOLD === undefined) {
    chrome.storage.local.set({ DRAG_THRESHOLD: 100 }, _ => {
      console.log('DRAG-TO-GO-BACK Threshold: 100 Pixels')
    })
  } else {
    console.log(`DRAG-TO-GO-BACK Threshold: ${data.DRAG_THRESHOLD} Pixels`)
  }
})

window.addEventListener('mousedown', event => {
  // const metaKey = navigator.platform.includes('Mac') ? event.metaKey : event.ctrlKey
  // if (event.button === 0 && metaKey) {
  //   dragX1 = event.clientX
  // }
  if (event.button === 1) {
    dragX1 = event.clientX
  }
})

window.addEventListener('mouseup', event => {
  if (event.button === 1 && dragX1 !== null) {
    dragX2 = event.clientX

    const deltaX = Math.abs(dragX2 - dragX1)


    chrome.storage.local.get('DRAG_THRESHOLD', data => {
      const DRAG_THRESHOLD = data.DRAG_THRESHOLD

      console.log(`DRAG-TO-GO-BACK Threshold: ${DRAG_THRESHOLD} Pixels`)
      if (deltaX > DRAG_THRESHOLD) {

        if (dragX1 < dragX2) {
          // Go back
          dragX1 = null
          dragX2 = null
          history.back()
        } else {
          // Go forward
          dragX1 = null
          dragX2 = null
          history.forward()
        }

      } else {
        // Do nothing
        dragX1 = null
        dragX2 = null
      }
    })
  }
})