import { useState } from 'react'

export default function DesignEditor() {
  const [cardPadding, setCardPadding] = useState(12)
  const [cardRadius, setCardRadius] = useState(16)
  const [imageRadius, setImageRadius] = useState(8)
  const [contentPaddingTop, setContentPaddingTop] = useState(16)
  const [contentPaddingX, setContentPaddingX] = useState(4)
  const [cardBg, setCardBg] = useState('#EBE9E4')
  const [pageBg, setPageBg] = useState('#F8F6F3')

  const cssOutput = `
/* Card Container */
.project-card {
  background: ${cardBg};
  border-radius: ${cardRadius}px;
  padding: ${cardPadding}px;
}

/* Image Container */
.project-card-image {
  border-radius: ${imageRadius}px;
  overflow: hidden;
}

/* Content */
.project-card-content {
  padding-top: ${contentPaddingTop}px;
  padding-left: ${contentPaddingX}px;
  padding-right: ${contentPaddingX}px;
}
`

  const tailwindOutput = `
<div className="bg-[${cardBg}] rounded-[${cardRadius}px] p-[${cardPadding}px]">
  <div className="rounded-[${imageRadius}px] overflow-hidden">
    <img ... />
  </div>
  <div className="pt-[${contentPaddingTop}px] px-[${contentPaddingX}px]">
    ...
  </div>
</div>
`

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: pageBg }}>
      {/* Sidebar Controls */}
      <div className="w-80 bg-[#2A3132] text-white p-6 overflow-y-auto fixed left-0 top-0 h-full">
        <h1 className="text-xl font-bold mb-6">Design Editor</h1>

        <div className="space-y-6">
          {/* Colors */}
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Colori</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Page Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={pageBg}
                    onChange={(e) => setPageBg(e.target.value)}
                    className="w-10 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={pageBg}
                    onChange={(e) => setPageBg(e.target.value)}
                    className="flex-1 bg-[#1a1f20] px-2 py-1 rounded text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Card Background</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={cardBg}
                    onChange={(e) => setCardBg(e.target.value)}
                    className="w-10 h-8 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={cardBg}
                    onChange={(e) => setCardBg(e.target.value)}
                    className="flex-1 bg-[#1a1f20] px-2 py-1 rounded text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Card Spacing */}
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Card Container</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Padding: {cardPadding}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={cardPadding}
                  onChange={(e) => setCardPadding(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Border Radius: {cardRadius}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={cardRadius}
                  onChange={(e) => setCardRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Image */}
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Immagine</h2>

            <div>
              <label className="block text-sm mb-1">Border Radius: {imageRadius}px</label>
              <input
                type="range"
                min="0"
                max="24"
                value={imageRadius}
                onChange={(e) => setImageRadius(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </section>

          {/* Content */}
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Content</h2>

            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Padding Top: {contentPaddingTop}px</label>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={contentPaddingTop}
                  onChange={(e) => setContentPaddingTop(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Padding X: {contentPaddingX}px</label>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={contentPaddingX}
                  onChange={(e) => setContentPaddingX(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </section>

          {/* Output */}
          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">CSS Output</h2>
            <pre className="bg-[#1a1f20] p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
              {cssOutput}
            </pre>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-3">Tailwind Output</h2>
            <pre className="bg-[#1a1f20] p-3 rounded text-xs overflow-x-auto whitespace-pre-wrap">
              {tailwindOutput}
            </pre>
          </section>
        </div>
      </div>

      {/* Preview Area */}
      <div className="ml-80 flex-1 p-8">
        <h2 className="text-2xl font-bold text-[#001666] mb-8">Preview Card</h2>

        <div className="max-w-[400px]">
          {/* Card Preview */}
          <div
            style={{
              backgroundColor: cardBg,
              borderRadius: `${cardRadius}px`,
              padding: `${cardPadding}px`,
            }}
          >
            <div
              style={{
                borderRadius: `${imageRadius}px`,
                overflow: 'hidden',
              }}
            >
              <img
                src="https://framerusercontent.com/images/btVfj3uYz35Jcg8udVCo6IDHPIw.jpg?scale-down-to=1024"
                alt="FinFlow"
                style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                paddingTop: `${contentPaddingTop}px`,
                paddingLeft: `${contentPaddingX}px`,
                paddingRight: `${contentPaddingX}px`,
              }}
            >
              <h5 className="text-lg font-semibold text-[#2A3132] mb-2">FinFlow</h5>
              <p className="text-sm text-[#767D7E] mb-4 leading-relaxed">
                FinFlow needed an expense tracking platform for startup teams with tight budgets.
              </p>
              <div className="flex items-center justify-between">
                <span className="bg-[#2A3132] text-[#F8F6F3] py-1.5 px-3.5 rounded-[20px] text-xs font-medium">
                  Product Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
