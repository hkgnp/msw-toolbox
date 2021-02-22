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

// New Referral Button
document.querySelector('#new-referral').addEventListener('click', () => {
  location.href = 'index.html';
});

// Set Timer for Using GPS to Search
let count = 6;
const loadingTimer = () => {
  count = count - 1;
  document.querySelector(
    '#timer'
  ).innerHTML = `Please wait: ${count}s to get your location`;
};

/////////// FUNCTION: localStorage ///////////
let storeReferrals = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value));
};

let retrieveReferrals = (key) => {
  JSON.parse(window.sessionStorage.getItem(key));
};

////////// Store Form Content in localStorage //////////
let referral = [];
let patientReferral;

// Refer button
document.querySelector('#refer-btn').addEventListener('click', async () => {
  // Define variables for use with Mongo and localStorage
  let referTo = ssoPopupName || fscPopupName || disabilityPopupName;
  let referrerName = document.querySelector('#referrerName').value;
  let referrerOrg = document.querySelector('#referrerOrg').value;
  let referrerEmail = document.querySelector('#referrerEmail').value;
  let patientName = document.querySelector('#patientName').value;
  let patientIdent = document.querySelector('#patientIdent').value;
  let patientContact = document.querySelector('#patientContact').value;
  let patientSR = document.querySelector('#patientSR').value;

  // Check for blank fields
  if (
    !referTo ||
    !referrerName ||
    !referrerOrg ||
    !referrerEmail ||
    !patientName ||
    !patientIdent ||
    !patientContact ||
    !patientSR
  ) {
    document.querySelector(
      '#refer-success'
    ).innerHTML = `Please ensure all fields are completed.`;
  } else {
    document.querySelector('#refer-success').innerHTML = `Please wait...`;
    // Define payload
    let payLoad = {
      referTo: referTo,
      referrerName: referrerName,
      referrerOrg: referrerOrg,
      referrerEmail: referrerEmail,
      patientName: patientName,
      patientIdent: patientIdent,
      patientContact: patientContact,
      patientSR: patientSR,
    };

    // Push form values to array for localStorage
    referral.push(payLoad);

    // Send to MongoDB
    await axios.post(
      'https://polar-retreat-01092.herokuapp.com/referrals',
      payLoad
    );

    // Store referral details in local storage
    storeReferrals(patientReferral, referral);

    document.querySelector(
      '#refer-success'
    ).innerHTML = `Your referral has been successfully sent. You may close this popup.`;
    retrieveReferrals(patientReferral);

    document.querySelector('#referral-summary').innerHTML += `
      <p>
      <h4><span class="badge bg-success mr-3 text-light">SUCCESS</span></h4>
      <h2>Referred To:</h2>
      <h2>${referral[0].referTo}</h2>

      <h4>Referrer's Details</h4>

      <p>Your Name: <u>${referral[0].referrerName}</u></p>

      <p>Your Organisation: <u>${referral[0].referrerOrg}</u></p>

      <p>Your Email: <u>${referral[0].referrerEmail}</u></p>

      <h4>Patient's Details</h4>

      <p>Name: <u>${referral[0].patientName}</u></p>

      <p>Identifier: <u>${referral[0].patientIdent}</u></p>

      <p>Contact: <u>${referral[0].patientContact}</u></p>

      <p>Social Report: <u>${referral[0].patientSR}</u></div>
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

ScrollReveal().reveal('.instructions', { delay: 1100 });

ScrollReveal().reveal('#location', singlePage);

ScrollReveal().reveal('#search-results', singlePage);

ScrollReveal().reveal('#aboutthisapp', singlePage);

ScrollReveal().reveal('#techcredits', singlePage);

ScrollReveal().reveal('#contact', singlePage);
// Scroll reveal END
