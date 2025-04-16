import { getConnection } from '@/lib/db'
import { NextResponse } from 'next/server'  

export async function GET(req) {
  try {
    const db = await getConnection();
    const [rows] = await db.query('SELECT * FROM faturamento_total_view');
    
    if (rows.length > 0) {
      const total = rows[0].total_faturado || 0;
      return NextResponse.json({ total }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Dados não encontrados' }, { status: 404 });
    }
  } catch (error) {
    console.error('Erro na API faturamento:', error);
    return NextResponse.json({ error: 'Erro ao calcular o faturamento.' }, { status: 500 });
  }
}
