#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    float bottom = mix(a,b,u.x); // value on bottom
    float deltaLeft = (c-a) * u.y; // delta on left
    float deltaRight = (d-b) * u.y; // delta on right
    float delta = mix(deltaLeft, deltaRight, u.x); // delta from bottom
    return bottom + delta;
    
    // Equivalent Method
    // Mix 4 coorners percentages
    /*
    float left = mix(a,c,u.y); // value on left
    float deltaTop = (d-c) * u.x; // delta on top
    float deltaBottom = (b-a) * u.x; // delta on bottom
    float delta = mix(deltaBottom, deltaTop, u.y); // delta from bottom
    return left + delta;
    */
}


float parabola( float x, float k ){
    return pow( 4.0*x*(1.0-x), k );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    // Scale the coordinate system to see
    // some noise in action
    vec2 pos = vec2(st*vec2(2., 10.0));
    pos += (u_mouse / u_resolution - 0.5) * 10.;

    // Use the noise function
    float n = noise(pos);
    float color = mod(floor(n * 14.), 2.);
    
    float pct = noise(pos * 2.5);
    pct *= parabola(fract(n * 4.),0.75);
    // color *= pct;

    gl_FragColor = vec4(vec3(color), 1.0);
}
