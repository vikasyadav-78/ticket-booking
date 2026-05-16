"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BookingFlowLeft({
    place,
    itemVariants,
}) {

    const [showFullText, setShowFullText] = useState(false);
    // let dis = Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sunt incidunt distinctio? Eius, iusto deleniti. Ducimus facilis distinctio quia velit laboriosam, fuga sit magnam tempore esse quisquam explicabo ratione in nulla praesentium odio est molestiae inventore repellat dolor. Consequuntur officia modi dicta ea vitae iste suscipit saepe possimus illo architecto quam qui incidunt dolorum quasi voluptatibus ratione, eaque eligendi dolores impedit quibusdam in? Eum, omnis voluptatem iure aliquam tenetur tempora labore quibusdam qui, numquam, illum ad fugit! Quam harum quidem ullam, rerum maxime velit iusto ipsam perspiciatis saepe eveniet quas veritatis officia excepturi unde! Dolores sunt numquam quia necessitatibus. Illum quisquam, illo harum, est, reprehenderit quam itaque culpa necessitatibus saepe cumque aut voluptas nam adipisci sapiente mollitia sint. Dolore, exercitationem in. Corporis, explicabo qui modi eos quidem nihil vel repudiandae laudantium doloremque dicta sint iste tenetur quae, doloribus assumenda quaerat sequi delectus dolor excepturi. Esse, reprehenderit! Aliquid nulla aut omnis repellendus laudantium quos harum est minima. Iusto nisi pariatur earum ipsum ipsam recusandae cum quaerat culpa ut, nihil dicta dolore autem delectus sed architecto commodi quia unde nemo ducimus voluptate temporibus, harum molestiae vitae rem! Qui quia cum odio corrupti, inventore, ratione laudantium incidunt recusandae enim maxime unde magni libero, laboriosam et earum velit iusto? Nulla at voluptatibus maxime nobis. Voluptas laudantium, vitae adipisci, ad ullam culpa quos deleniti quia necessitatibus suscipit ratione doloremque qui placeat a molestias repudiandae, corporis temporibus iste sit tenetur. Enim quaerat reiciendis magnam consequuntur quis ex, porro sunt vitae et perspiciatis aut, repellendus rem doloribus placeat similique dolor reprehenderit eligendi minus at ab necessitatibus omnis amet itaque. Debitis iusto et molestias incidunt similique ab numquam aspernatur officia. Maiores corrupti quae alias rem vel mollitia repellat itaque veniam, deleniti quia expedita repellendus consectetur eveniet quibusdam aliquid, iste animi id dicta perferendis magnam. Temporibus quos tempora aperiam!
    return (

        <motion.section
            className="hidden p-10 lg:flex w-1/2 sticky top-0 h-full bg-gradient-to-b from-royal-blue to-[#071633] flex-col items-center justify-between overflow-hidden select-none min-h-0 relative border-r border-gold/10"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.6,
            }}
        >

            {/* BACKGROUND */}
            <div className="absolute inset-0 opacity-[0.12] bg-mandala pointer-events-none scale-105"></div>

            {/* DECORATIVE */}
            <div className="absolute top-4 left-6 text-gold/20 font-serif text-xl select-none">

                ✦

            </div>

            <div className="absolute top-4 right-6 text-gold/20 font-serif text-xl select-none">

                ✦

            </div>

            {/* BADGE */}
            <motion.div
                variants={itemVariants}
                className="mb-2 border-2 border-gold/25 px-5 py-2 text-center bg-[#071633]/50 backdrop-blur-xl rounded-xl max-w-full shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
            >

                <p className="text-[9px] tracking-[5px] text-gold uppercase font-bold mb-0.5">

                    {place?.name ? "Heritage Monument" : ""}

                </p>

                <p className="text-white text-base font-serif tracking-wide truncate max-w-[280px]">

                    {place?.location}

                </p>

            </motion.div>

            {/* CONTENT */}
            <div className="text-center z-10 max-w-[480px] w-full shrink-0 my-auto flex flex-col items-center">

                <motion.h1
                    variants={itemVariants}
                    className="text-white font-serif text-3xl xl:text-4xl leading-tight font-normal tracking-wide"
                >

                    Welcome to <br />

                    <span className="bg-gradient-to-r from-gold via-jaipur-pink to-gold bg-clip-text text-transparent font-medium drop-shadow-sm inline-block mt-1">

                        {place?.name}

                    </span>

                </motion.h1>

                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/40 to-transparent my-3" />

                {/* DESCRIPTION */}
                <div className="px-4 mt-2 max-w-full overflow-hidden">

                    <motion.p
                        variants={itemVariants}
                        className={` text-sandstone/80 text-xs xl:text-sm font-light leading-relaxed italic break-words whitespace-normal transition-all duration-500 overflow-hidden ${showFullText ? "" : "line-clamp-2"} `}
                    >
                        "{place?.shortDescription}"
                    </motion.p>

                </div>

            </div>

            {/* IMAGE */}
            <motion.div
                className="w-full max-w-[360px] h-full max-h-[26vh] xl:max-h-[29vh] p-1.5 bg-sandstone/5 backdrop-blur-md rounded-[24px] border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] shrink-0 min-h-0 flex items-center justify-center relative overflow-hidden"
                variants={itemVariants}
                whileHover={{
                    scale: 1.02,
                    borderColor: "rgba(212,175,55,0.4)",
                }}
            >

                <Image
                    width={450}
                    height={320}
                    priority
                    alt={place?.name || "Place Image"}
                    className="w-full h-full object-cover rounded-[18px]"
                    src={
                        Array.isArray(place?.images) &&
                            place.images.length > 0
                            ? place.images[0]
                            : "/images/hawaMahal.png"
                    }
                />

            </motion.div>

        </motion.section>
    );
}