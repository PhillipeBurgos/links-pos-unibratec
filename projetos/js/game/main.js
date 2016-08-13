// Inicializar phaser
var game = new Phaser.Game(400, 490);

var estadoPrincipal = {
    preload: function(){
        game.load.image('cunha', 'assets/cunha.jpg');
        game.load.image('moro', 'assets/moro.jpg');
    },

    create: function(){
        //Cor de fundo
        game.stage.backgroundColor = '#987654';

        //Física do sistema
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Cunha na posição eixoX = 100 e eixoY = 245
        this.cunha = game.add.sprite(100, 245, 'cunha');

        //Física para Cunha
        game.physics.arcade.enable(this.cunha);
        this.cunha.body.gravity.y = 1500;

        // "Salto" habilitado para a tecla espaço
        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this); 

        //Criar um grupo
        this.moros = game.add.group()

        this.timer = game.time.events.loop(1500, this.addRowOfMoro, this)
    
        this.score = 0;

        this.labelScore = game.add.text(20, 20,"0", {font: "30px Verdana", fill: "#000000"});
    },

    update: function(){
        //Se Cunha tiver muito fora da tela, chama a função restartGame
        if(this.cunha.y < 0 || this.cunha.y > 490){
            this.restartGame();
        }

        game.physics.arcade.overlap(this.cunha, this.moros,this.restartGame, null, this);
    },

    jump: function(){
        if (this.cunha.alive == false)
            return; 

        this.cunha.body.velocity.y = -350;
    },

    restartGame: function(){
        game.state.start('main');
    },

    addOneMoro: function(x,y){
        var moro = game.add.sprite(x,y,'moro');

        // Adiciona moro ao grupo criado anteriormente
        this.moros.add(moro);

        // Habilita a fisica em Moro
        game.physics.arcade.enable(moro);

        // Velocidade que moro vai se deslocar pra esquerda
        moro.body.velocity.x = -200;

        // Sumir com Moro quando nao estiver mais visível na tela
        moro.checkWorldBounds = true;
        moro.outOfBoundsKill = true;
    },

    addRowOfMoro: function(){
        // Ver aleatoriamente qual o espaço
        var liminar = Math.floor(Math.random() * 5) + 1;

        // Adicionar a coluna de Moros

        for(var i = 0; i < 8; i++){
            if(i != liminar && i != liminar + 1){
                this.addOneMoro(400, i * 60 +10)
            }
        }

        this.score += 1;
        this.labelScore.text = this.score;
    }
};
alert('"Vivo ou morto, você vem comigo." - MORO, Sérgio')
game.state.add('main', estadoPrincipal);
game.state.start('main');