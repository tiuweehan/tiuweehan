declare module "netlify-cms-app" {
    function registerPreviewTemplate(
        name: string,
        component:
            | (({
                  entry,
                  getAsset,
              }: {
                  entry: any
                  getAsset: any
              }) => JSX.Element)
            | (({
                  entry,
                  widgetFor,
              }: {
                  entry: any
                  widgetFor: any
              }) => JSX.Element)
    ): void
    function registerMediaLibrary(mediaLibrary: { name: string }): void
}

declare module "netlify-cms-media-library-cloudinary" {
    export default {
        name: string,
    }
}

declare module "netlify-cms-media-library-uploadcare" {
    export default {
        name: string,
    }
}

type PreviewProps = {
    entry: {
        getIn: (value: string[]) => any
    }
    widgetFor: (value: string) => any
}

/* eslint-disable */
type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends object ? RecursivePartial<T[P]> :
            T[P];
};
/* eslint-enable*/
