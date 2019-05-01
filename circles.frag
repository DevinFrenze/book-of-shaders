#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float circle(in float radius, in vec2 center, in float border){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float dist = distance(st,center);
  return smoothstep(dist - border, dist, radius - border);
}

float circleEdge(in float radius, in vec2 center, in float border){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float dist = distance(st,center);
  float edge = radius / 2.;
  float delta = abs(edge - dist);
  float halfBorder = border / 2.;

  return step(delta, halfBorder);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  float speed = u_time * 2.;
  float radius = 0.5 - 0.1 * (1. - abs(sin(speed)));
  // float pct = circle(radius, vec2(0.5), 0.1);
  // float pct = pow(distance(st,vec2(0.4)),distance(st,vec2(0.6)));
  vec2 center1 = vec2(0.5) + 0.1 * vec2(sin(speed), cos(speed));
  vec2 center2 = vec2(0.5) + 0.1 * vec2(-sin(speed), -cos(speed + PI / 2.));
  float pct = pow(distance(st,center1), distance(st,center2));

  vec3 color = mix(vec3(0., 1., 1.), vec3(1.000,0.000,0.973), pct);
  gl_FragColor = vec4( color, 1.0 );
}
