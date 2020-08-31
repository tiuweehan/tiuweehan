import React from "react"

import "./SwiperCard.scss"
import "swiper/components/navigation/navigation.scss"
import "swiper/components/pagination/pagination.scss"
import "swiper/swiper.scss"
import { MarkdownContent } from "./Content"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper"

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const SwiperCard: React.FC = () => {
    return (
        <Swiper
            spaceBetween={200}
            slidesPerView={1}
            // navigation
            pagination={{
                clickable: true,
                dynamicBullets: true,
            }}
        >
            {[1, 2, 3].map((x) => (
                <SwiperSlide key={x}>
                    {({ isActive }: any) => (
                        <div
                            style={{
                                height: "150px",
                                width: "280px",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <MarkdownContent content={"# Hello World"} />
                        </div>
                    )}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default SwiperCard
