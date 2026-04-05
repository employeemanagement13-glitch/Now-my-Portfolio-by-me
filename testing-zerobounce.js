import ZeroBounceSDK from '@zerobounce/zero-bounce-sdk';

const zeroBounce = new ZeroBounceSDK();

// Initialize with your API Key
zeroBounce.init("0966559329e64f1dbb141b6cab54152f");

try {
  const response = await zeroBounce.validateEmail("startingasafreelancersheh2233@gmail.com");
  console.log("Validation Result:", response);
} catch (error) {
  console.error("Error:", error);
}
