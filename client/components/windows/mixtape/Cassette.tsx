import '@/client/styles/cassette.css'
import { CassetteProps } from '@/models/mixtape'
import { useEffect, useState } from 'react'

export default function Cassette({
  tape_name,
  colour_A,
  colour_B,
  colour_C,
  image,
}: CassetteProps) {
  const [attributes, setAttributes] = useState({
    name: tape_name,
    font: '',
    font_color: '',
    A: colour_A,
    B: colour_B,
    C: colour_C,
    D: colour_B,
    E: colour_C,
    F: colour_C,
    G: colour_C,
    image: image,
  })

  useEffect(() => {
    // default values for new tape or unaltered colours
    const defaultAttributes = { ...attributes }

    if (defaultAttributes.font_color === '') {
      defaultAttributes.font_color = 'rgb(0, 0, 0)'
    }
    if (defaultAttributes.A === '') {
      defaultAttributes.A = 'rgb(0, 0, 0)'
    }
    if (defaultAttributes.B === '') {
      defaultAttributes.B = 'rgb(134, 134, 131)'
    }
    if (defaultAttributes.C === '') {
      defaultAttributes.C = 'rgb(51, 51, 51)'
    }
    if (defaultAttributes.D === '') {
      defaultAttributes.D = 'rgb(29, 29, 29)'
    }
    if (defaultAttributes.E === '') {
      defaultAttributes.E = 'rgb(116, 116, 116)'
    }
    if (defaultAttributes.F === '') {
      defaultAttributes.F = 'rgb(0, 0, 0)'
    }
    if (defaultAttributes.G === '') {
      defaultAttributes.G = 'rgb(90, 88, 88)'
    }
    console.log(defaultAttributes)

    setAttributes(defaultAttributes)
  }, [])

  return (
    <>
      <div className="cassette-container">
        <div
          className="cassette-case"
          style={{ backgroundColor: attributes.A }}
        ></div>
        <div
          className="cassette-label"
          style={{ backgroundColor: attributes.B }}
        >
          {attributes.image !== '' && (
            <img src="/Wallpaper.png" className="cassette-image" />
          )}
          <h1 className="cassette-name" style={{ color: attributes.font }}>
            {attributes.name}
          </h1>
        </div>
        <div
          className="cassette-hole-tl"
          style={{ backgroundColor: attributes.C }}
        ></div>
        <div
          className="cassette-hole-tr"
          style={{ backgroundColor: attributes.C }}
        ></div>
        <div
          className="cassette-hole-bl"
          style={{ backgroundColor: attributes.C }}
        ></div>
        <div
          className="cassette-hole-br"
          style={{ backgroundColor: attributes.C }}
        ></div>
        <div
          className="cassette-small-hole-tl"
          style={{ backgroundColor: attributes.F }}
        ></div>
        <div
          className="cassette-small-hole-tr"
          style={{ backgroundColor: attributes.F }}
        ></div>
        <div
          className="cassette-small-hole-bl"
          style={{ backgroundColor: attributes.F }}
        ></div>
        <div
          className="cassette-small-hole-br"
          style={{ backgroundColor: attributes.F }}
        ></div>
        <div
          className="cassette-mechanisim-container"
          style={{ backgroundColor: attributes.D }}
        ></div>
        <div className="cassette-mechanisim-reel">
          <div
            className="reel-in"
            style={{ backgroundColor: attributes.G }}
          ></div>
          <div
            className="reel-out"
            style={{ backgroundColor: attributes.G }}
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
          style={{ backgroundColor: attributes.E }}
        ></div>
        <div
          className="cassette-bottom-box-l"
          style={{ backgroundColor: attributes.E }}
        ></div>
        <div
          className="cassette-bottom-box-r"
          style={{ backgroundColor: attributes.E }}
        ></div>
        <div className="cassette-bottom-hole-l"></div>
        <div className="cassette-bottom-hole-r"></div>
        <div
          className="cassette-bottom-hole-c"
          style={{ backgroundColor: attributes.C }}
        ></div>
        <div
          className="cassette-bottom-hole-c-small"
          style={{ backgroundColor: attributes.F }}
        ></div>
        <div className="cassette-bottom-nubb-l"></div>
        <div className="cassette-bottom-nubb-r"></div>
      </div>
    </>
  )
}
