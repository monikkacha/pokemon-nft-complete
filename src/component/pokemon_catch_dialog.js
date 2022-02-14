import { useEffect, useRef, useState } from "react";

const PokemonCatchingDialog = ({ show }) => {

    const [isRedColor, setIsRedColor] = useState(false)
    const isRed = useRef(false)

    const changePokeDotColor = () => {

        setInterval(() => {
            isRed.current = !isRed.current
            setIsRedColor(isRed.current)
        }, 500)
    }

    useEffect(() => {
        changePokeDotColor()
    }, [])


    return (
        show ?
            (
                <div className="popup-wrapper">
                    <div className="popup-overline">
                        <div className="popup-info-container">
                            <span className="pokemon-name">
                                Cathing up....
                            </span>
                            <div className={isRedColor ? "wait-pokemon-pokeball-container-red" : "wait-pokemon-pokeball-container-blue"}>
                                <img src='/pokemon/pokeball.png' className="wait-pokeball" />
                                <div className={isRedColor ? "wait-poke-dot-red" : "wait-poke-dot-blue"}></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) :
            (
                <></>
            )
    );
}

export default PokemonCatchingDialog;