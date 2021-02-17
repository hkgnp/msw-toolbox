window.addEventListener('DOMContentLoaded', async () => {
  let response = await axios.get(
    'https://polar-retreat-01092.herokuapp.com/referrals'
  );

  for (let p of response.data) {
    let html = `
        <tr>
            <td>${p.referTo}</td>
            <td>${p.referrerName}</td>
            <td>${p.referrerOrg}</td>
            <td>${p.referrerEmail}</td>
            <td>${p.patientName}</td>
            <td>${p.patientIdent}</td>
            <td>${p.patientContact}</td>
            <td>${p.patientSR}</td>
        </tr>
    `;
    document.querySelector('#referral_history').innerHTML += html;
  }
});
