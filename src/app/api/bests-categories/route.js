import { getConnection } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    const db = await getConnection()

    const [rows] = await db.query('SELECT * FROM view_categorias_mais_vendidas')

    return NextResponse.json({ categorias: rows }, { status: 200 })
  } catch (error) {
    console.error('Erro na API categorias mais vendidas:', error)
    return NextResponse.json({ error: 'Erro ao buscar categorias.' }, { status: 500 })
  }
}
