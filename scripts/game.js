let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,

    techs: ['bootstrap',
        'css',
        'electron',
        'firebase',
        'html',
        'javascript',
        'jquery',
        'mongo',
        'node',
        'react'
    ],


    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true
        }

    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false
        }
        return this.firstCard.icon === this.secondCard.icon

    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false
    },


    unflipCards: function () {
        this.firstCard.flipped = false,
            this.secondCard.flipped = false,
            this.clearCards()
    },

    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0
    },



    cards: null,

    /*Cria um array CARDS com todos os pares de cartas*/
    creatCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.creatPairFromTech(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards
    },

    /*Cria um par para cada carta que será inserido no array cards*/
    creatPairFromTech: function (tech) {

        return [{
            id: this.createIdWidthTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWidthTech(tech),
            icon: tech,
            flipped: false
        }]
    },

    /*Cria um id diferente para cada par de cartas*/
    createIdWidthTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    /*Embaralha o array de cards*/
    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }
}