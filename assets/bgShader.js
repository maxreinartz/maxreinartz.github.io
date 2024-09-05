const canvas = document.getElementById('background-shader');
const gl = canvas.getContext('webgl');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform vec3 u_colors[5];
  uniform vec2 u_centers[5];
  uniform float u_radius;

  float ball(vec2 st, vec2 center, float radius) {
    // Normalize the coordinates to maintain aspect ratio
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 normalizedSt = st * aspect;
    vec2 normalizedCenter = center * aspect;
    float dist = length(normalizedSt - normalizedCenter);
    return smoothstep(radius + 0.5, radius - 0.3, dist);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    vec3 color = vec3(0.0);

    float radius = u_radius;

    for (int i = 0; i < 5; i++) {
      float b = ball(st, u_centers[i], radius);
      color += u_colors[i] * b;
    }

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error(gl.getProgramInfoLog(program));
}

const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
const colorsUniformLocation = gl.getUniformLocation(program, 'u_colors');
const centersUniformLocation = gl.getUniformLocation(program, 'u_centers');

const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
const positions = [
  -1, -1,
   1, -1,
  -1,  1,
  -1,  1,
   1, -1,
   1,  1,
];
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

const rootStyles = getComputedStyle(document.documentElement);
const colorVariables = [
  '--dot1-color',
  '--dot2-color',
  '--dot3-color',
  '--dot4-color',
  '--dot5-color'
];
const colors = new Float32Array(colorVariables.flatMap(varName => {
  const color = rootStyles.getPropertyValue(varName).trim();
  return color.match(/\w\w/g).map(x => parseInt(x, 16) / 255);
}));
gl.uniform3fv(colorsUniformLocation, colors);

function getRandomPosition() {
  return [Math.random(), Math.random()];
}

const centers = new Float32Array(10);
const velocities = new Float32Array(10);
for (let i = 0; i < 10; i += 2) {
  const position = getRandomPosition();
  centers[i] = position[0];
  centers[i + 1] = position[1];
  velocities[i] = (Math.random() - 0.5) * 0.0005;
  velocities[i + 1] = (Math.random() - 0.5) * 0.0005;
}

function updateCenters() {
  for (let i = 0; i < centers.length; i += 2) {
    centers[i] += velocities[i];
    centers[i + 1] += velocities[i + 1];

    if (centers[i] < 0.0 || centers[i] > 1.0) velocities[i] *= -1;
    if (centers[i + 1] < 0.0 || centers[i + 1] > 1.0) velocities[i + 1] *= -1;
  }
  gl.uniform2fv(centersUniformLocation, centers);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  requestAnimationFrame(updateCenters);
}

updateCenters();

function calculateRadius() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const radius = Math.min(screenWidth, screenHeight) * 0.0006;
  gl.uniform1f(gl.getUniformLocation(program, 'u_radius'), radius);
  console.log("[DEBUG] Radius : ", radius);
}

calculateRadius();