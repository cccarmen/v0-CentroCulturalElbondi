import Image from 'next/image'

const SCENE_SRC = '/images/el-bondi-scene.png'
const SCENE_RATIO = 1584 / 672

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
        alt="Diorama de papel recortado en capas de El Bondi de noche, enmarcado por nubes de papel: cerchas de óxido, luna creciente dormida y estrellas, árboles y enredaderas, guirnaldas de luces sobre una fachada cubierta de rayas de colores vivos y un mural, con una artista en tela aérea, otra trepando la cuerda, un malabarista, una pareja bailando tango y un guitarrista."
        fill
        priority
        sizes="(max-width: 768px) 240vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}
