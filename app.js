Vue.createApp({
  data() {
    return {
      viePlayer: 100,
      CCPlayer: 75,
      vieAdversaire: 100,
      CCAdversaire: 75,
      countTours: 0,
      compteurAttqSpe: 0,
      logsArray: [],
    };
  },

  computed: {
    refreshAttack() {
      console.log(this.countTours);
      if (this.compteurAttqSpe != 0) {
        if (this.countTours == this.compteurAttqSpe) {
          this.compteurAttqSpe = 0;
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
  },

  methods: {
    attackPlayer() {
      const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
      const hitPlayer = Math.random() * 100;
      if (hitPlayer <= this.CCPlayer) {
        this.vieAdversaire -= attaquePlayer;
        if (this.vieAdversaire <= 0) {
          this.vieAdversaire = 0;
        }

        const log = `Le joueur attaque et inflique ${attaquePlayer} dégats et reste ${this.vieAdversaire} pdv au monstre`;
        this.logsArray.unshift(log);
      } else {
        console.log('le joueur à raté');
        const log = `le joueur a raté , pas de chance`;
        this.logsArray.unshift(log);
      }
      this.attackAdversaire();
    },
    attackAdversaire() {
      setTimeout(() => {
        if (this.vieAdversaire <= 0) return;
        if (this.vieAdversaire <= 50) {
          if (Math.random() < 0.5) {
            this.healAdversaire();

            return;
          }
        }

        const attaquePlayer = Math.trunc(Math.random() * (20 - 10) + 10);
        const hitAdversaire = Math.random() * 100;
        if (hitAdversaire <= this.CCAdversaire) {
          this.viePlayer -= attaquePlayer;
          if (this.viePlayer <= 0) {
            this.viePlayer = 0;
          }

          const log = `Le monstre attaque et inflique ${attaquePlayer} dégats et il reste ${this.viePlayer} pdv au joueur`;
          this.logsArray.unshift(log);
        } else {
          const log = `le monstre a raté ! quel nullos !`;
          this.logsArray.unshift(log);
        }
        this.countTours++;
      }, 500);
    },
    healPlayer() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.viePlayer += soin;
      if (this.viePlayer > 100) this.viePlayer = 100;
      const log = `le joueur se soigne et récupère ${soin} PDV`;
      this.logsArray.unshift(log);
      this.attackAdversaire();
    },
    healAdversaire() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.vieAdversaire += soin;
      const log = `le monstre se soigne et récupère ${soin} PDV`;
      this.logsArray.unshift(log);
      this.countTours++;
    },

    attackSpe() {
      const degat = Math.trunc((Math.random() * (20 - 10) + 10) * 1.5);
      this.vieAdversaire -= degat;
      if (this.vieAdversaire <= 0) {
        this.vieAdversaire = 0;
      }
      this.compteurAttqSpe = this.countTours + 3;
      console.log('spé' + this.compteurAttqSpe);
      console.log('Attaque spe');

      const log = `Le joueur utilise attaque speciale et inflige ${degat} dégats`;
      this.logsArray.unshift(log);

      this.attackAdversaire();
    },
    abandonner() {
      this.viePlayer = 0;
      const log = `Vous avez choisi l'abandon ! Quelle lacheté !`;
      this.logsArray.unshift(log);
    },
  },
}).mount('#app');
