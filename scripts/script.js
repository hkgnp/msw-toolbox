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
    patientSR: document.querySelector('#patientSR').value,
  });
  // Store referral details in local storage
  storeReferrals(patientReferral, referral);
  document.querySelector(
    '#refer-success'
  ).innerHTML = `Your referral has been successfully sent. You may close this popup.`;
  retrieveReferrals(patientReferral);
  let i;
  for (i = 0; i < referral.length; i++) {
    document.querySelector('#referral-summary').innerHTML += `
      <p>
      <h2><span class="badge bg-success mr-3 text-light">SUCCESS</span></h2>

      <h4>Referrer's Details</h4>

      <p>Your Name: <u>${referral[i].referrerName}</u></p>

      <p>Your Organisation: <u>${referral[i].referrerOrg}</u></p>

      <p>Your Email: <u>${referral[i].referrerEmail}</u></p>

      <h4>Patient's Details</h4>

      <p>Name: <u>${referral[i].patientName}</u></p>

      <p>Identifier: <u>${referral[i].patientIdent}</u></p>

      <p>Contact: <u>${referral[i].patientContact}</u></p>

      <p>Social Report: <u>${referral[i].patientSR}</u></div>
      </p>
      `;
  }
});

document.querySelector('#close-btn').addEventListener('click', () => {
  document.querySelector('#refer-success').innerHTML = '';
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
