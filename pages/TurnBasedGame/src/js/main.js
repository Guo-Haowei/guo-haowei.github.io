var main = function() {
    // timer
    var ticks = 0, past = Date.now(), current;

    var game = new Game();
    game.init();

    var loop = function() {
        lastTime = now;
        now = Date.now();
        delta += now - lastTime;
        if (delta >= 1000.0/fps) {
            delta = 0;
            ++ticks;

            game.update();
        }

        // render as many times as possible
        
        game.render(CTX);


        current = Date.now();
        // fps check
        if (current - past >= 1000) {
            document.getElementById('fps').innerHTML = 'FPS: ' + ticks;
            ticks = 0;
            past = current;
        }
        window.requestAnimationFrame(loop, canvas);
    }
    window.requestAnimationFrame(loop, canvas);
};

// callback that will be run once images are ready
loader.addCompletionListener(function() {
    main();
});

// begin downloading images
loader.start();