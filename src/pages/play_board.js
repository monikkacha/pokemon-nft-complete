import { useEffect, useRef, useState } from "react";
import CardWonDialog from "../component/card_won_dialog";
import { ethers, utils } from "ethers";
import PokemonToken from '../abi/PokemonToken.json'
import PokemonCatchingDialog from "../component/pokemon_catch_dialog";
import { useStateIfMounted } from "use-state-if-mounted";
import axios from "axios";
import PokeBallDialog from "../component/pokeball_dialog";
// import BeepSound from "../../public/"

const PlayBoard = () => {
    const CARD_ARRAY = [
        {
            name: "Bulbasaur",
            img: "/pokemon/bulbasaur.png",
            stamina: 60,
            power: 80,
            attack: 70,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205111f8e336ffd45ef09a0",
            id: 0
        },
        {
            name: "Charmander",
            img: "/pokemon/charmander.png",
            stamina: 40,
            power: 95,
            attack: 80,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/620511608e336ffd45ef09a3",
            id: 1
        },
        {
            name: "Gengar",
            img: "/pokemon/gengar.png",
            stamina: 100,
            power: 60,
            attack: 60,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205121b8e336ffd45ef09a6",
            id: 2
        },
        {
            name: "Golem",
            img: "/pokemon/golem.png",
            stamina: 30,
            power: 70,
            attack: 60,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/62077a5e381dda6c79f24fb9",
            id: 3
        },
        {
            name: "Pikachu",
            img: "/pokemon/pikachu.png",
            stamina: 90,
            power: 60,
            attack: 70,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/620510cb8e336ffd45ef099d",
            id: 4
        },
        {
            name: "Squirtal",
            img: "/pokemon/squirtal.png",
            stamina: 70,
            power: 50,
            attack: 80,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205128e8e336ffd45ef09a9",
            id: 5
        },
        {
            name: "Bulbasaur",
            img: "/pokemon/bulbasaur.png",
            stamina: 60,
            power: 80,
            attack: 70,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205111f8e336ffd45ef09a0",
            id: 6
        },
        {
            name: "Charmander",
            img: "/pokemon/charmander.png",
            stamina: 40,
            power: 95,
            attack: 80,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/620511608e336ffd45ef09a3",
            id: 7
        },
        {
            name: "Gengar",
            img: "/pokemon/gengar.png",
            stamina: 100,
            power: 60,
            attack: 60,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205121b8e336ffd45ef09a6",
            id: 8
        },
        {
            name: "Golem",
            img: "/pokemon/golem.png",
            stamina: 30,
            power: 70,
            attack: 60,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/62077a5e381dda6c79f24fb9",
            id: 9
        },
        {
            name: "Pikachu",
            img: "/pokemon/pikachu.png",
            stamina: 90,
            power: 60,
            attack: 70,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/620510cb8e336ffd45ef099d",
            id: 10
        },
        {
            name: "Squirtal",
            img: "/pokemon/squirtal.png",
            stamina: 70,
            power: 50,
            attack: 80,
            tokenURI: "https://nft-marketplace-monik.herokuapp.com/nft/6205128e8e336ffd45ef09a9",
            id: 11
        },
    ];

    const [cardArray, setCardArray] = useState(CARD_ARRAY.sort(() => 0.5 - Math.random()))
    const [isPokebacllColorRed, setIsPokeballColorRed] = useStateIfMounted(true);
    const [cardChoosenId, setCardChoosenId] = useStateIfMounted([])
    const [cardWonId, setCardWonId] = useStateIfMounted([])
    const [wonItem, setWonItem] = useStateIfMounted({})
    const [isShowMintDialog, setIsShowMintDialog] = useStateIfMounted(false)
    const [isShowCollectedPokemonDialog, setIsShowCollectedPokemonDialog] = useStateIfMounted(false)
    const connectionEthereum = useRef()
    const pokemonContract = useRef()
    const [isCatchingPokemon, setIsCatchingPokemon] = useStateIfMounted(false)
    const userAddress = useRef()
    const pokemonTokenAddress = '0xd1c8B26FFC9712dDc23A1c61F079b572Ee9849F5'
    const isColorRed = useRef(false)
    const [userCollectedPokemon, setUserCollectedPokemon] = useState([])
    const beepSoundAudio = useRef(null)
    const errorSoundAudio = useRef(null)

    const changePokeBallColor = () => {
        setInterval(() => {
            isColorRed.current = !isColorRed.current
            setIsPokeballColorRed(isColorRed.current)
        }, 1000)
    }

    const placeImage = (item, index) => {
        if (cardWonId.includes(index)) {
            return (
                <>
                    <div key={index} className='mystery-container'></div>
                </>
            )
        }
        else if (cardChoosenId.includes(index)) {
            return (<img src={item.img} height={108} width={108} key={index} />);
        } else {
            return (
                <>
                    <div key={index} className='mystery-container' onClick={() => flipCard(index)}>
                        ?
                    </div>
                </>
            )
        }
    }

    const flipCard = (index) => {
        setCardChoosenId([...cardChoosenId, index])
    }

    const checkForMatch = () => {
        const firstMatch = cardChoosenId[0];
        const secondMatch = cardChoosenId[1];
        if (cardArray[firstMatch].name === cardArray[secondMatch].name) {
            setWonItem(cardArray[firstMatch])
            setIsShowMintDialog(true)
        } else {
            playErrorSound()
            setTimeout(() => setCardChoosenId([]), 400);
        }
    }

    const clearBoard = () => {
        const firstMatch = cardChoosenId[0];
        const secondMatch = cardChoosenId[1];
        setCardWonId([...cardWonId, firstMatch, secondMatch])
        setCardChoosenId([])
    }

    const mintNFT = async (item) => {
        if (connectionEthereum.current) {
            try {
                pokemonContract.current.on(userAddress.current, (sender, itemId, event) => {
                    setIsCatchingPokemon(false)
                    clearBoard()
                })

                setIsCatchingPokemon(true)
                pokemonContract
                    .current
                    .mint(item.tokenURI)
                    .then(data => {
                        console.log(`data : ${data}`)
                    }).catch(err => {
                        console.log(err)
                        setIsCatchingPokemon(false)
                        setCardChoosenId([])
                    })
            } catch (err) {
                console.log(err)
                setIsCatchingPokemon(false)
                setCardChoosenId([])
            }

        }
    }

    const loadPokemon = async () => {
        if (pokemonContract) {
            const balance = await pokemonContract.current.getUserTokens()
            const result = await Promise.all(balance.map(async el => {
                const data = await axios.get(el.tokenURI)
                const item = {
                    name: data.data.name,
                    image: data.data.image,
                }
                return item
            }))
            setUserCollectedPokemon(result)
        }
    }

    const checkConnectivity = async () => {
        var { ethereum } = window
        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            const pokeContract = new ethers.Contract(pokemonTokenAddress, PokemonToken.abi, signer)
            const accounts = await ethereum.request({ method: "eth_accounts" })

            connectionEthereum.current = ethereum
            pokemonContract.current = pokeContract

            if (accounts.length > 0) {
                userAddress.current = accounts

            } else {
                const requstedAccount = await ethereum.request({ method: "eth_requestAccounts" })
                userAddress.current = requstedAccount
            }
            loadPokemon()
        }
    }

    const playBeepSound = () => beepSoundAudio.current.play()

    const playErrorSound = () => errorSoundAudio.current.play()

    const setSounds = () => {
        // beepSoundAudio.current = new Audio('/sound/page-flip.mp3')
        beepSoundAudio.current = new Audio('/sound/beep.mp3')
        // errorSoundAudio.current = new Audio('/sound/error.mp3')
        errorSoundAudio.current = new Audio('/sound/buzzer_error.mp3')
    }

    useEffect(() => {
        changePokeBallColor()
        checkConnectivity()
        setSounds()
    }, [])

    useEffect(() => {
        if (cardChoosenId.length == 2) {
            checkForMatch();
        } else if (cardChoosenId.length == 1) {
            playBeepSound()
        }
    }, [cardChoosenId])

    return (
        <>
            <div className="board">
                <div className="pokemon-conatiner-wrapper">
                    <div className="pokemon-logo-conatiner">
                        <img src='/pokemon/pokemon_logo.png' />
                    </div>
                    <div className="pokemon-container-holder">
                        <div className="pokemon-container-overline">
                            <div className="pokemon-container-overwrap">
                                <div className="pokemon-container">
                                    {
                                        cardArray.map((item, index) => placeImage(item, index))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={isPokebacllColorRed ? "pokemon-pokeball-container-red" : "pokemon-pokeball-container-blue"}>
                        <img src='/pokemon/pokeball.png' className="pokeball" onClick={() => setIsShowCollectedPokemonDialog(!isShowCollectedPokemonDialog)} />
                        <div className={isPokebacllColorRed ? "poke-dot-red" : "poke-dot-blue"}></div>
                    </div>
                </div>
            </div>
            <CardWonDialog
                wonItem={wonItem}
                show={isShowMintDialog}
                changeVisibility={() => {
                    setTimeout(() => setCardChoosenId([]), 400)
                    setIsShowMintDialog(!isShowMintDialog)
                }}
                mint={(item) => {
                    setIsShowMintDialog(!isShowMintDialog)
                    mintNFT(item)
                }}
            />
            <PokemonCatchingDialog
                show={isCatchingPokemon} />
            <PokeBallDialog
                show={isShowCollectedPokemonDialog}
                changeVisibility={() => setIsShowCollectedPokemonDialog(!isShowCollectedPokemonDialog)}
                pokemons={userCollectedPokemon}
            />
        </>
    );
}

export default PlayBoard;