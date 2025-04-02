import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiMail, FiPhone, FiEye, FiEyeOff, FiHome, FiCode, FiClock, FiGlobe, FiActivity, FiHeadphones } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/assets/logo/Thunderbolts.png';

// Mock AuthService (should be imported from your actual service)
const AuthService = {
  isAuthenticated: () => false,
  getRoleRedirect: () => Promise.resolve('/dashboard'),
  login: () => Promise.resolve({ access: true }),
  register: () => Promise.resolve({}),
  verifyOTP: () => Promise.resolve({}),
  resendOTP: () => Promise.resolve({})
};

const Authentication = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isOtpTimerRunning, setIsOtpTimerRunning] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otpError, setOtpError] = useState('');
  const [authError, setAuthError] = useState('');
  const [language, setLanguage] = useState('fr'); // 'fr' for French, 'en' for English

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)" },
    tap: { scale: 0.95 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } }
  };

  // Translations
  const translations = {
    fr: {
      welcome: 'Bienvenue!',
      createAccount: 'Créer un compte',
      loginMessage: 'Connectez-vous pour accéder à nos services de santé numérique',
      registerMessage: 'Rejoignez Thunder Technology pour des solutions innovantes',
      fullName: 'Nom Complet',
      enterFullName: 'Entrez votre nom complet',
      fullNameRequired: 'Le nom est obligatoire',
      phone: 'Téléphone',
      phoneFormat: '+237 6XX XXX XXX',
      phoneRequired: 'Le numéro de téléphone est obligatoire',
      invalidPhone: 'Format de téléphone invalide',
      email: 'Email',
      password: 'Mot de passe',
      yourPassword: 'Votre mot de passe',
      choosePassword: 'Choisissez un mot de passe fort',
      passwordRequired: 'Le mot de passe est obligatoire',
      passwordLength: 'Le mot de passe doit contenir au moins 8 caractères',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      loading: 'Traitement...',
      login: 'Se connecter',
      register: 'S\'inscrire',
      newToThunder: 'Nouveau sur Thunder Technology?',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      continueWith: 'Ou continuer avec',
      contactUs: 'Contactez-nous',
      ourServices: 'Nos Services',
      allRightsReserved: 'Tous droits réservés.',
      termsOfUse: 'Conditions d\'utilisation',
      privacyPolicy: 'Politique de confidentialité',
      whyChoose: 'Pourquoi choisir Thunder Technology?',
      otpVerification: 'Vérification du numéro de téléphone',
      otpSent: 'Un code OTP à 6 chiffres a été envoyé à l\'email',
      enterOtp: 'Veuillez entrer ce code pour vérifier votre compte.',
      otpCode: 'Code OTP',
      resendIn: 'Vous pouvez renvoyer le code dans',
      seconds: 'secondes.',
      resendOtp: 'Renvoyer le code OTP',
      cancel: 'Annuler',
      verify: 'Vérifier',
      verifying: 'Vérification...'
    },
    en: {
      welcome: 'Welcome!',
      createAccount: 'Create an account',
      loginMessage: 'Login to access our digital health services',
      registerMessage: 'Join Thunder Technology for innovative solutions',
      fullName: 'Full Name',
      enterFullName: 'Enter your full name',
      fullNameRequired: 'Full name is required',
      phone: 'Phone',
      phoneFormat: '+237 6XX XXX XXX',
      phoneRequired: 'Phone number is required',
      invalidPhone: 'Invalid phone format',
      email: 'Email',
      password: 'Password',
      yourPassword: 'Your password',
      choosePassword: 'Choose a strong password',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 8 characters',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loading: 'Processing...',
      login: 'Login',
      register: 'Register',
      newToThunder: 'New to Thunder Technology?',
      alreadyHaveAccount: 'Already have an account?',
      continueWith: 'Or continue with',
      contactUs: 'Contact Us',
      ourServices: 'Our Services',
      allRightsReserved: 'All rights reserved.',
      termsOfUse: 'Terms of Use',
      privacyPolicy: 'Privacy Policy',
      whyChoose: 'Why choose Thunder Technology?',
      otpVerification: 'Phone number verification',
      otpSent: 'A 6-digit OTP code has been sent to the email',
      enterOtp: 'Please enter this code to verify your account.',
      otpCode: 'OTP Code',
      resendIn: 'You can resend the code in',
      seconds: 'seconds.',
      resendOtp: 'Resend OTP code',
      cancel: 'Cancel',
      verify: 'Verify',
      verifying: 'Verifying...'
    }
  };

  const t = translations[language];

  // OTP Timer
  useEffect(() => {
    let interval;
    if (isOtpTimerRunning && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsOtpTimerRunning(false);
      setOtpTimer(60);
    }
    return () => clearInterval(interval);
  }, [isOtpTimerRunning, otpTimer]);

  // Check if user is already authenticated
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      redirectBasedOnRole();
    }
  }, []);

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  // Redirect user based on role
  const redirectBasedOnRole = async () => {
    try {
      const redirectUrl = await AuthService.getRoleRedirect();
      navigate(redirectUrl);
    } catch (error) {
      console.error('Redirect error:', error);
      navigate('/dashboard'); // Default redirect
    }
  };

  // Handle OTP input change
  const handleOtpChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return; // Only allow numbers
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Handle keyboard navigation for OTP inputs
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otpValues[index] === '') {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  // Toggle between login and register forms
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    setAuthError('');
    reset();
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsLoading(true);
    setAuthError('');

    try {
      if (isLoginForm) {
        // Login flow
        const response = await AuthService.login(data.email, data.password);
        if (response.access) {
          redirectBasedOnRole();
        }
      } else {
        // Registration flow
        const userData = {
          email: data.email,
          password: data.password,
          first_name: data.fullName.split(' ')[0],
          last_name: data.fullName.split(' ')[1] || '',
          phone_number: data.phone,
          role: 'client'
        };

        await AuthService.register(userData);
        console.log('Registration successful, showing OTP modal');
        setUserEmail(data.email);
        setShowOTPModal(true);
        setIsOtpTimerRunning(true);
        setOtpValues(['', '', '', '', '', '']);
        setOtpError('');
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError(
        error.message ||
        error.error ||
        (isLoginForm ? 'Login failed. Check your credentials.' : 'Registration failed. Please try again.')
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP code
  const verifyOTP = async () => {
    setIsLoading(true);
    setOtpError('');

    try {
      // Check if all OTP fields are filled
      if (otpValues.some(val => val === '')) {
        setOtpError(language === 'fr' ? 'Veuillez entrer tous les chiffres du code OTP' : 'Please enter all digits of the OTP code');
        setIsLoading(false);
        return;
      }

      const otpCode = otpValues.join('');
      const response = await AuthService.verifyOTP(userEmail, otpCode);
      console.log('OTP verification successful:', response);

      // Reset OTP modal and redirect
      setShowOTPModal(false);
      setIsOtpTimerRunning(false);
      setOtpTimer(60);
      redirectBasedOnRole();
    } catch (error) {
      console.error('OTP verification error:', error);
      setOtpError(error.message || error.error || (language === 'fr' ? 'Code OTP invalide. Veuillez réessayer.' : 'Invalid OTP code. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP code
  const resendOTP = async () => {
    if (isOtpTimerRunning) return;

    setIsLoading(true);
    setOtpError('');

    try {
      await AuthService.resendOTP(userEmail);
      console.log('OTP resent to:', userEmail);
      setOtpTimer(60);
      setIsOtpTimerRunning(true);
      setOtpValues(['', '', '', '', '', '']);
    } catch (error) {
      console.error('Error resending OTP:', error);
      setOtpError(error.message || error.error || (language === 'fr' ? 'Échec de l\'envoi du code OTP. Veuillez réessayer.' : 'Failed to send OTP code. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel OTP verification
  const cancelOTP = () => {
    setShowOTPModal(false);
    setIsOtpTimerRunning(false);
    setOtpTimer(60);
  };

  // Service features
  const features = [
    {
      icon: <FiCode className="text-teal-600 text-2xl mb-2" />,
      title: language === 'fr' ? "Applications Santé" : "Health Applications",
      description: language === 'fr' ? "Applications mobiles et web pour le suivi des patients et la télémédecine" : "Mobile and web applications for patient tracking and telemedicine"
    },
    {
      icon: <FiActivity className="text-teal-600 text-2xl mb-2" />,
      title: language === 'fr' ? "Solutions VR/AR" : "VR/AR Solutions",
      description: language === 'fr' ? "Outils de formation et de thérapie utilisant la réalité virtuelle et augmentée" : "Training and therapy tools using virtual and augmented reality"
    },
    {
      icon: <FiHeadphones className="text-teal-600 text-2xl mb-2" />,
      title: language === 'fr' ? "Support Technique" : "Technical Support",
      description: language === 'fr' ? "Consultation et assistance technique pour les établissements de santé" : "Consultation and technical assistance for healthcare facilities"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-teal-50 to-cyan-100 p-4">
      {/* Language Switcher */}
      <motion.div
        className="fixed top-4 right-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={toggleLanguage}
          className="flex items-center justify-center bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
          aria-label={language === 'fr' ? "Switch to English" : "Passer au français"}
        >
          <FiGlobe className="text-teal-700" size={24} />
        </motion.button>
      </motion.div>

      {/* Home Button */}
      <motion.div
        className="fixed top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => navigate('/')}
          className="flex items-center justify-center bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
          aria-label={language === 'fr' ? "Retour à l'accueil" : "Back to home"}
        >
          <FiHome className="text-teal-700" size={24} />
        </motion.button>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-start mt-8">
        {/* Left side - Features */}
        <motion.div
          className="lg:w-2/5 px-6 pt-12 pb-6 hidden lg:block"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Thunder Technology</h2>
            <p className="text-lg text-gray-600">
              {language === 'fr' 
                ? "Transformer le secteur de la santé grâce à des solutions technologiques de pointe." 
                : "Transforming healthcare through cutting-edge technological solutions."}
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md"
                whileHover={{ y: -5, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)" }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-teal-700 text-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">{t.whyChoose}</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>{language === 'fr' ? "Expertise en technologies émergentes (IA, VR/AR)" : "Expertise in emerging technologies (AI, VR/AR)"}</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>{language === 'fr' ? "Solutions centrées sur l'utilisateur" : "User-centered solutions"}</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>{language === 'fr' ? "Équipe multidisciplinaire" : "Multidisciplinary team"}</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                <span>{language === 'fr' ? "Adaptation au contexte local" : "Adaptation to local context"}</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Right side - Authentication Form */}
        <motion.div
          className="lg:w-3/5 w-full"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-6 text-center">
              <img src={logo} alt="Thunder Technology Logo" className="h-20 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white">
                {isLoginForm ? t.welcome : t.createAccount}
              </h2>
              <p className="text-teal-100 mt-1">
                {isLoginForm ? t.loginMessage : t.registerMessage}
              </p>
            </div>

            {/* Form Section */}
            <motion.div
              className="p-8"
              variants={formVariants}
              key={isLoginForm ? 'login' : 'register'}
              initial="hidden"
              animate="visible"
            >
              {/* Error display for form submission */}
              {authError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                  {authError}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Registration Form Fields */}
                {!isLoginForm && (
                  <>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">{t.fullName}</label>
                      <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="text"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                          placeholder={t.enterFullName}
                          {...register('fullName', { required: t.fullNameRequired })}
                        />
                      </div>
                      {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">{t.phone}</label>
                      <div className="relative">
                        <FiPhone className="absolute top-3 left-3 text-gray-400" />
                        <input
                          type="tel"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                          placeholder={t.phoneFormat}
                          {...register('phone', {
                            required: t.phoneRequired,
                            pattern: {
                              value: /^(\+237|237)?[6-9][0-9]{8}$/,
                              message: t.invalidPhone
                            }
                          })}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t.email}</label>
                  <div className="relative">
                    <FiMail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                      placeholder="example@thundertech.com"
                      {...register('email', {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">{t.password}</label>
                  <div className="relative">
                    <FiLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-10 pr-10 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                      placeholder={isLoginForm ? t.yourPassword : t.choosePassword}
                      {...register('password', {
                        required: t.passwordRequired,
                        minLength: {
                          value: 8,
                          message: t.passwordLength
                        }
                      })}
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                {/* Login Extras */}
                {isLoginForm && (
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        {t.rememberMe}
                      </label>
                    </div>
                    <div>
                      <Link to="/forgot-password" className="text-sm font-medium text-teal-600 hover:text-teal-800">
                        {t.forgotPassword}
                      </Link>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t.loading}
                    </div>
                  ) : (
                    isLoginForm ? t.login : t.register
                  )}
                </motion.button>
              </form>

              {/* Form Toggle */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  {isLoginForm ? t.newToThunder : t.alreadyHaveAccount}
                  <button
                    onClick={toggleForm}
                    className="ml-1 font-medium text-teal-600 hover:text-teal-800 focus:outline-none"
                  >
                                  {/* uncomment for the register button  */}

                   {/* {isLoginForm ? t.register : t.login} */}
                  </button>
                </p>
              </div>

              {/* Alternative Login Methods */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">{t.continueWith}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.5006 12.2332C22.5006 11.3699 22.4291 10.7399 22.2744 10.0865H12.2148V13.9832H18.1196C18.0006 14.9515 17.3577 16.4099 15.9291 17.3898L15.9091 17.5203L19.0897 19.9352L19.3101 19.9565C21.3338 18.1249 22.5006 15.4298 22.5006 12.2332Z" fill="#4285F4"/>
                      <path d="M12.214 22.5C15.1068 22.5 17.5353 21.5667 19.3092 19.9567L15.9282 17.39C15.0235 18.0083 13.8092 18.4417 12.214 18.4417C9.38069 18.4417 6.97596 16.6083 6.11874 14.0767L5.99309 14.15C5.35796 15.675 5.35796 17.325 5.98874 18.85L6.11874 18.9233C7.97596 21.4549 10.3807 23.2883 13.214 23.2883L12.214 22.5Z" fill="#34A853"/>
                      <path d="M12.214 5.55833C14.2257 5.55833 15.583 6.41166 16.357 7.13666L19.3807 4.175C17.5235 2.48833 15.1068 1.5 12.214 1.5C8.38069 1.5 5.35796 3.85 3.98874 7.15L5.98874 9.92333C6.97596 6.39166 9.38069 4.55833 12.214 4.55833V5.55833Z" fill="#FBBC05"/>
                      <path d="M3.98874 7.15C3.35796 8.675 3.35796 10.325 3.98874 11.85L1.98874 9.07666C0.690963 5.76666 0.690963 2.23333 1.98874 -1.07666L3.98874 1.69666C5.35796 4.99666 8.38069 7.35 12.214 7.35L12.214 6.35C9.38069 6.35 6.97596 4.51666 5.98874 1.985L3.98874 -1.78833C2.69096 1.52166 2.69096 5.055 3.98874 8.365L3.98874 7.15Z" fill="#EB4335"/>
                    </svg>
                    Google
                  </motion.button>

                  <motion.button
                    type="button"
                    className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    whileHover={buttonVariants.hover}
                    whileTap={buttonVariants.tap}
                  >
                    <svg className="h-5 w-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                    Facebook
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <div className="flex justify-center space-x-4 mb-2">
              <Link to="/contact" className="hover:text-teal-600">{t.contactUs}</Link>
              <Link to="/services" className="hover:text-teal-600">{t.ourServices}</Link>
              <Link to="/terms" className="hover:text-teal-600">{t.termsOfUse}</Link>
              <Link to="/privacy" className="hover:text-teal-600">{t.privacyPolicy}</Link>
            </div>
            <p>© {new Date().getFullYear()} Thunder Technology. {t.allRightsReserved}</p>
          </div>
        </motion.div>
      </div>

      {/* OTP Verification Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            className="bg-white rounded-xl max-w-md w-full p-6"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">{t.otpVerification}</h3>
              <button
                onClick={cancelOTP}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <FiClock className="text-xl" />
              </button>
            </div>

            <p className="text-gray-600 mb-4">
              {t.otpSent} <span className="font-medium">{userEmail}</span>. {t.enterOtp}
            </p>

            {otpError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {otpError}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">{t.otpCode}</label>
              <div className="flex justify-between space-x-2">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                ))}
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 mb-6">
              {t.resendIn} {otpTimer} {t.seconds}
            </div>

            <div className="flex space-x-4">
              <motion.button
                type="button"
                onClick={resendOTP}
                disabled={isOtpTimerRunning || isLoading}
                className={`flex-1 py-2 px-4 rounded-lg border border-teal-600 text-teal-600 font-medium ${(isOtpTimerRunning || isLoading) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-50'}`}
                whileHover={!isOtpTimerRunning && !isLoading ? buttonVariants.hover : {}}
                whileTap={!isOtpTimerRunning && !isLoading ? buttonVariants.tap : {}}
              >
                {t.resendOtp}
              </motion.button>

              <motion.button
                type="button"
                onClick={verifyOTP}
                disabled={isLoading}
                className={`flex-1 py-2 px-4 rounded-lg bg-teal-600 text-white font-medium ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-700'}`}
                whileHover={!isLoading ? buttonVariants.hover : {}}
                whileTap={!isLoading ? buttonVariants.tap : {}}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.verifying}
                  </div>
                ) : (
                  t.verify
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Authentication;