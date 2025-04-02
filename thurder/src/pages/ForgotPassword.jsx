import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheckCircle, FiGlobe, FiHome } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../public/assets/logo/Thunderbolts.png';

// Mock AuthService (should be imported from your actual service)
const AuthService = {
  requestPasswordReset: () => Promise.resolve({}),
  verifyResetCode: () => Promise.resolve({}),
  resetPassword: () => Promise.resolve({})
};

const ForgotPassword = () => {
  // States for multi-step form
  const [currentStep, setCurrentStep] = useState(1);
  const [resetMethod, setResetMethod] = useState('email'); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetIdentifier, setResetIdentifier] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [language, setLanguage] = useState('fr'); // 'fr' for French, 'en' for English
  
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Watch password fields for confirmation validation
  const password = watch('password', '');

  // Translations
  const translations = {
    fr: {
      resetTitle: 'Réinitialisation du mot de passe',
      resetDescription: 'Entrez votre email ou numéro de téléphone pour réinitialiser votre mot de passe',
      email: 'Email',
      phone: 'Téléphone',
      emailPlaceholder: 'thundersinnov@gmail.com',
      phonePlaceholder: '+237 695 760 621',
      emailRequired: "L'email est obligatoire",
      invalidEmail: "Adresse email invalide",
      phoneRequired: "Le numéro de téléphone est obligatoire",
      invalidPhone: "Format de téléphone invalide",
      sendCode: "Envoyer le code de vérification",
      processing: "Traitement...",
      verificationTitle: "Vérification",
      verificationSent: "Nous avons envoyé un code de vérification à",
      noCode: "Vous n'avez pas reçu de code?",
      resendCode: "Renvoyer le code",
      verify: "Vérifier",
      verifying: "Vérification...",
      newPasswordTitle: "Créer un nouveau mot de passe",
      newPasswordDescription: "Veuillez créer un nouveau mot de passe sécurisé",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      passwordRequired: "Le mot de passe est obligatoire",
      passwordLength: "Le mot de passe doit contenir au moins 8 caractères",
      passwordsMatch: "Les mots de passe ne correspondent pas",
      resetPassword: "Réinitialiser le mot de passe",
      updating: "Mise à jour...",
      successTitle: "Mot de passe réinitialisé avec succès!",
      successDescription: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      login: "Se connecter",
      needHelp: "Besoin d'aide?",
      contactUs: "Contactez-nous"
    },
    en: {
      resetTitle: 'Password Reset',
      resetDescription: 'Enter your email or phone number to reset your password',
      email: 'Email',
      phone: 'Phone',
      emailPlaceholder: 'example@thundertech.com',
      phonePlaceholder: '+237 6XX XXX XXX',
      emailRequired: "Email is required",
      invalidEmail: "Invalid email address",
      phoneRequired: "Phone number is required",
      invalidPhone: "Invalid phone format",
      sendCode: "Send verification code",
      processing: "Processing...",
      verificationTitle: "Verification",
      verificationSent: "We've sent a verification code to",
      noCode: "Didn't receive a code?",
      resendCode: "Resend code",
      verify: "Verify",
      verifying: "Verifying...",
      newPasswordTitle: "Create new password",
      newPasswordDescription: "Please create a new secure password",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 8 characters",
      passwordsMatch: "Passwords don't match",
      resetPassword: "Reset password",
      updating: "Updating...",
      successTitle: "Password reset successfully!",
      successDescription: "Your password has been successfully reset. You can now login with your new password.",
      login: "Login",
      needHelp: "Need help?",
      contactUs: "Contact us"
    }
  };

  const t = translations[language];

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

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

  // Clear error message when changing steps
  useEffect(() => {
    setErrorMessage('');
  }, [currentStep]);

  // Handle initial password reset request
  const handleResetRequest = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await AuthService.requestPasswordReset(data.email);
      setResetIdentifier(resetMethod === 'email' ? data.email : data.phone);
      setCurrentStep(2);
    } catch (error) {
      console.error('Reset request error:', error);
      setErrorMessage(error.message || (language === 'fr' ? 'Échec de la demande de réinitialisation. Veuillez réessayer.' : 'Reset request failed. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification code submission
  const handleVerifyCode = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const verificationCode = [
        data.code0, data.code1, data.code2, 
        data.code3, data.code4, data.code5
      ].join('');
      
      await AuthService.verifyResetCode(resetIdentifier, verificationCode);
      setCurrentStep(3);
    } catch (error) {
      console.error('Verification error:', error);
      setErrorMessage(error.message || (language === 'fr' ? 'Code de vérification invalide. Veuillez réessayer.' : 'Invalid verification code. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle new password submission
  const handlePasswordReset = async (data) => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const verificationCode = [
        data.code0, data.code1, data.code2, 
        data.code3, data.code4, data.code5
      ].join('');
      
      await AuthService.resetPassword(
        resetIdentifier,
        verificationCode,
        data.password,
        data.confirmPassword
      );
      
      setCurrentStep(4);
    } catch (error) {
      console.error('Password reset error:', error);
      setErrorMessage(error.message || (language === 'fr' ? 'Échec de la réinitialisation du mot de passe. Veuillez réessayer.' : 'Password reset failed. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend verification code
  const handleResendCode = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      await AuthService.requestPasswordReset(resetIdentifier);
      alert(language === 'fr' ? 'Un nouveau code a été envoyé à votre adresse email.' : 'A new code has been sent to your email address.');
    } catch (error) {
      console.error('Resend code error:', error);
      setErrorMessage(error.message || (language === 'fr' ? 'Échec de l\'envoi du code. Veuillez réessayer.' : 'Failed to send code. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Render appropriate form based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.resetTitle}</h2>
            <p className="text-gray-600 mb-6">{t.resetDescription}</p>
            
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            <div className="mb-6">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setResetMethod('email')}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                    resetMethod === 'email' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  } transition-colors duration-200`}
                >
                  <FiMail className="mr-2" />
                  {t.email}
                </button>
                <button
                  type="button"
                  onClick={() => setResetMethod('phone')}
                  className={`flex items-center justify-center px-4 py-2 rounded-lg ${
                    resetMethod === 'phone' 
                      ? 'bg-teal-600 text-white' 
                      : 'bg-gray-100 text-gray-700'
                  } transition-colors duration-200`}
                >
                  <FiPhone className="mr-2" />
                  {t.phone}
                </button>
              </div>
              
              <form onSubmit={handleSubmit(handleResetRequest)}>
                {resetMethod === 'email' ? (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t.email}</label>
                    <div className="relative">
                      <FiMail className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="email"
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                        placeholder={t.emailPlaceholder}
                        {...register('email', { 
                          required: t.emailRequired,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t.invalidEmail
                          }
                        })}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                ) : (
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">{t.phone}</label>
                    <div className="relative">
                      <FiPhone className="absolute top-3 left-3 text-gray-400" />
                      <input
                        type="tel"
                        className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                        placeholder={t.phonePlaceholder}
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
                )}
                
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all mt-4"
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
                      {t.processing}
                    </div>
                  ) : (
                    t.sendCode
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.verificationTitle}</h2>
            <p className="text-gray-600 mb-6">
              {t.verificationSent} {' '}
              <span className="font-medium">
                {resetMethod === 'email' ? resetIdentifier : formatPhoneNumber(resetIdentifier)}
              </span>
            </p>
            
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit(handleVerifyCode)}>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Code de vérification</label>
                <div className="flex justify-between gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                      {...register(`code${index}`, { 
                        required: true,
                        pattern: /^[0-9]$/
                      })}
                    />
                  ))}
                </div>
                {(errors.code0 || errors.code1 || errors.code2 || errors.code3 || errors.code4 || errors.code5) && (
                  <p className="text-red-500 text-xs mt-1">{language === 'fr' ? 'Veuillez saisir un code valide à 6 chiffres' : 'Please enter a valid 6-digit code'}</p>
                )}
              </div>
              
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">{t.noCode}</p>
                <button 
                  type="button"
                  className="text-teal-600 hover:text-teal-800 font-medium text-sm focus:outline-none"
                  onClick={handleResendCode}
                  disabled={isLoading}
                >
                  {t.resendCode}
                </button>
              </div>
              
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
                    {t.verifying}
                  </div>
                ) : (
                  t.verify
                )}
              </motion.button>
            </form>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.newPasswordTitle}</h2>
            <p className="text-gray-600 mb-6">{t.newPasswordDescription}</p>
            
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg">
                {errorMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit(handlePasswordReset)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">{t.newPassword}</label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-2 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                    placeholder={t.newPassword}
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
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">{t.confirmPassword}</label>
                <div className="relative">
                  <FiLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-teal-500 transition`}
                    placeholder={t.confirmPassword}
                    {...register('confirmPassword', { 
                      required: t.passwordRequired,
                      validate: value => value === password || t.passwordsMatch
                    })}
                  />
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
              </div>
              
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
                    {t.updating}
                  </div>
                ) : (
                  t.resetPassword
                )}
              </motion.button>
            </form>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div 
            key="step4"
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="text-center py-6"
          >
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <FiCheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.successTitle}</h2>
            <p className="text-gray-600 mb-8">
              {t.successDescription}
            </p>
            
            <motion.button
              type="button"
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-teal-600 to-cyan-700 text-white font-medium py-3 px-4 rounded-lg shadow-md hover:from-teal-700 hover:to-cyan-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.login}
            </motion.button>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  // Helper function to format phone number for display
  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    if (phone.startsWith('+237')) return phone;
    if (phone.startsWith('237')) return `+${phone}`;
    return `+237 ${phone}`;
  };

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

      {/* Back Button */}
      <motion.div 
        className="fixed top-4 left-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => {
            if (currentStep > 1 && currentStep < 4) {
              setCurrentStep(currentStep - 1);
            } else {
              navigate('/login');
            }
          }}
          className="flex items-center justify-center bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all"
          whileHover={buttonVariants.hover}
          whileTap={buttonVariants.tap}
          aria-label={language === 'fr' ? "Retour" : "Back"}
        >
          <FiArrowLeft className="text-teal-700" size={24} />
        </motion.button>
      </motion.div>

      <div className="w-full max-w-md mx-auto mt-16">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-700 p-6 text-center">
            <img src={logo} alt="Thunder Technology Logo" className="h-16 mx-auto mb-2" />
            <div className="flex justify-center mt-4">
              <div className="flex space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep >= step ? 'bg-white text-teal-700' : 'bg-teal-400 text-white'
                    }`}>
                      {currentStep > step ? (
                        <FiCheckCircle className="w-5 h-5" />
                      ) : (
                        <span>{step}</span>
                      )}
                    </div>
                    {step < 3 && (
                      <div className={`w-10 h-1 ${
                        currentStep > step ? 'bg-white' : 'bg-teal-400'
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {t.needHelp} <a href="mailto:thundersinnov@gmail.com" className="text-teal-600 hover:text-teal-800 font-medium">{t.contactUs}</a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;