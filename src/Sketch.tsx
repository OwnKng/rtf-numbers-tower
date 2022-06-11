import { useFrame } from "@react-three/fiber"
import { useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { InstancedMesh } from "three"
import { useTexture } from "@react-three/drei"
import { vertex } from "./shaders/vertex"
import { fragment } from "./shaders/fragment"

const radius = 8
const numberOfRings = 30
const numberOfSurfaces = 156

const Sketch = () => {
  const texture = useTexture("texture.png")

  const ref = useRef<InstancedMesh>(null!)

  const [path] = useState(
    new THREE.CatmullRomCurve3(
      new Array(3).fill(0).flatMap((_, i) => new THREE.Vector3(0, i / 2, 0))
    )
  )

  const [offsets, textureOffset] = useMemo(
    () => [
      Float32Array.from(
        new Array(numberOfRings).fill(0).flatMap((_, i) => [0, i * 1.1, 0])
      ),
      Float32Array.from(
        new Array(numberOfRings).fill(0).map(() => Math.random() - 0.5)
      ),
    ],
    []
  )

  useFrame(
    ({ clock }) =>
      // @ts-ignore
      (ref.current.material.uniforms.uTime.value = clock.getElapsedTime())
  )

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, numberOfRings]}>
      <tubeBufferGeometry args={[path, 1, radius, 64, false]}>
        <instancedBufferAttribute
          attach='attributes-offset'
          args={[offsets, 3]}
        />
        <instancedBufferAttribute
          attach='attributes-textureOffset'
          args={[textureOffset, 1]}
        />
      </tubeBufferGeometry>
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTexture: { value: texture },
          uTime: { value: 0 },
          uSurfaces: { value: numberOfSurfaces },
        }}
      />
    </instancedMesh>
  )
}

export default Sketch
