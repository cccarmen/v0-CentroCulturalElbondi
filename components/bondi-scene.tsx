import Image from 'next/image'

const SCENE_SRC = '/images/el-bondi-scene.png'
const SCENE_RATIO = 1376 / 768

interface Performer {
  src: string
  left: string
  top: string
  width: string
  ratio: string
  sizes: string
}

const PERFORMERS: Performer[] = [
  { src: '/images/performer-silks.png', left: '36.2%', top: '30.5%', width: '5.2%', ratio: '210 / 640', sizes: '8vw' },
  { src: '/images/performer-rope.png', left: '55%', top: '30.5%', width: '4.9%', ratio: '202 / 640', sizes: '8vw' },
  { src: '/images/performer-juggler.png', left: '19.3%', top: '76%', width: '4.6%', ratio: '295 / 640', sizes: '8vw' },
  { src: '/images/performer-tango.png', left: '49.7%', top: '76.2%', width: '7.4%', ratio: '437 / 640', sizes: '11vw' },
  { src: '/images/performer-musicians.png', left: '68%', top: '77.6%', width: '15%', ratio: '900 / 515', sizes: '22vw' },
]

export function BondiScene() {
  return (
    <div
      className="absolute left-1/2 top-[70%] -translate-x-1/2 -translate-y-[70%]"
      style={{
        width: `max(100%, ${SCENE_RATIO * 100}dvh)`,
        aspectRatio: `${SCENE_RATIO}`,
      }}
    >
      <Image
        src={SCENE_SRC}
        alt="Ilustración de El Bondi al anochecer: fachada de rayas pastel y cerchas de hierro con árboles y luces, con personajes de estilo circense: una artista en tela aérea, una acróbata en cuerda, un malabarista, una pareja bailando tango y músicos en la vereda."
        fill
        priority
        sizes="(max-width: 768px) 200vw, 100vw"
        className="object-cover"
      />

      {PERFORMERS.map((p) => (
        <div
          key={p.src}
          aria-hidden="true"
          className="absolute drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
          style={{ left: p.left, top: p.top, width: p.width, aspectRatio: p.ratio }}
        >
          <Image src={p.src} alt="" fill sizes={p.sizes} className="object-contain" />
        </div>
      ))}
    </div>
  )
}
