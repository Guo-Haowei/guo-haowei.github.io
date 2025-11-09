export const playNextBackgroundImage = (inc) => {
    inc = inc || 1;
    const imageDiv = document.getElementById('header');
    const oldBackground = imageDiv.classList[0];
    let idx = parseInt(oldBackground.slice(-1));
    idx += inc;
    if (idx > 3) {
        idx = 1;
    } else if (idx < 1) {
        idx = 3;
    }

    imageDiv.className = `header-${idx.toString()} w3-opacity w3-display-container`;
    console.log(imageDiv.className);
}
