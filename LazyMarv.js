const batchSize = 6;
let observer;
let currentIndex = 0;

const showNextBatch = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const endIndex = currentIndex + batchSize;
            for (let i = currentIndex; i < endIndex && i < items.length; i++) {
                items[i].classList.remove('lazy');
            }
            currentIndex = endIndex;

            if (currentIndex >= items.length) {
                observer.disconnect();
            }
        }
    });
};

const options = {
  rootMargin: '50px 0px',
  threshold: 0.01
};


if ('IntersectionObserver' in window) {
  let collectionList = document.querySelector('.swiper-wrapper');
  let items = collectionList.querySelectorAll('.swiper-slide');

  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('lazy');
  }

  observer = new IntersectionObserver(showNextBatch, options);

  for (let i = 0; i < batchSize; i++) {
    items[i].classList.remove('lazy');
  }
  currentIndex = 0;

  for (let i = currentIndex; i < items.length; i++) {
    observer.observe(items[i]);
  }
}
  const mutationObserver = new MutationObserver(() => {
    resetObserver();
  });

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true
  });

 const resetObserver = () => {
  observer.disconnect();
  collectionList = document.querySelector('.swiper-wrapper');
  items = collectionList.querySelectorAll('.swiper-slide');

  for (let i = 0; i < items.length; i++) {
    items[i].classList.add('lazy');
  }
  currentIndex = 0;
  observer = new IntersectionObserver(showNextBatch, options);

  for (let i = 0; i < batchSize; i++) {
    items[i].classList.remove('lazy');
  }
  currentIndex = 0;

  for (let i = currentIndex; i < items.length; i++) {
    observer.observe(items[i]);
  }
};
