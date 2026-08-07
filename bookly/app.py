"""
Bookly — API de Precificação com IA
Rodar: python app.py
Endpoint: POST http://localhost:5000/api/recommend-price
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import hashlib
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

# ===== BASE DE PREÇOS POR GÊNERO =====
GENERO_BASE = {
    'Ficção': 55, 'Não-ficção': 48, 'Romance': 45, 'Aventura': 52,
    'Biografia': 50, 'Técnico': 85, 'Infantil': 35, 'Terror': 48,
    'Fantasia': 60, 'Outro': 50
}

# ===== MULTIPLICADORES DE CONDIÇÃO =====
CONDICAO_MULT = {
    'Perfeito': 1.00, 'Bom': 0.85, 'Médio': 0.70,
    'Ruim': 0.50, 'Péssimo': 0.30,
    'Novo': 1.00, 'Semi-novo': 0.85, 'Usado': 0.65,
    'Degradado': 0.40, 'Outlet': 0.35
}

# ===== MULTIPLICADORES DE ENCADERNAÇÃO =====
ENCADERNACAO_MULT = {'Capadura': 1.15, 'Brochura': 1.00}

# ===== BÔNUS POR ATRIBUTO =====
ATRIBUTO_BONUS = {
    'Primeira edição': 0.20, 'Cópia Assinada': 0.30,
    'Impresso Limitada': 0.25, 'Fora de catálogo': 0.15,
    'Vintage': 0.10, 'Antiguidade': 0.25
}

# ===== POPULARIDADE POR GÊNERO (para demanda) =====
GENERO_POPULARIDADE = {
    'Ficção': 75, 'Não-ficção': 60, 'Romance': 85, 'Aventura': 70,
    'Biografia': 55, 'Técnico': 45, 'Infantil': 40, 'Terror': 65,
    'Fantasia': 80, 'Outro': 50
}

# ===== LOJAS PARA COMPARAÇÃO =====
LOJAS = ['Amazon', 'eBay', 'eBay', 'Mercado Livre']

def gerar_seed(titulo, autores):
    """Gera um seed determinístico baseado no título e autor para resultados consistentes."""
    texto = (titulo + autores).lower().strip()
    return int(hashlib.md5(texto.encode()).hexdigest()[:8], 16)

def calcular_preco_sugerido(dados):
    """Motor de precificação — analisa todos os atributos do livro."""
    random.seed(gerar_seed(dados.get('titulo', ''), dados.get('autores', '')))

    # 1. Preço base por gênero
    genero = dados.get('genero', 'Outro')
    preco_base = GENERO_BASE.get(genero, 50)

    # 2. Multiplicador de condição
    estado = dados.get('estado', 'Bom')
    mult_condicao = CONDICAO_MULT.get(estado, 0.75)

    # 3. Multiplicador de encadernação
    encadernacao = dados.get('encadernacao', 'Brochura')
    mult_encad = ENCADERNACAO_MULT.get(encadernacao, 1.0)

    # 4. Bônus por atributos especiais
    atributos = dados.get('atributos', [])
    bonus_total = 0
    for attr in atributos:
        bonus_total += ATRIBUTO_BONUS.get(attr, 0)

    # 5. Fator ano (livros mais antigos com atributo vintage/antiguidade ganham mais)
    ano = dados.get('ano', '')
    fator_ano = 1.0
    if ano and len(ano) >= 6:
        try:
            ano_num = int(ano.split('/')[-1])
            if ano_num < 80:
                ano_num += 2000
            else:
                ano_num += 1900
            idade = datetime.now().year - ano_num
            if idade > 30 and ('Vintage' in atributos or 'Antiguidade' in atributos):
                fator_ano = 1.0 + (idade * 0.005)  # +0.5% por ano de idade
        except (ValueError, IndexError):
            pass

    # 6. Bônus ISBN
    has_isbn = dados.get('hasISBN', True)
    fator_isbn = 1.05 if has_isbn else 1.0

    # 7. Variação aleatória controlada (±5%)
    variacao = 1.0 + random.uniform(-0.05, 0.05)

    # ===== CÁLCULO FINAL =====
    preco_sugerido = preco_base * mult_condicao * mult_encad * fator_ano * fator_isbn * variacao
    preco_sugerido = round(preco_sugerido * (1 + bonus_total), 2)

    # Garantir mínimo
    preco_sugerido = max(preco_sugerido, 15.00)

    return preco_sugerido

def calcular_media_mercado(preco_sugerido, seed_num):
    """Gera a média de mercado com leve variação abaixo do sugerido."""
    random.seed(seed_num + 1)
    variacao = random.uniform(0.60, 0.75)  # Média do mercado costuma ser 60-75% do sugerido
    return round(preco_sugerido * variacao, 2)

def calcular_margem_lucro(preco_sugerido, media_mercado):
    """Calcula a margem de lucro estimada."""
    if media_mercado > 0:
        margem = ((preco_sugerido - media_mercado * 0.4) / preco_sugerido) * 100
        return round(margem, 2)
    return 50.0

def calcular_demanda(dados, seed_num):
    """Calcula score de demanda baseado em gênero, condição e atributos."""
    random.seed(seed_num + 2)
    genero = dados.get('genero', 'Outro')
    base = GENERO_POPULARIDADE.get(genero, 50)

    # Ajuste por condição
    estado = dados.get('estado', 'Bom')
    if estado in ('Perfeito', 'Novo'):
        base += 5
    elif estado in ('Ruim', 'Péssimo', 'Degradado'):
        base -= 15

    # Ajuste por atributos
    atributos = dados.get('atributos', [])
    base += len(atributos) * 3

    # Variação
    base += random.randint(-5, 5)

    return max(10, min(100, base))

def gerar_comparacao_lojas(preco_sugerido, seed_num):
    """Gera preços de comparação com outras lojas."""
    random.seed(seed_num + 3)
    comparacoes = []
    variacoes = [random.uniform(0.85, 1.15), random.uniform(0.70, 0.95),
                 random.uniform(0.65, 0.90), random.uniform(0.90, 1.20)]

    for i, loja in enumerate(LOJAS):
        preco_loja = round(preco_sugerido * variacoes[i], 2)
        comparacoes.append({
            'loja': loja,
            'preco': preco_loja,
            'diferenca': round(preco_loja - preco_sugerido, 2),
            'diferenca_pct': round(((preco_loja - preco_sugerido) / preco_sugerido) * 100, 1)
        })

    return comparacoes

def gerar_analise_ia(dados, preco_sugerido, media_mercado, demanda):
    """Gera uma análise textual simulando IA."""
    titulo = dados.get('titulo', 'este livro')
    estado = dados.get('estado', 'Bom')
    genero = dados.get('genero', 'geral')
    atributos = dados.get('atributos', [])

    analise = f"Análise de mercado para \"{titulo}\":\n\n"
    analise += f"• Gênero {genero} tem demanda {'alta' if demanda > 70 else 'média' if demanda > 40 else 'baixa'} no mercado atual.\n"
    analise += f"• Condição \"{estado}\" afeta o preço em "

    mult = CONDICAO_MULT.get(estado, 0.75)
    if mult >= 1.0:
        analise += "positivo, mantendo valor cheio.\n"
    else:
        analise += f"{round((1-mult)*100)}% em relação a um livro novo.\n"

    if atributos:
        analise += f"• Atributos especiais ({', '.join(atributos)}) adicionam valor de colecionador.\n"

    if media_mercado < preco_sugerido:
        analise += f"\n✓ Preço sugerido de R$ {preco_sugerido:.2f} está {round(((preco_sugerido-media_mercado)/media_mercado)*100)}% acima da média de mercado.\n"
        analise += "Isso é justificado pelos atributos e condição do exemplar."

    return analise

@app.route('/api/recommend-price', methods=['POST'])
def recommend_price():
    """Endpoint principal — recebe dados do livro e retorna recomendações de preço."""
    try:
        dados = request.json

        if not dados or not dados.get('titulo'):
            return jsonify({'erro': 'Título do livro é obrigatório'}), 400

        # Gerar seed para resultados consistentes
        seed_num = gerar_seed(dados.get('titulo', ''), dados.get('autores', ''))

        # Cálculos
        preco_sugerido = calcular_preco_sugerido(dados)
        media_mercado = calcular_media_mercado(preco_sugerido, seed_num)
        margem = calcular_margem_lucro(preco_sugerido, media_mercado)
        demanda = calcular_demanda(dados, seed_num)
        comparacoes = gerar_comparacao_lojas(preco_sugerido, seed_num)
        analise = gerar_analise_ia(dados, preco_sugerido, media_mercado, demanda)

        return jsonify({
            'sucesso': True,
            'preco_sugerido': preco_sugerido,
            'media_mercado': media_mercado,
            'margem_lucro': margem,
            'demanda': demanda,
            'demanda_texto': 'Alta demanda' if demanda > 70 else 'Média demanda' if demanda > 40 else 'Baixa demanda',
            'comparacao_lojas': comparacoes,
            'analise': analise,
            'dados_recebidos': {
                'titulo': dados.get('titulo'),
                'autores': dados.get('autores'),
                'genero': dados.get('genero'),
                'estado': dados.get('estado'),
                'encadernacao': dados.get('encadernacao'),
                'atributos': dados.get('atributos', []),
                'hasISBN': dados.get('hasISBN', True)
            }
        })

    except Exception as e:
        return jsonify({'erro': f'Erro interno: {str(e)}'}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'servico': 'Bookly Pricing API', 'versao': '1.0'})

if __name__ == '__main__':
    print("""
╔════════════════════════════════════════╗
║   Bookly Pricing API v1.0              ║
║   Rodando em: http://localhost:5000     ║
║   Endpoint: POST /api/recommend-price  ║
╚════════════════════════════════════════╝
    """)
    app.run(host='0.0.0.0', port=5000, debug=True)