import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import '../styles/login.style.scss';

function Login() {
  // State to store user input (email & password)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // State to store error messages
  const [error, setError] = useState('');

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Handles input field changes and updates formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validates if all fields are filled
    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // Temporary check for hardcoded credentials (for testing purposes)
    if (formData.email === 'asd@gmail.com' && formData.password === '1234') {
      setError('correct');
    }
    console.log('Form submitted:', formData);

    try {
      // Attempts to sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      setError('');
      console.log('User logged in successfully!');
      console.log(user);
      // Stores the user ID in local storage
      localStorage.setItem('userUID', user.uid);
      // Navigates to the home page after successful login
      navigate('/home');
    } catch (error) {
      // Displays an error message if authentication fails
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="container login__outer">
      <div className="row login__inner justify-content-around">
        {/* Left column: Logo image */}
        <div className="col-12 col-md-6 login__left__column">
          <img
            src={require('../assets/FUNGIGUARD.png')}
            className="card-img-top"
            alt="..."
          />
        </div>
        {/* Right column: Login form */}
        <div className="col-12 col-md-5 login__right__column">
          {/* Mobile-friendly logo */}
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
            {/* Email input field */}
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
            {/* Password input field */}
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
            {/* Error message display */}
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
            {/* Login button and sign-up link */}
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
