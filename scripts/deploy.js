const main = async () => {
    const PokemonToken = await hre.ethers.getContractFactory("PokemonToken")
    const pokemonToken = await PokemonToken.deploy()
    await pokemonToken.deployed()
    const pokemonTokenAddress = pokemonToken.address

    console.log('pokemon Token  address : ', pokemonTokenAddress)

    // var tx = await neonToken.mint('https://nft-marketplace-monik.herokuapp.com/nft/61fa18271a91a078dad0ade7')
    // var tx = await neonToken.mint('https://nft-marketplace-monik.herokuapp.com/nft/62034d54807e34c448cfa11e')
    // await tx.wait()

    // var uri = await neonToken.tokenURI(1)
    // console.log("URI : ", uri)
}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

runMain()