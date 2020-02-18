var Game = new function(){
    this.screens=[];
    this.keys={};
    var KEY_CODES={87: 'up', 83: 'down', 65: 'left', 68: 'right'};
    
    this.initialize= function(canvasElementId, sprite_data, callback){
        this.canvas = document.getElementById(canvasElementId);
        this.width = this.canvas.width;
        this.height= this.canvas.height;

        // Set up the rendering context
        this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
        if(!this.ctx) { return alert("Please upgrade your browser to play"); }

        // Set up input
        this.setupInput();

        // Start the game loop
        this.loop();

        // Load the sprite sheet and pass forward the callback.
        SpriteSheet.load(sprite_data,callback);
    };

    this.setupInput = function() {
            window.addEventListener('keydown',function(e) {
                    if(KEY_CODES[e.keyCode]) {
                            Game.keys[KEY_CODES[e.keyCode]] = true;
                            e.preventDefault();
                            //e.stopPropagation();
                    }
            },false);

            window.addEventListener('keyup',function(e) {
                    if(KEY_CODES[e.keyCode]) {
                            Game.keys[KEY_CODES[e.keyCode]] = false;
                            e.preventDefault();
                            //e.stopPropagation();
                    }
            },false);
    };
    
    this.loop = function() {
                var dt = 30/1000;
                for(var i=0, len = Game.screens.length;i<len;i++) {
                        if( Game.screens[i]) {
                                 Game.screens[i].update(dt);
                                 Game.screens[i] &&  Game.screens[i].draw(Game.ctx);
                        }
                }
                setTimeout(Game.loop,30);
        };

        // Change an active screen
        this.setScreen = function(num, screen) { Game.screens[num] = screen; };

}; 
