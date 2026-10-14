/* ============================================================
   COMMERCE X — DATA (Nichos, Produtos, Categorias)
   ============================================================ */

const NICHOS = {
    autopecas: {
        id: 'autopecas',
        nome: 'Autopeças',
        icone: '🚗',
        descricao: 'Peças automotivas, acessórios, pneus e manutenção.',
        cores: {
            primary: '#1a1a2e',
            secondary: '#e63946',
            accent: '#6c757d',
            bg: '#f8f9fb',
            heroGradient: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 50%, #e63946 150%)'
        },
        hero: {
            titulo: 'Tudo para seu veículo em um só lugar.',
            subtitulo: 'As melhores peças e acessórios automotivos com entrega rápida.'
        },
        categorias: [
            { nome: 'Pneus', icone: '🔧' },
            { nome: 'Óleo', icone: '🛢️' },
            { nome: 'Freios', icone: '🛑' },
            { nome: 'Suspensão', icone: '⚙️' },
            { nome: 'Elétrica', icone: '🔋' },
            { nome: 'Acessórios', icone: '🎯' }
        ],
        produtos: [
            {
                id: 'auto-1',
                nome: 'Pastilha de Freio Cerâmica',
                preco: 189.90,
                desconto: 159.90,
                imagem: 'https://picsum.photos/seed/brakepad/400/400',
                categoria: 'Freios',
                descricao: 'Pastilha de freio cerâmica de alta performance, baixa emissão de pó e maior durabilidade.',
                avaliacao: 4.8,
                parcelas: 6
            },
            {
                id: 'auto-2',
                nome: 'Bateria Automotiva 60Ah',
                preco: 459.90,
                desconto: 399.90,
                imagem: 'https://picsum.photos/seed/carbattery/400/400',
                categoria: 'Elétrica',
                descricao: 'Bateria selada de alta capacidade, livre de manutenção, ideal para veículos nacionais e importados.',
                avaliacao: 4.7,
                parcelas: 10
            },
            {
                id: 'auto-3',
                nome: 'Amortecedor Dianteiro',
                preco: 329.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/shockabsorber/400/400',
                categoria: 'Suspensão',
                descricao: 'Amortecedor pressurizado a gás, maior estabilidade e conforto para seu veículo.',
                avaliacao: 4.9,
                parcelas: 8
            },
            {
                id: 'auto-4',
                nome: 'Óleo Sintético 5W30 4L',
                preco: 219.90,
                desconto: 189.90,
                imagem: 'https://picsum.photos/seed/engineoil/400/400',
                categoria: 'Óleo',
                descricao: 'Óleo 100% sintético de alta performance, proteção superior do motor em todas as temperaturas.',
                avaliacao: 4.6,
                parcelas: 5
            },
            {
                id: 'auto-5',
                nome: 'Pneu 205/55 R16',
                preco: 589.90,
                desconto: 549.90,
                imagem: 'https://picsum.photos/seed/cartire/400/400',
                categoria: 'Pneus',
                descricao: 'Pneu premium com excelente aderência em piso seco e molhado, baixo ruído de rodagem.',
                avaliacao: 4.8,
                parcelas: 12
            },
            {
                id: 'auto-6',
                nome: 'Kit Farol LED Super Brilho',
                preco: 149.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/ledlight/400/400',
                categoria: 'Elétrica',
                descricao: 'Kit completo de farol LED, 300% mais brilho, fácil instalação plug and play.',
                avaliacao: 4.5,
                parcelas: 4
            }
        ],
        bannerSec: {
            titulo: 'Manutenção preventiva?',
            desc: 'Cuide do seu carro com as melhores peças do mercado.'
        }
    },
    restaurantes: {
        id: 'restaurantes',
        nome: 'Restaurantes',
        icone: '🍔',
        descricao: 'Hambúrgueres, pizzas, bebidas e sobremesas deliciosas.',
        cores: {
            primary: '#f97316',
            secondary: '#ef4444',
            accent: '#fef3c7',
            bg: '#fffbf5',
            heroGradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #fbbf24 150%)'
        },
        hero: {
            titulo: 'Peça seus pratos favoritos sem sair de casa.',
            subtitulo: 'Do nosso cardápio direto para a sua mesa, rápido e quentinho.'
        },
        categorias: [
            { nome: 'Hambúrgueres', icone: '🍔' },
            { nome: 'Pizzas', icone: '🍕' },
            { nome: 'Bebidas', icone: '🥤' },
            { nome: 'Sobremesas', icone: '🍰' },
            { nome: 'Porções', icone: '🍟' }
        ],
        produtos: [
            {
                id: 'rest-1',
                nome: 'X-Burger Artesanal',
                preco: 32.90,
                desconto: 27.90,
                imagem: 'https://picsum.photos/seed/burger1/400/400',
                categoria: 'Hambúrgueres',
                descricao: 'Hambúrguer artesanal 180g, pão brioche, queijo cheddar, alface e tomate frescos.',
                avaliacao: 4.9,
                parcelas: 1
            },
            {
                id: 'rest-2',
                nome: 'Pizza Calabresa Grande',
                preco: 59.90,
                desconto: 49.90,
                imagem: 'https://picsum.photos/seed/pizza1/400/400',
                categoria: 'Pizzas',
                descricao: 'Pizza grande 8 fatias, calabresa defumada, cebola e azeitonas, massa fina e crocante.',
                avaliacao: 4.7,
                parcelas: 2
            },
            {
                id: 'rest-3',
                nome: 'Refrigerante 2L',
                preco: 12.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/soda1/400/400',
                categoria: 'Bebidas',
                descricao: 'Refrigerante gelado 2 litros, diversos sabores disponíveis.',
                avaliacao: 4.5,
                parcelas: 1
            },
            {
                id: 'rest-4',
                nome: 'Brownie com Sorvete',
                preco: 24.90,
                desconto: 19.90,
                imagem: 'https://picsum.photos/seed/brownie1/400/400',
                categoria: 'Sobremesas',
                descricao: 'Brownie quentinho de chocolate belga com bola de sorvete de baunilha e calda.',
                avaliacao: 5.0,
                parcelas: 1
            },
            {
                id: 'rest-5',
                nome: 'Combo Família Burger',
                preco: 99.90,
                desconto: 84.90,
                imagem: 'https://picsum.photos/seed/combo1/400/400',
                categoria: 'Hambúrgueres',
                descricao: '4 burgers artesanais + 4 batatas fritas + 4 refrigerantes. Perfeito para família!',
                avaliacao: 4.8,
                parcelas: 3
            },
            {
                id: 'rest-6',
                nome: 'Porção de Batata Frita',
                preco: 22.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/fries1/400/400',
                categoria: 'Porções',
                descricao: 'Batata frita crocante sequinha, porção de 400g com molho especial da casa.',
                avaliacao: 4.6,
                parcelas: 1
            }
        ],
        bannerSec: {
            titulo: 'Noite de pizza?',
            desc: 'Peça agora e receba em 30 minutos ou sua pizza é por nossa conta!'
        }
    },
    moda: {
        id: 'moda',
        nome: 'Moda e Roupas',
        icone: '👕',
        descricao: 'Roupas, calçados e acessórios para todas as estações.',
        cores: {
            primary: '#8b5cf6',
            secondary: '#ec4899',
            accent: '#fce7f3',
            bg: '#fdfaff',
            heroGradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f472b6 150%)'
        },
        hero: {
            titulo: 'Seu estilo, sua identidade.',
            subtitulo: 'As últimas tendências da moda com preços que cabem no seu bolso.'
        },
        categorias: [
            { nome: 'Camisetas', icone: '👚' },
            { nome: 'Calças', icone: '👖' },
            { nome: 'Vestidos', icone: '👗' },
            { nome: 'Tênis', icone: '👟' },
            { nome: 'Acessórios', icone: '👜' }
        ],
        produtos: [
            {
                id: 'moda-1',
                nome: 'Camiseta Premium Algodão',
                preco: 89.90,
                desconto: 69.90,
                imagem: 'https://picsum.photos/seed/tshirt1/400/400',
                categoria: 'Camisetas',
                descricao: 'Camiseta 100% algodão egípcio, modelagem regular, disponível em 8 cores.',
                avaliacao: 4.8,
                parcelas: 3
            },
            {
                id: 'moda-2',
                nome: 'Calça Jeans Slim Fit',
                preco: 199.90,
                desconto: 159.90,
                imagem: 'https://picsum.photos/seed/jeans1/400/400',
                categoria: 'Calças',
                descricao: 'Calça jeans com elastano, conforto e estilo para o dia a dia.',
                avaliacao: 4.6,
                parcelas: 5
            },
            {
                id: 'moda-3',
                nome: 'Vestido Floral Midi',
                preco: 179.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/dress1/400/400',
                categoria: 'Vestidos',
                descricao: 'Vestido midi estampado, perfeito para ocasiões especiais e passeios.',
                avaliacao: 4.9,
                parcelas: 4
            },
            {
                id: 'moda-4',
                nome: 'Tênis Casual Urbano',
                preco: 349.90,
                desconto: 299.90,
                imagem: 'https://picsum.photos/seed/sneaker1/400/400',
                categoria: 'Tênis',
                descricao: 'Tênis moderno com solado em EVA, ultra leve e confortável.',
                avaliacao: 4.7,
                parcelas: 8
            },
            {
                id: 'moda-5',
                nome: 'Bolsa Couro Legítimo',
                preco: 459.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/bag1/400/400',
                categoria: 'Acessórios',
                descricao: 'Bolsa em couro bovino legítimo, design atemporal, compartimentos internos.',
                avaliacao: 5.0,
                parcelas: 10
            },
            {
                id: 'moda-6',
                nome: 'Jaqueta Jeans Oversized',
                preco: 279.90,
                desconto: 239.90,
                imagem: 'https://picsum.photos/seed/jacket1/400/400',
                categoria: 'Camisetas',
                descricao: 'Jaqueta jeans oversized, forrada, ideal para meia-estação.',
                avaliacao: 4.5,
                parcelas: 6
            }
        ],
        bannerSec: {
            titulo: 'Nova coleção já disponível!',
            desc: 'Confira as tendências desta estação.'
        }
    },
    cosmeticos: {
        id: 'cosmeticos',
        nome: 'Cosméticos',
        icone: '💄',
        descricao: 'Maquiagem, perfumes, skincare e cuidados pessoais.',
        cores: {
            primary: '#ec4899',
            secondary: '#f9a8d4',
            accent: '#fdf2f8',
            bg: '#fff5f9',
            heroGradient: 'linear-gradient(135deg, #ec4899 0%, #f9a8d4 50%, #fbcfe8 150%)'
        },
        hero: {
            titulo: 'Beleza e cuidados para o seu dia.',
            subtitulo: 'Produtos premium de skincare, maquiagem e perfumaria.'
        },
        categorias: [
            { nome: 'Maquiagem', icone: '💄' },
            { nome: 'Perfumes', icone: '🌸' },
            { nome: 'Skincare', icone: '✨' },
            { nome: 'Cabelos', icone: '💇' }
        ],
        produtos: [
            {
                id: 'cosm-1',
                nome: 'Base Líquida HD Cover',
                preco: 89.90,
                desconto: 69.90,
                imagem: 'https://picsum.photos/seed/foundation1/400/400',
                categoria: 'Maquiagem',
                descricao: 'Base de alta cobertura, acabamento natural, FPS 30, disponível em 12 tons.',
                avaliacao: 4.8,
                parcelas: 3
            },
            {
                id: 'cosm-2',
                nome: 'Perfume Floral Feminino 100ml',
                preco: 259.90,
                desconto: 219.90,
                imagem: 'https://picsum.photos/seed/perfume1/400/400',
                categoria: 'Perfumes',
                descricao: 'Fragrância floral frutada com notas de rosa, jasmim e frutas vermelhas.',
                avaliacao: 4.9,
                parcelas: 6
            },
            {
                id: 'cosm-3',
                nome: 'Sérum Vitamina C 30ml',
                preco: 129.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/serum1/400/400',
                categoria: 'Skincare',
                descricao: 'Sérum concentrado com 20% de vitamina C pura, ação antioxidante e clareadora.',
                avaliacao: 4.7,
                parcelas: 3
            },
            {
                id: 'cosm-4',
                nome: 'Kit Pincéis Profissionais',
                preco: 149.90,
                desconto: 119.90,
                imagem: 'https://picsum.photos/seed/brushes1/400/400',
                categoria: 'Maquiagem',
                descricao: 'Kit com 12 pincéis profissionais, cerdas sintéticas macias, estojo incluso.',
                avaliacao: 4.6,
                parcelas: 4
            },
            {
                id: 'cosm-5',
                nome: 'Hidratante Facial Noturno',
                preco: 99.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/cream1/400/400',
                categoria: 'Skincare',
                descricao: 'Hidratante noturno com ácido hialurônico e retinol, renovação celular enquanto dorme.',
                avaliacao: 4.8,
                parcelas: 2
            },
            {
                id: 'cosm-6',
                nome: 'Máscara Capilar Reconstrutora',
                preco: 59.90,
                desconto: 44.90,
                imagem: 'https://picsum.photos/seed/hairmask1/400/400',
                categoria: 'Cabelos',
                descricao: 'Máscara com queratina e óleo de argan, recuperação profunda dos fios.',
                avaliacao: 4.5,
                parcelas: 2
            }
        ],
        bannerSec: {
            titulo: 'Rotina de skincare?',
            desc: 'Descubra os produtos ideais para sua pele.'
        }
    },
    eletronicos: {
        id: 'eletronicos',
        nome: 'Eletrônicos',
        icone: '📱',
        descricao: 'Smartphones, notebooks, acessórios e tecnologia.',
        cores: {
            primary: '#2563eb',
            secondary: '#60a5fa',
            accent: '#dbeafe',
            bg: '#f8faff',
            heroGradient: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #60a5fa 150%)'
        },
        hero: {
            titulo: 'Tecnologia que transforma.',
            subtitulo: 'Os melhores eletrônicos com os menores preços do mercado.'
        },
        categorias: [
            { nome: 'Smartphones', icone: '📱' },
            { nome: 'Notebooks', icone: '💻' },
            { nome: 'Áudio', icone: '🎧' },
            { nome: 'Acessórios', icone: '🔌' },
            { nome: 'Smart Home', icone: '🏠' }
        ],
        produtos: [
            {
                id: 'elet-1',
                nome: 'Smartphone X Pro 256GB',
                preco: 3499.90,
                desconto: 2999.90,
                imagem: 'https://picsum.photos/seed/phone1/400/400',
                categoria: 'Smartphones',
                descricao: 'Tela AMOLED 6.7", câmera 108MP, 12GB RAM, bateria 5000mAh, carregamento rápido.',
                avaliacao: 4.9,
                parcelas: 12
            },
            {
                id: 'elet-2',
                nome: 'Notebook Ultrafino 15"',
                preco: 4299.90,
                desconto: 3799.90,
                imagem: 'https://picsum.photos/seed/laptop1/400/400',
                categoria: 'Notebooks',
                descricao: 'Intel Core i7 13ª geração, 16GB RAM, SSD 512GB, tela IPS Full HD.',
                avaliacao: 4.8,
                parcelas: 12
            },
            {
                id: 'elet-3',
                nome: 'Fone Bluetooth ANC',
                preco: 349.90,
                desconto: 279.90,
                imagem: 'https://picsum.photos/seed/headphone1/400/400',
                categoria: 'Áudio',
                descricao: 'Fone over-ear com cancelamento de ruído ativo, 40h de bateria, som hi-res.',
                avaliacao: 4.7,
                parcelas: 6
            },
            {
                id: 'elet-4',
                nome: 'Carregador Rápido 65W',
                preco: 129.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/charger1/400/400',
                categoria: 'Acessórios',
                descricao: 'Carregador GaN 65W, compatível com USB-C, carrega notebook e smartphone.',
                avaliacao: 4.5,
                parcelas: 3
            },
            {
                id: 'elet-5',
                nome: 'Smartwatch Premium',
                preco: 899.90,
                desconto: 749.90,
                imagem: 'https://picsum.photos/seed/watch1/400/400',
                categoria: 'Acessórios',
                descricao: 'Monitor cardíaco, GPS, resistência à água 50m, tela AMOLED always-on.',
                avaliacao: 4.6,
                parcelas: 10
            },
            {
                id: 'elet-6',
                nome: 'Caixa de Som Bluetooth',
                preco: 199.90,
                desconto: 159.90,
                imagem: 'https://picsum.photos/seed/speaker1/400/400',
                categoria: 'Áudio',
                descricao: 'Som 360°, à prova d\'água IPX7, 20h de bateria, graves potentes.',
                avaliacao: 4.4,
                parcelas: 4
            }
        ],
        bannerSec: {
            titulo: 'Lançamentos tech',
            desc: 'Fique por dentro das últimas novidades em tecnologia.'
        }
    },
    mercados: {
        id: 'mercados',
        nome: 'Mercados',
        icone: '🏪',
        descricao: 'Alimentos, bebidas, limpeza e itens essenciais.',
        cores: {
            primary: '#10b981',
            secondary: '#fbbf24',
            accent: '#d1fae5',
            bg: '#f9fdfb',
            heroGradient: 'linear-gradient(135deg, #065f46 0%, #10b981 50%, #fbbf24 150%)'
        },
        hero: {
            titulo: 'Suas compras de mercado, online.',
            subtitulo: 'Entregamos tudo que você precisa, rápido e sem sair de casa.'
        },
        categorias: [
            { nome: 'Alimentos', icone: '🥫' },
            { nome: 'Bebidas', icone: '🥤' },
            { nome: 'Limpeza', icone: '🧹' },
            { nome: 'Higiene', icone: '🧴' },
            { nome: 'Hortifruti', icone: '🥬' }
        ],
        produtos: [
            {
                id: 'merc-1',
                nome: 'Arroz Premium 5kg',
                preco: 24.90,
                desconto: 19.90,
                imagem: 'https://picsum.photos/seed/rice1/400/400',
                categoria: 'Alimentos',
                descricao: 'Arroz tipo 1, grãos selecionados, soltinho e saboroso.',
                avaliacao: 4.8,
                parcelas: 1
            },
            {
                id: 'merc-2',
                nome: 'Feijão Carioca 1kg',
                preco: 8.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/beans1/400/400',
                categoria: 'Alimentos',
                descricao: 'Feijão carioca tipo 1, grãos novos, cozinha rápido.',
                avaliacao: 4.7,
                parcelas: 1
            },
            {
                id: 'merc-3',
                nome: 'Cerveja Premium Pack 12',
                preco: 59.90,
                desconto: 49.90,
                imagem: 'https://picsum.photos/seed/beer1/400/400',
                categoria: 'Bebidas',
                descricao: 'Pack com 12 latas de cerveja premium, 350ml cada.',
                avaliacao: 4.9,
                parcelas: 2
            },
            {
                id: 'merc-4',
                nome: 'Kit Limpeza Completo',
                preco: 89.90,
                desconto: 74.90,
                imagem: 'https://picsum.photos/seed/cleaning1/400/400',
                categoria: 'Limpeza',
                descricao: 'Kit com detergente, desinfetante, limpador multiuso e esponjas.',
                avaliacao: 4.5,
                parcelas: 2
            },
            {
                id: 'merc-5',
                nome: 'Shampoo + Condicionador',
                preco: 34.90,
                desconto: 27.90,
                imagem: 'https://picsum.photos/seed/shampoo1/400/400',
                categoria: 'Higiene',
                descricao: 'Kit shampoo e condicionador 400ml cada, hidratação profunda.',
                avaliacao: 4.6,
                parcelas: 1
            },
            {
                id: 'merc-6',
                nome: 'Cesta de Frutas da Estação',
                preco: 45.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/fruits1/400/400',
                categoria: 'Hortifruti',
                descricao: 'Cesta variada com frutas frescas da estação, aproximadamente 3kg.',
                avaliacao: 4.8,
                parcelas: 1
            }
        ],
        bannerSec: {
            titulo: 'Compras do mês?',
            desc: 'Monte sua lista e receba tudo em casa com frete grátis.'
        }
    },
    presentes: {
        id: 'presentes',
        nome: 'Presentes',
        icone: '🎁',
        descricao: 'Ideias criativas para presentear em todas as ocasiões.',
        cores: {
            primary: '#7c3aed',
            secondary: '#c084fc',
            accent: '#faf5ff',
            bg: '#fdfbff',
            heroGradient: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #c084fc 150%)'
        },
        hero: {
            titulo: 'Surpreenda quem você ama.',
            subtitulo: 'Presentes únicos e especiais para cada momento.'
        },
        categorias: [
            { nome: 'Aniversário', icone: '🎂' },
            { nome: 'Namoro', icone: '💝' },
            { nome: 'Casamento', icone: '💒' },
            { nome: 'Infantil', icone: '🧸' },
            { nome: 'Personalizados', icone: '✍️' }
        ],
        produtos: [
            {
                id: 'pres-1',
                nome: 'Cesta de Café da Manhã Premium',
                preco: 149.90,
                desconto: 129.90,
                imagem: 'https://picsum.photos/seed/giftbasket1/400/400',
                categoria: 'Aniversário',
                descricao: 'Cesta completa com itens gourmet, pães, bolos, frutas e suco natural.',
                avaliacao: 4.9,
                parcelas: 3
            },
            {
                id: 'pres-2',
                nome: 'Aliança de Prata 925',
                preco: 259.90,
                desconto: 219.90,
                imagem: 'https://picsum.photos/seed/ring1/400/400',
                categoria: 'Namoro',
                descricao: 'Aliança em prata 925 com gravação personalizada gratuita.',
                avaliacao: 5.0,
                parcelas: 6
            },
            {
                id: 'pres-3',
                nome: 'Quadro Decorativo Personalizado',
                preco: 89.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/frame1/400/400',
                categoria: 'Personalizados',
                descricao: 'Quadro com foto ou frase personalizada, moldura em madeira, diversos tamanhos.',
                avaliacao: 4.7,
                parcelas: 2
            },
            {
                id: 'pres-4',
                nome: 'Ursinho de Pelúcia Gigante',
                preco: 179.90,
                desconto: 149.90,
                imagem: 'https://picsum.photos/seed/teddy1/400/400',
                categoria: 'Infantil',
                descricao: 'Ursinho de pelúcia 1,2m, super macio, olhos brilhantes, laço de cetim.',
                avaliacao: 4.8,
                parcelas: 4
            },
            {
                id: 'pres-5',
                nome: 'Kit Spa em Casa',
                preco: 119.90,
                desconto: 99.90,
                imagem: 'https://picsum.photos/seed/spakit1/400/400',
                categoria: 'Casamento',
                descricao: 'Kit com velas aromáticas, sais de banho, óleos essenciais e roupão.',
                avaliacao: 4.6,
                parcelas: 3
            },
            {
                id: 'pres-6',
                nome: 'Caneca Térmica Personalizada',
                preco: 59.90,
                desconto: null,
                imagem: 'https://picsum.photos/seed/mug1/400/400',
                categoria: 'Personalizados',
                descricao: 'Caneca térmica com nome ou foto, 500ml, aço inox, tampa anti-vazamento.',
                avaliacao: 4.5,
                parcelas: 2
            }
        ],
        bannerSec: {
            titulo: 'Data especial chegando?',
            desc: 'Garanta já o presente perfeito com entrega expressa.'
        }
    }
};

// Expor globalmente
if (typeof window !== 'undefined') window.NICHOS = NICHOS;