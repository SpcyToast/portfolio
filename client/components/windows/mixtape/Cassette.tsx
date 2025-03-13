import '@/client/styles/cassette.css'
import { CassetteProps } from '@/models/mixtape'
import { useEffect, useState } from 'react'

export default function Cassette({
  tape_name,
  font,
  font_colour,
  colour_A,
  colour_B,
  colour_C,
  colour_D,
  colour_E,
  colour_F,
  colour_G,
  image,
}: CassetteProps) {
  const [attributes, setAttributes] = useState({
    name: tape_name,
    font: font,
    font_colour: font_colour,
    A: colour_A,
    B: colour_B,
    C: colour_C,
    D: colour_D,
    E: colour_E,
    F: colour_F,
    G: colour_G,
    image: image,
  })

  return (
    <>
      <div className="cassette-container">
        <div
          className="cassette-case"
          style={{
            backgroundColor: attributes.A ? attributes.A : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div
          className="cassette-label"
          style={{
            backgroundColor: attributes.B ? attributes.B : 'rgb(134, 134, 131)',
          }}
        >
          {attributes.image !== null && (
            <img src={attributes.image} className="cassette-image" />
          )}
          <h1
            className="cassette-name"
            style={{
              color: attributes.font_colour
                ? attributes.font_colour
                : 'rgb(0, 0, 0)',
              font: attributes.font
                ? attributes.font
                : 'Arial, Helvetica, sans-serif',
            }}
          >
            {attributes.name}
          </h1>
        </div>
        <div
          className="cassette-hole-tl"
          style={{
            backgroundColor: attributes.C ? attributes.C : 'rgb(51, 51, 51)',
          }}
        ></div>
        <div
          className="cassette-hole-tr"
          style={{
            backgroundColor: attributes.C ? attributes.C : 'rgb(51, 51, 51)',
          }}
        ></div>
        <div
          className="cassette-hole-bl"
          style={{
            backgroundColor: attributes.C ? attributes.C : 'rgb(51, 51, 51)',
          }}
        ></div>
        <div
          className="cassette-hole-br"
          style={{
            backgroundColor: attributes.C ? attributes.C : 'rgb(51, 51, 51)',
          }}
        ></div>
        <div
          className="cassette-small-hole-tl"
          style={{
            backgroundColor: attributes.F ? attributes.F : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div
          className="cassette-small-hole-tr"
          style={{
            backgroundColor: attributes.F ? attributes.F : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div
          className="cassette-small-hole-bl"
          style={{
            backgroundColor: attributes.F ? attributes.F : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div
          className="cassette-small-hole-br"
          style={{
            backgroundColor: attributes.F ? attributes.F : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div
          className="cassette-mechanisim-container"
          style={{
            backgroundColor: attributes.D ? attributes.D : 'rgb(29, 29, 29)',
          }}
        ></div>
        <div className="cassette-mechanisim-reel">
          <div
            className="reel-in"
            style={{
              backgroundColor: attributes.G ? attributes.G : 'rgb(90, 88, 88)',
            }}
          ></div>
          <div
            className="reel-out"
            style={{
              backgroundColor: attributes.G ? attributes.G : 'rgb(90, 88, 88)',
            }}
          ></div>
        </div>
        <div className="cassette-mechanisim-cogslot-l">
          <img src="/mixtape/cassette-cog.svg" className="spin" />
        </div>
        <div className="cassette-mechanisim-cogslot-r">
          <img src="/mixtape/cassette-cog.svg" className="spin" />
        </div>
        <div
          className="cassette-bottom-box"
          style={{
            backgroundColor: attributes.E ? attributes.E : 'rgb(116, 116, 116)',
          }}
        ></div>
        <div
          className="cassette-bottom-box-l"
          style={{
            backgroundColor: attributes.E ? attributes.E : 'rgb(116, 116, 116)',
          }}
        ></div>
        <div
          className="cassette-bottom-box-r"
          style={{
            backgroundColor: attributes.E ? attributes.E : 'rgb(116, 116, 116)',
          }}
        ></div>
        <div className="cassette-bottom-hole-l"></div>
        <div className="cassette-bottom-hole-r"></div>
        <div
          className="cassette-bottom-hole-c"
          style={{
            backgroundColor: attributes.C ? attributes.C : 'rgb(51, 51, 51)',
          }}
        ></div>
        <div
          className="cassette-bottom-hole-c-small"
          style={{
            backgroundColor: attributes.F ? attributes.F : 'rgb(0, 0, 0)',
          }}
        ></div>
        <div className="cassette-bottom-nubb-l"></div>
        <div className="cassette-bottom-nubb-r"></div>
      </div>
    </>
  )
}
