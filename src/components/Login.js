import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import '../styles/login.style.scss';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    if (formData.email === 'asd@gmail.com' && formData.password == '1234') {
      setError('correct');
    }
    console.log('Form submitted:', formData);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      setError('');
      console.log('User logged in successfully!');
      console.log(user);
      localStorage.setItem('userUID', user.uid);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container login__outer">
      <div className="row login__inner justify-content-around">
        <div className="col-12 col-md-6 login__left__column">
          <img
            src={require('../assets/FUNGIGUARD.png')}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="col-12 col-md-5 login__right__column">
          <img
            src={require('../assets/FUNGIGUARD.png')}
            className="card__img__top__mobile"
            alt="..."
          />
          <div className="login__right__column__inner">
            <h2 className="text-center">
              One Click to
              <span className="login__heading__span"> Safe Pick</span>
            </h2>
            <h3 className="text-center">
              Explore Freely, Identify Accurately, and Pick Safely – Your
              Foraging Companion
              <br />
              <br />
              <b>Login Below</b>
            </h3>
            <div className="form-floating mb-3 login__input__outer">
              <input
                type="email"
                name="email"
                className="form-control login__input"
                id="floatingInput"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating login__input__outer">
              <input
                type="password"
                name="password"
                className="form-control login__input"
                id="floatingPassword"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {error && (
              <p
                className="error-message"
                style={{
                  color: 'red',
                  fontSize: '14px',
                  textAlign: 'center',
                  marginTop: '15px',
                  marginBottom: '0',
                }}
              >
                {error}
              </p>
            )}
            <div className="d-flex align-items-center justify-content-center login__btn__outer">
              <button
                className="m-0 btn btn-primary login__btn me-2"
                type="submit"
                onClick={handleSubmit}
              >
                Login
              </button>
              <p className="m-0">
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
