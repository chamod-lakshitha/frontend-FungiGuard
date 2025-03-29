/* eslint-disable jsx-a11y/iframe-has-title */
import { CiInstagram, CiTwitter } from 'react-icons/ci';
import '../styles/footer.styles.scss';

const Footer = () => {
  return (
    <footer className="footer_outer">
      {/* Main footer container */}
      <div className="footer__inner">
        {/* Site Links Section */}
        <div className="footer__section__outer links__outer">
          <h3 className="footer__title links__title">Site</h3>
          <ul className="links__list">
            {/* List of navigation links in the footer */}
            <li>Home</li>
            <li>View Info</li>
            <li>Gallery</li>
            <li>Predict Edibility</li>
            <li>Predictions History</li>
          </ul>
        </div>
        {/* Google Map Section */}
        <div className="footer__section__outer map__outer">
          <h3 className="footer__title map__title">Visit us</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15844.090194455488!2d79.84748189391826!3d6.887902339776749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25bf6191314c3%3A0xb3140fbf85f0988!2sKeells%20-%20Lauries%20(Duplication%20Road)!5e0!3m2!1sen!2slk!4v1741492585131!5m2!1sen!2slk"
            width="250"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        {/* Social Media Section */}
        <div className="footer__section__outer social__media">
          <h3 className="footer__title social__title">Follow and Like us on</h3>
          <CiInstagram className="social__media__icon" />
          <CiTwitter className="social__media__icon" />
        </div>
        {/* Contact Us Section */}
        <div className="footer__section__outer contact__us">
          <h3 className="footer__title contact__title">Contact us</h3>
          <p>Email : test@gmail.com</p>
          <p>Phone : +94 1234 5678</p>
          <p>Address : 20, TOWN AVENUE, Colombo4</p>
        </div>
      </div>
      {/* Footer bottom section with company name and copyright */}
      <section
        className="footer d-flex justify-content-between"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          marginTop: '25px',
          padding: '0 20px',
        }}
      >
        <span className="fw-bold">FungiGuard</span>
        <span className="copyright">
          © 2021 UI Design Daily All rights reserved
        </span>
      </section>
    </footer>
  );
};

export default Footer;
