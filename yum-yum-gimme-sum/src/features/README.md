# Features Architecture

Denna mapp innehåller alla features i applikationen, organiserade enligt en avancerad folder struktur som separerar kod baserat på funktionalitet istället för filtyp.

## Struktur

```
features/
├── menu/           # Menu functionality
│   ├── components/ # Menu-specific components
│   ├── hooks/      # Menu-specific hooks
│   ├── store/      # Menu state management
│   └── index.js    # Public API exports
├── cart/           # Shopping cart functionality
│   ├── components/ # Cart-specific components
│   ├── hooks/      # Cart-specific hooks
│   ├── store/      # Cart state management
│   └── index.js    # Public API exports
└── order/          # Order management
    ├── components/ # Order-specific components
    ├── hooks/      # Order-specific hooks
    ├── store/      # Order state management
    └── index.js    # Public API exports
```

## Varför denna struktur?

### ✅ Fördelar
- **Kolokalisering**: All kod för en feature ligger tillsammans
- **Enklare att hitta**: När du jobbar med varukorgen behöver du bara kolla i cart mappen
- **Bättre separation**: Features är isolerade från varandra
- **Skalbarhet**: Lätt att lägga till nya features utan att påverka befintliga
- **Public API**: Endast det som exporteras i index.js kan användas utanför featuren

### 🎯 Användarfall
När du vill:
- **Lägga till ny funktionalitet i menyn** → Gå till `features/menu/`
- **Fixa en bugg i varukorgen** → Gå till `features/cart/`
- **Ändra beställningsflödet** → Gå till `features/order/`

## Import regler

### ✅ Korrekt
```javascript
// Importera från feature index
import { MenuPage, fetchMenu } from '@/features/menu'
import { CartPage, addToCart } from '@/features/cart'
```

### ❌ Undvik
```javascript
// Importera direkt från internfiler (brytr inkapslingen)
import MenuPage from '@/features/menu/components/MenuPage'
import { addToCart } from '@/features/cart/store/cartSlice'
```

## Riktlinjer

1. **En feature per mapp** - Håll features separerade
2. **Public API via index.js** - Exportera endast det som behövs utanför featuren  
3. **Interna beroenden är OK** - Komponenter inom samma feature kan importera från varandra direkt
4. **Cross-feature imports via index** - Använd alltid den publika API:n när du importerar från andra features 