import { getConnection } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function getCategorias() {
  let connection
  try {
    connection = await getConnection()
    const [categorias] = await connection.query('SELECT * FROM categoria')
    return NextResponse.json(categorias)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    if (connection) connection.release()
  }
}

async function createCategoria(req) {
  let connection
  try {
    const data = await req.json()
    const { nome } = data

    if (!nome) {
      return NextResponse.json({ error: 'O campo "nome" é obrigatório.' }, { status: 400 })
    }

    connection = await getConnection()
    const [result] = await connection.query('INSERT INTO categoria (nome) VALUES (?)', [nome])

    return NextResponse.json({
      message: 'Categoria cadastrada!',
      id: result.insertId,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    if (connection) connection.release()
  }
}

async function updateCategoria(req) {
  let connection
  try {
    const data = await req.json()
    const { id, nome } = data
    const categoriaId = Number(id)

    if (!categoriaId || isNaN(categoriaId)) {
      return NextResponse.json({ error: 'ID inválido.' }, { status: 400 })
    }

    if (!nome) {
      return NextResponse.json({ error: 'O campo "nome" é obrigatório para atualização.' }, { status: 400 })
    }

    connection = await getConnection()
    await connection.query('UPDATE categoria SET nome=? WHERE id=?', [nome, categoriaId])

    return NextResponse.json({ message: 'Categoria atualizada!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    if (connection) connection.release()
  }
}

async function deleteCategoria(req) {
  let connection
  try {
    const { id } = await req.json()

    connection = await getConnection()
    await connection.query('DELETE FROM categoria WHERE id=?', [id])

    return NextResponse.json({ message: 'Categoria deletada!' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    if (connection) connection.release()
  }
}

export async function GET() {
  return await getCategorias()
}

export async function POST(req) {
  return await createCategoria(req)
}

export async function PUT(req) {
  return await updateCategoria(req)
}

export async function DELETE(req) {
  return await deleteCategoria(req)
}
