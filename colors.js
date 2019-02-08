
const color_vectors = {}
color_vectors.primary = [
	[1,0,0],
	[0,1,0],
	[0,0,1],
]

const pbv = color_vectors.primary // Primary Basis Vectors

function getCombinations(basis_1=pbv, basis_2=pbv) {
	for ( index in basis_1) {
		const vector = basis_1[index]
		console.log(vector)
	}
}

for ( index in color_vectors.primary) {
	const vector = color_vectors.primary[index]
	getCombinations()
}
// Primary
const red			= [1,0,0]
const green			= [0,1,0]
const blue			= [0,0,1]

// Secondary
const yellow		= [1,1,0] 
const cyan 			= [0,1,1] 
const magenta		= [1,0,1] 

// Tertiary
const rose			= [2,0,1] 
const orange		= [2,1,0]
const chartreuse 	= [1,2,0] 
const spring_green	= [0,2,1] 
const azure 		= [0,1,2] 
const violet		= [1,0,2]

// Quartenary
const crimson 		= [4,0,1] 
const vermillion 	= [4,1,0]
const amber			= [4,3,0]
const lime			= [3,4,0]
const harlequin		= [1,4,0]
const erin			= [0,4,1]
const aquamarine	= [0,4,3]
const capri			= [0,3,4]
const cerulean		= [0,1,4]
const ultramarine	= [1,0,4]
const purple		= [3,0,4]
const cerise		= [4,0,3]

/*

console.log('binary']
(1,1,1)
(0,0,0)

console.log('primary')
(1,0,0)
(0,1,0)
(0,0,1)

// 1 White + 1 Primary
console.log('secondary_pastel')
(2,1,1)
(1,2,1)
(1,1,2)

// 
console.log('tertiary-second_combos')
(3,3,2)
(3,2,3)
(2,3,3)


console.log('tertiary-primary_second_combos')
(3,1,1)
(2,2,1)
(2,1,2)

(2,2,1)
(1,3,1)
(1,2,2)

(2,1,2)
(1,2,2)
(1,1,3)





console.log('quartenary')
(1,2,0)
(0,2,1)
(0,1,2)
(2,0,1)
(1,0,2)



console.log('secondary_traditional')
(1,1,0)
(1,0,1)
(0,1,1)

console.log('tertiary')
(2,1,0)
(1,2,0)
(0,2,1)
(0,1,2)
(2,0,1)
(1,0,2)
*/
