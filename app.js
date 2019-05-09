const fetch = require('node-fetch');
const colors = require('colors');
const program = require('commander');

program
  .version(`1.0.0`.white)
  .description(`A command line reference for Star Wars starships`.rainbow
  .option(`-a, --all`, `Show all raw starship info`)
  .option(`-l, --list`, `List some ship tech specs`)
  .option(`-p, --price`, `Filter ships by price`)
  .option(`--pilots`, `List last operators of the ship`)
  .parse(process.argv);
    
console.log(` In a computer terminal far far away... \n Run -h or --help for all options`.cyan);

function getStarships() {
   fetch(`http://swapi.co/api/starships`).then((res) => {
	 return res.json();
   }).then((starships) => {
	let output = starships.results;
	output.forEach((ship) => {
		let pilotUrls = ship.pilots.join('\r\n');
		let parsed = pilotUrls.split('/');
		let id = parsed[5];

		if(program.all) console.log(ship); 
		if(program.price) console.log(`\n Ship: ${ship.name} \n Price: ${ship.cost_in_credits.blue}`);
					

		fetch(`https://swapi.co/api/people/${id}`).then((res) => {
			return res.json();
		}).then((person) => {
			if(program.pilots && id !== undefined) { 
				console.log(`\n Pilot: ${person.name.magenta} \n Ship: ${ship.name.yellow}`); 
			} else if(program.pilots && id == undefined) {
				console.log(`\n Pilot: No pilot found \n Ship: ${ship.name.yellow}`); 
			}
							
			if(program.list && id !== undefined) {
				console.log(`\n Ship: ${ship.name.yellow} \n Model: ${ship.model.grey} \n Cargo Capacity: ${ship.cargo_capacity.magenta} \n Manufacturer: ${ship.manufacturer.white} \n Pilots: ${person.name.cyan}`);
			} else if(program.list && id == undefined) {
				console.log(`\n Ship: ${ship.name.yellow} \n Model: ${ship.model.grey} \n Manufacturer: ${ship.manufacturer.white} \n Pilots: No pilots found`);
			} 
		   })
	     	});
	    }).catch(error => console.error(`There was an ${error}`.red))
	   
}
getStarships();
