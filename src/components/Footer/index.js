/* eslint-disable react/no-unknown-property */
import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'
import logo from '../Images/Footer.png'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img src={logo} alt="website-footer-logo" className="footer-logo" />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-paragraph">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="footer-social-container">
      <div testid="pintrest-social-icon" className="footer-item">
        <FaPinterestSquare size={25} color="white" />
      </div>
      <div testid="instagram-social-icon" className="footer-item">
        <FaInstagram size={25} color="white" />
      </div>
      <div testid="twitter-social-icon" className="footer-item">
        <FaTwitter size={25} color="white" />
      </div>
      <div testid="facebook-social-icon" className="footer-item">
        <FaFacebookSquare size={25} color="white" />
      </div>
    </div>
  </div>
)

export default Footer
