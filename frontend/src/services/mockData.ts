import type { AstralMap } from "../types/astral";

export function mockAstralMap(username: string): AstralMap {
  return {
    user: {
      username,
      avatar_url: `https://avatars.githubusercontent.com/u/5832347?v=4`,
      analysis_date: new Date().toLocaleDateString("pt-BR"),
      lunar_cycle: "Ciclo Lunar 4",
      cosmic_reach: "Top 2%",
    },
    solar_sign: {
      title: "Java da Madrugada",
      description:
        'Sua aura de código irradia com a intensidade de mil máquinas de café expresso queimando. Você prospera nas horas sombrias, tecendo fios intrincados de concorrência enquanto o resto do mundo dorme. As estrelas sugerem que seu próximo push será lendário, desde que os níveis de cafeína permaneçam no estado crítico de "Zênite Elevado".',
      tags: ["PROGRAMADOR_VIGILANTE", "ÓRBITA_JAVA"],
    },
    ascendant: {
      name: "Mercúrio Retrógit",
      status: "Interferência Ativa",
      title: "Programador Noturno",
      tags: ["#ProfeciaDoBug", "#SorteNoStackOverflow"],
      quote:
        "Um force-push durante esta fase levará a uma transformação inesperada do repositório.",
    },
    temporal_rhythm: {
      sync_rate: "94%",
      chart_data: {
        SEG: 40,
        TER: 65,
        QUA: 90,
        QUI: 55,
        SEX: 45,
        SAB: 75,
        DOM: 30,
      },
    },
    babel_fish: {
      input_hash: "0xf3a1b2c",
      input_message:
        "feat: implement celestial rendering engine for star chart visualization [v2.0]",
      haiku:
        "A lua brilha no código 🌙\nMapas astrais florescem em neon ✨\nA branch main está em paz 🌌",
    },
    astrolabe: {
      orbital_cycles: "42.1k",
      zodiac_repos: 5,
      collaboration_flow: "Alta",
      constellation_phase: "Alfa",
    },
  };
}
