import React, {useState} from 'react'
import PlayNav from '../../Components/playNav'
import Footer from '../../Components/Footer'
import styled from 'styled-components'
import ProjectComponent from '../../Components/Project'
const images = require.context('../../images/food', false, /\.(jpg|jpeg|png|gif|svg)$/);


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
const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  background-color:rgb(98, 0, 255);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color:rgb(65, 24, 185);
  }
`;

const RecipeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px; /* Adjust this value for more or less spacing */
  width: 100%;
`;


const recipes = [
  {
    title: 'Char Siu Ribs',
    description: `My most recent recipe from The Woks of Life website, one of the three holy grail of asian cooking websites. 
      I've made this recipe a few times now and it's a hit every time. Always remember to use water in the pan when roasting
      and I like to use honey as a substitute for sugar and T&T char siu sauce instead of maltose.`,
    image: images('./csr.jpg'),
    url: 'https://thewoksoflife.com/oven-baked-ribs-char-siu/',
  },
  {
    title: 'Pad Gra Pow',
    description: `Also from The Woks of Life! Thai basil is a must, it's really what makes or breaks the dish. Literally tastes the same as Pai's Pad Gra Pao in Toronto.`,
    image: images('./pgp.jpg'),
    url: 'https://thewoksoflife.com/pad-gra-pao/',
  },
  {
    title: 'Shawarma Chicken',
    description: `My favourite recipe from Ethan Chlebowski, I've made this recipe a few times now. It's my go-to way to season chicken when I'm on the gym bro diet of chicken broccoli rice.
      Everything in the recipe sans the hot sauce is actually good. Instead of the hot sauce, I like to buy spicy garlic toum from Farm Boy if possible.`,
    image: images('./shawarma.jpg'),
    url: 'https://www.cookwell.com/recipe/street-cart-chicken-and-yellow-rice',
  },
  {
    title: 'Gyudon',
    description: `Easy and quick recipe from Just One Cookbook, I substitute the sake with more mirin and dashi with chicken stock. I like to add Thai chili peppers for a bit of spice and this is a quick and easy meal to make.`,
    image: images('./gyudon.jpg'),
    url: 'https://www.justonecookbook.com/gyudon/',
  },
  {
    title: 'Curry Udon',
    description: `Another classic from Just One Cookbook. I just use a single store bought curry cube per udon serving. Add a bit of chicken msg powder, and then add whatever vegetables I have in the fridge to make it a bit healthier.`,
    image: images('./curryudon.jpg'),
    url: 'https://www.justonecookbook.com/curry-udon/',
  },
  {
    title: 'Steak',
    description: 'I like to either reverse sear (with the Kenji Lopez Alt method) or double sear (following senpai kai) my steaks. I really enjoy using top sirlion from Costco and then just adding salt and black pepper. Enjoy with rice (yum) and some veggies maybe broccoli, asparagus, or brussel sprouts. If you are feeling fancy, you can make steak burritos/fajitas with a onion bell pepper stirfry, some cilantro lime rice, guac, and burrito sauce.',
    image: images('./steak.jpg'),
    url: 'https://www.youtube.com/watch?v=pO8TUuSv7HA',
  },
  {
    title: 'Spaghetti',
    description: 'Can make with homemade tomato sauce, or just use Raos (lol). I add some chili flakes, basil, and parm to really take it to the next level. I really like this recipe from a busy kitchen.',
    image: images('./spag.jpg'),
    url: 'https://abusykitchen.com/jar-sauce-that-taste-like-scratch-sauce/',
  },
  {
    title: 'Soy Braised Chicken',
    description: 'This one is pretty good for meal prepping and saving for later. I like to use rock sugar instead of sugar. Adding chili flakes because I like spice. Recipe actually from made with lau.',
    image: images('./sbc.jpg'),
    url: 'https://www.madewithlau.com/recipes/chicken-drumsticks',
  },
  {
    title: 'Chicken Katsu Curry',
    description: 'Would not recommend making this recipe, it is a lot of work (pounding the chicken and all). I like to use the curry roux blocks from the store and then just add some extra spices to make it taste better.',
    image: images('./katsucurry.jpg'),
    url: 'https://www.justonecookbook.com/chicken-katsu/',
  }
];


// 0


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
  const [randomRecipe, setRandomRecipe] = useState(null);

  const handleRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setRandomRecipe(recipes[randomIndex]);
  };
  return (
    <>
      <PlayNav />
      <Layout>
        <HeadingContainer>
          <h1>Recipes and Eats</h1>
        </HeadingContainer>
        <TextContainer>
          <Text>
            Recipe links with my own personal twist! My 3 goats for Asian cooking are The Woks of Life for Chinese, Maangchi for Korean, and Just One Cookbook for Japanese.
            For science-based cooking and other recipes I like to watch Ethan Chlebowski and Kenji Lopez Alt on YouTube.
          </Text>
        </TextContainer>

        <Button onClick={handleRandomRecipe}>Show Me a Random Recipe</Button>

        {randomRecipe && (
          <div>
            <h1>Random Recipe</h1>
            <ProjectComponent
              title={randomRecipe.title}
              description={randomRecipe.description}
              image={randomRecipe.image}
              url={randomRecipe.url}
            />
          </div>
        )}

        <div>
          <h1>All Recipes</h1>
          <RecipeList>
          {recipes.map((recipe, index) => (
            <ProjectComponent
              key={index}
              title={recipe.title}
              description={recipe.description}
              image={recipe.image}
              url={recipe.url}
            />
            
          ))}
          </RecipeList>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default Food