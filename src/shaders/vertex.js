import glsl from "babel-plugin-glsl/macro"

export const vertex = glsl`
    uniform float uTime; 

    attribute vec3 offset;
    attribute float textureOffset; 

    varying vec2 vUv; 
    varying float vTextureOffset; 

    #pragma glslify: rotateY = require(glsl-rotate/rotateY) 
    #pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 

    void main() {
        vec3 transformedPosition = position; 
        transformedPosition += offset; 

        float rotation = snoise2(vec2(textureOffset, uTime * 0.025)) * 3.142; 

        transformedPosition = rotateY(transformedPosition, rotation); 

        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformedPosition, 1.0); 

        vTextureOffset = textureOffset; 
        vUv = uv; 
    }
`
