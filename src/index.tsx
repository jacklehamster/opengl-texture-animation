import { GLCanvas } from "dok-gl-canvas";
import { GlController } from "dok-gl-canvas/dist/control/gl-controller";
import React from "react";
import * as ReactDOMClient from "react-dom/client";

const w = 238 / 1886;

const vertex = `#version 300 es

precision highp float;
layout (location=0) in vec4 position;
layout (location=1) in vec2 tex;

uniform float time;

out vec2 vTex;

float modPlus(float a, float b) {
  return mod(a + .4, b) - .4;
}

void main() {
    float frame = modPlus(floor(time / 100.), 8.);

    vTex = tex;
    vTex.x += frame * (238.0 / 1886.0);
    gl_Position = position;
}
`;

const program = [
  {
      id: "sample-texture",
      vertex,
      fragment:
      `#version 300 es

        precision highp float;
        uniform sampler2D uTexture;

        in vec2 vTex;
        out vec4 fragColor;

        void main() {
            fragColor = texture(uTexture, vTex);
        }
      `
    },
    {
      id: "sample-color",
      vertex,
      fragment:
      `#version 300 es

        precision highp float;
        uniform sampler2D uTexture;

        in vec2 vTex;
        out vec4 fragColor;

        void main() {
           fragColor = vec4(vTex, 0.0, 1.0);
        }
      `
    },
];

interface Props {
  controller: GlController;
}

const App = ({ controller }: Props) => <GLCanvas
      controller={controller}
      actionScripts={[
      {
        name: "redraw",
        actions: [
          {
            action: "clear",
            color: true,
          },
          {
            action: "draw",
            vertexCount: 6,
          },    
        ],
      }
    ]}
    programs={program}
    actionPipeline={[
      "bind-vertex",
      {
        action: "buffer-attribute",
        location: "position",
        buffer: [
          -0.5, 0.5, 0.0,
          -0.5, -0.5, 0.0,
          0.5, -0.5, 0.0,
          -0.5, 0.5, 0.0,
          0.5, -0.5, 0.0,
          0.5, 0.5, 0.0,
        ],
        size: 3,
      },
      {
        action: "buffer-attribute",
        location: "tex",
        buffer: [
          0, 0,
          0, 1,
          w, 1,
          0, 0,
          w, 1,
          w, 0,
        ],
        size: 2,
      },
      {
        action: "uniform",
        location: "uTexture",
        int: 0,
      },
      {
        action: "load-image",
        src: "turtle.png",
        imageId: "turtle",
        onLoad: [
            {
                action: "load-texture",
                imageId: "turtle",
                textureId: "TEXTURE0",
            },        
        ],
      },
    ]}
    actionLoop={[
        {
            action: "uniform-timer",
            location: "time",
        },
        "redraw",
    ]}
/>;



function hookupApp(root: HTMLDivElement, controller: GlController) {
  const hudRoot = ReactDOMClient.createRoot(root!);

  hudRoot.render(<App controller={controller} />)  
}



const exports = {
  hookupApp,
}

export default exports;

globalThis.exports = exports;