import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import Script from 'next/script'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {

  // Next Page management
  const router = useRouter()

  // Meal rest api management
  const [isLoading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  let getMeals = async (e) => {
    try {
      const response = await axios.get('https://my-ez-meal.herokuapp.com/api/post/readMeals.php', {
        headers: { 'Content-Type': 'application/json' },
      });

      // // Async logic when data is received
      // async function populateDataArray() {
      //   const meals = await response.data
      //   setLoading(false)
      //   setData(meals)
      //   console.log(data)
      //   // Get a random meal from the array for display
      //   setRandomMealNumber(Math.floor(Math.random() * meals.length))
      //   console.log(randomMealNumber)
      // }
      // populateDataArray()
      const meals = await response.data
      setLoading(false)
      setData(meals)
      // console.log(data)
      // Get a random meal from the array for display
      setRandomMealNumber(Math.floor(Math.random() * meals.length))
      // console.log(randomMealNumber)

    } catch (e) {
      console.log(e)
    }
  }

  // On page load
  useEffect(() => {
    setLoading(true)
    getMeals()

  }, [setData])

  // PLAT AU HASARD LOGIC START
  const [randomMealNumber, setRandomMealNumber] = useState(0)
  let randomMealDiceRoll = () => {
    setRandomMealNumber(Math.floor(Math.random() * data.length))
    isOpen ? setIsOpen(false) : setIsOpen(true)
  }
  // PLAT AU HASARD LOGIC END

  // FRAMER MOTION ANIMATION START
  // Deactivated button pulsation
  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px #FED785",
      boxShadow: "0px 0px 8px #FED785",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      }
    }
  }

  // Container apparition
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1, duration: 1.5 }
    },
    exit: {
      x: "-100vh",
      transition: { ease: 'easeInOut' }
    }
  };

  // spin
  const [isOpen, setIsOpen] = useState(false)
  const spinVariants = {
    // hover: {
    //   rotate: 360,
    // }
    open: {
      rotate: 360,
    },
    closed: {
      // rotate: 360,
    },
  }
  // FRAMER MOTION ANIMATION END

  // RENDER
  return (
    <AnimatePresence>
      <motion.section
        key={router.route}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Script>

        </Script>
        <Head>
          <title>EZ Meal | Accueil</title>
          <meta name='keywords' content='Repas'></meta>
        </Head>
        <article className='text-left px-4 md:px-0 grid gap-4 grid-cols-1 lg:grid-cols-2 mt-10 lg:mb-6'>
          {/* CALL TO ACTION START */}
          <div className='w-10/12 flex flex-col justify-between'>
            <h1 className='text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-6 lg:mb-10'>PAS D’IDÉE DE REPAS ?</h1>

            <h2 className='text-2xl md:text-4xl lg:text-6xl uppercase font-light md:mb-6 lg:mb-10'>Choisissez au hasard ou selon votre humeur !</h2>

            <div className='w-full flex justify-center md:justify-start'>
              <motion.button
                // variants={buttonVariants}
                // whileHover="hover"
                className='px-8 py-4 bg-theme text-theme-yellow font-bold mt-4 flex items-center space-x-3 rounded-3xl'
                onClick={randomMealDiceRoll}>
                <span className='uppercase bold mt-2'>Plat au hasard</span>
                <div className='place-self-start'>
                  <motion.svg
                    variants={spinVariants}
                    animate={isOpen ? "open" : "closed"}
                    width="43" height="44" viewBox="0 0 43 44" fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M37.4131 20.9747C37.4401 22.2795 36.4011 23.3577 35.0964 23.3792L23.86 23.5651C25.1374 23.5502 26.2381 24.6232 26.244 25.9299C26.2496 27.1218 25.2764 28.0345 24.0901 28.0482L22.5688 28.0661C24.0506 28.0488 25.2949 29.4962 24.8677 31.0729C24.5711 32.1674 23.5565 32.8786 22.411 32.8919L20.7513 32.9114C21.9794 32.8969 23.0443 33.8889 23.1298 35.1264L23.13 35.1304C23.2233 36.4797 22.2113 37.5863 20.8702 37.6021L14.6264 37.675C10.2073 37.7266 6.37623 34.1643 6.06955 29.7182L5.72061 24.6644C5.48094 21.193 7.48013 18.0867 10.6806 16.9577C12.9835 16.1885 14.6548 14.8493 15.9497 12.8066C16.3537 12.1482 17.0641 11.75 17.8513 11.7407C19.7409 11.7188 21.0368 13.8076 20.1444 15.4375L17.8774 18.9468L19.0183 18.9335L35.0182 18.6668C36.3156 18.6454 37.3863 19.677 37.4132 20.9744L37.4131 20.9747Z" fill="#FED785" />
                    <path d="M26.8322 10.2262L31.1863 5.571L32.8643 7.14052L28.5102 11.7957L26.8322 10.2262Z" fill="#FED785" />
                    <path d="M29.155 12.8962L34.9619 12.6655L35.053 14.9614L29.2461 15.1921L29.155 12.8962Z" fill="#FED785" />
                    <path d="M23.0354 4.10735L25.3308 4.00819L25.5776 9.72547L23.2821 9.82462L23.0354 4.10735Z" fill="#FED785" />
                  </motion.svg>

                </div>
              </motion.button>
            </div>
          </div>
          {/* CALL TO ACTION END */}

          {/* MEAL CARD BIG START */}
          <div className='text-left flex flex-col justify-between'>
            {isLoading
              ? <p>Loading...</p>
              : data !== null
                ? (
                  <div className='min-h-[20rem] md:min-h-[40rem] lg:min-h-full h-full grid content-end relative overflow-hidden'>
                      <img
                        src={`https://my-ez-meal.herokuapp.com/upload/images/${data[randomMealNumber].image}`}
                        alt={data[randomMealNumber].title}
                        className="absolute inset-0 -z-10 rounded-lg opacity-80 min-h-full"
                      />
                    <Link href={`/meals/${data[randomMealNumber].title}`}>
                      <a className='relative foodcardtext text-theme-white px-6 py-10 md:py-20'>
                        <h5 className="mb-2 text-2xl font-bold uppercase">{data[randomMealNumber].title}</h5>
                        <p className="mb-3 font-normal">{data[randomMealNumber].body.slice(0, 150)}...</p>
                      </a>
                    </Link>
                  </div>
                )
                : <p>Not yet</p>
            }
          </div>
          {/* MEAL CARD BIG END */}
        </article>
      </motion.section>
    </AnimatePresence>

  )
}
