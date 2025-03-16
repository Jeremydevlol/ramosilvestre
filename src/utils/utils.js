export const handleAddToCart = (item, buttonRef, addToCart) => {
  if (buttonRef.current) {
    const startRect = buttonRef.current.getBoundingClientRect()

    const floatingIcon = document.createElement("div")
    floatingIcon.className = "floating-icon"
    floatingIcon.style.position = "fixed"
    floatingIcon.style.left = `${startRect.left + startRect.width / 2 - 15}px`
    floatingIcon.style.top = `${startRect.top + startRect.height / 2 - 15}px`
    floatingIcon.style.zIndex = 1000
    floatingIcon.style.width = "30px"
    floatingIcon.style.height = "30px"
    floatingIcon.style.backgroundImage = `url("${encodeURI(item.image)}")`
    floatingIcon.style.backgroundSize = "cover"
    floatingIcon.style.backgroundPosition = "center"
    floatingIcon.style.borderRadius = "5px"
    floatingIcon.style.display = "flex"
    floatingIcon.style.justifyContent = "center"
    floatingIcon.style.alignItems = "center"

    const buttonIcon = buttonRef.current.querySelector("svg").cloneNode(true)
    buttonIcon.style.width = "20px"
    buttonIcon.style.height = "20px"
    buttonIcon.style.color = "white"
    floatingIcon.appendChild(buttonIcon)

    document.body.appendChild(floatingIcon)
    floatingIcon.animate(
      [
        { transform: "translateY(0)", opacity: 0.9 },
        { transform: "translateY(-1000px)", opacity: 0.2 },
      ],
      {
        duration: 1500,
        easing: "ease-in-out",
      },
    ).onfinish = () => {
      document.body.removeChild(floatingIcon)
      addToCart(item)
    }
  }
}

export const handleAddToFavorite = (item, buttonRef, toogleFavorite) => {
  if (buttonRef.current) {
    const startRect = buttonRef.current.getBoundingClientRect()

    const floatingIcon = document.createElement("div")
    floatingIcon.className = "floating-icon"
    floatingIcon.style.position = "fixed"
    floatingIcon.style.left = `${startRect.left + startRect.width / 2 - 15}px`
    floatingIcon.style.top = `${startRect.top + startRect.height / 2 - 15}px`
    floatingIcon.style.zIndex = 1000
    floatingIcon.style.width = "30px"
    floatingIcon.style.height = "30px"
    floatingIcon.style.backgroundImage = `url("${encodeURI(item.image)}")`
    floatingIcon.style.backgroundSize = "cover"
    floatingIcon.style.backgroundPosition = "center"
    floatingIcon.style.borderRadius = "5px"
    floatingIcon.style.display = "flex"
    floatingIcon.style.justifyContent = "center"
    floatingIcon.style.alignItems = "center"

    const buttonIcon = buttonRef.current.querySelector("svg").cloneNode(true)
    buttonIcon.style.width = "20px"
    buttonIcon.style.height = "20px"
    buttonIcon.style.color = "white"
    floatingIcon.appendChild(buttonIcon)

    document.body.appendChild(floatingIcon)
    floatingIcon.animate(
      [
        { transform: "translateY(0)", opacity: 0.9 },
        { transform: "translateY(-1000px)", opacity: 0.2 },
      ],
      {
        duration: 800,
        easing: "ease-in-out",
      },
    ).onfinish = () => {
      document.body.removeChild(floatingIcon)
      //toogleFavorite(item.title);
      setTimeout(() => {
        window.open(
          "https://www.instagram.com/atv4ruedasgalipan?igsh=MTI4czExaGZyeGp3Nw==",
          "_blank",
          "noopener,noreferrer",
        )
      })
    }
  }
}

const handleAddToCart2 = (item, index, buttonRefs, addToCart) => {
  const buttonRef = buttonRefs.current[index]
  if (buttonRef) {
    const startRect = buttonRef.getBoundingClientRect()

    const floatingIcon = document.createElement("div")
    floatingIcon.className = "floating-icon"
    floatingIcon.style.position = "fixed"
    floatingIcon.style.left = `${startRect.left + startRect.width / 2 - 10}px`
    floatingIcon.style.top = `${startRect.top + startRect.height / 2 - 10}px`
    floatingIcon.style.zIndex = 1000

    const buttonIcon = buttonRef.querySelector("svg").cloneNode(true)
    buttonIcon.style.width = "20px"
    buttonIcon.style.height = "20px"
    buttonIcon.style.color = "white"
    floatingIcon.appendChild(buttonIcon)

    document.body.appendChild(floatingIcon)
    floatingIcon.animate(
      [
        { transform: "translateY(0)", opacity: 1 },
        { transform: "translateY(-1000px)", opacity: 0.2 },
      ],
      {
        duration: 800,
        easing: "ease-in-out",
      },
    ).onfinish = () => {
      document.body.removeChild(floatingIcon)
      addToCart(item)
    }
  }
}

