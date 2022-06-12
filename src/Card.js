import './index.css';

function Card(props) {

    const { card, handleChoice, flipped } = props

    const handleClick = () => {
        handleChoice(card)
    }
    return (
        <div className={`${flipped && "flipped" } relative h-48 w-full`}>

            <img src={card.src} className='front h-full ' alt='Front-IMG' />
            <img src='/img/cover.jpg' alt='Back-IMG' onClick={handleClick} className='cursor-pointer back h-full w-full' />

        </div>
    )
}

export default Card