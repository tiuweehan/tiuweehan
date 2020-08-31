import React from "react"

import "./SwiperCard.scss"
import "swiper/swiper-bundle.min.css"
import { MarkdownContent } from "./Content"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

interface SwiperCardProps {
    contents: string[]
}

const SwiperCard: React.FC<SwiperCardProps> = ({ contents }) => {
    const pagination =
        contents.length > 1
            ? {
                  clickable: true,
                  dynamicBullets: true,
              }
            : false

    return (
        <Swiper
            spaceBetween={280}
            slidesPerView={1}
            // navigation
            pagination={pagination}
        >
            {contents.map((content, index) => (
                <SwiperSlide key={index}>
                    {({ isActive }: any) => (
                        <div
                            style={{
                                height: "150px",
                                width: "230px",
                                padding: "10px 25px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <MarkdownContent content={content} />
                        </div>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperCard
