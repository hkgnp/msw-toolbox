// Insert placeholder after radio button is selected
document.querySelector('#selectedradio').addEventListener('click', () => {
  let userService;
  let serviceRadios = document.querySelectorAll('.services');
  for (let service of serviceRadios) {
    if (service.checked) {
      userService = service.id;
    }
  }

  document.querySelector(
    '#postalcode'
  ).placeholder = `Searching for ${userService}`;
});

// Set Timer for Using GPS to Search
let count = 6;
const loadingTimer = () => {
  count = count - 1;
  document.getElementById(
    'timer'
  ).innerHTML = `Please wait: ${count}s to get your location`;
};

/////////// FUNCTION: localStorage ///////////
let storeReferrals = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

let retrieveReferrals = (key) => {
  console.log(JSON.parse(window.localStorage.getItem(key)));
};

let referral = [];
let patientReferral;
// Refer button
document.querySelector('#refer-btn').addEventListener('click', () => {
  referral.push({
    referrerName: document.querySelector('#referrerName').value,
    referrerOrg: document.querySelector('#referrerOrg').value,
    referrerEmail: document.querySelector('#referrerEmail').value,
    patientName: document.querySelector('#patientName').value,
    patientIdent: document.querySelector('#patientIdent').value,
    patientContact: document.querySelector('#patientContact').value,
    patientSR: document.querySelector('#patientSR').innerHTML,
  });
  // Store referral details in local storage
  storeReferrals(patientReferral, referral);
  document.querySelector(
    '#refer-success'
  ).innerHTML = `Your referral has been successfully sent. You may close this popup.`;
});

document.querySelector('#close-btn').addEventListener('click', () => {
  document.querySelector('#refer-success').innerHTML = '';
});
document.querySelector('#get-referrals').addEventListener('click', () => {
  retrieveReferrals(patientReferral);
  document.querySelector('#login').innerHTML = `
  <h2>Referral History</h2><br>
  <p>Your Name: ${referral[0].referrerName}</p><br>
  <p>Your Organisation: ${referral[0].referrerOrg}</p><br>
  <p>Your Email: ${referral[0].referrerEmail}</p><br>
  <h3>Patient's Details</h3><br>
  <p>Name: ${referral[0].patientName}</p><br>
  <p>Identifier: ${referral[0].patientIdent}</p><br>
  <p>Contact: ${referral[0].patientContact}</p><br>
  <p>Social Report: ${referral[0].patientSR}</p><br>
  
  `;
});

// Scoll Reveal START
const slideUp = {
  distance: '150%',
  origin: 'bottom',
  reset: true,
  duration: 1000,
  delay: 800,
};

const singlePage = {
  reset: true,
  duration: 2000,
  delay: 400,
};

ScrollReveal().reveal('.slide-up', slideUp);

ScrollReveal().reveal('.logo', { delay: 500 });

ScrollReveal().reveal('.instructions', { delay: 1500 });

ScrollReveal().reveal('#location', singlePage);

ScrollReveal().reveal('#search-results', singlePage);

ScrollReveal().reveal('#aboutthisapp', singlePage);

ScrollReveal().reveal('#contact', singlePage);

// Scroll reveal END
