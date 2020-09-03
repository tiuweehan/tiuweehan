import { IPageProps } from "../../../types/location-types"
import { navigate } from "gatsby-link"
import Layout from "../../components/Layout"
import React, { useState } from "react"

const encode = (data: any) => {
    const formData = new FormData()

    for (const key of Object.keys(data)) {
        formData.append(key, data[key])
    }

    return formData
}

const Contact: React.FC<IPageProps> = ({ location }) => {
    const [state, setState] = useState<any>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ [e.target.name]: e.target.value })
    }

    const handleAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ [e.target.name]: e.target.files?.[0] })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        fetch("/", {
            method: "POST",
            body: encode({
                "form-name": form.getAttribute("name"),
                ...state,
            }),
        })
            .then(() => navigate(form.getAttribute("action")!))
            .catch((error) => alert(error))
    }

    return (
        <Layout location={location}>
            <section className="section">
                <div className="container">
                    <div className="content">
                        <h1>File Upload</h1>
                        <form
                            name="file-upload"
                            method="post"
                            action="/contact/thanks/"
                            data-netlify="true"
                            data-netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                        >
                            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                            <input
                                type="hidden"
                                name="form-name"
                                value="file-upload"
                            />
                            <div hidden>
                                <label>
                                    Don’t fill this out:{" "}
                                    <input
                                        name="bot-field"
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div className="field">
                                <label className="label" htmlFor={"name"}>
                                    Your name
                                </label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type={"text"}
                                        name={"name"}
                                        onChange={handleChange}
                                        id={"name"}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className="file">
                                    <label className="file-label">
                                        <input
                                            className="file-input"
                                            type="file"
                                            name="attachment"
                                            onChange={handleAttachment}
                                        />
                                        <span className="file-cta">
                                            <span className="file-label">
                                                Choose a file…
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="field">
                                <button
                                    className="button is-link"
                                    type="submit"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Contact
