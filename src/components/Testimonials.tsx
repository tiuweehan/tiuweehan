import { v4 } from "uuid"
import React from "react"

interface PropType {
    testimonials: Array<{
        quote?: string
        author?: string
    }>
}

const Testimonials: React.FC<PropType> = ({ testimonials }) => (
    <div>
        {testimonials.map((testimonial) => (
            <article key={v4()} className="message">
                <div className="message-body">
                    {testimonial.quote}
                    <br />
                    <cite> – {testimonial.author}</cite>
                </div>
            </article>
        ))}
    </div>
)

export default Testimonials
