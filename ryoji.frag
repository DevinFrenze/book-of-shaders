#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float direction(vec2 ipos) {
  return -4. * random(vec2(0., ipos.y));
  // return speed * (2. * mod(ipos.y, 2.) - 1.);
}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  vec2 uv = u_mouse.xy/u_resolution.xy;

  st *= vec2(10., 50.); // Scale the coordinate system
  vec2 ipos = floor(st);  // get the integer coords

  float off = direction(ipos) * u_time;
  // todo alter pixelate to group them in various lengths
  float pixelate = 5.;

  vec2 fpos = fract(st);  // get the fractional coords
  fpos.x = floor((fpos.x + off) * pixelate) / pixelate;

  vec2 pos = ipos + vec2(fpos.x, 0.);

  float value = random(pos) * random(2.3 * pos);
  value *= step(0.5, value);
  float threshold = random(pos + 0.5) * random(pos + 137.);
  float pct = step(uv.y, threshold);
  pct = 1. - (pct * (1. - value));
  vec3 color = vec3(pct);
  gl_FragColor = vec4(color, 1.);
}
