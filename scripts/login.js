window.addEventListener('DOMContentLoaded', async () => {
  let response = await axios.get(
    'https://polar-retreat-01092.herokuapp.com/referrals'
  );

  for (let p of response.data) {
    let html = `
        <div class="card mb-2 d-block" style="width: 100%">
            <div class="card-body">
            <h4 class="card-title bg-dark text-light p-3">${p.patientName}</h4>
                <div class="card-text">
                    <h6>Referred To: <span class="badge badge-primary badge-sm p-2 my-2">${p.referTo}</span></h6>
                </div>
                <div class="card-text">
                    <h6><u>Referrer Details</u></h6>
                    <p>Name: ${p.referrerName}</p>
                    <p>Organisation: ${p.referrerOrg}</p>
                    <p>Email: ${p.referrerEmail}</p>
                </div>
                <div class="card-text">
                    <h6><u>Patient Details</u></h6>
                    <p>Name: ${p.patientName}</p>
                    <p>Identifier: ${p.patientIdent}</p>
                    <p>Contact: ${p.patientContact}</p>
                    <p>Social Report: ${p.patientSR}</p>
                </div>
            </div>
        </div>
    `;
    document.querySelector('#referralhistory').innerHTML += html;
  }
});
