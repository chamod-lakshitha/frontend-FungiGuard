import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.style.scss';
import { auth, createUserWithEmailAndPassword } from './firebaseConfig';

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Create user account in Firebase
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      setError('');
      setCompleted(true);
      console.log('User signed up successfully!');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup__outer">
      {completed ? (
        <div className="signup__success">
          <h2 style={{ marginBottom: '10px', color: '#f4978ee0' }}>
            Signup Successful!
          </h2>
          <p>
            You can now <Link to="/">login</Link> with your credentials.
          </p>
        </div>
      ) : (
        <div className="signup__page">
          <div className="signup__header__outer">
            <h2>
              Welcome to <span>FungiGuard</span>
            </h2>
          </div>
          <form>
            {/* Name input */}
            <div className="form-floating mb-3 signup__input__outer">
              <input
                type="text"
                name="name"
                className="form-control signup__input"
                placeholder="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label>Name</label>
            </div>
            {/* Email input */}
            <div className="form-floating mb-3 signup__input__outer">
              <input
                type="email"
                name="email"
                className="form-control signup__input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              <label>Email address</label>
            </div>
            {/* Password input */}
            <div className="form-floating mb-3 signup__input__outer">
              <input
                type="password"
                name="password"
                className="form-control signup__input"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
              />
              <label>Password</label>
            </div>
            {/* Confirm password input */}
            <div className="form-floating mb-3 signup__input__outer">
              <input
                type="password"
                name="confirmPassword"
                className="form-control signup__input"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <label>Re-enter Password</label>
            </div>
            {/* Error message display */}
            {error && (
              <p
                className="m-0 error-message"
                style={{ color: 'red', fontSize: '14px' }}
              >
                {error}
              </p>
            )}
            {/* Submit button */}
            <button type="submit" onClick={handleSubmit}>
              Sign Up
            </button>
            <p className="m-0">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
