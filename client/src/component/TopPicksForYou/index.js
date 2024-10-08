import React from 'react';
import { Link } from 'react-router-dom';

const TopPicksForYou = () => {
    const topPicks = [
        { id: 1, name: 'Sale', image: 'https://www.thekbsupply.com/cdn/shop/files/default_name.webp?v=1709949820&width=160', link: '' },
        { id: 2, name: 'Bedroom', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/8.png?v=1726054837&width=2048', link: 'link_to_product_2' },
        { id: 3, name: 'Workspace', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/5_bd369aa8-898d-4598-b457-859d883fb633.png?v=1726054905&width=2048', link: 'link_to_product_3' },
        { id: 4, name: 'Dining Room', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/3_79cae98a-548c-480f-aacb-b029e685c83c.png?v=1726054965&width=2048', link: 'link_to_product_4' },
        { id: 5, name: 'Bathroom', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/6.png?v=1726055055&width=2048', link: 'link_to_product_5' },
        { id: 6, name: 'Living Room', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/2_31b2b594-3d4f-4561-8cea-256dd155ad72.png?v=1726055163&width=2048', link: 'link_to_product_6' },
        { id: 7, name: 'Cavinets', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/9.png?v=1726055103&width=2048', link: 'link_to_product_7' },
        { id: 8, name: 'Outdoor', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/4_7862ace2-5a22-4ffd-b196-ca16349a7a0a.png?v=1726055346&width=2048', link: 'link_to_product_8' },
        { id: 9, name: 'Decor', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/10.png?v=1726055240&width=2048', link: 'link_to_product_9' },
        { id: 10, name: 'Lighting', image: 'https://cdn.shopify.com/s/files/1/0563/7406/7311/files/imgpsh_fullsize_anim_e651a1c0-a60d-4b09-98f9-a622b3ab6a13.png?v=1726051114&width=2048', link: 'link_to_product_10' },
    ];

    return (
        <>
            <div className='text-center mb-10'>
                <h1 className='text-[3vw] text-black font-bold '>Top Picks For You</h1>
            </div>
        <div className="grid md:px-32 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
            {topPicks.map(pick => (
                <Link to={pick.link} key={pick.id}>
                    <div className="p-1 flex flex-col items-center text-center">
                        <img src={pick.image} alt={pick.name} className="w-36 h-36 object-cover" />
                        <h3 className="text-center mt-2">{pick.name}</h3>
                    </div>
                </Link>
            ))}
            </div>
        </>
    );
}

export default TopPicksForYou;
