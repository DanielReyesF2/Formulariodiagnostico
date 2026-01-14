#!/bin/bash
# Script para subir el código a GitHub

echo "🚀 Subiendo código a GitHub..."

# Reemplaza TU-USUARIO con tu usuario de GitHub
GITHUB_URL="https://github.com/TU-USUARIO/econova-diagnostico.git"

# Agregar remote
git remote add origin $GITHUB_URL 2>/dev/null || git remote set-url origin $GITHUB_URL

# Asegurar que estamos en main
git branch -M main

# Push
git push -u origin main

echo "✅ Código subido exitosamente a GitHub!"
echo "📝 Ahora puedes desplegar en Railway desde: https://railway.app"

