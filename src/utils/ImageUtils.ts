interface ImageFields {
    childImageSharp?:
        | {
              fluid: {
                  src: string
              }
          }
        | any
    extension: string
    publicURL: string
}

type Image = ImageFields | string

export const renderImage = (image: Image) => {
    // Netlify CMS
    if (typeof image === "string") {
        return image
    }

    if (!image) {
        return ""
    }

    // PNG, JPG
    if (image.childImageSharp) {
        return image.childImageSharp.fluid.src
    }

    if (image.extension === "svg") {
        return image.publicURL
    }

    return ""
}
