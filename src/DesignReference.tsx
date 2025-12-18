// Design Reference Page - Per confrontare il design corretto

export default function DesignReference() {
  return (
    <div className="min-h-screen bg-[#F8F6F3] p-8">
      <h1 className="text-3xl font-bold text-[#001666] mb-8 text-center">
        Design Reference - Mostrami come deve essere
      </h1>

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Card Example */}
        <section>
          <h2 className="text-xl font-semibold text-[#001666] mb-4">Project Card - Versione attuale</h2>

          {/* Current Implementation */}
          <div className="bg-[#EBE9E4] rounded-[16px] p-3 max-w-[500px]">
            <div className="rounded-[8px] overflow-hidden aspect-[4/3]">
              <img
                src="https://framerusercontent.com/images/btVfj3uYz35Jcg8udVCo6IDHPIw.jpg?scale-down-to=1024"
                alt="FinFlow"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="pt-4 px-1 pb-1">
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
        </section>

        {/* Placeholder for user to describe correct design */}
        <section className="border-2 border-dashed border-[#001666] rounded-xl p-8">
          <h2 className="text-xl font-semibold text-[#001666] mb-4">
            Come deve essere? Descrivi o incolla HTML/screenshot
          </h2>
          <div className="bg-white rounded-lg p-6 min-h-[200px]">
            <p className="text-[#767D7E]">
              Dimmi cosa non va nella card sopra:
            </p>
            <ul className="list-disc list-inside mt-4 text-[#2A3132] space-y-2">
              <li>Il padding è sbagliato?</li>
              <li>I border radius sono sbagliati?</li>
              <li>Lo sfondo cream non si vede?</li>
              <li>Il gap tra elementi è sbagliato?</li>
              <li>Altro?</li>
            </ul>
          </div>
        </section>

        {/* CSS Values currently used */}
        <section>
          <h2 className="text-xl font-semibold text-[#001666] mb-4">Valori CSS attuali</h2>
          <div className="bg-[#2A3132] text-white rounded-lg p-6 font-mono text-sm">
            <pre>{`Card Container:
  background: #EBE9E4
  border-radius: 16px
  padding: 12px (p-3)

Image Container:
  border-radius: 8px
  overflow: hidden
  aspect-ratio: 4/3

Content:
  padding-top: 16px
  padding-x: 4px
  padding-bottom: 4px`}</pre>
          </div>
        </section>
      </div>
    </div>
  )
}
