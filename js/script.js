$(document).ready(function () {
    $('#searchInput').on('input', function () {
      const searchValue = $(this).val().toLowerCase();
  
      $('.product-card').each(function () {
        const productName = $(this).data('name').toLowerCase();
        if (productName.includes(searchValue)) {
          $(this).closest('.col-md-4').show();
        } else {
          $(this).closest('.col-md-4').hide();
        }
      });
    });
  });

  function applyFilters() {
    const selectedLocations = $('#locationFilters input:checked').map(function () {
      return this.value;
    }).get();
  
    const selectedTypes = $('#typeFilters input:checked').map(function () {
      return this.value;
    }).get();
  
    const filterInStock = $('#inStockBtn').hasClass('active');
    const filterFree = $('#freeBtn').hasClass('active');
  
    $('.product-card').each(function () {
      const card = $(this);
      const cardLocations = (card.data('locations') || '').split(' ');
      const cardType = card.data('type');
      const cardInStock = card.data('instock');
      const cardPriceType = card.data('price'); // 'free' or 'paid'
  
      const matchesLocation = selectedLocations.length === 0 || selectedLocations.some(loc => cardLocations.includes(loc));
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cardType);
      const matchesInStock = !filterInStock || cardInStock === true || cardInStock === 'true';
      const matchesFree = !filterFree || cardPriceType === 'free';
  
      if (matchesLocation && matchesType && matchesInStock && matchesFree) {
        card.closest('.col-md-4').show();
      } else {
        card.closest('.col-md-4').hide();
      }
    });
  }

  $(document).ready(function () {
    $('.apply-location-filter').on('click', function () {
      $('#locationModal').modal('hide');
      applyFilters();
    });
  
    $('.apply-type-filter').on('click', function () {
      $('#typeModal').modal('hide');
      applyFilters();
    });
  });
  
  $(document).ready(function () {
    $('.apply-location-filter').on('click', function () {
      $('#locationModal').modal('hide');
      applyFilters();
    });
  
    $('.apply-type-filter').on('click', function () {
      $('#typeModal').modal('hide');
      applyFilters();
    });
  
    $('#inStockBtn').on('click', function () {
      $(this).toggleClass('active');
      applyFilters();
    });
  
    $('#freeBtn').on('click', function () {
      $(this).toggleClass('active');
      applyFilters();
    });
  });

//   notify me
    $(document).ready(function() {
        $('#notifyForm').on('submit', function(e) {
        e.preventDefault(); // Stop page from reloading

        const email = $('#notifyEmail').val();
        if (email) {
            alert('Thank you! You will be notified when the product is back in stock.');
            $('#notifyModal').modal('hide');
            $('#notifyForm')[0].reset(); // Clear the form
        }
        });
    });


    // privacy pop up
    $(document).ready(function() {
        // Check if the user previously selected "Don't Show Again"
        if (!localStorage.getItem('dontShowPopup')) {
          const firstVisitModal = new bootstrap.Modal(document.getElementById('firstVisitModal'));
          firstVisitModal.show();
        }
      
        // Handle "Don't Show Again" button click
        $('#dontShowAgainBtn').click(function() {
          localStorage.setItem('dontShowPopup', 'true');
          const firstVisitModal = bootstrap.Modal.getInstance(document.getElementById('firstVisitModal'));
          firstVisitModal.hide();
        });
      });

      // reset for testing
      $(document).ready(function() {
        $('#resetPopup').click(function() {
          localStorage.removeItem('dontShowPopup');
          alert('Popup will show again on next page load!');
        });
      });

      // machine location products
      $(document).ready(function() {
        // Function to get query parameters
        function getQueryParam(param) {
          const urlParams = new URLSearchParams(window.location.search);
          return urlParams.get(param);
        }
      
        // Check if location filter is passed
        const presetLocation = getQueryParam('location');
      
        if (presetLocation) {
          // Select the checkbox for that location if it exists
          $(`#locationFilters input[value="${presetLocation}"]`).prop('checked', true);
      
          // Apply filters immediately
          applyFilters();
        }
      });
      