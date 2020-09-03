import { IPageProps } from "../../../types/location-types"
import BlogRoll from "../../components/BlogRoll"
import Layout from "../../components/Layout"
import React, { useEffect, useRef } from "react"

class ClassicalNoise {
    grad3: number[][]
    p: number[]
    perm: number[]

    constructor(r: Math | undefined) {
        // Classic Perlin noise in 3D, for comparison
        if (r == undefined) r = Math
        this.grad3 = [
            [1, 1, 0],
            [-1, 1, 0],
            [1, -1, 0],
            [-1, -1, 0],
            [1, 0, 1],
            [-1, 0, 1],
            [1, 0, -1],
            [-1, 0, -1],
            [0, 1, 1],
            [0, -1, 1],
            [0, 1, -1],
            [0, -1, -1],
        ]
        this.p = []
        for (let i = 0; i < 256; i++) {
            this.p[i] = Math.floor(r.random() * 256)
        }
        // To remove the need for index wrapping, double the permutation table length
        this.perm = []
        for (let i = 0; i < 512; i++) {
            this.perm[i] = this.p[i & 255]
        }
    }

    dot(g: number[], x: number, y: number, z: number) {
        return g[0] * x + g[1] * y + g[2] * z
    }

    mix(a: number, b: number, t: number) {
        return (1.0 - t) * a + t * b
    }

    fade(t: number) {
        return t * t * t * (t * (t * 6.0 - 15.0) + 10.0)
    }

    // Classic Perlin noise, 3D version
    noise(x: number, y: number, z: number) {
        // Find unit grid cell containing point
        let X = Math.floor(x)
        let Y = Math.floor(y)
        let Z = Math.floor(z)

        // Get relative xyz coordinates of point within that cell
        x = x - X
        y = y - Y
        z = z - Z

        // Wrap the integer cells at 255 (smaller integer period can be introduced here)
        X = X & 255
        Y = Y & 255
        Z = Z & 255

        // Calculate a set of eight hashed gradient indices
        let gi000 = this.perm[X + this.perm[Y + this.perm[Z]]] % 12
        let gi001 = this.perm[X + this.perm[Y + this.perm[Z + 1]]] % 12
        let gi010 = this.perm[X + this.perm[Y + 1 + this.perm[Z]]] % 12
        let gi011 = this.perm[X + this.perm[Y + 1 + this.perm[Z + 1]]] % 12
        let gi100 = this.perm[X + 1 + this.perm[Y + this.perm[Z]]] % 12
        let gi101 = this.perm[X + 1 + this.perm[Y + this.perm[Z + 1]]] % 12
        let gi110 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z]]] % 12
        let gi111 = this.perm[X + 1 + this.perm[Y + 1 + this.perm[Z + 1]]] % 12

        // The gradients of each corner are now:
        // g000 = grad3[gi000];
        // g001 = grad3[gi001];
        // g010 = grad3[gi010];
        // g011 = grad3[gi011];
        // g100 = grad3[gi100];
        // g101 = grad3[gi101];
        // g110 = grad3[gi110];
        // g111 = grad3[gi111];
        // Calculate noise contributions from each of the eight corners
        let n000 = this.dot(this.grad3[gi000], x, y, z)
        let n100 = this.dot(this.grad3[gi100], x - 1, y, z)
        let n010 = this.dot(this.grad3[gi010], x, y - 1, z)
        let n110 = this.dot(this.grad3[gi110], x - 1, y - 1, z)
        let n001 = this.dot(this.grad3[gi001], x, y, z - 1)
        let n101 = this.dot(this.grad3[gi101], x - 1, y, z - 1)
        let n011 = this.dot(this.grad3[gi011], x, y - 1, z - 1)
        let n111 = this.dot(this.grad3[gi111], x - 1, y - 1, z - 1)
        // Compute the fade curve value for each of x, y, z
        let u = this.fade(x)
        let v = this.fade(y)
        let w = this.fade(z)
        // Interpolate along x the contributions from each of the corners
        let nx00 = this.mix(n000, n100, u)
        let nx01 = this.mix(n001, n101, u)
        let nx10 = this.mix(n010, n110, u)
        let nx11 = this.mix(n011, n111, u)
        // Interpolate the four results along y
        let nxy0 = this.mix(nx00, nx10, v)
        let nxy1 = this.mix(nx01, nx11, v)
        // Interpolate the two last results along z
        let nxyz = this.mix(nxy0, nxy1, w)

        return nxyz
    }
}

const BlogPage: React.FC<IPageProps> = ({ location }) => {
    const canvasEl = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasEl.current!,
            ctx = canvas.getContext("2d")!,
            perlin = new ClassicalNoise(undefined),
            variation = 0.0025,
            amp = 300,
            variators: number[] = [],
            max_lines =
                navigator.userAgent.toLowerCase().indexOf("firefox") > -1
                    ? 25
                    : 40

        let canvasWidth = 0,
            canvasHeight = 0,
            start_y = 0

        for (let i = 0, u = 0; i < max_lines; i++, u += 0.02) {
            variators[i] = u
        }

        const resizeCanvas = () => {
            canvasWidth = document.documentElement.clientWidth
            canvasHeight = 400

            canvas.setAttribute("width", `${canvasWidth}`)
            canvas.setAttribute("height", `${canvasHeight}`)

            start_y = canvasHeight / 2
        }

        const draw = () => {
            ctx.shadowColor = "rgba(43, 205, 255, 1)"
            ctx.shadowBlur = 0

            for (let i = 0; i <= max_lines; i++) {
                ctx.beginPath()
                ctx.moveTo(0, start_y)
                let y = 0
                for (let x = 0; x <= canvasWidth; x++) {
                    y = perlin.noise(
                        x * variation + variators[i],
                        x * variation,
                        0
                    )
                    ctx.lineTo(x, start_y + amp * y)
                }
                let alpha = Math.min(Math.abs(y) + 0.05, 0.05)
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`
                ctx.stroke()
                ctx.closePath()

                variators[i] += 0.005
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            draw()
            requestAnimationFrame(animate)
        }

        resizeCanvas()
        animate()
        window.addEventListener("resize", resizeCanvas)
        return () => window.removeEventListener("resize", resizeCanvas)
    }, [])
    return (
        <Layout location={location}>
            {/*<div*/}
            {/*    className="full-width-image-container margin-top-0"*/}
            {/*    style={{*/}
            {/*        backgroundImage: `url('/img/blog-index.jpg')`,*/}
            {/*    }}*/}
            {/*>*/}

            {/*</div>*/}
            <div
                style={{
                    position: "absolute",
                    height: "400px",
                    width: "100%",
                    margin: 0,
                    background: "transparent",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2
                    className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                    style={{
                        backgroundColor: "transparent",
                        color: "white",
                        lineHeight: "1",
                        padding: "0.25em",
                        marginBottom: "10px",
                    }}
                >
                    <span
                        style={{
                            background:
                                "-webkit-linear-gradient(white, #38495a)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontFamily: "lato, sans-serif",
                            fontWeight: 500,
                            fontSize: "50px",
                            letterSpacing: "1px",
                        }}
                    >
                        Blog Posts
                    </span>
                </h2>
            </div>
            <div
                style={{
                    height: "400px",
                    width: "100%",
                    margin: 0,
                    background:
                        "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
                    overflow: "hidden",
                }}
            >
                <canvas
                    style={{
                        zIndex: 0,
                    }}
                    ref={canvasEl}
                />
            </div>
            <section className="section">
                <div className="container">
                    <div className="content">
                        <BlogRoll />
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default BlogPage
