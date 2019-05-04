#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    vec2 a = random2(i);
    vec2 b = random2(i + vec2(1.0, 0.0));
    vec2 c = random2(i + vec2(0.0, 1.0));
    vec2 d = random2(i + vec2(1.0, 1.0));

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);
    
    // val = rate of change projected onto vector between point and f
    float bl = dot( a, f - vec2(0.0,0.0) ); // val
    float br = dot( b, f - vec2(1.0,0.0) ); // val
    float tl = dot( c, f - vec2(0.0,1.0) ); // val
    float tr = dot( d, f - vec2(1.0,1.0) ); // val

    return mix( mix( bl, br, u.x), // bottom
                mix( tl, tr, u.x), // top
               u.y); // vertical blend
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec3 color = vec3(0.0);

    vec2 pos = vec2(st*30.0);

    color = vec3( noise(pos)*1.+.5 );

    gl_FragColor = vec4(color,1.0);
}

