# GoodDoctor - Paleta de Cores

## Cores Principais

### Teal/Verde-Azul

- **Primary Teal**: `#00C9A7` - Cor principal, usada em botões e elementos importantes
- **Primary Teal Light**: `#00E1C3` - Versão mais clara, usada em gradientes e destaques
- **Primary Teal Hover**: `#00B396` - Estado hover
- **Primary Teal Active**: `#009D85` - Estado active/pressionado

### Roxo/Lilás

- **Primary Purple**: `#A065E1` - Cor secundária, usada em elementos de apoio
- **Primary Lilac**: `#D69DE0` - Versão mais suave, usada em backgrounds sutis
- **Primary Purple Hover**: `#9154D4` - Estado hover
- **Primary Purple Active**: `#7B42B8` - Estado active/pressionado

## Uso Recomendado

### Botões

```css
/* Botão Primário */
background: linear-gradient(135deg, #00c9a7 0%, #00e1c3 100%);

/* Botão Secundário */
border: 2px solid #a065e1;
color: #a065e1;

/* Estados Hover */
background: linear-gradient(135deg, #00b396 0%, #00c9a7 100%);
```

### Gradientes

```css
/* Gradiente Principal */
background: linear-gradient(135deg, #00c9a7 0%, #00e1c3 100%);

/* Gradiente Alternativo */
background: linear-gradient(135deg, #00c9a7 0%, #a065e1 100%);

/* Gradiente Suave */
background: linear-gradient(135deg, #00e1c3 0%, #d69de0 100%);
```

### Texto

```css
/* Texto com Gradiente */
background: linear-gradient(135deg, #00c9a7 0%, #a065e1 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

### Focus States

```css
/* Input Focus */
box-shadow: 0 0 0 3px rgba(0, 201, 167, 0.1);
border-color: #00c9a7;

/* Button Focus */
box-shadow: 0 0 0 3px rgba(0, 201, 167, 0.2);
```

## Aplicação na Interface

### Elementos de Interface

- **Botões Primários**: Gradiente Teal → Teal Light
- **Botões Secundários**: Borda Purple + texto Purple
- **Links**: Teal com hover Teal Hover
- **Focus States**: Teal com opacity reduzida
- **Checkboxes/Radios**: Teal
- **Progressbars**: Gradiente Teal → Teal Light

### Backgrounds

- **Principais**: Branco (#FFFFFF) ou cinza muito claro (#F9FAFB)
- **Cards**: Branco com sombra sutil
- **Sidebars**: Gradiente suave com as cores principais (muito sutil)

### Tipografia

- **Títulos principais**: Gradiente Teal → Purple
- **Subtítulos**: Cinza escuro (#374151)
- **Texto corpo**: Cinza médio (#6B7280)
- **Texto secundário**: Cinza claro (#9CA3AF)

## Acessibilidade

Todas as cores foram testadas para contraste WCAG AA:

- Texto escuro em backgrounds claros: ✅ Aprovado
- Botões com contraste adequado: ✅ Aprovado
- Estados focus bem visíveis: ✅ Aprovado

## Variações CSS

```css
:root {
  /* Cores Principais */
  --primary-teal: #00c9a7;
  --primary-teal-light: #00e1c3;
  --primary-purple: #a065e1;
  --primary-lilac: #d69de0;

  /* Estados */
  --primary-teal-hover: #00b396;
  --primary-teal-active: #009d85;
  --primary-purple-hover: #9154d4;
  --primary-purple-active: #7b42b8;
  --primary-lilac-hover: #c88bd7;
  --primary-lilac-active: #b879ce;

  /* Opacidades para overlays */
  --primary-teal-10: rgba(0, 201, 167, 0.1);
  --primary-teal-20: rgba(0, 201, 167, 0.2);
  --primary-purple-10: rgba(160, 101, 225, 0.1);
  --primary-purple-20: rgba(160, 101, 225, 0.2);
}
```
