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
        alt="Ilustración nocturna de El Bondi como un circo: cerchas de hierro oxidado bajo la luna y las estrellas, árboles y enredaderas, guirnaldas de luces y banderines, una artista en tela aérea, un acróbata en trapecio, un equilibrista en la cuerda floja y una artista trepando la cuerda; frente a la fachada pintada de rayas de muchos colores, un malabarista, un monociclista, una chica con aro, una pareja de tango y un grupo de músicos con guitarra, acordeón, bombo, violín, trompeta y charango."
        fill
        priority
        sizes="(max-width: 768px) 240vw, 100vw"
        className="object-cover"
      />
    </div>
  )
}
