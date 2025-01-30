import { React } from 'react';
import { FaFacebook, FaAngleDoubleRight } from 'react-icons/fa';
import { IoHomeOutline, IoLogoYoutube } from 'react-icons/io5';
import { FaSquareInstagram } from 'react-icons/fa6';
import { GoPerson } from 'react-icons/go';
import { TbMushroom } from 'react-icons/tb';
import { CgMenuRight } from 'react-icons/cg';
import { CiPhone } from 'react-icons/ci';
import '../styles/header.style.scss';

function Header() {
  return (
    <div
      className="header__outer"
      style={{
        position: 'relative',
        width: '100vw',
      }}
    >
      <div
        className="navbar__outer"
        style={{
          margin: '0 5.3em 22.5px 5.3em',
          padding: '22.5px 12px 0 12px',
        }}
      >
        <div className="site__logo">
          <img
            src={require('../assets/FUNGIGUARD.png')}
            alt="logo"
            width={40}
          />
          <span className="navbar__title">Fungi Guard</span>
        </div>
        <ul className="navbar__list">
          <li className="navbar__list__item">
            <IoHomeOutline />
            &nbsp;Home
          </li>
          <li className="navbar__list__item">
            <TbMushroom />
            &nbsp;Predict Edibility
          </li>
          <li className="navbar__list__item">
            {' '}
            <CiPhone />
            &nbsp;Contact Us
          </li>
          <GoPerson
            className="person__icon"
            style={{ fontSize: '1.3rem', paddingBottom: '2px' }}
          />
          <CgMenuRight
            className="menu__item"
            style={{
              fontSize: '1.3rem',
              marginLeft: '10px',
              paddingBottom: '2px',
            }}
          />
        </ul>
      </div>
      <div
        className="hero__outer"
        style={{
          margin: '0px 5.3em 0 5.3em',
          padding: '0 12px',
        }}
      >
        <div
          className="hero__content__left"
          //   style={{ margin: '50px 80px 50px 0' }}
        >
          <p className="hero__title">
            Guide to <span>Safe Mushroom Foraging</span> and{' '}
            <span>Identification</span>
          </p>
          <p className="hero__description">
            Your trusted companion for mushroom safety and identification,
            ensuring informed and confident choices while foraging and enjoying
            culinary adventures responsibly
          </p>
          <button>
            Explore{' '}
            <span>
              <FaAngleDoubleRight />
            </span>
          </button>
        </div>
        <div className="hero__content__right">
          <div className="left__pic">
            <div>
              <span>
                <FaFacebook />
              </span>
              <span>
                <IoLogoYoutube />
              </span>
              <span>
                <FaSquareInstagram />
              </span>
            </div>
          </div>
          <div className="right__pic"></div>
        </div>
      </div>
      <div className="lower__navbar__outer">
        <div
          className="email__outer"
          style={{ margin: '20px 0 0 5.3em', padding: '0 0 0 0px' }}
        >
          <div className="description">
            <p className="paragraph__laptop">
              Learn about the latest updates on <br />
              mushroom and safety tips.
            </p>
            <p className="paragraph__mobile">
              Learn about the latest updates on mushroom and safety tips.
            </p>
          </div>
          <div className="email">
            <input type="email" placeholder="Enter your email" />
            <button>
              <span>
                <FaAngleDoubleRight />
              </span>
            </button>
          </div>
        </div>
        <div className="stat__outer">
          <div
            className="stat__container"
            style={{ backgroundColor: '#f4978ee0' }}
          >
            <span className="stat__number" style={{ color: 'white' }}>
              140K+
            </span>
            <span className="stat__text" style={{ color: 'white' }}>
              Species
            </span>
          </div>
          <div className="stat__container">
            <span className="stat__number">2000+</span>
            <span className="stat__text">Edible</span>
          </div>
          <div className="stat__container">
            <span className="stat__number">95+</span>
            <span className="stat__text">Accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
