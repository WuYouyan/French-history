<template>
  <footer class="timeline-footer">
    <div class="footer-flag">🇫🇷</div>
    <p class="footer-text">{{ $t('footer.motto') }}</p>
    <p class="footer-credit">{{ $t('footer.credit') }}</p>
  </footer>
</template>

<style scoped>
.timeline-footer {
  text-align: center;
  padding: 3rem 2rem 5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.footer-flag {
  font-size: 2rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.footer-text {
  font-size: 0.7rem;
  color: var(--muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.footer-credit {
  margin-top: 0.5rem;
  font-size: 0.6rem;
  opacity: 0.5;
  color: var(--muted);
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
</style>
