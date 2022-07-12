Vue.createApp({
  data() {
    return {
      viePlayer: 100,
      vieAdversaire: 100,
      countTours: 0,
      btnAttaqueSpeciale: true,
      compteurAttqSpe: 0,
    };
  },

  computed: {
    refreshAttack() {
      if (this.countTours % 3 === 0) this.btnAttaqueSpeciale = true;
      else this.btnAttaqueSpeciale = false;
    },
  },

  methods: {
    attackPlayer() {
      const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
      this.vieAdversaire -= attaquePlayer;
      this.attackAdversaire();
    },
    attackAdversaire() {
      const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
      this.viePlayer -= attaquePlayer;
      this.countTours++;
    },
    heal() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.viePlayer += soin;
      this.attackAdversaire();
    },

    AttackSpe() {
      const degat = Math.trunc((Math.random() * (20 - 10) + 10) * 1.5);
      this.vieAdversaire -= degat;
    },
  },
}).mount('#app');
