#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

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


// Reference to
// http://thndl.com/square-shaped-shaders.html

float polygon(in vec2 st, in int sides){
  float a = atan(st.x,st.y)+PI; // positive angle between 0 and TWO_PI
  float sideAngleDelta = TWO_PI/float(sides); // size of angle per side
  float sidePosition = a / sideAngleDelta; // position traced around the sides if each side is length 1
  float vertex = floor(0.5 + sidePosition); // the id of the nearest vertex before this angle
  float vertexTheta = vertex * sideAngleDelta; // angle of nearest vertex before this angle
  float angleDifference = vertexTheta - a; // theta between vertex and current angle
  float d = cos(angleDifference)*length(st); //distance from center scaled by sides
  d += noise(a * 10. + u_time) * 0.02;
  return d;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  float distance = polygon(st, 3);
  distance *= 10.;
  distance = abs(fract(distance) * 2. - 1.);
  vec3 color = vec3(distance);
  gl_FragColor = vec4(color,1.0);
}
