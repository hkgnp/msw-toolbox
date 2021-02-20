window.addEventListener('DOMContentLoaded', async () => {
  let response = await axios.get(
    'https://polar-retreat-01092.herokuapp.com/referrals'
  );
  let referralHistoryDiv = document.querySelector('#referralhistory');
  for (let p of response.data) {
    let pElement = document.createElement('p');
    let html = `
        <div class="card mb-2" style="width: 100%">
            <div class="card-body">
            <h4 class="card-title bg-dark text-light p-3">${p.patientName}</h4>
                <div class="card-text">
                    <h6>Referred To: <span class="badge badge-success badge-sm p-2 my-2">${p.referTo}</span></h6>
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
                <div class="card-text">
                  <button id="processbtn" class="btn btn-primary">Process (note that this is irreversible)</button>
                </div>
            </div>
        </div>
    `;

    // Create element
    pElement.innerHTML = html;

    pElement
      .querySelector('#processbtn')
      .addEventListener('click', async () => {
        await axios.delete(
          `https://polar-retreat-01092.herokuapp.com/referrals/${p._id}`
        );
        location.reload();
      });
    referralHistoryDiv.appendChild(pElement);
  }
});
