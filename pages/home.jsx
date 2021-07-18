import Image from "next/image";
import carrotImage from "../images/Group.png";
import moduleCss from "../styles/home.module.css";
import NavBar from "../components/NavBar"
import SearchBox from "../components/SearchBox";

const home = () => {
    const parameters = { name: "", categories: "", brand: "", price: "", productDetail: "", nutritions: "", review: "" }
    // beverages * 6
    // eggs * 6
    // fruits * 5
    // meats * 2
    // filterCategories * 4
    // filterBrand * 4
    // FindProductsCategories * 6
    // function fetchData() {
    //     const res = axios.get(
    //       "http://localhost:3000/api/product"
    //     );
    //     console.log(res.data)
    // }

    return (
        <div>
            <div className={moduleCss.container}>
                <div className={moduleCss.image}>
                    <Image src={carrotImage} width="20vw" height="25vh"></Image>
                </div>
                location with icon<br />
                <SearchBox/>
                discount promotion panel<br />
                <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Exclusive Offer </div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
                <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Best Selling</div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
                <div className={moduleCss.subtitleRows}><div className={moduleCss.subtitles}>Goceries</div><div className={moduleCss.seeAll}>See all</div></div><div>products</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, quibusdam provident libero qui eum nostrum illo veniam earum a beatae tenetur explicabo rerum perferendis minus ducimus quo voluptatibus amet aperiam.
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci eaque veritatis et recusandae quam corrupti tenetur illo tempora cumque quasi! Ad suscipit quasi magnam magni qui at officiis laboriosam harum!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab hic quisquam sequi dolor alias mollitia molestias? Eligendi, aut tempora soluta nobis nisi cumque? Reprehenderit deserunt rem recusandae. Culpa, minima cum.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias ad illo esse molestiae ipsam! Magni, nam? Ducimus, laudantium. Laboriosam, ipsam voluptatum? Sequi quos eveniet perferendis quidem minima. Quidem, vel illo!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus optio aliquam odio, minima culpa aperiam voluptatem repudiandae provident ullam molestias quas, itaque vel mollitia dolorem? Consectetur ratione dolor dignissimos at!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, sunt dolorem. Officiis id vitae minima, quo eveniet quia distinctio facere saepe, quasi ducimus error sequi dolor, reiciendis quaerat dolores vero.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe nobis atque exercitationem? Impedit ratione harum quis, nulla dolore deserunt sunt voluptate ipsum amet repellat in mollitia dolorum necessitatibus ullam sint!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis quas repudiandae molestiae at non corrupti suscipit quam, nobis maxime dicta voluptate odit expedita ea excepturi vitae temporibus consequatur ullam ad.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla quod nobis aut praesentium excepturi, esse veritatis tempora debitis ad nostrum ipsum vel, tenetur hic in quibusdam, assumenda id odio eos!
            </div>
            <NavBar/>
        </div>
    )
}

export default home
