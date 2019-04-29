#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rectangle(in vec2 dimensions, in vec2 center, in vec2 border){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 diff = abs(center-st);
    vec2 edge = dimensions / 2.;
    vec2 bounds = step(diff, edge);
    return bounds.x * bounds.y;
}

float within(float edge, float width, float x){
    return step(abs(edge - x), width);
}

float rectangleEdges(in vec2 dimensions, in vec2 center, in vec2 border){
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 diff = abs(center-st);
    vec2 edge = dimensions / 2.;
    vec2 delta = abs(edge - diff);
    vec2 halfBorder = border / 2.;
    
    float x = step(delta.x, halfBorder.x);
    float y = step(diff.y, edge.y + halfBorder.y);
    float verticalBars = x * y;
    
    y = step(delta.y, halfBorder.y);
    x = step(diff.x, edge.x + halfBorder.x);
    float horizontalBars = x * y;

    return max(verticalBars, horizontalBars);
}



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color0 = vec3(rectangle(vec2(0.2), vec2(0.3), vec2(0.05)));
    vec3 color1 = vec3(rectangleEdges(vec2(0.3), vec2(0.3), vec2(0.05)));

    gl_FragColor = vec4(max(color0, color1),1.0);
}
