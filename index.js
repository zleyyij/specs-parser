console.log("Starting...");

//loading dependancies
import axios from 'axios';
import { countReset } from 'console';
import fs from 'fs';
import { parse } from 'node-html-parser';
// object where all data is stored
let hw={};
//raw response.data from paste
let response;
//parsed html data
 let root;
 //innerHTML for root
 let core;

//Niceties functions


//Obtaining the raw results from the paste
async function getSpecsResults(){
  response = await axios.get("https://paste.rtech.support/selif/8s8sc55j.html");
  response = await response.data;
  root = parse(await response);
  core = await parse(root.innerHTML).rawText;
  }

  
  //Regexing issues from the text
async function getIssues(){
  hw.issues = core.match(/(?<=Visible issues\r\n)(.*)(?=\r\nSections)/gis)[0];
}


async function hwSummary(){
//obtaining cpu data from core
if(core.match(/(?<=CPU(GenuineIntel|AuthenticAMD|HygonGenuine))(.*)(?=( OHMF\r\nMotherboard|[0-9][0-9]\r\n Motherboard|\r\n [0-9][0-9][0-9]\n Motherboard\n))/gis)){
hw.cpu = core.match(/(?<=CPU(GenuineIntel|AuthenticAMD|HygonGenuine))(.*)(?=( OHMF\r\nMotherboard|[0-9][0-9]\r\n Motherboard|\r\n [0-9][0-9][0-9]\n Motherboard\n))/gis)[0];
} else{
hw.cpu = 'Not Found'
}
//motherboard
if(core.match(/(?<=Motherboard)(.*)(?=Video Card)/gis)){
  hw.mobo = core.match(/(?<=Motherboard)(.*)(?=\r\nVideo Card)/gis)[0];
} else {
  hw.mobo= 'Not Found'
}
//gpu
if(core.match(/(?<=Video Card)(.*)(?=( OHMF|[0-9][0-9]\r\nTotalRAM))/gis)){
  hw.gpu = core.match(/(?<=Video Card(NVIDIA|AMD|INTEL))(.*)(?=( OHMF|[0-9][0-9]\r\nTotalRAM))/gis)[0];
} else hw.gpu = 'Not Found';
//ram
if(core.match(/(?<=TotalRam\r\n)(.*)(?=\r\n\r\n\r\n\r\nManuf)/gis)){
 hw.ram = core.match(/(?<=TotalRam\r\n)(.*)(?=\r\n\r\n\r\n\r\nManuf)/gis)[0]
}
}


async function main(){
  //Setting response to data
  await getSpecsResults();
      await hwSummary();
       await getIssues();
       
   
       console.log(hw)

    console.log("Program Ended.")
}
main();
