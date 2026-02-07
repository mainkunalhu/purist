import { useStorage } from "@plasmohq/storage/hook"

function IndexPopup() {
  const [isEnabled, setIsEnabled] = useStorage("enabled", true)

  return (
    <div
      style={{
        width: "180px",
        padding: "20px",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "system-ui, sans-serif",
        textAlign: "center"
      }}>
      <h1
        style={{
          fontSize: "12px",
          color: "#D48466",
          margin: "0 0 15px 0",
          letterSpacing: "1px"
        }}>
        PURIST
      </h1>
      <div
        onClick={() => setIsEnabled(!isEnabled)}
        style={{
          padding: "10px",
          backgroundColor: isEnabled ? "#D48466" : "#111",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "11px",
          fontWeight: "bold",
          transition: "0.2s"
        }}>
        {isEnabled ? "ENABLED" : "DISABLED"}
      </div>
    </div>
  )
}

export default IndexPopup
