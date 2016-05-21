function Animation(tenf, sprite) {
	this.tenf = tenf; // tick every n frames
    this.timer = 0;
    
	this.sprite = sprite;
    this.index = 0;
    this.spriteLength = sprite.length;

    this.totalTime = 0;

    // method
    this.update = function() {
        ++this.timer;
        ++this.totalTime;
        if (this.timer == this.tenf) {
            this.timer = 0;
            ++this.index;
            if (this.index == this.spriteLength) {
                this.index = 0;
                this.totalTime = 0;
            }
        }
    };
    
    this.getFrame = function() {
        return this.sprite[this.index];
    };
    
    this.reset = function() {
        this.index = 0;
    };

    this.finished = function() {
        return this.totalTime === this.spriteLength*this.tenf-1;
    }
};
