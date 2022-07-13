Vue.createApp({
  data() {
    return {
      viePlayer: 100,
      vieAdversaire: 100,
      countTours: 0,
      compteurAttqSpe: 0,
    };
  },

  computed: {
    refreshAttack() {
      console.log(this.countTours);
      if (this.countTours % 3 === 0) {
        return false;
      } else {
        return true;
      }
    },
  },

  methods: {
    attackPlayer() {
      const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
      this.vieAdversaire -= attaquePlayer;
      console.log(
        `Le joueur attaque et inflique ${attaquePlayer} dégats et reste ${this.vieAdversaire} pdv au monstre`
      );
      this.attackAdversaire();
    },
    attackAdversaire() {
      setTimeout(() => {
        const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
        this.viePlayer -= attaquePlayer;
        this.countTours++;
        console.log(
          `Le monstre attaque et inflique ${attaquePlayer} dégats et reste ${this.viePlayer} pdv au joueur`
        );
      }, 1000);
    },
    heal() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.viePlayer += soin;
      this.attackAdversaire();
    },

    attackSpe() {
      const degat = Math.trunc((Math.random() * (20 - 10) + 10) * 1.5);
      this.vieAdversaire -= degat;
      console.log('Attaque spe');
      console.log(
        `Le joueur utilise attaque speciale et inflige ${degat} dégats`
      );

      this.attackAdversaire();
    },
    abandonner() {
      this.viePlayer = 0;
    },
  },
}).mount('#app');
