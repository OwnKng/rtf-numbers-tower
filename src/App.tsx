import { Canvas } from "@react-three/fiber"

import "./App.css"
import Sketch from "./Sketch"

const App = () => (
  <div className='App'>
    <Canvas
      camera={{ position: [0, 15, -20] }}
      onCreated={({ camera }) => camera.lookAt(0, 15, 0)}
    >
      <Sketch />
    </Canvas>
  </div>
)

export default App
