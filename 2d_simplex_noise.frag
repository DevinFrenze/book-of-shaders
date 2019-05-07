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

vec2 skew (vec2 st) {
    vec2 r = vec2(0.0);
    r.x = 1.1547*st.x;
    r.y = st.y+0.5*r.x;
    return r;
}

vec3 simplexGrid (vec2 st) {
    vec3 rgb = vec3(0.0);

    vec2 p = fract(skew(st));
    if (p.x > p.y) {
        rgb.r = 1. - p.x;
        rgb.g = 1. - (p.y - p.x);
        rgb.b = p.y;
    } else {
        rgb.r = p.x;
        rgb.g = 1. - (p.x - p.y);
        rgb.b = 1. - p.y;
    }

    return fract(rgb);
}

float noise (vec2 st) {
  float topLeft = step(st.y, st.x);
  vec2 f = fract(st);

  vec2 p1 = floor(st);
  vec2 p2 = p1 + vec2(topLeft, 1. - topLeft) + p1;
  vec2 p3 = p1 - vec2(1. - topLeft, topLeft);

  vec2 f1 = f;
  vec2 f2 = vec2(f.x, f.y);
  vec2 f3 = vec2(f.x, f.y);

  float n1 = random(p1);
  float n2 = random(p2);
  float n3 = random(p3);
  
  // todo interpolate based on st !

  return (n1 + n2 + n3) / 3.;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Scale the space to see the grid
    st *= 3.;
    st = skew(st);
    color = vec3(noise(st));

    /*
    // Show the 2D grid
    color.rg = fract(st);

    // Skew the 2D grid
    color.rg = fract(skew(st));

    // Subdivide the grid into to equilateral triangles
    color = simplexGrid(st);
    */

    gl_FragColor = vec4(color,1.0);
}
