import { useEffect, useState } from "react"

const BlinkingPokeball = () => {
    const [isPokebacllColorRed, setIsPokeballColorRed] = useState(true);
    const changePokeBallColor = () => {
        const interval = setInterval(() => {
            setIsPokeballColorRed(!isPokebacllColorRed)
        }, 1000)
    }

    useEffect(() => {
        changePokeBallColor()
    }, [])

    return (
        <>
            <div className={isPokebacllColorRed ? "pokemon-pokeball-container-red" : "pokemon-pokeball-container-blue"}>
                <img src='/pokemon/pokeball.png' className="pokeball" />
                <div className={isPokebacllColorRed ? "poke-dot-red" : "poke-dot-blue"}></div>
            </div>
        </>
    )
}

export default BlinkingPokeball;