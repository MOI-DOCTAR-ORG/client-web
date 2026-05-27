import Icon from './Icon'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-8 h-12">
      <div>
        <h2 className="font-headline-lg text-headline-lg text-on-surface">
          Good morning, Alex
        </h2>
        <p className="font-body-md text-secondary">
          Here is what is happening with your health today.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined p-2 hover:bg-surface-container rounded-full transition-colors text-on-surface-variant">
          notifications
        </button>
        <img
          alt="User Profile"
          className="w-10 h-10 rounded-full border-2 border-primary-container"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKXdX56RArmULZK_NoQ0L99HNEH3Smr4pCogZr1zloxe29vQZoB26L8Iu78idg7ZwHHUDKRyrKxSMcQWXPY2GAyGcUU_L5ikTUELOgPKOWXEE9Tb7l9pndYlQwpmnKXA5JJdpiAQwriLBBeAT0YoPgHW3irIWbiaGoOPswqOnYqvrc4_ts2NWwIzdymky9Sr03DYK7taoPrRNvjZihhWh501vmdR2fLafOADCKSzevfmE2SFGH3N4vyy5sxGrLAqa6CZyr0Qwj3n4"
        />
      </div>
    </header>
  )
}
