function fallbackCopy(text) {
  const field = document.createElement('textarea');
  field.value = text;
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const copied = document.execCommand('copy');
  field.remove();
  return copied;
}

async function copyBibTeX() {
  const citation = document.getElementById('bibtex-code');
  const button = document.querySelector('.copy-bibtex-btn');
  const label = button.querySelector('.copy-text');
  let copied = false;

  try {
    await navigator.clipboard.writeText(citation.textContent);
    copied = true;
  } catch {
    copied = fallbackCopy(citation.textContent);
  }

  label.textContent = copied ? 'Copied!' : 'Copy failed';
  button.classList.toggle('copied', copied);
  window.setTimeout(() => {
    label.textContent = 'Copy';
    button.classList.remove('copied');
  }, 2000);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateScrollButton() {
  document.querySelector('.scroll-to-top').classList.toggle('visible', window.scrollY > 480);
}

document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('scroll', updateScrollButton, { passive: true });
  updateScrollButton();
});
