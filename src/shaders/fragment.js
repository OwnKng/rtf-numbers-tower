import glsl from "babel-plugin-glsl/macro"

export const fragment = glsl`
    uniform sampler2D uTexture; 
    uniform float uTime; 
    uniform float uSurfaces; 

    varying float vTextureOffset; 
    varying vec2 vUv; 

    #pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

    float random (vec2 st) {
        return fract(sin(dot(st.xy,
                            vec2(12.9898,78.233)))*
            43758.5453123);
    }

    void main() {
        //* number of characters in the texture 
        float size = 10.0;  

        //* Scale the x coords by the number of surfaces in each ring
        vec2 _uv = vec2(vUv.y, vUv.x); 
        _uv.x *= uSurfaces; 

        //* Get a random value for each surface
        float noise = cnoise3(vec3(uTime * 0.001, vTextureOffset, floor(vUv.y * uSurfaces)));
        vec2 integerPosition = floor(vec2(noise * uSurfaces, _uv.y)); 
        float characterPosition = floor(abs(random(integerPosition)) * size) / size; 

        _uv = fract(_uv);  

        //* Add the random value to each x 
        _uv.x = characterPosition + _uv.x / size; 

        //* invert the x's to reverse the texture
        _uv.x = 1.0 - _uv.x; 
        
        vec3 color = 1.0 - texture2D(uTexture, _uv).rgb; 
        if(color.r < 0.6) discard; 

        gl_FragColor = vec4(vec3(0.8), 1.0); 
    }
`
