const cards = document.querySelectorAll(".champs-guide .card");
const weightFilter = document.querySelector("#weight");
const genderFilter = document.querySelector("#gender");

const noResultsMessage = document.querySelector(".no-results-message");

const currentFilters = {
  weight: "all",
  gender: "all",
};

// Assign a unique view transition name to each card for smooth transitions.
cards.forEach((card, index) => {
  // You can use a data attribute if cards have unique IDs
  const champId = `champ-${index + 1}`;
  card.style.viewTransitionName = `champ-card-${champId}`;
});

weightFilter.addEventListener("change", updateFilter);
genderFilter.addEventListener("change", updateFilter);

function updateFilter(e) {
  const filterType = e.target.name;

  currentFilters[filterType] = e.target.value;

  // If browser does not support viewTransition api.
  if (!document.startViewTransition) {
    filterCards();
    return;
  }

  document.startViewTransition(() => filterCards());
}

function filterCards() {
  let hasVisibleCards = false;

  cards.forEach((card) => {
    const weightClass = card.querySelector("[data-weight]").dataset.weight;
    const gender = card.querySelector("[data-gender]").dataset.gender;

    const matchesWeight = currentFilters.weight === weightClass;
    const matchesGender = currentFilters.gender === gender;

    if (
      (currentFilters.weight === "all" || matchesWeight) &&
      (currentFilters.gender === "all" || matchesGender)
    ) {
      card.hidden = false;
      hasVisibleCards = true;
    } else {
      card.hidden = true;
    }
  });

  if (hasVisibleCards) {
    noResultsMessage.hidden = true;
  } else {
    noResultsMessage.innerHTML = `No <strong>${currentFilters.gender}</strong> champion in ${currentFilters.weight} category.`;
    noResultsMessage.hidden = false;
  }
}

function enableFiltering() {
  weightFilter.hidden = false;
  genderFilter.hidden = false;
}

enableFiltering();
