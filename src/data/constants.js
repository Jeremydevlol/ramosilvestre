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

// Datos multilingües
export const MULTILINGUAL_DATA = {
  florist: [
    {
      id: 1,
      translations: {
        es: {
          title: "Ramo de Rosas Salvaje",
          description: "Exquisito arreglo de rosas silvestres con toques de flores de temporada y follaje fresco.",
          longDescription:
            "Un arreglo único que combina la elegancia de las rosas silvestres con la frescura de flores de temporada cuidadosamente seleccionadas. Perfecto para ocasiones especiales o para embellecer cualquier espacio con su belleza natural y aroma cautivador.",
        },
        en: {
          title: "Wild Roses Bouquet",
          description: "Exquisite arrangement of wild roses with touches of seasonal flowers and fresh foliage.",
          longDescription:
            "A unique arrangement that combines the elegance of wild roses with the freshness of carefully selected seasonal flowers. Perfect for special occasions or to beautify any space with its natural beauty and captivating aroma.",
        },
        zh: {
          title: "野玫瑰花束",
          description: "精美的野玫瑰花束，搭配时令花卉和新鲜叶子。",
          longDescription:
            "这是一种独特的花束，将野玫瑰的优雅与精心挑选的时令花卉的新鲜感相结合。非常适合特殊场合，或用其自然美丽和迷人香气装饰任何空间。",
        },
      },
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7117.jpg",
    },
    {
      id: 2,
      translations: {
        es: {
          title: "Ramo de Rosas Salvaje",
          description: "Composición artesanal de rosas silvestres con delicados matices y texturas variadas.",
          longDescription:
            "Creación artesanal que destaca por la combinación de rosas silvestres en diferentes estados de floración, creando un efecto visual de gran belleza y naturalidad. Cada ramo es único, elaborado con flores seleccionadas por nuestros expertos floristas.",
        },
        en: {
          title: "Wild Roses Bouquet",
          description: "Artisanal composition of wild roses with delicate nuances and varied textures.",
          longDescription:
            "Artisanal creation that stands out for the combination of wild roses in different states of flowering, creating a visual effect of great beauty and naturalness. Each bouquet is unique, made with flowers selected by our expert florists.",
        },
        zh: {
          title: "野玫瑰花束",
          description: "手工制作的野玫瑰花束，具有精致的色调和多样的质地。",
          longDescription:
            "这款手工制作的花束以不同开花状态的野玫瑰组合而著称，创造出极具美感和自然感的视觉效果。每一束都是独一无二的，由我们的专业花艺师精心挑选花材制作而成。",
        },
      },
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%202.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7118.jpg",
    },
  ],
  iconoir: [
    {
      id: 3,
      translations: {
        es: {
          title: "Ramo Clásico de Rosas Rojas",
          description: "Elegante composición de rosas rojas de tallo largo con follaje selecto y acabado premium.",
          longDescription:
            "La expresión perfecta del amor y la pasión en un arreglo clásico y atemporal. Nuestras rosas rojas de tallo largo son seleccionadas por su intenso color, frescura y duración. Presentadas con follaje complementario y un acabado de lujo que realza su belleza natural.",
        },
        en: {
          title: "Classic Red Roses Bouquet",
          description: "Elegant composition of long-stemmed red roses with select foliage and premium finish.",
          longDescription:
            "The perfect expression of love and passion in a classic and timeless arrangement. Our long-stemmed red roses are selected for their intense color, freshness, and longevity. Presented with complementary foliage and a luxury finish that enhances their natural beauty.",
        },
        zh: {
          title: "经典红玫瑰花束",
          description: "优雅的长茎红玫瑰花束，配以精选叶子和高级装饰。",
          longDescription:
            "这是爱与激情的完美表达，经典而永恒。我们的长茎红玫瑰因其浓郁的色彩、新鲜度和持久性而被精心挑选。搭配互补的叶子和豪华的装饰，增强了它们的自然美感。",
        },
      },
      author: "Ramo Silvestre",
      price: "30,00€ - 120,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%203.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7119.PNG",
    },
  ],
  mingcute: [
    {
      id: 4,
      translations: {
        es: {
          title: "Ramo de Flores Variado",
          description: "Colorida selección de flores de temporada combinadas en un arreglo vibrante y armonioso.",
          longDescription:
            "Una explosión de color y vida en cada ramo. Combinamos las mejores flores de temporada para crear una pieza única que transmite alegría y frescura. Ideal para celebraciones, agradecimientos o simplemente para llenar de vida cualquier espacio con su vibrante presencia.",
        },
        en: {
          title: "Mixed Flower Bouquet",
          description: "Colorful selection of seasonal flowers combined in a vibrant and harmonious arrangement.",
          longDescription:
            "An explosion of color and life in each bouquet. We combine the best seasonal flowers to create a unique piece that conveys joy and freshness. Ideal for celebrations, thank you gifts, or simply to fill any space with its vibrant presence.",
        },
        zh: {
          title: "混合花束",
          description: "色彩丰富的时令花卉组合，形成充满活力和谐的花束。",
          longDescription:
            "每一束都是色彩和生命力的爆发。我们结合最好的时令花卉，创造出独特的作品，传递欢乐和清新。非常适合庆祝活动、表达感谢，或者仅仅是用其充满活力的存在为任何空间注入生机。",
        },
      },
      author: "Ramo Silvestre",
      price: "45,00€ - 95,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%204.MP4",
      isChefSuggestion: true,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7120.PNG",
    },
  ],
  workshops: [
    {
      id: 5,
      translations: {
        es: {
          title: "Taller de Arreglos Florales",
          description:
            "Aprende a crear hermosos arreglos florales con nuestros expertos. Ideal para principiantes y entusiastas.",
          longDescription:
            "En este taller práctico de 2 horas, aprenderás técnicas profesionales para crear arreglos florales únicos. Incluye todos los materiales necesarios y te llevarás tu creación a casa. Plazas limitadas, reserva con antelación.",
        },
        en: {
          title: "Floral Arrangement Workshop",
          description:
            "Learn to create beautiful floral arrangements with our experts. Ideal for beginners and enthusiasts.",
          longDescription:
            "In this 2-hour practical workshop, you will learn professional techniques to create unique floral arrangements. Includes all necessary materials and you will take your creation home. Limited spots, book in advance.",
        },
        zh: {
          title: "花艺工作坊",
          description: "跟随我们的专家学习制作美丽的花艺作品。适合初学者和爱好者。",
          longDescription:
            "在这个2小时的实践工作坊中，您将学习专业技巧来创作独特的花艺作品。包含所有必要的材料，您可以将自己的作品带回家。名额有限，请提前预订。",
        },
      },
      author: "Ramo Silvestre",
      price: "35,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%205.MP4",
      isChefSuggestion: true,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7120.PNG",
    },
    {
      id: 6,
      translations: {
        es: {
          title: "Taller de Coronas Florales",
          description: "Descubre el arte de crear coronas florales para decoración o eventos especiales.",
          longDescription:
            "Taller especializado en la creación de coronas florales para decoración del hogar o eventos especiales. Aprenderás a seleccionar flores, técnicas de preservación y diseño circular. Duración: 2.5 horas. Incluye todos los materiales.",
        },
        en: {
          title: "Floral Wreath Workshop",
          description: "Discover the art of creating floral wreaths for decoration or special events.",
          longDescription:
            "Specialized workshop in creating floral wreaths for home decoration or special events. You will learn to select flowers, preservation techniques, and circular design. Duration: 2.5 hours. Includes all materials.",
        },
        zh: {
          title: "花环工作坊",
          description: "探索为装饰或特殊活动创作花环的艺术。",
          longDescription:
            "专门用于创作家居装饰或特殊活动花环的工作坊。您将学习如何选择花材、保鲜技术和环形设计。时长：2.5小时。包含所有材料。",
        },
      },
      author: "Ramo Silvestre",
      price: "40,00€",
      video: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/savetik%205.MP4",
      isChefSuggestion: false,
      image: "https://pub-c7d0dc38637549099194f56cfe536cc4.r2.dev/IMG_7121.jpg",
    },
  ],
}

