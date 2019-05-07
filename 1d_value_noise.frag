#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in float s) {
    return fract(sin(dot(vec2(s,0.),
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}



float noise(float s) {
    float i = floor(s);
    float f = fract(s);

    float a = random(i);
    float b = random(i + 1.);

    // Cubic Hermine Curve.  Same as SmoothStep()
    float u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);
    
    return mix( a, b, u);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*10.0);

    color = vec3( noise(pos.x));

    gl_FragColor = vec4(color,1.0);
}

