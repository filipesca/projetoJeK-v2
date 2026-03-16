import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from restaurant.models import MenuItem

pratos_iniciais = [
    {
        'name': 'Entrada',
        'category': 'Entradas', 
        'description': 'Fatias de pao, manteiga de alho e queijo derretido.', 
        'ingredients': 'pao, alho, manteiga, queijo'
    },
    {
        'name': 'Caldo Verde', 
        'category': 'Sopas', 
        'description': 'Sopa de couve-galega, tipica da regiao do norte de Portugal.', 
        'ingredients': 'batata, cebola, alho, azeite, caldo verde, chouriço, sal'
    },
    {
        'name': 'Sopa de cenoura', 
        'category': 'Sopas', 
        'description': 'Sopa de cenoura com um toque de coentros.', 
        'ingredients': 'cenoura, batata, cebola, azeite, sal, coentros'
    },
    {
        'name': 'Francesinha', 
        'category': 'Carne',
        'description': 'Sanduiche originario da cidade do Porto, em Portugal.', 
        'ingredients': 'pao, fiambre, salsicha, bife de vitela, queijo, ovo'
    },
    {
        'name': 'Bitoque de Vaca', 
        'category': 'Carne', 
        'description': 'Bife de vaca frito com molho especial.', 
        'ingredients': 'bife de vaca, alho, louro, vinho branco, ovo, batata'
    },
    {
        'name': 'Bifinhos com Cogumelos', 
        'category': 'Carne',
        'description': 'Bifinhos com cogumelos e molho.', 
        'ingredients': 'bifes, sal, azeite, alho, cogumelos'
    },
    {
        'name': 'Bacalhau a Bras', 
        'category': 'Peixe', 
        'description': 'Bacalhau desfiado envolvido em batata palha e ovos mexidos.', 
        'ingredients': 'bacalhau, batata palha, cebola, ovos, salsa, azeitonas'
    },
    {
        'name': 'Salmao Grelhado', 
        'category': 'Peixe',
        'description': 'Salmao grelhado com ervas finas e limao.', 
        'ingredients': 'salmao, ervas finas, limao, azeite'
    },
    {
        'name': 'Robalo Assado', 
        'category': 'Peixe', 
        'description': 'robalo assado com ervas aromaticas e gengibre.', 
        'ingredients': 'azeite, coentros, limao, cebola, robalo, sal'
    },
    {
        'name': 'Mousse de Chocolate', 
        'category': 'Sobremesa', 
        'description': 'Mousse caseira de chocolate.', 
        'ingredients': 'chocolate em po, ovos, acucar, manteiga'
    },
    {
        'name': 'Baba de Camelo', 
        'category': 'Sobremesa', 
        'description': 'Sobremesa portuguesa preparada com leite condensado e ovos.', 
        'ingredients': 'ovos, leite condensado, amendoas'
    }
]

print("A adicionar menu")

for prato_data in pratos_iniciais:
    # O get_or_create evita criar pratos duplicados
    prato, criado = MenuItem.objects.get_or_create(**prato_data)
    if criado:
        print(f"Adicionado: {prato.name}")
    else:
        print(f"Ja existe: {prato.name}")

print("Menu adicionado!")