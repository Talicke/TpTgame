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
      btnDisplay: false,
      messPlayer:
        'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif',
      messAdversaire:
        'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif',
    };
  },

  computed: {
    //* Fonction qui affiche le bouton attaque speciale en fonction du tour ou il a été utilisé
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
    //* fonction qui permet au joueur d'infliger un nombre de degat a l'adversaire entre 10 et 20. Le coup peut etre manqué, aucun degat ne sera infligé.
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
        this.messPlayer =
          'https://64.media.tumblr.com/7ad8abb5fbb0944a0adb8701af284ca2/tumblr_nuu85ieEwt1ru5h8co1_640.gifv';
        const log = `le joueur a raté , pas de chance`;
        this.logsArray.unshift(log);
      }
      this.messPlayer =
        'https://media1.giphy.com/media/FdV0RqprguocfWuFf3/200w.gif';
      this.btnDisplay = true;
      this.attackAdversaire();
    },
    //* fonction qui permet au monstre d'infliger un nombre de dégâts au joueur entre 10 et 20
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
          this.messAdversaire =
            'https://64.media.tumblr.com/7ad8abb5fbb0944a0adb8701af284ca2/tumblr_nuu85ieEwt1ru5h8co1_640.gifv';
          const log = `le monstre a raté ! quel nullos !`;
          this.logsArray.unshift(log);
        }
        this.btnDisplay = false;
        this.messAdversaire =
          'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif';
        this.messPlayer =
          'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif';
        this.countTours++;
      }, 750);
    },
    //* fonction qui permet au joueur de récuperer des points de vie , entre 10 et 30
    healPlayer() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.viePlayer += soin;
      if (this.viePlayer > 100) this.viePlayer = 100;
      this.messPlayer =
        'https://c.tenor.com/e7jSG0zscaoAAAAC/unicornwasted-taste-the-rainbow.gif';
      this.btnDisplay = true;
      const log = `le joueur se soigne et récupère ${soin} PDV`;
      this.logsArray.unshift(log);
      this.attackAdversaire();
    },
    //* fonction qui permet au monstre de récuperer entre 10 et 30 points de vie lorsqu'il a moins de la moitié de sa vie.
    healAdversaire() {
      const soin = Math.trunc(Math.random() * (30 - 10) + 10);
      this.vieAdversaire += soin;
      this.messAdversaire = this.btnDisplay = false;
      const log = `le monstre se soigne et récupère ${soin} PDV`;
      this.logsArray.unshift(log);
      this.messAdversaire =
        'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif';
      this.messPlayer =
        'https://thumbs.gfycat.com/EarnestUnrealisticIrishsetter-size_restricted.gif';
      this.countTours++;
    },
    //* fonction qui permet au joueur d'utiliser une attaque plus puissant qui inflige 1.5 fois plus de degat , l'attaque n'est disponible ne peut etre reutilisée qu'apres 3 tours
    attackSpe() {
      const degat = Math.trunc((Math.random() * (20 - 10) + 10) * 1.5);
      this.vieAdversaire -= degat;
      if (this.vieAdversaire <= 0) {
        this.vieAdversaire = 0;
      }
      this.compteurAttqSpe = this.countTours + 3;
      console.log('spé' + this.compteurAttqSpe);
      console.log('Attaque spe');
      this.btnDisplay = true;
      const log = `Le joueur utilise attaque speciale et inflige ${degat} dégats`;
      this.logsArray.unshift(log);
      this.messPlayer =
        'https://64.media.tumblr.com/424a404a9f1142ff9ce3adaf5a092098/tumblr_pfwfr9h7jJ1uauof6o1_500.gifv';
      this.attackAdversaire();
    },
    //* fonction qui permet au joueur d'abandoner , sa vie est réduite à zéro
    abandonner() {
      this.viePlayer = 0;
      const log = `Vous avez choisi l'abandon ! Quelle lacheté !`;
      this.logsArray.unshift(log);
    },
  },
}).mount('#app');
