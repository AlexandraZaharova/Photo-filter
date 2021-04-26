function drawImageFromComp() {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    img.after(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    img.setAttribute('class', 'img-none');
}

drawImageFromComp();