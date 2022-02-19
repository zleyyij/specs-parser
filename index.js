console.log("Starting...");
const axios = require('axios');

var response;
let hw={};

function stripTdTags(input){
  return input.replace("</td><td>", " ");


}


async function getSpecsResults(){

let specsResponse = await axios.get("https://paste.rtech.support/selif/5cy6avnh.html").catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
response = await specsResponse.data;

}


async function getIssues(){
  console.log(await response.match(/(?<=<h2>Visible issues<\/h2>)(.*)(?=<a name="top"><\/a>)/gis));

}
async function hwSummary(){
  //regexing the cpu from the summary and removing residual html tags
  hw.cpu = stripTdTags(response.match(/(?<=<tr><td>CPU<\/td><td>)(.*)(?=z<\/td>)[z]/gis)[0]);
  console.log(hw.cpu);
  hw.gpu = stripTdTags(response.match(/(?<=Video Card<\/td><td>(NVIDIA|AMD|INTEL)<\/td><td>)(.*)(?=<\/td><td>( OHMF|[0-9][0-9]))/gi)[0])
  console.log(hw.gpu);
  console.log(response.match(/(?<=RAM<\/th><\/tr>\n)(.*)(?=<\/tbody><\/table>\n<table>\n<colgroup><col><col><col><col><col><col><\/colgroup>)/gis));
  hw.ram = stripTdTags(response.match(/(?<=RAM<\/th><\/tr>\n)(.*)(?=<\/tbody><\/table>\n<table>\n<colgroup><col><col><col><col><col><col><\/colgroup>)/gis)[0])
  console.log(hw.ram)
//working string
///(?<=Video Card<\/td><td>(NVIDIA|AMD|INTEL)<\/td><td>)(.*)(?=<\/td><td>( OHMF)(<\/td><\/tr>))/gis
  
  

  // dirtyResponse = response.match(/(?<=<tr><td>CPU<\/td><td>)(.*)(?=z<\/td>)[z]/gis)
 // console.log(dirtyResponse + `\n` + cleanResponse);

}
async function main(){
    
    
        await getSpecsResults();
        await getIssues();
        await hwSummary();

        console.log("Program Ended.")
}
main();
