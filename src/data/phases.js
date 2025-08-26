// Types de données
export const serreTypes = [
  { value: 'tunnel', label: 'Serre Tunnel', icon: '🏠' },
  { value: 'multi-chapelle', label: 'Multi-Chapelle', icon: '🏢' },
  { value: 'verre', label: 'Serre en Verre', icon: '🪟' },
  { value: 'polycarbonate', label: 'Polycarbonate', icon: '🔳' }
];

export const soilTypes = [
  { value: 'argileux', label: 'Sol Argileux', icon: '🟤', desc: 'Retient l\'eau, compact' },
  { value: 'sablonneux', label: 'Sol Sablonneux', icon: '🟡', desc: 'Drainant, léger' },
  { value: 'limoneux', label: 'Sol Limoneux', icon: '🟫', desc: 'Fertile, équilibré' },
  { value: 'rocheux', label: 'Sol Rocheux', icon: '⚪', desc: 'Dur, drainage naturel' }
];

export const climateTypes = [
  { value: 'semi-aride', label: 'Semi-aride', icon: '🌵', desc: 'Sec, chaud (Sénégal)' },
  { value: 'tropical-humide', label: 'Tropical Humide', icon: '🌴', desc: 'Chaud et humide' },
  { value: 'tempere', label: 'Tempéré', icon: '🌲', desc: 'Saisons marquées' }
];

