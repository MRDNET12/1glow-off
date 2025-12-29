export interface ChallengeDay {
  id: number;
  week: number;
  title: string;
  description: string;
  fullText: string;
  affirmation: string;
  beauty: string;
  mental: string;
  lifestyle: string;
  isReviewDay: boolean;
  reviewQuestions?: string[];
}

export const challengeDays: ChallengeDay[] = [
  // Semaine 1 - Reset & Nettoyage de vie
  {
    id: 1,
    week: 1,
    title: "Grand Reset",
    description: "Objectif : faire de la place, alléger le mental, repartir sur de bonnes bases.",
    fullText: "Aujourd'hui, tu appuies sur \"reset\". Prends quelques minutes pour respirer, t'ancrer, et poser l'intention de te choisir.",
    affirmation: "Je deviens une version plus légère et plus alignée de moi-même.",
    beauty: "Fais un double nettoyage du visage et hydrate profondément.",
    mental: "Écris tout ce qui te pèse en ce moment. Sans filtre.",
    lifestyle: "Range ton espace principal (bureau, lit, salon).",
    isReviewDay: false
  },
  {
    id: 2,
    week: 1,
    title: "Hydratation intérieure & extérieure",
    description: "Le glow commence par l'intérieur.",
    fullText: "L'hydratation est la base d'un glow authentique. Aujourd'hui, on s'occupe de ton corps de l'intérieur et de l'extérieur.",
    affirmation: "Je nourris mon corps, mon esprit et mon énergie.",
    beauty: "Applique une crème hydratante ou un masque hydratant.",
    mental: "Prends 5 minutes pour respirer profondément.",
    lifestyle: "Bois au moins 6 verres d'eau aujourd'hui et commence ton tracker d'hydratation.",
    isReviewDay: false
  },
  {
    id: 3,
    week: 1,
    title: "Détox digitale",
    description: "Ce que tu consommes influence ton humeur.",
    fullText: "Ton environnement digital a un impact direct sur ton énergie. Fais le tri pour ne garder que ce qui t'élève.",
    affirmation: "Je choisis ce qui nourrit ma paix.",
    beauty: "Fais un masque visage ou un soin rapide.",
    mental: "Crée une playlist \"good vibes only\".",
    lifestyle: "Supprime les applications, photos et comptes qui ne t'apportent rien.",
    isReviewDay: false
  },
  {
    id: 4,
    week: 1,
    title: "Organisation rapide & douce",
    description: "Une vie organisée crée un esprit apaisé.",
    fullText: "L'organisation n'est pas rigide, c'est une façon de se simplifier la vie et de gagner en sérénité.",
    affirmation: "Je deviens une femme alignée, organisée et sereine.",
    beauty: "Fais une routine minimaliste (nettoyage + hydratation).",
    mental: "Écris 10 affirmations de confiance.",
    lifestyle: "Planifie ta semaine (3 priorités max).",
    isReviewDay: false
  },
  {
    id: 5,
    week: 1,
    title: "Corps & Énergie",
    description: "L'énergie du corps influence ton glow.",
    fullText: "Quand ton corps est bien, ton esprit suit. Prends soin de ton corps avec des gestes simples mais intentionnels.",
    affirmation: "Je prends soin de mon corps avec douceur.",
    beauty: "Exfolie légèrement ton corps et hydrate.",
    mental: "Pratique 1 minute de respiration profonde.",
    lifestyle: "Marche 10 à 15 minutes.",
    isReviewDay: false
  },
  {
    id: 6,
    week: 1,
    title: "Détox émotionnelle",
    description: "Temps de laisser aller.",
    fullText: "Les émotions sont des messagers. Aujourd'hui, on libère ce qui n'a plus lieu d'être.",
    affirmation: "Je me libère de ce qui ne me sert plus.",
    beauty: "Fais une routine self-care relaxante.",
    mental: "Écris une lettre (que tu ne liras pas) sur ce que tu dois libérer.",
    lifestyle: "Désencombre un tiroir ou une petite zone.",
    isReviewDay: false
  },
  {
    id: 7,
    week: 1,
    title: "Bilan Semaine 1",
    description: "Prends un moment pour réfléchir à ta première semaine.",
    fullText: "Tu as terminé ta première semaine de Glow Up ! Félicitations. Prends le temps de célébrer tes petits progrès.",
    affirmation: "Je suis fière de prendre soin de moi.",
    beauty: "Offre-toi un soin relaxant pour te récompenser.",
    mental: "Réfléchis à ta semaine et à tes progrès.",
    lifestyle: "Planifie la semaine 2 avec enthousiasme.",
    isReviewDay: true,
    reviewQuestions: [
      "Comment te sens-tu ?",
      "Qu'est-ce qui a changé ?",
      "Quel petit pas t'a fait du bien ?"
    ]
  },
  // Semaine 2 - Beauté & Self-care
  {
    id: 8,
    week: 2,
    title: "Stabiliser ta routine skincare",
    description: "Objectif : installer une routine simple, efficace et féminine.",
    fullText: "Une skincare régulière est un acte d'amour envers soi-même. Trouve ce qui marche pour toi et tiens-toi-y.",
    affirmation: "Je rayonne naturellement.",
    beauty: "Définis une routine simple matin/soir (3 étapes).",
    mental: "Respire et centre-toi 2 minutes.",
    lifestyle: "Note tes produits préférés.",
    isReviewDay: false
  },
  {
    id: 9,
    week: 2,
    title: "Soin cheveux profond",
    description: "Prends le temps de chérir tes cheveux.",
    fullText: "Tes cheveux méritent de l'attention. Un soin profond peut transformer non seulement ta chevelure mais aussi ton humeur.",
    affirmation: "Je me traite comme une reine.",
    beauty: "Fais un masque nourrissant ou un bain d'huile.",
    mental: "Prends un moment sans écran.",
    lifestyle: "Range tes produits cheveux / accessoires.",
    isReviewDay: false
  },
  {
    id: 10,
    week: 2,
    title: "Routine \"Femme Fatale\" minimaliste",
    description: "La puissance est dans la simplicité.",
    fullText: "Tu n'as pas besoin de beaucoup pour être irrésistible. Quelques touches bien placées suffisent.",
    affirmation: "Je suis élégante et assurée.",
    beauty: "Maquillage léger mais impactant (gloss, mascara, glow).",
    mental: "Adopte une posture confiante.",
    lifestyle: "Choisis une tenue où tu te sens magnifique.",
    isReviewDay: false
  },
  {
    id: 11,
    week: 2,
    title: "Look frais en 5 minutes",
    description: "La beauté peut être rapide et efficace.",
    fullText: "Pas besoin d'y passer des heures. En 5 minutes, tu peux te sentir prête à affronter le monde.",
    affirmation: "Je mérite de me sentir belle au quotidien.",
    beauty: "Teint frais, cheveux coiffés simplement.",
    mental: "Écris 3 choses que tu aimes chez toi.",
    lifestyle: "Rafraîchis ton sac / organise l'intérieur.",
    isReviewDay: false
  },
  {
    id: 12,
    week: 2,
    title: "Posture & élégance",
    description: "L'élégance se porte de l'intérieur.",
    fullText: "Ta posture dit beaucoup sur toi. Redresse-toi et respire ta confiance.",
    affirmation: "Je marche avec assurance et grâce.",
    beauty: "Un soin rapide.",
    mental: "Respire avec la poitrine ouverte.",
    lifestyle: "Pratique 3 minutes de posture élégante (dos droit, épaules ouvertes).",
    isReviewDay: false
  },
  {
    id: 13,
    week: 2,
    title: "Self-care mains & pieds",
    description: "Les détails font toute la différence.",
    fullText: "Prends soin de tes mains et de tes pieds. Ce sont des parties souvent oubliées mais si importantes.",
    affirmation: "Je prends soin des détails qui me font du bien.",
    beauty: "Coupe, lime, hydrate, vernis si tu veux.",
    mental: "Ralentis ta journée 10 minutes.",
    lifestyle: "Crée un rituel self-care hebdomadaire.",
    isReviewDay: false
  },
  {
    id: 14,
    week: 2,
    title: "Bilan Semaine 2",
    description: "Réfléchis à ton évolution beauté.",
    fullText: "Deux semaines déjà ! Tu as installé des routines précieuses. Regarde le chemin parcouru.",
    affirmation: "J'investis dans mon bien-être.",
    beauty: "Fais un soin spécial pour célébrer.",
    mental: "Note les changements que tu observes.",
    lifestyle: "Prépare-toi pour la semaine mindset.",
    isReviewDay: true,
    reviewQuestions: [
      "Quels changements vois-tu au niveau beauté ?",
      "Quel rituel te fait le plus de bien ?"
    ]
  },
  // Semaine 3 - Mindset & Confiance
  {
    id: 15,
    week: 3,
    title: "Vision Board Féminin",
    description: "Objectif : développer une mentalité forte, douce et magnétique.",
    fullText: "Visualiser est puissant. Crée un espace qui représente la femme que tu deviens.",
    affirmation: "Je deviens la femme que je visualise.",
    beauty: "Un soin rapide.",
    mental: "Crée un vision board (Canva ou papier).",
    lifestyle: "Affiche-le quelque part.",
    isReviewDay: false
  },
  {
    id: 16,
    week: 3,
    title: "Affirmations puissantes",
    description: "Les mots ont un pouvoir créateur.",
    fullText: "Répéter des affirmations positives reprogramme ton subconscient. Fais-en un rituel quotidien.",
    affirmation: "Je suis capable, digne et confiante.",
    beauty: "Ta routine habituelle.",
    mental: "Écris 20 affirmations puissantes.",
    lifestyle: "Lis-les à voix haute.",
    isReviewDay: false
  },
  {
    id: 17,
    week: 3,
    title: "Journal \"Femme Confiante\"",
    description: "Connecte-toi à ta version confiante.",
    fullText: "Quand tu te reconnectes à ta confiance intérieure, tout devient possible.",
    affirmation: "Je choisis la confiance.",
    beauty: "Soin détente.",
    mental: "Écris ce que ferait la version confiante de toi.",
    lifestyle: "Applique une micro-action immédiatement.",
    isReviewDay: false
  },
  {
    id: 18,
    week: 3,
    title: "Stop aux pensées négatives",
    description: "Reprends le pouvoir sur tes pensées.",
    fullText: "Tes pensées créent ta réalité. Choisis consciemment celles qui te servent.",
    affirmation: "Mes pensées créent ma réalité, je choisis le positif.",
    beauty: "Routine rapide.",
    mental: "Note tes pensées négatives et transforme-les.",
    lifestyle: "Fais un mini rituel d'ancrage (bougie, thé…).",
    isReviewDay: false
  },
  {
    id: 19,
    week: 3,
    title: "Routine matinale douce",
    description: "Commence ta journée avec intention.",
    fullText: "La façon dont tu démarres ta journée influence tout le reste. Douceur et intention sont tes mots-clés.",
    affirmation: "Je me réveille avec douceur et intention.",
    beauty: "Rafraîchis ton visage.",
    mental: "Choisis 3 choses qui te donnent envie pour la journée.",
    lifestyle: "Organise ta matinée à ton rythme.",
    isReviewDay: false
  },
  {
    id: 20,
    week: 3,
    title: "Petits plaisirs du quotidien",
    description: "Le bonheur est dans les petits moments.",
    fullText: "Tu n'as pas besoin de grand événement pour être heureuse. Les petits plaisirs comptent énormément.",
    affirmation: "Je mérite de profiter de chaque instant.",
    beauty: "Un geste beauté simple.",
    mental: "Liste 10 petits plaisirs faciles.",
    lifestyle: "Réalise-en au moins 2 aujourd'hui.",
    isReviewDay: false
  },
  {
    id: 21,
    week: 3,
    title: "Bilan Semaine 3",
    description: "Évalue ton évolution mentale.",
    fullText: "Trois semaines ! Ton mindset évolue chaque jour. Remarque les changements intérieurs.",
    affirmation: "Je deviens mentalement plus forte chaque jour.",
    beauty: "Offre-toi un soin réconfortant.",
    mental: "Réfléchis à ton évolution mentale.",
    lifestyle: "Note les insights importants.",
    isReviewDay: true,
    reviewQuestions: [
      "Comment ton mindset évolue ?",
      "Quelle pensée t'a portée cette semaine ?"
    ]
  },
  // Semaine 4 - Lifestyle, Habitudes & Énergie féminine
  {
    id: 22,
    week: 4,
    title: "Routine du soir Glow",
    description: "Objectif : créer un style de vie aligné, beau et durable.",
    fullText: "Tes soirées préparent tes lendemains. Fais-en un moment sacré de préparation et de calme.",
    affirmation: "Mes soirées sont un moment sacré pour moi.",
    beauty: "Démaquillage profond + hydratation.",
    mental: "Gratitude pour 3 choses.",
    lifestyle: "Prépare ta journée de demain.",
    isReviewDay: false
  },
  {
    id: 23,
    week: 4,
    title: "Meal Prep simple",
    description: "La simplicité dans l'alimentation.",
    fullText: "Se nourrir ne doit pas être compliqué. La simplicité et l'amour-propre suffisent.",
    affirmation: "Je nourris mon corps avec amour et simplicité.",
    beauty: "Soin express.",
    mental: "Simplifie tes repas.",
    lifestyle: "Prépare 1 à 2 recettes simples pour la semaine.",
    isReviewDay: false
  },
  {
    id: 24,
    week: 4,
    title: "Glow Up wardrobe",
    description: "Les vêtements qui te mettent en valeur.",
    fullText: "Ce que tu portes influence comment tu te sens. Choisis des pièces qui te font briller.",
    affirmation: "Je mérite de me sentir bien dans ce que je porte.",
    beauty: "Parfum + look propre.",
    mental: "Écris comment tu veux te sentir dans tes vêtements.",
    lifestyle: "Fais un mini tri et garde les pièces qui te mettent en valeur.",
    isReviewDay: false
  },
  {
    id: 25,
    week: 4,
    title: "Espace beauté organisé",
    description: "Un espace qui soutient ta féminité.",
    fullText: "Ton espace beauté doit être un havre de paix, pas un source de stress.",
    affirmation: "Je crée un espace qui soutient ma féminité.",
    beauty: "Range tes produits.",
    mental: "Élimine ce que tu n'utilises pas.",
    lifestyle: "Crée un coin beauté agréable.",
    isReviewDay: false
  },
  {
    id: 26,
    week: 4,
    title: "Hydratation maximale",
    description: "L'eau est ton meilleur allié glow.",
    fullText: "L'hydratation est la clé d'une peau éclatante et d'un esprit clair.",
    affirmation: "Je prends soin de moi avec constance.",
    beauty: "Masque hydratant.",
    mental: "Vérifie ton niveau d'énergie.",
    lifestyle: "Remplis ton tracker d'hydratation.",
    isReviewDay: false
  },
  {
    id: 27,
    week: 4,
    title: "Journée Soft Life",
    description: "L'art de la douceur et du calme.",
    fullText: "La soft life, c'est choisir la douceur, le calme et l'intentionnalité. Surtout quand le monde va vite.",
    affirmation: "Je mérite le calme, la douceur et la beauté.",
    beauty: "Un geste qui te fait du bien.",
    mental: "Ralentis ton rythme.",
    lifestyle: "Fais 3 activités qui apaisent (bougie, musique douce, bain…).",
    isReviewDay: false
  },
  {
    id: 28,
    week: 4,
    title: "Social Glow Up",
    description: "Les relations qui t'élèvent.",
    fullText: "Ton entourage influence ton énergie. Choisis des relations qui te nourrissent.",
    affirmation: "Je cultive des relations belles et enrichissantes.",
    beauty: "Une routine simple.",
    mental: "Contacte une personne qui te fait du bien.",
    lifestyle: "Planifie une sortie ou un moment convivial.",
    isReviewDay: false
  },
  {
    id: 29,
    week: 4,
    title: "Préparer le mois prochain",
    description: "Continuer ton évolution.",
    fullText: "Ce n'est pas la fin, c'est le début d'un nouveau chapitre. Prépare-toi à continuer ton glow up.",
    affirmation: "Je me prépare pour la suite de mon évolution.",
    beauty: "Soin rapide.",
    mental: "Fixe 3 objectifs pour le mois à venir.",
    lifestyle: "Planifie tes routines.",
    isReviewDay: false
  },
  {
    id: 30,
    week: 4,
    title: "Bilan final & célébration",
    description: "Tu y es ✨",
    fullText: "30 jours. Tu l'as fait. Prends un moment pour célébrer toi-même et tout le chemin parcouru.",
    affirmation: "Je suis fière de moi. Ce n'est que le début.",
    beauty: "Offre-toi un soin luxueux pour célébrer.",
    mental: "Réfléchis à tes 30 jours de glow up.",
    lifestyle: "Célèbre toi-même de la manière qui te fait plaisir.",
    isReviewDay: true,
    reviewQuestions: [
      "Comment te sens-tu ?",
      "Qu'est-ce qui a le plus changé ?",
      "Quel est ton plus beau progrès ?"
    ]
  }
];

export const getDayById = (id: number): ChallengeDay | undefined => {
  return challengeDays.find(day => day.id === id);
};

export const getDaysByWeek = (week: number): ChallengeDay[] => {
  return challengeDays.filter(day => day.week === week);
};

export const getCompletionPercentage = (completedDays: number[]): number => {
  return Math.round((completedDays.length / 30) * 100);
};
