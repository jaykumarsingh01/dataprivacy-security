import { evaluatePassword } from './validation.js';

window.checkStrength = function () {
  const password = document.getElementById('password').value;
  const strength = document.getElementById('strength');
  const feedback = document.getElementById('feedback');

  const score = evaluatePassword(password, feedback);

  if (score <= 2) {
    strength.textContent = "Weak";
    strength.style.color = "red";
  } else if (score <= 4) {
    strength.textContent = "Medium";
    strength.style.color = "orange";
  } else {
    strength.textContent = "Strong";
    strength.style.color = "green";
  }
};

window.savePassword = function () {
  const password = document.getElementById('password').value;
  alert(`Saving password: ${password} (This should go to your database!)`);
  // TODO: Replace alert with backend API POST request
};

window.updatePassword = function () {
  const password = document.getElementById('password').value;
  alert(`Updating password to: ${password} (This should update in your database!)`);
  // TODO: Replace alert with backend API PUT request
};
window.generatePassword = function () {
    const passwordField = document.getElementById('password');
    const displayField = document.getElementById('generated-password');
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]<>?";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    passwordField.value = password;
    displayField.textContent = "Generated Password: " + password;
    checkStrength(); // Re-evaluate strength
  };
  
  window.copyPassword = function () {
    const passwordField = document.getElementById('password');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile
    navigator.clipboard.writeText(passwordField.value)
      .then(() => alert("Password copied to clipboard!"))
      .catch(() => alert("Failed to copy password."));
  };
  window.refreshPage = function () {
    location.reload();
  };
  window.generatePassword = function () {
    const passwordField = document.getElementById('password');
    const displayField = document.getElementById('generated-password');
  
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
  
    let charset = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+{}[]<>?";
  
    if (charset.length === 0) {
      alert("Please select at least one character type.");
      return;
    }
  
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  
    passwordField.value = password;
    displayField.textContent = "Generated Password: " + password;
    checkStrength();
  };







  let historyIndex = 0;
  saveToHistory(password);
  historyIndex = 0; // Reset on new generation
  function saveToHistory(password) {
    let history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    if (!history.includes(password)) {
      history.unshift(password);
      if (history.length > 10) history.pop(); // Max 10
      localStorage.setItem('passwordHistory', JSON.stringify(history));
    }
  }
  
  window.showNextHistory = function () {
    const history = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    const display = document.getElementById('history-display');
  
    if (history.length === 0) {
      display.textContent = "No password history yet.";
      return;
    }
  
    if (historyIndex >= history.length) {
      historyIndex = 0;
    }
  
    const password = history[historyIndex];
    display.innerHTML = `History [${historyIndex + 1}/${history.length}]: 
      <span onclick="reuseHistory('${password}')" style="cursor: pointer; text-decoration: underline;">${password}</span>`;
    historyIndex++;
  };
  
  window.reuseHistory = function (password) {
    document.getElementById('password').value = password;
    document.getElementById('generated-password').textContent = "Selected from history: " + password;
    checkStrength();
  };
  
  window.refreshPage = function () {
    location.reload();
  };

  window.refreshPage = function () {
    document.getElementById('password').value = "";
    document.getElementById('generated-password').textContent = "";
    document.getElementById('strength').textContent = "";
    document.getElementById('feedback').innerHTML = "";
    document.getElementById('history-display').textContent = "";
    historyIndex = 0;
  
    // Optionally reset checkboxes:
    // document.getElementById('includeUppercase').checked = true;
    // document.getElementById('includeNumbers').checked = true;
    // document.getElementById('includeSymbols').checked = true;
  };
