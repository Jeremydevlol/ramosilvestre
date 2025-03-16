import PropTypes from "prop-types"
import { Icon } from "@iconify/react"

/**
 * 1) ic:outline-local-florist (forzado a blanco)
 */
export const LocalFloristIcon = ({ className }) => (
  <Icon icon="ic:outline-local-florist" className={className} width="24" height="24" />
)

/**
 * 2) iconoir:flower (forzado a blanco)
 */
export const IconoirFlowerIcon = ({ className }) => (
  <Icon icon="iconoir:flower" className={className} width="24" height="24" />
)

/**
 * 3) mingcute:flower-fill (forzado a blanco)
 */
export const MingcuteFlowerFillIcon = ({ className }) => (
  <Icon icon="mingcute:flower-fill" className={className} width="24" height="24" />
)

// Logo Component with enhanced visibility
export const LogoImage = ({ className }) => (
  <div className="relative">
    <img
      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-mayus_1723974433-Oe1DjT4EoEK5Uy9YXERbjbyZWWQNRu.webp"
      alt="Ramo Silvestre Logo"
      className={`${className || "h-7 sm:h-8 w-auto"} drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]`}
      style={{ filter: "contrast(1.1) brightness(1.05)" }}
    />
  </div>
)

// Update the WorkshopIcon to use a teaching/course related icon
export const WorkshopIcon = ({ className }) => <Icon icon="mdi:school" className={className} width="24" height="24" />

// Validación de props
LocalFloristIcon.propTypes = { className: PropTypes.string }
IconoirFlowerIcon.propTypes = { className: PropTypes.string }
MingcuteFlowerFillIcon.propTypes = { className: PropTypes.string }
LogoImage.propTypes = { className: PropTypes.string }
// Add PropTypes for the new icon
WorkshopIcon.propTypes = { className: PropTypes.string }

// ---------------------------------------------------
//                    DATOS
// ---------------------------------------------------
const VIDEO_BASE_URL = "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/"

const DATA = {
  florist: [
    {
      id: 1,
      title: "Ramo de Rosas Salvaje",
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      description: "Exquisito arreglo de rosas silvestres con toques de flores de temporada y follaje fresco.",
      longDescription:
        "Un arreglo único que combina la elegancia de las rosas silvestres con la frescura de flores de temporada cuidadosamente seleccionadas. Perfecto para ocasiones especiales o para embellecer cualquier espacio con su belleza natural y aroma cautivador.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7117.jpg",
    },
    {
      id: 2,
      title: "Ramo de Rosas Salvaje",
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      description: "Composición artesanal de rosas silvestres con delicados matices y texturas variadas.",
      longDescription:
        "Creación artesanal que destaca por la combinación de rosas silvestres en diferentes estados de floración, creando un efecto visual de gran belleza y naturalidad. Cada ramo es único, elaborado con flores seleccionadas por nuestros expertos floristas.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%202.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7118.jpg",
    },
  ],
  iconoir: [
    {
      id: 2,
      title: "Ramo Clásico de Rosas Rojas",
      author: "Ramo Silvestre",
      price: "30,00€ - 120,00€",
      description: "Elegante composición de rosas rojas de tallo largo con follaje selecto y acabado premium.",
      longDescription:
        "La expresión perfecta del amor y la pasión en un arreglo clásico y atemporal. Nuestras rosas rojas de tallo largo son seleccionadas por su intenso color, frescura y duración. Presentadas con follaje complementario y un acabado de lujo que realza su belleza natural.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%203.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7119.PNG",
    },
  ],
  mingcute: [
    {
      id: 3,
      title: "Ramo de Flores Variado",
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      description: "Colorida selección de flores de temporada combinadas en un arreglo vibrante y armonioso.",
      longDescription:
        "Una explosión de color y vida en cada ramo. Combinamos las mejores flores de temporada para crear una pieza única que transmite alegría y frescura. Ideal para celebraciones, agradecimientos o simplemente para llenar de vida cualquier espacio con su vibrante presencia.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%204.MP4",
      isChefSuggestion: true,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7120.PNG",
    },
  ],
  // Add new workshops section
  workshops: [
    {
      id: 4,
      title: "Taller de Arreglos Florales",
      author: "Ramo Silvestre",
      price: "35,00€",
      description:
        "Aprende a crear hermosos arreglos florales con nuestros expertos. Ideal para principiantes y entusiastas.",
      longDescription:
        "En este taller práctico de 2 horas, aprenderás técnicas profesionales para crear arreglos florales únicos. Incluye todos los materiales necesarios y te llevarás tu creación a casa. Plazas limitadas, reserva con antelación.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%205.MP4",
      isChefSuggestion: true,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7120.PNG",
    },
    {
      id: 5,
      title: "Taller de Coronas Florales",
      author: "Ramo Silvestre",
      price: "40,00€",
      description: "Descubre el arte de crear coronas florales para decoración o eventos especiales.",
      longDescription:
        "Taller especializado en la creación de coronas florales para decoración del hogar o eventos especiales. Aprenderás a seleccionar flores, técnicas de preservación y diseño circular. Duración: 2.5 horas. Incluye todos los materiales.",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%205.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7121.jpg",
    },
  ],
}

// ---------------------------------------------------
//             SECCIONES CON TODAS LAS LABELS
// ---------------------------------------------------
export const SECTIONS = [
  {
    id: "florist",
    label: <LogoImage />,
    icon: LocalFloristIcon,
    posts: DATA.florist,
  },
  {
    id: "iconoir",
    label: <LogoImage />,
    icon: IconoirFlowerIcon,
    posts: DATA.iconoir,
  },
  {
    id: "mingcute",
    label: <LogoImage />,
    icon: MingcuteFlowerFillIcon,
    posts: DATA.mingcute,
  },
  {
    id: "workshops",
    label: <LogoImage />,
    icon: WorkshopIcon,
    posts: DATA.workshops,
  },
]

// Add translations for workshops
export const translations = {
  es: {
    title: "MENÚ",
    seeMore: "Ver Más",
    seeLess: "Ver Menos",
    selectLanguage: "Seleccionar idioma",
    close: "Cerrar",
    list: "List",
    workshops: "Talleres",
  },
  en: {
    title: "MENU",
    seeMore: "See More",
    seeLess: "See Less",
    selectLanguage: "Select Language",
    close: "Close",
    list: "List",
    workshops: "Workshops",
  },
}

