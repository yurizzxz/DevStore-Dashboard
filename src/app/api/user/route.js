import { getConnection } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
	let connection
	try {
		connection = await getConnection()
		const [user] = await connection.query('SELECT * FROM users')
		return NextResponse.json(user)
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: error.message })
	} finally {
		if (connection) connection.release()
	}
}

export async function POST(req) {
	let connection
	try {
		const data = await req.json()

		const {
			nome,
			email,
			password,
			telefone,
			cpf,
			rua,
			cidade,
			estado,
			cep,
			cargo
		} = data

		connection = await getConnection()
		const [result] = await connection.query(
			`INSERT INTO users (nome, email, password, telefone, cpf, rua, cidade, estado, cep, cargo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
			[nome, email, password, telefone, cpf, rua, cidade, estado, cep, cargo]
		)

		return NextResponse.json({ message: "Usuário cadastrado!", id: result.insertId })
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: error.message }, { status: 500 })
	} finally {
		if (connection) connection.release()
	}
}
