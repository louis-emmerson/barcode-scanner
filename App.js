import { CameraView, CameraType, useCameraPermissions } from "expo-camera"
import { useRef, useState } from "react"
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export default function App() {
  const [isCameraActive, setCameraActive] = useState(true)
  const lastScannedTimestampRef = useRef(0)
  const [scannedBarcode, setScannedBarcode] = useState("")
  const [scanned, setScanned] = useState(false)

  const handleBarCodeScanned = ({ data }) => {
    const timestamp = Date.now()

    if (scanned || timestamp - lastScannedTimestampRef.current < 1000) {
      return
    }
    lastScannedTimestampRef.current = timestamp
    console.log("NEW code scanned")
    setScannedBarcode(data)
  }



  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={"back"}
        barcodeScannerSettings={["code128"]}
        onBarcodeScanned={handleBarCodeScanned}
        active={isCameraActive}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>{scannedBarcode}</Text>
        </View>
      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "red",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
})
