import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answers, score, nivel } = body;

    // Validar que tengamos datos mínimos
    if (!answers || !answers.email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      );
    }

    // Insertar en la base de datos
    const result = await sql`
      INSERT INTO diagnosticos (
        nombre,
        email,
        organizacion,
        rol,
        sector,
        pain_point,
        madurez,
        conocimiento_cert,
        objetivos,
        score,
        nivel
      ) VALUES (
        ${answers.nombre || null},
        ${answers.email},
        ${answers.organizacion || null},
        ${answers.rol || null},
        ${answers.sector || null},
        ${answers.pain_point || null},
        ${answers.madurez || null},
        ${answers.conocimiento_cert || null},
        ${Array.isArray(answers.objetivos) ? answers.objetivos : null},
        ${score || null},
        ${nivel || null}
      )
      RETURNING id
    `;

    return NextResponse.json({ 
      success: true, 
      id: result[0].id 
    }, { status: 200 });

  } catch (error) {
    console.error('Error guardando diagnóstico:', error);
    return NextResponse.json(
      { error: 'Error al guardar el diagnóstico' },
      { status: 500 }
    );
  }
}

