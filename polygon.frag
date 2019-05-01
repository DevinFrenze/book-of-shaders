#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

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
  return d;
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;
  
  // Remap the space to -1. to 1.
  st = st *2.-1.;
  float distance = polygon(st, 3);
  vec3 color = vec3(fract(distance * 10.));
  gl_FragColor = vec4(color,1.0);
}
