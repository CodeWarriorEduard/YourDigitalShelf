import logo from '../../assets/logo.png'

function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
        <div className="footer wrapper justify-between items-center">
           <div>
                <img className="h-14" src={logo} alt="logo" />
           </div>
          <div className=''>
            <p className='font-semibold text-lg'>YOUR DIGITAL SELF</p>
            <p>A fun way to manage and rate your favorite books!</p>
            <p>Copyright © 2025 - Rafael Ortiz</p>
          </div>
        </div>
    </footer>
  )
}

export default Footer;