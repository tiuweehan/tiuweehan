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

export const renderImage = (image: ImageFields) => {
    // PNG, JPG
    if (image.childImageSharp) {
        return image.childImageSharp.fluid.src
    }

    if (image.extension === "svg") {
        return image.publicURL
    }

    return ""
}