// Función para obtener los datos en el idioma actual
export const getLocalizedData = (language = "es") => {
  const localizedData = {}

  Object.keys(MULTILINGUAL_DATA).forEach((sectionKey) => {
    localizedData[sectionKey] = MULTILINGUAL_DATA[sectionKey].map((item) => {
      // Obtener las traducciones para el idioma actual o usar español como fallback
      const translations = item.translations[language] || item.translations.es

      return {
        ...item,
        title: translations.title,
        description: translations.description,
        longDescription: translations.longDescription,
      }
    })
  })

  return localizedData
}

// ---------------------------------------------------
//             SECCIONES CON TODAS LAS LABELS
// ---------------------------------------------------
export const getSections = (language = "es") => {
  const localizedData = getLocalizedData(language)

  return [
    {
      id: "florist",
      label: <LogoImage />,
      icon: LocalFloristIcon,
      posts: localizedData.florist,
    },
    {
      id: "iconoir",
      label: <LogoImage />,
      icon: IconoirFlowerIcon,
      posts: localizedData.iconoir,
    },
    {
      id: "mingcute",
      label: <LogoImage />,
      icon: MingcuteFlowerFillIcon,
      posts: localizedData.mingcute,
    },
    {
      id: "workshops",
      label: <LogoImage />,
      icon: WorkshopIcon,
      posts: localizedData.workshops,
    },
  ]
}