// Images de référence pour les étapes importantes
export const referenceImages = {
  0: {
    title: "Terrain bien préparé",
    description: "Site débroussaillé, sans obstacles, pente légère de 1-2%",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 150 Q200 140 350 130" stroke="#8B7355" stroke-width="4" fill="none"/>
      <rect x="60" y="145" width="280" height="10" fill="#90EE90" opacity="0.7"/>
      <circle cx="80" cy="120" r="15" fill="#228B22"/>
      <rect x="78" y="120" width="4" height="20" fill="#8B4513"/>
      <text x="200" y="180" text-anchor="middle" fill="#333" font-size="14">✓ Zone nette, pente 1-2%</text>
    </svg>`
  },
  1: {
    title: "Nivellement correct",
    description: "Pente uniforme de 1-2%, pas de creux ni bosses, contrôle au niveau laser",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="50" y1="100" x2="350" y2="95" stroke="#FF0000" stroke-width="2" stroke-dasharray="5,5"/>
      <path d="M50 120 L350 115" stroke="#8B7355" stroke-width="6" fill="none"/>
      <rect x="180" y="90" width="40" height="8" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
      <circle cx="200" cy="94" r="2" fill="#000"/>
      <text x="200" y="85" text-anchor="middle" fill="#333" font-size="12">Niveau</text>
      <text x="200" y="180" text-anchor="middle" fill="#333" font-size="14">Pente uniforme 1-2%</text>
    </svg>`
  },
  2: {
    title: "Fondations - Plots béton",
    description: "Profondeur 50-80cm, alignement parfait, espacement selon type de serre",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="120" width="20" height="60" fill="#808080" stroke="#666"/>
      <rect x="180" y="120" width="20" height="60" fill="#808080" stroke="#666"/>
      <rect x="280" y="120" width="20" height="60" fill="#808080" stroke="#666"/>
      <line x1="70" y1="130" x2="310" y2="130" stroke="#FF0000" stroke-width="1" stroke-dasharray="3,3"/>
      <text x="140" y="110" text-anchor="middle" fill="#333" font-size="12">2m</text>
      <text x="240" y="110" text-anchor="middle" fill="#333" font-size="12">2m</text>
      <rect x="0" y="180" width="400" height="20" fill="#8B7355"/>
      <text x="200" y="200" text-anchor="middle" fill="#333" font-size="14">Profondeur: 50-80cm selon zone venteuse</text>
    </svg>`
  },
  3: {
    title: "Assemblage ossature",
    description: "Vérification des diagonales pour l'équerrage - les 2 diagonales doivent être égales",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#FF0000"/>
        </marker>
      </defs>
      <rect x="100" y="80" width="200" height="100" fill="none" stroke="#4169E1" stroke-width="3"/>
      <line x1="100" y1="80" x2="300" y2="180" stroke="#FF0000" stroke-width="2" stroke-dasharray="5,5"/>
      <line x1="300" y1="80" x2="100" y2="180" stroke="#FF0000" stroke-width="2" stroke-dasharray="5,5"/>
      <circle cx="100" cy="80" r="3" fill="#FF0000"/>
      <circle cx="300" cy="80" r="3" fill="#FF0000"/>
      <circle cx="100" cy="180" r="3" fill="#FF0000"/>
      <circle cx="300" cy="180" r="3" fill="#FF0000"/>
      <text x="200" y="50" text-anchor="middle" fill="#333" font-size="14">Les 2 diagonales = même longueur</text>
      <text x="200" y="200" text-anchor="middle" fill="#333" font-size="12">Vérification équerrage</text>
    </svg>`
  },
  4: {
    title: "Installation couverture",
    description: "Tension uniforme, pas de poches d'eau, fixations solides avec clips anti-déchirure",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowblue" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#4169E1"/>
        </marker>
      </defs>
      <path d="M50 150 Q200 50 350 150" stroke="#4169E1" stroke-width="3" fill="none"/>
      <path d="M50 150 Q200 55 350 150" stroke="none" fill="#E6F3FF" opacity="0.7"/>
      <circle cx="80" cy="135" r="3" fill="#FFD700"/>
      <circle cx="150" cy="85" r="3" fill="#FFD700"/>
      <circle cx="250" cy="85" r="3" fill="#FFD700"/>
      <circle cx="320" cy="135" r="3" fill="#FFD700"/>
      <circle cx="120" cy="110" r="2" fill="#4169E1"/>
      <path d="M120 112 L130 130" stroke="#4169E1" stroke-width="1" marker-end="url(#arrowblue)"/>
      <text x="200" y="180" text-anchor="middle" fill="#333" font-size="14">✓ Évacuation eau, tension uniforme</text>
    </svg>`
  },
  5: {
    title: "Ventilation adaptée au climat",
    description: "Ouvertures selon le climat : naturelle (semi-aride), forcée (tropical humide)",
    svg: `<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <marker id="arrowcyan" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#00CED1"/>
        </marker>
      </defs>
      <path d="M100 150 Q200 80 300 150" stroke="#4169E1" stroke-width="3" fill="#E6F3FF" opacity="0.3"/>
      <line x1="100" y1="150" x2="300" y2="150" stroke="#4169E1" stroke-width="3"/>
      <rect x="110" y="140" width="30" height="20" fill="#87CEEB" stroke="#4169E1"/>
      <rect x="260" y="140" width="30" height="20" fill="#87CEEB" stroke="#4169E1"/>
      <path d="M50 145 L110 145" stroke="#00CED1" stroke-width="2" marker-end="url(#arrowcyan)"/>
      <path d="M290 145 L350 145" stroke="#00CED1" stroke-width="2" marker-end="url(#arrowcyan)"/>
      <text x="200" y="120" text-anchor="middle" fill="#FF4500" font-size="16">🌡️</text>
      <text x="200" y="180" text-anchor="middle" fill="#333" font-size="14">Ventilation croisée efficace</text>
    </svg>`
  }
};

// Phases de construction
export const phases = [
  {
    id: 0,
    name: 'Préparation du site',
    icon: '🏗️',
    description: 'Préparation et nettoyage du terrain',
    hasReferenceImages: true,
    technicalInfo: {
      general: 'Choisir un site plat ou pente douce (1–2 %)',
      details: 'Éviter zones trop plates (stagnation d\'eau) ou trop pentues (>12 %)',
      preservation: 'Préserver la couche superficielle fertile'
    },
    checklist: [
      'Vérification plan topographique',
      'Débroussaillage, coupe arbustes',
      'Retrait pierres et débris',
      'Photos du terrain nettoyé'
    ]
  },
  {
    id: 1,
    name: 'Nivellement du terrain',
    icon: '📐',
    description: 'Mise à niveau et préparation du sol',
    hasReferenceImages: true,
    technicalInfo: {
      slope: 'Pente idéale : 1–2 % (1–2 m par 100 m)',
      avoidance: 'Éviter pentes >12 % (préférer terrassement)',
      soilTreatment: {
        argileux: 'Ameublir + compost',
        sablonneux: 'Enrichir avec matière organique',
        limoneux: 'Léger amendement si nécessaire',
        rocheux: 'Préparation plots béton'
      }
    },
    checklist: [
      'Vérification de la pente avec niveau/laser',
      'Uniformisation creux et bosses',
      'Ajout de compost/amendements selon type de sol',
      'Photo du terrain nivelé'
    ]
  },
  {
    id: 2,
    name: 'Fondations / Ancrage',
    icon: '🏗️',
    description: 'Installation des fondations',
    hasReferenceImages: true,
    technicalInfo: {
      depth: 'Profondeur standard : 50–80 cm',
      soilAdaptation: {
        rocheux: 'Plots superficiels avec scellement béton',
        sablonneux: 'Renforts de fixation nécessaires'
      },
      spacing: {
        tunnel: '2 m entre plots',
        'multi-chapelle': '3–4 m entre plots'
      }
    },
    checklist: [
      'Tranchées ou plots coulés',
      'Vérification niveau et alignement',
      'Photos des fondations',
      'Contrôle profondeur selon type de sol'
    ]
  },
  {
    id: 3,
    name: 'Ossature',
    icon: '⚙️',
    description: 'Montage de la structure',
    hasReferenceImages: true,
    technicalInfo: {
      materials: 'Acier galvanisé (recommandé), aluminium (léger)',
      spacing: 'Espacement arcs serre tunnel : 1.5–2 m',
      assembly: 'Boulonnage serré au couple requis',
      verification: 'Vérifier orthogonalité avec mesure diagonales'
    },
    checklist: [
      'Montage profilés/arcs',
      'Serrage des ancrages',
      'Contrôle des diagonales',
      'Photos ossature'
    ]
  },
  {
    id: 4,
    name: 'Couverture',
    icon: '🏠',
    description: 'Installation de la couverture',
    hasReferenceImages: true,
    technicalInfo: {
      materials: {
        'semi-aride': 'Polyéthylène résistant UV recommandé',
        'tropical-humide': 'Polycarbonate pour résister à l\'humidité',
        'tempere': 'Verre ou polycarbonate selon budget'
      },
      installation: 'Tension uniforme, sans poches d\'eau',
      fixation: 'Clips/rails anti-déchirure'
    },
    checklist: [
      'Type de recouvrement installé',
      'Étanchéité des jonctions',
      'Tests infiltration eau',
      'Photos couverture'
    ]
  },
  {
    id: 5,
    name: 'Équipements',
    icon: '🔧',
    description: 'Installation des équipements techniques',
    hasReferenceImages: true,
    technicalInfo: {
      ventilation: {
        'semi-aride': 'Ventilation naturelle adaptée',
        'tropical-humide': 'Ventilation forcée recommandée',
        'tempere': 'Ventilation mixte'
      },
      irrigation: {
        sablonneux: 'Goutte-à-goutte recommandé',
        argileux: 'Aspersion possible'
      }
    },
    checklist: [
      'Test ouverture/fermeture ventilation',
      'Débit irrigation vérifié',
      'Installation capteurs température/humidité',
      'Photos équipements'
    ]
  },
  {
    id: 6,
    name: 'Finitions & Sécurité',
    icon: '🛡️',
    description: 'Finitions et mise en sécurité',
    hasReferenceImages: false,
    technicalInfo: {
      doors: 'Portes fermant correctement',
      signage: 'Signalétique sorties de secours',
      electrical: 'Électricité protégée (disjoncteurs)',
      safety: 'Extincteurs si installations électriques'
    },
    checklist: [
      'Vérification portes et trappes',
      'Mise en place extincteurs',
      'Formation opérateurs',
      'Photos finitions'
    ]
  },
  {
    id: 7,
    name: 'Réception / Contrôle final',
    icon: '✅',
    description: 'Contrôle final et réception',
    hasReferenceImages: false,
    technicalInfo: {
      inspection: 'Vérification visuelle complète',
      tests: 'Test étanchéité pluie',
      systems: 'Vérification systèmes électriques/irrigation',
      signature: 'Signature client + installateur'
    },
    checklist: [
      'Inspection finale',
      'Non-conformités listées',
      'Bon de réception signé',
      'Export PDF rapport'
    ]
  }
];