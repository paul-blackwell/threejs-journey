precision mediump float;

// varying float vRandom;

uniform vec3 uColor;
uniform sampler2D uTexture;

void main()
{
  vec4 textureColor = texture2D(uTexture, );
  gl_FragColor = vec4(uColor, 1.0);
  // gl_FragColor = vec4(1.0, vRandom, 1.0, 1.0);
}