// Traducciones para la interfaz de usuario
export const translations = {
  es: {
    title: "MENÚ",
    seeMore: "Ver Más",
    seeLess: "Ver Menos",
    selectLanguage: "Seleccionar idioma",
    close: "Cerrar",
    list: "Lista",
    workshops: "Talleres",
    collection: "Colección",
    language: "Español",
    languageCode: "ES",
    addToCart: "Añadir al carrito",
    viewMore: "Ver más",
    emptyCart: "Tu carrito está vacío",
    continueShopping: "Continuar comprando",
    total: "Total",
    checkout: "Finalizar compra",
    myOrder: "Mi pedido",
    favorites: "Favoritos",
    noFavorites: "No tienes favoritos",
    chefSuggestion: "Sugerencia del chef",
    quantity: "Cantidad",
    remove: "Eliminar",
    continue: "Continuar",
    back: "Volver",
    allergens: "Alérgenos",
    viewDetails: "Ver detalles",
  },
  en: {
    title: "MENU",
    seeMore: "See More",
    seeLess: "See Less",
    selectLanguage: "Select Language",
    close: "Close",
    list: "List",
    workshops: "Workshops",
    collection: "Collection",
    language: "English",
    languageCode: "EN",
    addToCart: "Add to cart",
    viewMore: "View more",
    emptyCart: "Your cart is empty",
    continueShopping: "Continue shopping",
    total: "Total",
    checkout: "Checkout",
    myOrder: "My order",
    favorites: "Favorites",
    noFavorites: "No favorites yet",
    chefSuggestion: "Chef's suggestion",
    quantity: "Quantity",
    remove: "Remove",
    continue: "Continue",
    back: "Back",
    allergens: "Allergens",
    viewDetails: "View details",
  },
  zh: {
    title: "菜单",
    seeMore: "查看更多",
    seeLess: "收起",
    selectLanguage: "选择语言",
    close: "关闭",
    list: "列表",
    workshops: "工作坊",
    collection: "收藏",
    language: "中文",
    languageCode: "中文",
    addToCart: "加入购物车",
    viewMore: "查看更多",
    emptyCart: "购物车为空",
    continueShopping: "继续购物",
    total: "总计",
    checkout: "结账",
    myOrder: "我的订单",
    favorites: "收藏夹",
    noFavorites: "暂无收藏",
    chefSuggestion: "主厨推荐",
    quantity: "数量",
    remove: "删除",
    continue: "继续",
    back: "返回",
    allergens: "过敏原",
    viewDetails: "查看详情",
  },
}

// Flags for language selector
export const languageFlags = {
  es: "twemoji:flag-spain",
  en: "twemoji:flag-united-kingdom",
  zh: "twemoji:flag-china",
}

