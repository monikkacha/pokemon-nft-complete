const CardWonDialog = ({ wonItem, show, changeVisibility, mint }) => {

    const { name, img, stamina, power, attack } = wonItem;

    return (
        show ?
            (
                <div className="popup-wrapper">
                    <div className="popup-overline">
                        <span className="cross" onClick={changeVisibility}>
                            x
                        </span>
                        <div className="popup-info-container">
                            <span className="pokemon-name">
                                You won ! {name}
                            </span>
                            <img src={img} className='pokemon-image' />
                            <div className="trait-section">
                                <div className="trait-container">
                                    <span className="trait-value">{stamina}</span>
                                    <span className="trait-key">Stamina</span>
                                </div>
                                <div className="trait-container">
                                    <span className="trait-value">{power}</span>
                                    <span className="trait-key">Power</span>
                                </div>
                                <div className="trait-container">
                                    <span className="trait-value">{attack}</span>
                                    <span className="trait-key">Attack</span>
                                </div>
                            </div>
                            <div className="mint-btn" onClick={() => mint(wonItem)}>
                                MINT
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

export default CardWonDialog;