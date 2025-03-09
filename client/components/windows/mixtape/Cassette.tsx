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
    image: image,
  })

  useEffect(() => {
    const defaultAttributes = { ...attributes }
    console.log(defaultAttributes)

    if (defaultAttributes.font === '') {
      defaultAttributes.font = 'rgb(86, 146, 91)'
    }
    if (defaultAttributes.font_color === '') {
      defaultAttributes.font_color = 'rgb(236, 200, 200)'
    }
    if (defaultAttributes.A === '') {
      defaultAttributes.A = 'rgb(59, 39, 82)'
    }
    if (defaultAttributes.B === '') {
      defaultAttributes.B = 'rgb(127, 153, 31)'
    }
    if (defaultAttributes.C === '') {
      defaultAttributes.C = 'rgb(61, 15, 136)'
    }
    if (defaultAttributes.D === '') {
      defaultAttributes.D = 'rgb(212, 25, 113)'
    }
    if (defaultAttributes.E === '') {
      defaultAttributes.E = 'rgb(71, 221, 231)'
    }
    if (defaultAttributes.F === '') {
      defaultAttributes.F = 'rgb(142, 197, 151)'
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
          <h1 className="cassette-name" style={{ color: attributes.C }}>
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
        <div className="cassette-mechanisim-cogslot-l">
          <img src="/mixtape/cassette-cog.svg" />
        </div>
        <div className="cassette-mechanisim-cogslot-r">
          <img src="/mixtape/cassette-cog.svg" />
        </div>
        <div className="cassette-mechanisim-reel"></div>
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
