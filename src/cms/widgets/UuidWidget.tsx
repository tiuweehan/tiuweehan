import { v4 } from "uuid"
import React, { useEffect } from "react"

interface UuidControlProps {
    value: string
    classNameWrapper: string
    onChange: (value: string) => void
}

const UuidControl: React.FC<UuidControlProps> = (props) => {
    useEffect(() => {
        const newValue = props.value ? props.value : v4()
        props.onChange(newValue)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value.trim())
    }

    return (
        <input
            type={"text"}
            disabled={true}
            value={props.value}
            onChange={handleChange}
            className={props.classNameWrapper}
        />
    )
}

interface UuidPreviewProps {
    value: string
}

const UuidPreview: React.FC<UuidPreviewProps> = ({ value }) => {
    return <p>{value}</p>
}

export default { UuidControl, UuidPreview }
