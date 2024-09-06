import { ApolloProvider } from '@apollo/client';

window.Webflow?.push(async () => {
  try {
    let errorDiv: HTMLElement;
    let successDiv: HTMLElement;

    console.log('Flow Phantom');

    // 1. Remove w-form to prevent Webflow from handling it
    const phoneForm = document.getElementById('phone-form') as HTMLFormElement;

    console.log('phoneForm', phoneForm);

    if (phoneForm && phoneForm.parentElement) {
      phoneForm.parentElement.classList.remove('w-form');

      // 2. Find the error and success divs
      errorDiv = phoneForm.parentElement.querySelector(
        '[data-name-form="error"]'
      ) as HTMLElement;

      console.log('errorDiv', errorDiv);

      successDiv = phoneForm.parentElement.querySelector(
        '[data-name-form="success"]'
      ) as HTMLElement;

      console.log('successDiv', successDiv);

      errorDiv.style.display = 'none';
      successDiv.style.display = 'none';

      // 3. Add our own submit handler
      phoneForm.onsubmit = async (event) => {
        try {
          event.preventDefault();

          // 4. Get the form data
          const formData = new FormData(phoneForm);

          // 5. Get the form entries as an object
          const data = Object.fromEntries(formData.entries());
          console.log('Form data', data);



          const graphqlQuery = {
            "operationName": "SendPinDigitalVirgoLandingPage",
            "variables": {
              "input": {
                "chosenSubscriptionFrequency": "WEEKLY",
                "operatorMCCMNC": "MCCMNC_INWI",
                "phoneNumber": "+212662727279"
              }
            },
            "query": "mutation SendPinDigitalVirgoLandingPage($input: SendPinInput!) {\n  sendPinDigitalVirgoLandingPage(input: $input)\n}\n"
          }
          

          // 6. Send the data to the server
          const response = await fetch(
            'https://p5500-zd57f20cc-z852170c3-gtw.zee620f8d.bool.sh/graphql',
            {
              method: 'POST',
              body: JSON.stringify(graphqlQuery),
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          console.log('Response status', response.status);

          if (response.status !== 200) {
            throw new Error('Response status is not 200');
          }

          // 6. Handle the response
          const responseData = await response.json();

          console.log('responseData', responseData);
          phoneForm.style.display = 'none';
          successDiv.style.display = 'block';
        } catch (e) {
          // 7. Handle the error
          if (e instanceof Error) {
            errorDiv.style.display = 'block';
            throw e;
          }
        }
      };
    }
  } catch (e) {
    console.error('error', e);
    // errorDiv.style.display = 'block';
  }
});
//# sourceMappingURL=main.js.map
