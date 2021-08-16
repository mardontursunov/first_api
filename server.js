const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('Server is running on port *' + PORT))

// middlewares
app.use( express.json())
app.use( express.urlencoded({
	extended: true
}))

// data
let data = []

// controllers
class Controllers {
	static async regPostController ( req, res ) {
		const { name, year, password, email } = req.body
		if( name && year && password && email ){
			data.push({name, year, password, email} )
			res.status(200).json({
				message: "Data has added!"
			})
		} else {
			res.status(400).json({
				message: "Fields are empty!"
			})
		}
	}
	static async regGetController ( req, res ) {
		res.status(200).send(data)
	}
	static filterGetController ( req, res ) {
		try {
			const filtered = data.sort( function (a,b) {
				return a.year - b.year
			})
			res.send(filtered)
		} catch(e) {
			res.send(e)
		}
	}

}

// routes
app.post('/users', Controllers.regPostController)
app.get('/users', Controllers.regGetController)
app.get('/users/filter', Controllers.filterGetController)

