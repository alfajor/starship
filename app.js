/** 	
	TODO: 
	** Starship sales site w/features:
	 - list all starships
	 - filter by price
	 - sort by price 
	 - search list of ships 
	 - view individual ships 
	 - view pilot info of ships
	 
	 API endpoints: http://swapi.co/api/starships & http://swapi.co/api/people/:id
**/
const fetch = require('node-fetch');
const stdio = require('stdio');
const colors = require('colors');
const program = require('commander');

program.version('1.0.0')
	   .option('-a, --all', 'show all starship info')
	   .option('-l, --list', 'list all ships')
	   .option('-p, --price', 'filter ships by price')
       .option('-pl, --pilots', 'get pilot info')
       //.option('-s, --sort', 'sort ships by price')
       .parse(process.argv);
console.log('Run -h or --help for all options'.cyan + '\r\n');


//stdio.question('Enter a ship name '.cyan, () => {
function getStarships() {	
	fetch(`http://swapi.co/api/starships`).then((res) => {
	    return res.json();
	    }).then((starships) => {
	      let output = starships.results;
	      output.forEach((ship) => {
		    if(program.all) console.log(ship);
			if(program.list) console.log(ship.name.yellow + ': ' + ship.model.green + ' - ' + ship.manufacturer + '\r\n' + ship.pilots);
			if(program.price) console.log(ship.name + ' - ' + ship.cost_in_credits.blue);
			if(program.pilots) console.log(ship.pilots.toString());
	      })
	    }).catch(error => console.error(`There was an ${error}`.red))
}

getStarships();

function getPilot(pilot) {
	fetch(`https://swapi.co/api/people/:1`).then((res) => {
		return res.json();
	}).then((person) => {
		console.log(person.name);
	})
}

//getPilot();
 
// });