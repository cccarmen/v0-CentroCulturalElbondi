import Image from 'next/image'

const SCENE_SRC = '/images/el-bondi-scene.png'
const SCENE_RATIO = 1376 / 768

interface Box {
  left: number
  top: number
  width: number
  height: number
}

// Tree regions in % of the scene; each is re-rendered from the same image and
// swayed around its trunk base, with feathered edges hiding the seam.
const TREES: Array<Box & { delay: string; duration: string }> = [
  { left: 12.5, top: 22, width: 20, height: 36, delay: '0s', duration: '13s' },
  { left: 66, top: 23, width: 19, height: 35, delay: '-5s', duration: '15s' },
  { left: -1, top: 45, width: 10, height: 24, delay: '-2.5s', duration: '12s' },
]

const BALLS = [
  { delay: '0s', color: 'bg-[#f2c94c]' },
  { delay: '-0.733s', color: 'bg-[#eb5757]' },
  { delay: '-1.467s', color: 'bg-[#56ccf2]' },
]

function SwayingTree({ left, top, width, height, delay, duration }: (typeof TREES)[number]) {
  return (
    <div
      aria-hidden="true"
      className="absolute animate-tree-sway [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_62%,transparent_100%)]"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
        animationDelay: delay,
        animationDuration: duration,
      }}
    >
      <div
        className="absolute"
        style={{
          width: `${(100 / width) * 100}%`,
          height: `${(100 / height) * 100}%`,
          left: `${(-left / width) * 100}%`,
          top: `${(-top / height) * 100}%`,
        }}
      >
        <Image src={SCENE_SRC} alt="" fill sizes="100vw" className="object-cover" />
      </div>
    </div>
  )
}

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
        alt="Ilustración de El Bondi al anochecer: fachada de rayas pastel y cerchas de hierro con árboles y luces, con personajes de estilo circense: una artista en tela aérea, un acróbata en cuerda, un malabarista, una pareja bailando tango y músicos en la vereda."
        fill
        priority
        sizes="(max-width: 768px) 200vw, 100vw"
        className="object-cover"
      />

      {TREES.map((tree) => (
        <SwayingTree key={`${tree.left}-${tree.top}`} {...tree} />
      ))}

      {/* Aerial silks, hanging from the left truss */}
      <div
        aria-hidden="true"
        className="absolute origin-[50%_0%] animate-aerial-swing drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
        style={{ left: '34%', top: '30.5%', width: '9.5%', aspectRatio: '430 / 640' }}
      >
        <Image src="/images/performer-silks.png" alt="" fill sizes="14vw" className="object-contain" />
      </div>

      {/* Aerial rope, hanging from the right truss */}
      <div
        aria-hidden="true"
        className="absolute origin-[53%_0%] animate-rope-swing drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
        style={{ left: '55.2%', top: '30.5%', width: '5%', aspectRatio: '208 / 640' }}
      >
        <Image src="/images/performer-rope.png" alt="" fill sizes="8vw" className="object-contain" />
      </div>

      {/* Tango couple on the sidewalk */}
      <div
        aria-hidden="true"
        className="absolute drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
        style={{ left: '46.8%', top: '76.2%', width: '13.2%', aspectRatio: '776 / 640' }}
      >
        <Image src="/images/performer-tango.png" alt="" fill sizes="20vw" className="object-contain" />
      </div>

      {/* Street musicians by the pink house */}
      <div
        aria-hidden="true"
        className="absolute drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
        style={{ left: '78%', top: '76.2%', width: '11%', aspectRatio: '687 / 611' }}
      >
        <Image src="/images/performer-musicians.png" alt="" fill sizes="18vw" className="object-contain" />
      </div>

      {/* Juggler on the sidewalk */}
      <div
        aria-hidden="true"
        className="absolute drop-shadow-[0_4px_6px_rgba(0,0,0,0.4)]"
        style={{ left: '19.25%', top: '76%', width: '4.7%', aspectRatio: '301 / 640' }}
      >
        <Image src="/images/performer-juggler.png" alt="" fill sizes="8vw" className="object-contain" />
        <div className="absolute inset-x-[8%] bottom-[68%] h-[55%]">
          {BALLS.map((ball) => (
            <span
              key={ball.delay}
              className="absolute inset-0 animate-juggle-x"
              style={{ animationDelay: ball.delay }}
            >
              <span
                className={`absolute bottom-0 left-0 block aspect-square w-[18%] -translate-x-1/2 animate-juggle-y rounded-full shadow-[0_0_6px_rgba(255,220,150,0.6)] ${ball.color}`}
                style={{ animationDelay: ball.delay }}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
