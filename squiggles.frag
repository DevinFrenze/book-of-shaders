#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform float u_time;

float wave(vec2 _st, float smoothness){
    float curveSmoothness = 6.;
    float curve = sin(_st.y * TWO_PI) / curveSmoothness + 0.5;
    return 2. * abs(curve - _st.x);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    st = fract(vec2(st.x * 5., st.y * 2. + u_time));
    float waveDistance1 = wave(st, 2.);

    st = fract(vec2(st.x + 0.5, st.y + PI));
    float waveDistance2 = wave(st, 2.);

    float minWaveDistance = min(waveDistance1, waveDistance2);
    color = vec3(step(PI / 8.,minWaveDistance));

    gl_FragColor = vec4(color,1.0);
}
