import logo from '../images/Logo-U-tad.webp';

function Logo() {
  return (
    <div className="utad-logo-container">
      <img
        className="utad-logo"
        src={logo}
        alt="Logo de u-tad" />
    </div>
  )
}

export default Logo;