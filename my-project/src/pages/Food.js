import React from 'react'
import TopNav from '../Components/topnav'
import Footer from '../Components/Footer'
import styled from 'styled-components'
import ProjectComponent from '../Components/Project'
import csr from '../images/csr.jpg'
import pgp from '../images/pgp.jpg'
import shawarma from '../images/shawarma.jpg'



const Layout = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  margin: auto;
  align-items: center;
  padding: 50px 20px;
  gap: 50px;

  @media (max-width: 768px) {
    max-width: 500px;
  }
`;

const HeadingContainer = styled.div`
  padding: 40px 0;
`;

const TextContainer = styled.div`
  grid-column: span 2;
`

const Text = styled.p`
  font-size: 1.8rem;
  line-height: 2.8rem;
  overflow: auto;
`
// 0
const CharSiuRibs  = 
`My most recent recipe from The Woks of Life website, one of the three holy grail of asian cooking websites. 
 I've made this recipe a few times now and it's a hit every time. Always remember to use water in the pan when roasting
 and I like to use honey as a substitue for sugar and t&t char siu sauce instead of maltose.`;

const PadGraPow =
`Also from The Woks of Life! Thai basil is a must, it's really what makes or breaks the dish. Literally tastes the same as Pai's Pad gra Pao in Toronto.`;

const Shawarma =
`
My favourite recipe from Ethan Chlebowski, I've made this recipe a few times now, it my go to way to season chicken when I'm on the gym bro diet of chicken broccoli rice.
Every in the recipe sans the hot sauce is actually good. Instead of the hot sauce, I like to buy spicy garlic toum from Farm Boy if possible.
`

const Gyudon =
`
Easy and quick recipe from Just one Cookbook, I substitute the sake with more mirin and dashi with chicken stock. I like to add thai chili peppers for a bit of spice and this is a quick and easy meal to make.
`

const curryUdon =
`

`
// 5
const Steak =
`

`

const Spaghetti =
`

`

const Jeyuk =
`

`

const Salmon =
`

`

const SausageFest =
`

`
// 10

const LemongrassChicken =
`
`

const SoonDubu =
`

`

const PopcornChicken =
`
`

const JapaneseCurryKatsu =
`

`

const ButterChicken =
`

`

//15 

const Burritos =
`
`

const BirriaTacos =
``

const ChineseVeggies =
``

const HongShaoRou =
``

const BraisedSoySauceChicken =
`
`

// 20

const MapoTofu =
`
`

const HoneyButterChicken =
`
`

const GochujangChicken =
`
`


function Food() {
  return (
    <>
    <TopNav />
    <Layout>
        <HeadingContainer>
          <h1>Recipes and Eats</h1>
        </HeadingContainer>
        <TextContainer>
          <Text>
            Recipe links with my own personal twist! My 3 goats for asian cooking are The Woks of Life for Chinese, Maangchi for Korean, and Just One Cookbook for Japanese.
            For science based cooking and other recipes I liked to watch Ethan Chlebowski and Kenji Lopez Alt on Youtube.
          </Text>
        </TextContainer>

        <ProjectComponent
          title="Char Siu Ribs"
          description = {CharSiuRibs}
          image = {csr}
          url = "https://thewoksoflife.com/oven-baked-ribs-char-siu/"
          />
        <ProjectComponent
          title="Char Siu Ribs"
          description = {PadGraPow}
          image = {pgp}
          url = "https://thewoksoflife.com/oven-baked-ribs-char-siu/"
          />
        <ProjectComponent
          title="Shawarma Chicken"
          description = {Shawarma}
          image = {shawarma}
          url = "https://www.cookwell.com/recipe/street-cart-chicken-and-yellow-rice"
        />
        

      </Layout>
    <Footer />
    </>
  )
}

export default Food