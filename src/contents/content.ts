import type { PlasmoCSConfig } from "plasmo"

import { Storage } from "@plasmohq/storage"

export const config: PlasmoCSConfig = {
  matches: ["*://*.youtube.com/*"],
  run_at: "document_start"
}

const storage = new Storage()
const CSS_ID = "purist-styles"
const CSS_RULES = `
  ytd-reel-shelf-renderer, ytd-rich-shelf-renderer[is-shorts], 
  ytd-rich-section-renderer:has(ytd-rich-shelf-renderer[is-shorts]),
  ytd-rich-item-renderer[is-slim-media], ytd-rich-item-renderer:has(a[href*="/shorts/"]),
  ytd-video-renderer:has(a[href*="/shorts/"]), ytd-guide-entry-renderer:has(a[title="Shorts"]),
  ytd-mini-guide-entry-renderer:has(a[href="/shorts/"]), a[title="Shorts"], [is-shorts] 
  { display: none !important; }
`

const update = async () => {
  const enabled = await storage.get<boolean>("enabled")
  const styleTag = document.getElementById(CSS_ID)

  if (enabled !== false) {
    if (!styleTag) {
      const style = document.createElement("style")
      style.id = CSS_ID
      style.textContent = CSS_RULES
      document.documentElement.appendChild(style)
    }
    if (window.location.pathname.startsWith("/shorts/")) {
      const videoId = window.location.pathname.split("/")[2]
      window.location.replace(`https://www.youtube.com/watch?v=${videoId}`)
    }
  } else if (styleTag) {
    styleTag.remove()
  }
}

update()
window.addEventListener("yt-navigate-finish", update)
storage.watch({ enabled: update })

new MutationObserver(update).observe(document.documentElement, {
  subtree: true,
  childList: true
})
