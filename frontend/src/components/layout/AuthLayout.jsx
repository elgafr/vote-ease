// import UI_ELEMENT from '../../assets/images/ui-element.png'
import CARD_1 from '../../assets/images/auth-card.png'

// eslint-disable-next-line react/prop-types
const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w-1/2 px-12 pt-8 pb-12">
        <h2 className="text-2xl font-medium">Vote Ease</h2>
        { children }
      </div>

      <div className="hidden md:flex w-1/2 h-screen bg-neutral-content bg-cover bg-no-repeat bg-center relative justify-center items-center">
        <img 
          src={CARD_1} 
          alt="Card Image" 
          className="w-2/3 object-contain rounded-lg"
        />
      </div>
    </div>
  )
}

export default AuthLayout
