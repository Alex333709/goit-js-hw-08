import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const formStateKey = 'feedback-form-state';

const updateFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  try {
    localStorage.setItem(formStateKey, JSON.stringify(formState));
  } catch (error) {
    console.error('Error saving form state:', error);
  }
}, 500);

const populateFormFields = () => {
  const savedFormState = localStorage.getItem(formStateKey);

  if (savedFormState) {
    try {
      const { email, message } = JSON.parse(savedFormState);
      emailInput.value = email;
      messageInput.value = message;
    } catch (error) {
      console.error('Error retrieving form state:', error);
    }
  }
};

const clearFormState = () => {
  try {
    localStorage.removeItem(formStateKey);
  } catch (error) {
    console.error('Error clearing form state:', error);
  }

  emailInput.value = '';
  messageInput.value = '';
};

feedbackForm.addEventListener('input', updateFormState);
window.addEventListener('DOMContentLoaded', populateFormFields);
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log('Form submission:');
  console.log(formState);

  clearFormState();
});
