const inputs = document.querySelectorAll('.filters input');

function drawImageFromComp() {
    const canvas = document.createElement('canvas');
    canvas.setAttribute('class', 'first');
    const img = document.querySelector('img');
    img.after(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    img.setAttribute('class', 'img-none');
}
function handleUpdate() {
    const suffix = this.dataset.sizing;
    this.nextElementSibling.value = this.value;
    if (document.querySelector('canvas').getAttribute('class') == "first") {
        drawImage(document.querySelector('img').src);
    } 
}
function drawImage(src) {
    const canvas = document.querySelector('canvas');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = src;
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.filter = `blur(${outputs[0].value}px) 
        invert(${outputs[1].value}%)
        sepia(${outputs[2].value}%) 
        saturate(${outputs[3].value}%)
        hue-rotate(${outputs[4].value}deg)`;
      ctx.drawImage(img, 0, 0);
    };
}

drawImageFromComp();
inputs.forEach(input => input.addEventListener('input', handleUpdate));
